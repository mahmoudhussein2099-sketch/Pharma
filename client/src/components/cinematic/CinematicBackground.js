import React, { useEffect, useRef } from 'react';

const THEME_COLOR_KEYS = ['--primary', '--secondary', '--accent', '--foreground'];

function hexToRgb(hex) {
  let clean = String(hex || '').trim().replace('#', '');
  if (clean.length === 3) {
    clean = clean.split('').map((c) => c + c).join('');
  }
  if (!/^[0-9a-fA-F]{6}$/.test(clean)) return null;
  const bigint = parseInt(clean, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

function resolveColors() {
  const root = getComputedStyle(document.documentElement);
  const pick = (key, fallback) => {
    const rgb = hexToRgb(root.getPropertyValue(key).trim());
    return rgb ? `${rgb.r}, ${rgb.g}, ${rgb.b}` : fallback;
  };
  return {
    primary: pick('--primary', '13, 148, 136'),
    secondary: pick('--secondary', '6, 182, 212'),
    accent: pick('--accent', '13, 148, 136'),
    foreground: pick('--foreground', '15, 23, 42'),
  };
}

const DENSITY_MAP = { low: 22, medium: 40, high: 70 };

const CinematicBackground = ({ className = '', density = 'medium' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;
    let raf;
    let colors = resolveColors();
    let particles = [];

    const motifCount = DENSITY_MAP[density] || DENSITY_MAP.medium;

    const makeMotif = (seed) => {
      const types = ['ring', 'pill', 'spark'];
      const type = types[Math.floor(seed) % types.length];
      return {
        type,
        x: Math.random() * width,
        y: height + 40 + Math.random() * height * 0.4,
        size: 7 + Math.random() * 16,
        speedY: 0.2 + Math.random() * 0.7,
        drift: (Math.random() - 0.5) * 0.35,
        rotation: Math.random() * Math.PI,
        rotSpeed: (Math.random() - 0.5) * 0.012,
        alpha: 0.05 + Math.random() * 0.14,
        phase: Math.random() * Math.PI * 2,
      };
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width || window.innerWidth;
      height = rect.height || window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const init = () => {
      particles = Array.from({ length: motifCount }, (_, i) => makeMotif(i * 7.13));
    };

    const drawRing = (m) => {
      ctx.beginPath();
      ctx.arc(0, 0, m.size * 0.55, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${colors.primary}, ${m.alpha * 1.6})`;
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, 0, m.size * 0.28, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${colors.secondary}, ${m.alpha})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();
    };

    const drawPill = (m) => {
      const w = m.size * 1.5;
      const h = m.size * 0.6;
      const radius = h / 2;
      ctx.beginPath();
      ctx.moveTo(-w / 2 + radius, -h / 2);
      ctx.lineTo(w / 2 - radius, -h / 2);
      ctx.arcTo(w / 2, -h / 2, w / 2, -h / 2 + radius, radius);
      ctx.lineTo(w / 2, h / 2 - radius);
      ctx.arcTo(w / 2, h / 2, w / 2 - radius, h / 2, radius);
      ctx.lineTo(-w / 2 + radius, h / 2);
      ctx.arcTo(-w / 2, h / 2, -w / 2, h / 2 - radius, radius);
      ctx.lineTo(-w / 2, -h / 2 + radius);
      ctx.arcTo(-w / 2, -h / 2, -w / 2 + radius, -h / 2, radius);
      ctx.closePath();
      ctx.fillStyle = `rgba(${colors.secondary}, ${m.alpha})`;
      ctx.fill();
      ctx.strokeStyle = `rgba(${colors.primary}, ${m.alpha * 1.5})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, -h / 2 + 2);
      ctx.lineTo(0, h / 2 - 2);
      ctx.stroke();
    };

    const drawSpark = (m) => {
      const r = m.size * 0.5;
      ctx.beginPath();
      ctx.moveTo(0, -r);
      ctx.quadraticCurveTo(r * 0.18, -r * 0.18, r, 0);
      ctx.quadraticCurveTo(r * 0.18, r * 0.18, 0, r);
      ctx.quadraticCurveTo(-r * 0.18, r * 0.18, -r, 0);
      ctx.quadraticCurveTo(-r * 0.18, -r * 0.18, 0, -r);
      ctx.closePath();
      ctx.strokeStyle = `rgba(${colors.foreground}, ${m.alpha * 1.1})`;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, 0, m.size * 0.12, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${colors.primary}, ${m.alpha * 1.4})`;
      ctx.fill();
    };

    const drawAurora = (t) => {
      const r1 = width * 0.5;
      const r2 = width * 0.38;
      const r3 = width * 0.3;
      const cx1 = width * 0.2 + Math.sin(t * 0.0004) * width * 0.08;
      const cy1 = height * 0.15 + Math.cos(t * 0.0005) * height * 0.06;
      const cx2 = width * 0.85 + Math.cos(t * 0.0003) * width * 0.06;
      const cy2 = height * 0.22 + Math.sin(t * 0.0004) * height * 0.08;
      const cx3 = width * 0.5 + Math.sin(t * 0.0002) * width * 0.1;
      const cy3 = height * 0.92;

      const g1 = ctx.createRadialGradient(cx1, cy1, 0, cx1, cy1, r1);
      g1.addColorStop(0, `rgba(${colors.primary}, 0.16)`);
      g1.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, width, height);

      const g2 = ctx.createRadialGradient(cx2, cy2, 0, cx2, cy2, r2);
      g2.addColorStop(0, `rgba(${colors.secondary}, 0.12)`);
      g2.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, width, height);

      const g3 = ctx.createRadialGradient(cx3, cy3, 0, cx3, cy3, r3);
      g3.addColorStop(0, `rgba(${colors.accent}, 0.08)`);
      g3.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = g3;
      ctx.fillRect(0, 0, width, height);
    };

    const frame = (t) => {
      ctx.clearRect(0, 0, width, height);
      drawAurora(t);
      for (const m of particles) {
        m.y -= m.speedY;
        m.x += Math.sin(t * 0.0006 + m.phase) * m.drift;
        m.rotation += m.rotSpeed;
        if (m.y < -60) {
          Object.assign(m, makeMotif(Math.random() * 3));
          m.y = height + 40;
        }
        ctx.save();
        ctx.translate(m.x, m.y);
        ctx.rotate(m.rotation);
        if (m.type === 'ring') drawRing(m);
        else if (m.type === 'pill') drawPill(m);
        else drawSpark(m);
        ctx.restore();
      }
    };

    const animate = (t) => {
      frame(t);
      raf = requestAnimationFrame(animate);
    };

    const themeObserver = new MutationObserver(() => {
      colors = resolveColors();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    const handleResize = () => {
      resize();
      if (reduced) {
        frame(0);
      }
    };

    resize();
    init();
    if (reduced) {
      frame(0);
    } else {
      raf = requestAnimationFrame(animate);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(raf);
      themeObserver.disconnect();
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
};

export default CinematicBackground;
