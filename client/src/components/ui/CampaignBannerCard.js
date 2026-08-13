import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ChevronLeft } from 'lucide-react';

/**
 * CampaignBannerCard
 * Supports both portrait (9:16) and landscape wide (21:7) banner modes.
 *
 * Props:
 *   aspectRatio  — Tailwind aspect class e.g. 'aspect-[9/16]' or 'aspect-[21/7]'
 *   maxH         — Optional fixed max-height for compact wide strips e.g. '180px'
 *   className    — Extra classes on the outer Link wrapper
 */
const CampaignBannerCard = ({
  src,
  alt = 'صيدلية عون القحطاني',
  to = '/products',
  ctaText,
  badgeText,
  aspectRatio = 'aspect-[9/16]',
  maxH,           // e.g. '220px' → gives compact landscape strip
  className = '',
}) => {
  return (
    <Link
      to={to}
      className={`group relative block overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 shadow-xl transition-all duration-500 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-1.5 ${className}`}
    >
      {/* Image container — use aspect ratio OR fixed maxH for compact wide strips */}
      <div
        className={`relative w-full overflow-hidden bg-slate-900 ${maxH ? '' : aspectRatio}`}
        style={maxH ? { height: maxH } : undefined}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Bottom gradient vignette */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/20 opacity-80 transition-opacity duration-300 group-hover:opacity-60" />

        {/* Badge */}
        {badgeText && (
          <div className="absolute top-4 start-4 z-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-950/90 border border-slate-700/80 px-3.5 py-1.5 text-xs font-black text-emerald-400 backdrop-blur-md shadow-lg">
              <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
              {badgeText}
            </span>
          </div>
        )}

        {/* CTA */}
        {ctaText && (
          <div className="absolute bottom-4 end-4 z-10">
            <span className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-4 py-2.5 text-xs sm:text-sm font-black shadow-xl shadow-emerald-500/30 backdrop-blur-md transition-all duration-300 group-hover:scale-105">
              <span>{ctaText}</span>
              <ChevronLeft className="h-4 w-4 rtl:rotate-0 ltr:rotate-180" />
            </span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default CampaignBannerCard;
