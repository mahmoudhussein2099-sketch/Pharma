import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ShoppingCart, Heart, Star, Tag, Flame, Trophy, ArrowUpRight, Sparkles } from 'lucide-react';
import { useProducts } from '../../context/ProductDataContext';

const formatPrice = (v) => Number(v || 0).toFixed(2);

const FILTERS = [
  { id: 'all',       arLabel: 'الكل',          enLabel: 'All',            icon: Sparkles },
  { id: 'discounted',arLabel: 'العروض والخصومات', enLabel: 'Deals & Offers', icon: Flame },
  { id: 'featured',  arLabel: 'الأكثر طلباً',   enLabel: 'Top Rated',     icon: Trophy },
];

const FeaturedCollections = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language?.startsWith('ar');
  const [active, setActive] = useState('all');
  const { getFeaturedProducts, getDiscountedProducts, loading } = useProducts();

  const featured   = getFeaturedProducts?.() ?? [];
  const discounted = getDiscountedProducts?.() ?? [];

  const seen = new Set();
  const merged = [];
  for (const p of [...discounted, ...featured]) {
    if (!p || seen.has(p.id)) continue;
    seen.add(p.id);
    merged.push({ ...p, tag: p.discount > 0 ? 'discounted' : 'featured' });
  }

  const displayed =
    active === 'all' ? merged
    : merged.filter((p) => p.tag === active);

  return (
    <section className="relative bg-slate-50 dark:bg-slate-950 py-14 md:py-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 relative z-10">

        {/* ─── Header ─── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1 text-xs font-black text-amber-700 dark:text-amber-400 mb-3">
              <Flame className="h-3.5 w-3.5 text-amber-500" />
              {isAr ? 'عروض حصرية محدودة' : 'Limited Exclusive Offers'}
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              {isAr ? 'العروض المميزة والمنتجات المختارة' : 'Special Offers & Featured Products'}
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-lg font-medium">
              {isAr
                ? 'منتجات مختارة بعناية بأسعار استثنائية — عروض تُجدَّد أسبوعياً'
                : 'Hand-picked products at exceptional prices — refreshed weekly'}
            </p>
          </div>
          <Link
            to="/products"
            className="shrink-0 inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 px-5 py-2.5 text-sm font-bold transition-all duration-200 group shadow-sm"
          >
            {isAr ? 'تصفح الكل' : 'View All'}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* ─── Filter tabs ─── */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-1">
          {FILTERS.map(({ id, arLabel, enLabel, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActive(id)}
              className={`
                flex-shrink-0 inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-black transition-all duration-200
                ${active === id
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'}
              `}
            >
              <Icon className="h-3.5 w-3.5" />
              {isAr ? arLabel : enLabel}
              {id !== 'all' && (
                <span className={`text-[10px] font-black rounded-full px-1.5 py-0.5 ${active === id ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
                  {id === 'discounted' ? discounted.length : featured.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ─── Product cards ─── */}
        {loading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {[1,2,3,4,5,6,7,8].map(i => (
              <div key={i} className="h-64 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
            ))}
          </div>
        ) : displayed.length === 0 ? (
          <div className="py-20 text-center">
            <Tag className="mx-auto mb-4 h-12 w-12 text-slate-400" />
            <p className="text-slate-500 font-medium">
              {isAr ? 'لا توجد منتجات في هذه الفئة حالياً' : 'No products available in this category'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 md:gap-4">
            {displayed.slice(0, 8).map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="group relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none hover:border-emerald-500/40 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
              >
                {/* Discount ribbon */}
                {product.discount > 0 && (
                  <div className="absolute top-3 start-3 z-10 flex items-center gap-1 rounded-lg bg-red-500 px-2 py-0.5 text-[11px] font-black text-white shadow-lg shadow-red-500/30">
                    <Flame className="h-3 w-3" />
                    -{product.discount}%
                  </div>
                )}

                {/* Wishlist button */}
                <button className="absolute top-3 end-3 z-10 h-8 w-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 hover:text-rose-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-200">
                  <Heart className="h-4 w-4" />
                </button>

                {/* Product Image */}
                <div className="relative h-44 bg-slate-50 dark:bg-slate-950 p-4 flex items-center justify-center overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => { e.target.style.opacity = '0.3'; }}
                  />
                </div>

                {/* Product Details */}
                <div className="p-4">
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-1.5">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} className={`h-3 w-3 ${s <= (product.rating || 4) ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-700'}`} />
                    ))}
                  </div>

                  {/* Name */}
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {product.name}
                  </h3>

                  {/* Brand */}
                  {product.brand && (
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3 truncate font-medium">{product.brand}</p>
                  )}

                  {/* Price row */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80">
                    <div>
                      <span className="text-base font-black text-emerald-600 dark:text-emerald-400">
                        {formatPrice(product.price)} <span className="text-xs font-bold">{isAr ? 'ر.س' : 'SAR'}</span>
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="block text-[11px] line-through text-slate-400">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                    <button className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all duration-200 group-hover:scale-110">
                      <ShoppingCart className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedCollections;
