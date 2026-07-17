const AnimatedBackground = () => (
  <div className="bg-animated">
    <div className="orb w-96 h-96 bg-orange-600 top-10 left-10"></div>
    <div className="orb w-80 h-80 bg-orange-800 bottom-20 right-20" style={{ animationDelay: '-5s' }}></div>
  </div>
);

export default AnimatedBackground;
