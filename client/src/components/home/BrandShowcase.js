import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ChevronLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SectionHeader from '../ui/SectionHeader';
import { GlassCard } from '../ui/glass-card';

const formatPrice = (value) => `SAR ${Number(value || 0).toFixed(2)}`;

const BrandShowcase = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    fetch('/api/products/featured?limit=12')
      .then((r) => r.json())
      .then((data) => {
        if (!alive) return;
        setProducts(Array.isArray(data) ? data : []);
      })
      .catch(() => setProducts([]))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, []);

  return (
    <section className="relative overflow-hidden py-16 md:py-20">
      <div className="pointer-events-none absolute inset-0 bg-dots-brand opacity-40 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]" aria-hidden="true" />
      <div className="relative container mx-auto px-4">
        <SectionHeader
          eyebrow={t('popularProducts', 'Popular Products')}
          title={t('trendingNow', 'Trending Now')}
          subtitle={t('trendingNowSub', 'The most-loved picks our customers keep coming back for')}
        />

        {loading ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-56 animate-pulse rounded-2xl bg-muted" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5 lg:grid-cols-6">
            {products.map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="group block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                aria-label={product.name}
              >
                <GlassCard className="relative h-full overflow-hidden p-0 shadow-card-3d transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-premium">
                  <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    {product.discount > 0 && (
                      <span className="absolute top-2.5 start-2.5 rounded-full bg-destructive px-2 py-0.5 text-[10px] font-bold text-destructive-foreground shadow-md">
                        -{product.discount}%
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col gap-1 p-3">
                    <span className="truncate text-sm font-semibold text-card-foreground transition-colors group-hover:text-primary">
                      {product.name}
                    </span>
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-sm font-bold text-primary">{formatPrice(product.price)}</span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Star className="h-3 w-3 fill-warning text-warning" />
                        {product.rating || '—'}
                      </span>
                    </div>
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <Link
            to="/products"
            className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-2.5 text-sm font-semibold text-foreground shadow-sm transition-all duration-300 hover:border-primary hover:text-primary hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {t('viewAll', 'View All Products')}
            <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5 rtl:rotate-180 rtl:group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BrandShowcase;
