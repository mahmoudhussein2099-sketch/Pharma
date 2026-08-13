import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Flame, Gift, ShoppingCart, Star, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCart } from '../../context/CartContext';
import { useProducts } from '../../context/ProductDataContext';
import { Button } from '../../components/ui/button';
import TiltCard from '../ui/TiltCard';
import ProductCard from '../product/ProductCard';
import { localizeSubcategory } from '../../lib/categoryLabels';

const ProductShowcase = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n?.language || 'en';
  const { addToCart } = useCart();
  const { getFeaturedProducts, getDiscountedProducts } = useProducts();
  const featuredProducts = getFeaturedProducts();
  const discountedProducts = getDiscountedProducts();

  const handleAddToCart = (product) => {
    addToCart(product, 1);
  };

  return (
    <section className="relative overflow-hidden bg-muted/40 py-16 md:py-20">
      <div className="bg-diamond-brand pointer-events-none absolute inset-0 opacity-25" aria-hidden="true" />
      <div className="container relative mx-auto px-4">
        {/* Featured Products Section */}
        <div className="mb-20">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                <Star className="h-3.5 w-3.5 fill-current" />
                {t('featuredEyebrow', 'Top Picks')}
              </span>
              <h2 className="text-gradient mb-2 text-3xl font-extrabold tracking-tight md:text-4xl">{t('featuredProducts', 'Featured Products')}</h2>
              <p className="text-muted-foreground">{t('featuredProductsSub', 'Top-rated products chosen by our pharmacists')}</p>
            </div>
            <Link to="/products" className="group inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-secondary">
              {t('viewAll', 'View All')}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Special Offers Section */}
        <div className="offer-stage relative overflow-hidden rounded-[2.5rem] p-6 text-white shadow-premium md:p-12">
          {/* Ambient light + ring motifs */}
          <div className="pointer-events-none absolute -start-24 -top-24 h-80 w-80 rounded-full bg-primary/40 blur-3xl" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-28 -end-16 h-96 w-96 rounded-full bg-cyan-300/20 blur-3xl" aria-hidden="true" />
          <div className="bg-dots-brand pointer-events-none absolute inset-0 opacity-15" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2.5rem]" aria-hidden="true">
            <div className="shimmer absolute inset-0 opacity-20" />
          </div>

          {/* Floating offer ornament */}
          <div className="pointer-events-none absolute end-[6%] top-[10%] hidden animate-float-slow lg:block" aria-hidden="true">
            <div className="flex h-28 w-28 items-center justify-center rounded-[2rem] border border-white/20 bg-white/10 shadow-xl backdrop-blur-xl">
              <div className="absolute inset-2 rounded-3xl border border-white/15" />
              <Gift className="relative h-11 w-11 text-amber-200 drop-shadow-lg" strokeWidth={1.4} />
            </div>
          </div>
          <div className="pointer-events-none absolute bottom-[12%] start-[4%] hidden animate-float-slow lg:block" style={{ animationDelay: '1.6s' }} aria-hidden="true">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10 shadow-lg backdrop-blur-xl">
              <Zap className="h-7 w-7 text-amber-200" strokeWidth={1.5} />
            </div>
          </div>

          <div className="relative mb-10 flex flex-wrap items-center justify-between gap-6">
            <div>
              <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-warning px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg">
                <Flame className="h-4 w-4" />
                {t('limitedTime', 'Limited Time')}
              </span>
              <h2 className="mb-2 text-3xl font-extrabold md:text-4xl">
                {t('specialOffers', 'Special Offers')}
              </h2>
              <p className="max-w-md text-teal-50/90">
                {t('specialOffersSub', 'Exclusive discounts curated by our pharmacists — grab them before they are gone')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {discountedProducts.map((product) => (
              <TiltCard key={product.id} className="group relative rounded-2xl" max={10} scale={1.02}>
                <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-xl transition-colors duration-300 group-hover:border-white/35">
                  <div className="pointer-events-none absolute -end-8 -top-8 h-28 w-28 rounded-full bg-white/10 blur-xl" />

                  <div className="relative mb-5 flex items-center gap-4">
                    <Link to={`/products/${product.id}`} className="relative shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-20 w-20 rounded-2xl object-cover shadow-lg ring-2 ring-white/20 transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute -bottom-2 -end-2 flex h-7 min-w-7 items-center justify-center rounded-full bg-warning px-1.5 text-xs font-extrabold text-white shadow-md">
                        -{product.discount}%
                      </span>
                    </Link>
                    <div className="min-w-0 flex-1">
                      <h3 className="line-clamp-1 font-bold text-white">{product.name}</h3>
                      <p className="line-clamp-1 text-sm text-teal-50/80">{localizeSubcategory(product.subcategory, lang, product.subcategory)}</p>
                    </div>
                  </div>

                  <div className="mb-5 flex items-end justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-extrabold text-white">
                          SAR {product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-teal-50/70 line-through">
                            SAR {product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                      {product.discount > 0 && (
                        <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-amber-300">
                          <Zap className="h-3.5 w-3.5" />
                          {t('youSave', 'You save')} SAR {((product.originalPrice || product.price) - product.price).toFixed(2)}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 rounded-full bg-black/20 px-2.5 py-1 text-xs font-bold text-amber-300">
                      <Star className="h-3 w-3 fill-current" />
                      {product.rating}
                    </div>
                  </div>

                  <Button
                    onClick={() => handleAddToCart(product)}
                    className="w-full gap-2 bg-white font-bold text-primary shadow-lg hover:bg-teal-50"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    {t('addToCart', 'Add to Cart')}
                  </Button>
                </div>
              </TiltCard>
            ))}
          </div>

          <div className="relative mt-10 text-center">
            <Link
              to="/products?sort=discount"
              className="group inline-flex items-center gap-2 rounded-xl bg-white/10 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/25 backdrop-blur-xl transition-all duration-300 hover:bg-white/20 hover:ring-white/40"
            >
              {t('viewAllOffers', 'View All Offers')}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
