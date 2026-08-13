import React from 'react';
import { cn } from '../../lib/utils';

const GRADIENTS = [
  'grad-teal',
  'grad-indigo',
  'grad-emerald',
  'grad-amber',
  'grad-rose',
  'grad-sky',
];

const gradientFor = (seed) => GRADIENTS[(seed || 0) % GRADIENTS.length];

/**
 * 3D-style brand icon tile: brand gradient badge with sheen highlight,
 * inner ring and soft depth, matching the Awon logo. Drop any lucide icon
 * (or custom glyph) inside.
 */
export const BrandIcon3D = ({
  icon: Icon,
  className,
  iconClassName,
  seed = 0,
  gradient,
  tileClassName,
  ...rest
}) => (
  <div
    className={cn(
      'relative flex shrink-0 items-center justify-center overflow-hidden rounded-2xl shadow-card-3d',
      gradient || gradientFor(seed),
      className
    )}
    {...rest}
  >
    <span className="absolute -top-4 left-1/2 h-1/2 w-[130%] -translate-x-1/2 rounded-full bg-white/25 blur-md" />
    <span className="absolute inset-x-[15%] top-[7%] h-[18%] rounded-full bg-white/30 blur-[3px]" />
    <span className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/20" />
    <span className="absolute inset-x-[10%] bottom-[8%] h-[14%] rounded-full bg-black/10 blur-[4px]" />
    <Icon className={cn('relative h-1/2 w-1/2 text-white drop-shadow-lg', iconClassName)} aria-hidden="true" />
  </div>
);

/* ------------------------------------------------------------------ */
/*  3D icon PNGs (3dicons library, dynamic color) — local assets.     */
/* ------------------------------------------------------------------ */

export const ICON3D = {
  rocket: '/images/3d-icons/3dicons-rocket-dynamic-color.png',
  shield: '/images/3d-icons/3dicons-shield-dynamic-color.png',
  callIn: '/images/3d-icons/3dicons-call-in-dynamic-color.png',
  medal: '/images/3d-icons/3dicons-medal-dynamic-color.png',
  lock: '/images/3d-icons/3dicons-lock-dynamic-color.png',
  thumbUp: '/images/3d-icons/3dicons-thumb-up-dynamic-color.png',
  folder: '/images/3d-icons/3dicons-folder-dynamic-color.png',
  zoom: '/images/3d-icons/3dicons-zoom-dynamic-color.png',
  chat: '/images/3d-icons/3dicons-chat-dynamic-color.png',
  chatText: '/images/3d-icons/3dicons-chat-text-dynamic-color.png',
  mapPin: '/images/3d-icons/3dicons-map-pin-dynamic-color.png',
  link: '/images/3d-icons/3dicons-link-dynamic-color.png',
  notifyHeart: '/images/3d-icons/3dicons-notify-heart-dynamic-color.png',
  instagram: '/images/3d-icons/3dicons-instagram-dynamic-color.png',
  whatsapp: '/images/3d-icons/3dicons-whatsapp-dynamic-color.png',
};

/**
 * Renders a downloaded 3D icon PNG on a soft glass tile. The icons carry
 * their own color, so the tile stays neutral (subtle brand tint + ring)
 * and works in both light and dark mode.
 */
export const Icon3D = ({ name, className, imgClassName, alt = '', tileClassName, ...rest }) => (
  <span
    className={cn(
      'relative flex shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-secondary/70 ring-1 ring-border backdrop-blur-sm',
      tileClassName,
      className
    )}
    {...rest}
  >
    <span
      className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10"
      aria-hidden="true"
    />
    <img
      src={ICON3D[name]}
      alt={alt}
      loading="lazy"
      className={cn('relative h-[74%] w-[74%] object-contain drop-shadow-[0_6px_14px_rgba(2,6,23,0.28)]', imgClassName)}
    />
  </span>
);

/* ------------------------------------------------------------------ */
/*  White category glyphs (48x48). Drawn in white with a soft depth    */
/*  pass, meant to sit on the gradient category cards.                 */
/* ------------------------------------------------------------------ */

const glyphClass = 'h-full w-full drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]';

export const GlyphPrescription = () => (
  <svg viewBox="0 0 48 48" className={glyphClass} fill="none" aria-hidden="true">
    <path d="M10 40 L17 26 L31 26 L38 40 Z" fill="#fff" opacity="0.35" />
    <rect x="14" y="9" width="20" height="17" rx="5" fill="#fff" />
    <path d="M24 13 v9 M19.5 17.5 h9" stroke="#0f766e" strokeWidth="3" strokeLinecap="round" />
    <rect x="24" y="26" width="9" height="14" rx="3.5" fill="#fff" />
    <circle cx="12" cy="8" r="2.2" fill="#fff" opacity="0.85" />
    <circle cx="37" cy="11" r="1.6" fill="#fff" opacity="0.6" />
  </svg>
);

export const GlyphOtc = () => (
  <svg viewBox="0 0 48 48" className={glyphClass} fill="none" aria-hidden="true">
    <path
      d="M24 5 L38 9.5 V22 C38 32 32 40.5 24 43.5 C16 40.5 10 32 10 22 V9.5 Z"
      fill="#fff"
      opacity="0.35"
    />
    <path
      d="M24 6.5 L37 10.7 V22 C37 31.3 31.3 39 24 41.8 C16.7 39 11 31.3 11 22 V10.7 Z"
      stroke="#fff"
      strokeWidth="3.4"
      strokeLinejoin="round"
    />
    <path d="M16.5 23.5 L21.5 28.5 L32 17.5" stroke="#fff" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const GlyphVitamins = () => (
  <svg viewBox="0 0 48 48" className={glyphClass} fill="none" aria-hidden="true">
    <g transform="rotate(45 24 24)">
      <rect x="13" y="19" width="22" height="10" rx="5" fill="#fff" opacity="0.35" />
      <rect x="14" y="19" width="11" height="10" rx="5" fill="#fff" />
      <rect x="25" y="19" width="9" height="10" rx="4.5" fill="#a7f3d0" />
    </g>
    <path d="M10 13 L12 19 L18 21 L12 23 L10 29 L8 23 L2 21 L8 19 Z" fill="#fff" opacity="0.9" />
    <path d="M38 6 L39.4 9.6 L43 11 L39.4 12.4 L38 16 L36.6 12.4 L33 11 L36.6 9.6 Z" fill="#fff" opacity="0.7" />
  </svg>
);

export const GlyphBaby = () => (
  <svg viewBox="0 0 48 48" className={glyphClass} fill="none" aria-hidden="true">
    <circle cx="24" cy="24" r="16.5" fill="#fff" opacity="0.35" />
    <circle cx="24" cy="24" r="15" stroke="#fff" strokeWidth="3" />
    <circle cx="24" cy="19.5" r="6.2" stroke="#fff" strokeWidth="3" />
    <circle cx="21.5" cy="19" r="1.4" fill="#fff" />
    <circle cx="26.5" cy="19" r="1.4" fill="#fff" />
    <path d="M24 25.5 v2.5" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
    <path
      d="M19.5 30 c1.4 1.6 3.1 2.4 4.5 2.4 c1.4 0 3.1 -0.8 4.5 -2.4"
      stroke="#fff"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

export const GlyphBeauty = () => (
  <svg viewBox="0 0 48 48" className={glyphClass} fill="none" aria-hidden="true">
    <path
      d="M16 40 L19 33 L26 30 L19 27 L16 20 L13 27 L6 30 L13 33 Z"
      fill="#fff"
      opacity="0.35"
    />
    <path
      d="M18 40 L20.8 33.4 L27.4 30.6 L20.8 27.8 L18 21.2 L15.2 27.8 L8.6 30.6 L15.2 33.4 Z"
      fill="#fff"
    />
    <path d="M34 8 L35.6 12 L39.6 13.6 L35.6 15.2 L34 19.2 L32.4 15.2 L28.4 13.6 L32.4 12 Z" fill="#fff" opacity="0.9" />
    <path d="M41 26 L42.2 29 L45.2 30.2 L42.2 31.4 L41 34.4 L39.8 31.4 L36.8 30.2 L39.8 29 Z" fill="#fff" opacity="0.7" />
  </svg>
);

export const GlyphMedical = () => (
  <svg viewBox="0 0 48 48" className={glyphClass} fill="none" aria-hidden="true">
    <path
      d="M24 6 C34 6 42 14 42 24 C42 34 34 42 24 42 C14 42 6 34 6 24 C6 14 14 6 24 6 Z"
      stroke="#fff"
      strokeWidth="3"
      opacity="0.4"
    />
    <path
      d="M15 20 L24 13 L33 20"
      stroke="#fff"
      strokeWidth="3.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M24 13 V28" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" />
    <path
      d="M17 28 H31 V30.5 C31 34.5 28 37.5 24 37.5 C20 37.5 17 34.5 17 30.5 Z"
      fill="#fff"
    />
    <path d="M21 28.5 H27 V30.5 C27 32.5 25.6 34 24 34 C22.4 34 21 32.5 21 30.5 Z" fill="#a7f3d0" />
  </svg>
);

export const GlyphFirstAid = () => (
  <svg viewBox="0 0 48 48" className={glyphClass} fill="none" aria-hidden="true">
    <rect x="7" y="7" width="34" height="34" rx="9" fill="#fff" opacity="0.35" />
    <rect x="9" y="9" width="30" height="30" rx="7.5" stroke="#fff" strokeWidth="3.2" />
    <path
      d="M24 17.5 V30.5 M17.5 24 H30.5"
      stroke="#fff"
      strokeWidth="3.6"
      strokeLinecap="round"
    />
  </svg>
);

export const GlyphEye = () => (
  <svg viewBox="0 0 48 48" className={glyphClass} fill="none" aria-hidden="true">
    <path
      d="M4 24 C11 13.5 37 13.5 44 24 C37 34.5 11 34.5 4 24 Z"
      stroke="#fff"
      strokeWidth="3.4"
      strokeLinejoin="round"
    />
    <circle cx="24" cy="24" r="7.5" stroke="#fff" strokeWidth="3" />
    <circle cx="24" cy="24" r="3.2" fill="#fff" />
    <path d="M24 14.5 V13" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" />
  </svg>
);

const CATEGORY_GLYPHS = {
  prescription: GlyphPrescription,
  otc: GlyphOtc,
  vitamins: GlyphVitamins,
  baby: GlyphBaby,
  beauty: GlyphBeauty,
  medical: GlyphMedical,
  firstaid: GlyphFirstAid,
  eye: GlyphEye,
};

export const CategoryGlyph = ({ name }) => {
  const Glyph = CATEGORY_GLYPHS[name] || GlyphVitamins;
  return <Glyph />;
};
