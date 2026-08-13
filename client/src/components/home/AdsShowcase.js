import React from 'react';
import AdBanner from './AdBanner';
import PromoVideoBanner from './PromoVideoBanner';

/**
 * Renders a video ad (PromoVideoBanner) when ad.video is set, else a static AdBanner.
 */
const renderAd = (ad, i, className, contentPosition) =>
  ad.video ? (
    <PromoVideoBanner
      key={ad.video || ad.src || i}
      src={ad.video}
      poster={ad.src}
      title={ad.title}
      subtitle={ad.subtitle}
      to={ad.to || '/products'}
      contentPosition={contentPosition}
      className={className}
    />
  ) : (
    <AdBanner
      key={ad.src || i}
      src={ad.src}
      alt={ad.alt}
      title={ad.title}
      subtitle={ad.subtitle}
      to={ad.to || '/products'}
      contentPosition={contentPosition}
      className={className}
    />
  );

/**
 * Editorial ad layouts for the home page.
 * - "split": magazine style — one large landscape tile beside two stacked tiles.
 * - "grid":  three portrait tiles in a row.
 * - "wide":  a single full-width cinematic banner.
 */
const AdsShowcase = ({ ads, title, subtitle, variant = 'grid', className = '' }) => {
  if (!ads || ads.length === 0) return null;

  const renderGrid = () => (
    <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3">
      {ads.map((ad, i) =>
        renderAd(ad, i, 'aspect-[3/4] max-h-[30rem]')
      )}
    </div>
  );

  const renderSplit = () => {
    const [primary, ...rest] = ads;
    return (
      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-3 lg:auto-rows-[minmax(0,13rem)]">
        {primary &&
          renderAd(primary, 0, 'aspect-[4/3] lg:col-span-2 lg:row-span-2 lg:aspect-auto')}
        <div className="grid grid-cols-2 gap-4 md:gap-6 lg:col-span-1 lg:grid-cols-1">
          {rest.slice(0, 2).map((ad, i) =>
            renderAd(ad, i + 1, 'aspect-[3/4] lg:aspect-auto lg:h-full')
          )}
        </div>
      </div>
    );
  };

  const renderWide = () => {
    const ad = ads[0];
    return (
      <div className="grid grid-cols-1">
        {renderAd(ad, 0, 'aspect-[16/10] sm:aspect-[21/9]', 'center')}
      </div>
    );
  };

  return (
    <section className={`py-12 md:py-16 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          {(title || subtitle) && (
            <div className="mb-8 text-center">
              {title && <h2 className="text-gradient mb-2 text-2xl font-extrabold md:text-3xl">{title}</h2>}
              {subtitle && <p className="mx-auto max-w-xl text-sm text-muted-foreground">{subtitle}</p>}
            </div>
          )}
          {variant === 'split' && renderSplit()}
          {variant === 'wide' && renderWide()}
          {variant === 'grid' && renderGrid()}
        </div>
      </div>
    </section>
  );
};

export default AdsShowcase;
