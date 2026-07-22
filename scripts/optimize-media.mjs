import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdir, readdir, rename, rm, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const rootDir = path.resolve(import.meta.dirname, '..');
const ffmpegPath = ffmpegInstaller.path;
const imageExtensions = new Set(['.png']);
const videoExtensions = new Set(['.mp4']);

const walkFiles = async (dir) => {
  if (!existsSync(dir)) return [];

  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const fullPath = path.join(dir, entry.name);
    return entry.isDirectory() ? walkFiles(fullPath) : fullPath;
  }));

  return files.flat();
};

const toRelative = (filePath) => path.relative(rootDir, filePath);

const formatBytes = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)} MB`;

const isFresh = async (source, target) => {
  if (!existsSync(target)) return false;

  const [sourceStats, targetStats] = await Promise.all([
    stat(source),
    stat(target),
  ]);

  return targetStats.mtimeMs >= sourceStats.mtimeMs;
};

const convertImage = async (source) => {
  const target = source.replace(/\.png$/i, '.webp');
  await mkdir(path.dirname(target), { recursive: true });

  const skipped = await isFresh(source, target);

  if (!skipped) {
    await sharp(source)
      .webp({
        quality: 82,
        effort: 6,
        smartSubsample: true,
      })
      .toFile(target);
  }

  const sourceSize = (await stat(source)).size;
  const targetSize = (await stat(target)).size;

  return {
    source,
    target,
    sourceSize,
    targetSize,
    skipped,
  };
};

const runFfmpeg = (args) => new Promise((resolve, reject) => {
  const child = spawn(ffmpegPath, args, {
    stdio: ['ignore', 'ignore', 'pipe'],
    windowsHide: true,
  });

  let stderr = '';
  child.stderr.on('data', (chunk) => {
    stderr += chunk.toString();
  });

  child.on('error', reject);
  child.on('close', (code) => {
    if (code === 0) resolve();
    else reject(new Error(stderr || `ffmpeg exited with code ${code}`));
  });
});

const convertVideo = async (source) => {
  const target = source.replace(/\.mp4$/i, '.webm');
  const tempTarget = target.replace(/\.webm$/i, '.tmp.webm');
  await mkdir(path.dirname(target), { recursive: true });

  const skipped = await isFresh(source, target);

  if (!skipped) {
    await rm(tempTarget, { force: true });

    try {
      await runFfmpeg([
        '-y',
        '-i', source,
        '-map', '0:v:0',
        '-map', '0:a?',
        '-vf', "scale='min(1280,iw)':-2",
        '-c:v', 'libvpx',
        '-deadline', 'good',
        '-cpu-used', '2',
        '-b:v', '1600k',
        '-maxrate', '2200k',
        '-bufsize', '3200k',
        '-pix_fmt', 'yuv420p',
        '-c:a', 'libopus',
        '-b:a', '96k',
        tempTarget,
      ]);

      await rename(tempTarget, target);
    } catch (error) {
      await rm(tempTarget, { force: true });
      throw error;
    }
  }

  const sourceSize = (await stat(source)).size;
  const targetSize = (await stat(target)).size;

  return {
    source,
    target,
    sourceSize,
    targetSize,
    skipped,
  };
};

const imageSources = [
  path.join(rootDir, 'src', 'mi_foto.png'),
  path.join(rootDir, 'public', 'logo_web.png'),
  path.join(rootDir, 'public', 'logoweb.png'),
  ...(await walkFiles(path.join(rootDir, 'public', 'proyectos'))),
].filter((file) => existsSync(file) && imageExtensions.has(path.extname(file).toLowerCase()));

const videoSources = (await walkFiles(path.join(rootDir, 'public', 'proyectos')))
  .filter((file) => videoExtensions.has(path.extname(file).toLowerCase()));

const imageResults = [];
for (const image of imageSources) {
  imageResults.push(await convertImage(image));
}

const videoResults = [];
for (const video of videoSources) {
  videoResults.push(await convertVideo(video));
}

const printResult = ({ source, target, sourceSize, targetSize, skipped }) => {
  const saved = sourceSize - targetSize;
  const status = skipped ? 'cached' : 'converted';
  console.log(`${toRelative(source)} -> ${toRelative(target)} | ${formatBytes(sourceSize)} -> ${formatBytes(targetSize)} | saved ${formatBytes(saved)} | ${status}`);
};

console.log('\nImages');
imageResults.forEach(printResult);

console.log('\nVideos');
videoResults.forEach(printResult);
