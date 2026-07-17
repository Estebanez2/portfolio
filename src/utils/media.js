export const getYoutubeId = (url = '') => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

export const isVideo = (url = '') => /\.(mp4|webm)$/i.test(url);
