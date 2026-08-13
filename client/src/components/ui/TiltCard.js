import { useRef, useCallback } from 'react';

const TiltCard = ({
  children,
  className = '',
  max = 12,
  scale = 1.03,
  glare = true,
  lift = true,
  style,
  ...rest
}) => {
  const ref = useRef(null);

  const handleMove = useCallback(
    (e) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rx = (0.5 - py) * max;
      const ry = (px - 0.5) * max;
      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${scale})`;
      el.style.setProperty('--gx', `${px * 100}%`);
      el.style.setProperty('--gy', `${py * 100}%`);
    },
    [max, scale]
  );

  const handleLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = '';
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`tilt-wrap tilt-3d ${lift ? 'shadow-card3d' : ''} ${className}`}
      style={style}
      {...rest}
    >
      {children}
      {glare && <span aria-hidden="true" className="tilt-glare" />}
    </div>
  );
};

export default TiltCard;
