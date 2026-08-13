import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import { cn } from '../../lib/utils';

const PromoVideoBanner = ({ src, poster, title, subtitle, to = '/products', className = '', contentPosition = 'center' }) => {
  const { t } = useTranslation();

  return (
    <Link
      to={to}
      className={`group relative block overflow-hidden rounded-2xl shadow-card-3d transition-all duration-300 hover:-translate-y-1 hover:shadow-premium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${className}`}
    >
      <video
        src={src}
        poster={poster || ''}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="h-full w-full object-cover"
        aria-label={title || ''}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
      {(title || subtitle) && (
        <div
          className={cn(
            'absolute inset-x-0 p-4 text-white',
            contentPosition === 'center'
              ? 'top-1/2 flex -translate-y-1/2 flex-col items-center text-center'
              : 'bottom-0'
          )}
        >
          {title && <h3 className={cn('font-bold leading-tight drop-shadow', contentPosition === 'center' ? 'mb-1 text-xl sm:text-2xl md:text-3xl' : 'mb-1 text-base')}>{title}</h3>}
          {subtitle && <p className={cn('text-teal-100/90 drop-shadow', contentPosition === 'center' ? 'mb-3 text-sm sm:text-base' : 'mb-2 text-xs')}>{subtitle}</p>}
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-teal-200">
            {t('shopNow', 'Shop Now')}
            <ArrowLeft className="h-3.5 w-3.5 rtl:rotate-180" aria-hidden="true" />
          </span>
        </div>
      )}
    </Link>
  );
};

export default PromoVideoBanner;
