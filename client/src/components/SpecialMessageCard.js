import React from 'react';

/**
 * Premium promo card — replaces the old green gradient card.
 * Props: title, subtitle, cta (button text), onClick, className
 */
const SpecialMessageCard = ({ theme = 'light', children, title, subtitle, cta, onClick, className = '' }) => {
  return (
    <div
      className={`
        relative overflow-hidden rounded-3xl border border-slate-700/60
        bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900
        shadow-2xl shadow-slate-950/50 text-white
        ${className}
      `}
    >
      {/* Ambient glow blobs */}
      <div className="pointer-events-none absolute -top-24 -start-24 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -end-24 h-64 w-64 rounded-full bg-teal-500/8 blur-3xl" />

      {/* Subtle border glow */}
      <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/5" />

      {/* Content */}
      <div className="relative z-10 p-6 text-center">
        {title && (
          <h3 className="text-xl font-black text-white mb-1 tracking-tight">{title}</h3>
        )}
        {subtitle && (
          <p className="text-sm text-slate-400 mb-4">{subtitle}</p>
        )}
        {children}
        {cta && (
          <button
            onClick={onClick}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-6 py-2.5 text-sm font-black transition-all duration-200 hover:scale-105 shadow-lg shadow-emerald-500/20"
          >
            {cta}
          </button>
        )}
      </div>
    </div>
  );
};

export default SpecialMessageCard;
