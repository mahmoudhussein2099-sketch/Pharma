import React from 'react';

/* ─────────────────────────────────────────────────────────────────────────
   Awon Pharmacy — Unique Hand-crafted SVG Category Icons
   Each icon is purpose-drawn for its category — NO duplicates.
   All icons render at any size via width/height props.
───────────────────────────────────────────────────────────────────────── */

const base = 'drop-shadow-[0_3px_10px_rgba(0,0,0,0.3)]';

/* 1 ── Prescription Rx ─────────────────────────── pill bottle with Rx */
export const IconPrescription = ({ className = 'h-10 w-10', ...p }) => (
  <svg viewBox="0 0 56 56" fill="none" className={`${base} ${className}`} {...p}>
    {/* bottle body */}
    <rect x="16" y="20" width="24" height="28" rx="5" fill="url(#rx_body)" />
    {/* bottle cap */}
    <rect x="18" y="12" width="20" height="10" rx="3" fill="url(#rx_cap)" />
    {/* label */}
    <rect x="19" y="28" width="18" height="13" rx="2.5" fill="white" opacity="0.18" />
    {/* Rx text */}
    <text x="23" y="38" fontFamily="serif" fontWeight="900" fontSize="10" fill="white">Rx</text>
    {/* shine */}
    <rect x="19" y="22" width="4" height="10" rx="2" fill="white" opacity="0.25" />
    <defs>
      <linearGradient id="rx_body" x1="16" y1="20" x2="40" y2="48" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0d9488" /><stop offset="1" stopColor="#065f46" />
      </linearGradient>
      <linearGradient id="rx_cap" x1="18" y1="12" x2="38" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#14b8a6" /><stop offset="1" stopColor="#0f766e" />
      </linearGradient>
    </defs>
  </svg>
);

/* 2 ── OTC — pill capsule ──────────────────────── two-tone capsule */
export const IconOTC = ({ className = 'h-10 w-10', ...p }) => (
  <svg viewBox="0 0 56 56" fill="none" className={`${base} ${className}`} {...p}>
    <g transform="rotate(-35 28 28)">
      {/* left half */}
      <rect x="10" y="21" width="18" height="14" rx="7" fill="url(#otc_l)" />
      {/* right half */}
      <rect x="28" y="21" width="18" height="14" rx="7" fill="url(#otc_r)" />
      {/* divider */}
      <line x1="28" y1="22" x2="28" y2="34" stroke="white" strokeWidth="1.5" opacity="0.5" />
      {/* shine */}
      <ellipse cx="18" cy="25" rx="5" ry="2.5" fill="white" opacity="0.25" />
    </g>
    <defs>
      <linearGradient id="otc_l" x1="10" y1="21" x2="28" y2="35" gradientUnits="userSpaceOnUse">
        <stop stopColor="#10b981" /><stop offset="1" stopColor="#047857" />
      </linearGradient>
      <linearGradient id="otc_r" x1="28" y1="21" x2="46" y2="35" gradientUnits="userSpaceOnUse">
        <stop stopColor="#f9fafb" /><stop offset="1" stopColor="#d1fae5" />
      </linearGradient>
    </defs>
  </svg>
);

/* 3 ── Vitamins — star + droplet ─────────────────── sparkle vitamin */
export const IconVitamins = ({ className = 'h-10 w-10', ...p }) => (
  <svg viewBox="0 0 56 56" fill="none" className={`${base} ${className}`} {...p}>
    {/* main star */}
    <path d="M28 8 L31 21 L44 21 L34 29 L37 42 L28 34 L19 42 L22 29 L12 21 L25 21 Z"
      fill="url(#vit_star)" />
    {/* inner glow */}
    <path d="M28 16 L30 23 L37 23 L31.5 27 L33.5 34 L28 30 L22.5 34 L24.5 27 L19 23 L26 23 Z"
      fill="white" opacity="0.2" />
    {/* sparkle top-right */}
    <circle cx="42" cy="12" r="3" fill="#fbbf24" opacity="0.9" />
    <circle cx="42" cy="12" r="1.5" fill="white" opacity="0.5" />
    {/* sparkle bottom-left */}
    <circle cx="14" cy="43" r="2" fill="#f59e0b" opacity="0.7" />
    <defs>
      <linearGradient id="vit_star" x1="12" y1="8" x2="44" y2="42" gradientUnits="userSpaceOnUse">
        <stop stopColor="#fbbf24" /><stop offset="1" stopColor="#d97706" />
      </linearGradient>
    </defs>
  </svg>
);

/* 4 ── Baby ─────────────────────────────── baby face + heart */
export const IconBaby = ({ className = 'h-10 w-10', ...p }) => (
  <svg viewBox="0 0 56 56" fill="none" className={`${base} ${className}`} {...p}>
    {/* head */}
    <circle cx="28" cy="26" r="17" fill="url(#baby_face)" />
    {/* ears */}
    <circle cx="11" cy="26" r="5" fill="#fde8d8" />
    <circle cx="45" cy="26" r="5" fill="#fde8d8" />
    {/* eyes */}
    <circle cx="22" cy="24" r="2.5" fill="#3b1f0a" />
    <circle cx="34" cy="24" r="2.5" fill="#3b1f0a" />
    <circle cx="23" cy="23" r="0.8" fill="white" />
    <circle cx="35" cy="23" r="0.8" fill="white" />
    {/* smile */}
    <path d="M22 31 Q28 36 34 31" stroke="#c97b4b" strokeWidth="2" strokeLinecap="round" fill="none" />
    {/* heart on forehead */}
    <path d="M28 12 C28 12 25 9 23 11 C21 13 23 16 28 19 C33 16 35 13 33 11 C31 9 28 12 28 12 Z"
      fill="#f87171" opacity="0.8" />
    {/* cheeks */}
    <circle cx="20" cy="29" r="4" fill="#f9a8d4" opacity="0.4" />
    <circle cx="36" cy="29" r="4" fill="#f9a8d4" opacity="0.4" />
    <defs>
      <linearGradient id="baby_face" x1="11" y1="9" x2="45" y2="43" gradientUnits="userSpaceOnUse">
        <stop stopColor="#fde8d8" /><stop offset="1" stopColor="#fbcfab" />
      </linearGradient>
    </defs>
  </svg>
);

/* 5 ── Beauty ─────────────────────────── lipstick + sparkle */
export const IconBeauty = ({ className = 'h-10 w-10', ...p }) => (
  <svg viewBox="0 0 56 56" fill="none" className={`${base} ${className}`} {...p}>
    {/* lipstick body */}
    <rect x="22" y="24" width="12" height="22" rx="4" fill="url(#beauty_body)" />
    {/* lipstick tip */}
    <path d="M22 24 L22 18 Q28 13 34 18 L34 24 Z" fill="url(#beauty_tip)" />
    {/* bullet */}
    <path d="M24 18 Q28 14 32 18 L32 24 L24 24 Z" fill="#e11d48" />
    {/* cap */}
    <rect x="21" y="36" width="14" height="12" rx="3" fill="url(#beauty_cap)" />
    {/* shine */}
    <rect x="24" y="25" width="2.5" height="9" rx="1.25" fill="white" opacity="0.3" />
    {/* sparkles */}
    <path d="M40 10 L41 14 L45 15 L41 16 L40 20 L39 16 L35 15 L39 14 Z" fill="#f9a8d4" opacity="0.9" />
    <circle cx="13" cy="20" r="2" fill="#fda4af" opacity="0.7" />
    <defs>
      <linearGradient id="beauty_body" x1="22" y1="24" x2="34" y2="46" gradientUnits="userSpaceOnUse">
        <stop stopColor="#e879f9" /><stop offset="1" stopColor="#7e22ce" />
      </linearGradient>
      <linearGradient id="beauty_tip" x1="22" y1="13" x2="34" y2="24" gradientUnits="userSpaceOnUse">
        <stop stopColor="#f0abfc" /><stop offset="1" stopColor="#d946ef" />
      </linearGradient>
      <linearGradient id="beauty_cap" x1="21" y1="36" x2="35" y2="48" gradientUnits="userSpaceOnUse">
        <stop stopColor="#6b21a8" /><stop offset="1" stopColor="#4c1d95" />
      </linearGradient>
    </defs>
  </svg>
);

/* 6 ── Medical Devices — stethoscope ─────────── */
export const IconMedical = ({ className = 'h-10 w-10', ...p }) => (
  <svg viewBox="0 0 56 56" fill="none" className={`${base} ${className}`} {...p}>
    {/* scope circle */}
    <circle cx="38" cy="38" r="9" fill="url(#med_circ)" />
    <circle cx="38" cy="38" r="5.5" stroke="white" strokeWidth="2" fill="none" />
    <circle cx="38" cy="38" r="2" fill="white" opacity="0.8" />
    {/* tube */}
    <path d="M18 10 Q12 10 12 18 L12 32 Q12 40 20 40 L29 40"
      stroke="url(#med_tube)" strokeWidth="4.5" strokeLinecap="round" fill="none" />
    {/* ear tips */}
    <circle cx="18" cy="10" r="4" fill="url(#med_ear)" />
    <circle cx="10" cy="10" r="4" fill="url(#med_ear)" />
    <path d="M10 10 Q10 6 14 6 Q18 6 18 10" stroke="white" strokeWidth="1.5" fill="none" opacity="0.5" />
    {/* chest piece */}
    <circle cx="20" cy="36" r="6" fill="url(#med_chest)" />
    <circle cx="20" cy="36" r="3" fill="white" opacity="0.25" />
    <defs>
      <linearGradient id="med_circ" x1="29" y1="29" x2="47" y2="47" gradientUnits="userSpaceOnUse">
        <stop stopColor="#38bdf8" /><stop offset="1" stopColor="#0369a1" />
      </linearGradient>
      <linearGradient id="med_tube" x1="10" y1="10" x2="29" y2="40" gradientUnits="userSpaceOnUse">
        <stop stopColor="#7dd3fc" /><stop offset="1" stopColor="#0284c7" />
      </linearGradient>
      <linearGradient id="med_ear" x1="10" y1="6" x2="18" y2="14" gradientUnits="userSpaceOnUse">
        <stop stopColor="#e0f2fe" /><stop offset="1" stopColor="#93c5fd" />
      </linearGradient>
      <linearGradient id="med_chest" x1="14" y1="30" x2="26" y2="42" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0ea5e9" /><stop offset="1" stopColor="#075985" />
      </linearGradient>
    </defs>
  </svg>
);

/* 7 ── First Aid ─────────────────────── red cross kit */
export const IconFirstAid = ({ className = 'h-10 w-10', ...p }) => (
  <svg viewBox="0 0 56 56" fill="none" className={`${base} ${className}`} {...p}>
    {/* bag body */}
    <rect x="8" y="18" width="40" height="30" rx="6" fill="url(#fa_body)" />
    {/* handle */}
    <path d="M20 18 Q20 11 28 11 Q36 11 36 18" stroke="url(#fa_handle)" strokeWidth="4" fill="none" strokeLinecap="round" />
    {/* white cross */}
    <rect x="24" y="24" width="8" height="18" rx="2.5" fill="white" />
    <rect x="19" y="29" width="18" height="8" rx="2.5" fill="white" />
    {/* red cross inset */}
    <rect x="25.5" y="25.5" width="5" height="15" rx="1.5" fill="#ef4444" />
    <rect x="20.5" y="30.5" width="15" height="5" rx="1.5" fill="#ef4444" />
    {/* shine */}
    <rect x="10" y="20" width="7" height="18" rx="3" fill="white" opacity="0.1" />
    <defs>
      <linearGradient id="fa_body" x1="8" y1="18" x2="48" y2="48" gradientUnits="userSpaceOnUse">
        <stop stopColor="#fee2e2" /><stop offset="1" stopColor="#fca5a5" />
      </linearGradient>
      <linearGradient id="fa_handle" x1="20" y1="11" x2="36" y2="18" gradientUnits="userSpaceOnUse">
        <stop stopColor="#f87171" /><stop offset="1" stopColor="#dc2626" />
      </linearGradient>
    </defs>
  </svg>
);

/* 8 ── Eye Care ──────────────────────── eye with lens */
export const IconEye = ({ className = 'h-10 w-10', ...p }) => (
  <svg viewBox="0 0 56 56" fill="none" className={`${base} ${className}`} {...p}>
    {/* eye shape */}
    <path d="M5 28 Q15 12 28 12 Q41 12 51 28 Q41 44 28 44 Q15 44 5 28 Z"
      fill="url(#eye_bg)" />
    {/* iris */}
    <circle cx="28" cy="28" r="11" fill="url(#eye_iris)" />
    {/* pupil */}
    <circle cx="28" cy="28" r="6" fill="#1e1b4b" />
    {/* catchlight */}
    <circle cx="24" cy="24" r="2.5" fill="white" opacity="0.8" />
    <circle cx="32" cy="31" r="1.2" fill="white" opacity="0.5" />
    {/* eyelashes top */}
    <path d="M16 20 Q14 15 15 12" stroke="#1e293b" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M22 15 Q22 10 24 8" stroke="#1e293b" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M28 14 Q28 8 28 6" stroke="#1e293b" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M34 15 Q34 10 32 8" stroke="#1e293b" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M40 20 Q42 15 41 12" stroke="#1e293b" strokeWidth="1.8" strokeLinecap="round" />
    <defs>
      <linearGradient id="eye_bg" x1="5" y1="12" x2="51" y2="44" gradientUnits="userSpaceOnUse">
        <stop stopColor="#e0e7ff" /><stop offset="1" stopColor="#c7d2fe" />
      </linearGradient>
      <linearGradient id="eye_iris" x1="17" y1="17" x2="39" y2="39" gradientUnits="userSpaceOnUse">
        <stop stopColor="#818cf8" /><stop offset="1" stopColor="#4338ca" />
      </linearGradient>
    </defs>
  </svg>
);

/* ─── Export map ──────────────────────────────────────────── */
export const CATEGORY_SVG_ICONS = {
  prescription: IconPrescription,
  otc: IconOTC,
  vitamins: IconVitamins,
  baby: IconBaby,
  beauty: IconBeauty,
  medical: IconMedical,
  firstaid: IconFirstAid,
  eye: IconEye,
};
