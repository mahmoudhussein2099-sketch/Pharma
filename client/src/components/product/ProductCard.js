import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Check, ShoppingCart, Star, ShieldCheck, FileText } from 'lucide-react';
import { Button } from '../ui/button';
import { useCart } from '../../context/CartContext';
import { localizeSubcategory } from '../../lib/categoryLabels';
import { cn } from '../../lib/utils';

const ProductCard = ({ product }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n?.language || 'ar';
  const isAr = lang.startsWith('ar');
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const price = Number(product.price) || 0;
  const originalPrice = Number(product.originalPrice) || 0;
  const discount = Number(product.discount) || 0;
  const rating = Number(product.rating) || 4.8;
  const reviews = Number(product.reviews) || 12;
  const inStock = product.inStock !== false;
  const hasDiscount = discount > 0 && originalPrice > price;
  const requiresPrescription = product.category === 'prescription' || product.requiresPrescription;

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/70 bg-card/80 p-3.5 backdrop-blur-md shadow-card-3d transition-all duration-300 hover:-translate-y-2 hover:border-primary/40 hover:shadow-premium">
      {/* Top badges */}
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-slate-100/60 dark:bg-slate-800/40">
        <Link to={`/products/${product.id}`} className="block h-full w-full" aria-label={product.name}>
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
          />
        </Link>

        {/* Badges Floating Container */}
        <div className="absolute start-2.5 top-2.5 flex flex-col gap-1.5 z-10">
          {hasDiscount && (
            <span className="inline-flex items-center rounded-full bg-rose-600 px-2.5 py-0.5 text-[11px] font-extrabold text-white shadow-md">
              -{discount}%
            </span>
          )}
          {requiresPrescription && (
            <span className="inline-flex items-center gap-1 rounded-full bg-cyan-700 px-2.5 py-0.5 text-[11px] font-bold text-white shadow-md backdrop-blur-md">
              <FileText className="h-3 w-3" />
              {isAr ? 'روشتة طبية' : 'Rx Needed'}
            </span>
          )}
        </div>

        {/* Verified Saudi Pharmacy Badge */}
        <span className="absolute end-2.5 top-2.5 rounded-full bg-emerald-500/10 p-1 text-emerald-600 backdrop-blur-md dark:text-emerald-400">
          <ShieldCheck className="h-4 w-4" />
        </span>

        {!inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/75 backdrop-blur-sm">
            <span className="rounded-full border border-destructive/30 bg-destructive/10 px-3.5 py-1 text-xs font-bold text-destructive">
              {isAr ? 'نفذت الكمية' : 'Out of Stock'}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col pt-3.5 pb-1 px-1">
        {/* Category & Active ingredient */}
        <div className="mb-1.5 flex items-center justify-between text-[11px] font-semibold text-primary">
          <span>{product.subcategory ? localizeSubcategory(product.subcategory, lang, product.subcategory) : (isAr ? 'صيدلية عون' : 'Awon Care')}</span>
          <span className="text-muted-foreground/80">{product.activeIngredient || (isAr ? 'منتج معتمد' : 'Certified')}</span>
        </div>

        <Link
          to={`/products/${product.id}`}
          className="mb-2 line-clamp-2 text-sm font-bold text-foreground transition-colors group-hover:text-primary leading-snug"
        >
          {product.name}
        </Link>

        {/* Rating */}
        <div className="mb-3 flex items-center gap-1.5">
          <span className="flex text-amber-400" aria-label={`${rating} stars`}>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn('h-3.5 w-3.5', i < Math.floor(rating) ? 'fill-current' : 'text-slate-300 dark:text-slate-700')}
                aria-hidden="true"
              />
            ))}
          </span>
          <span className="text-xs font-semibold text-muted-foreground">({reviews})</span>
        </div>

        {/* Price & Currency (Saudi Riyal) */}
        <div className="mt-auto flex items-baseline gap-2">
          <span className="text-lg font-black tracking-tight text-foreground">
            {price.toFixed(2)} <span className="text-xs font-bold text-primary">{isAr ? 'ر.س' : 'SAR'}</span>
          </span>
          {hasDiscount && (
            <span className="text-xs font-medium text-muted-foreground line-through">
              {originalPrice.toFixed(2)} {isAr ? 'ر.س' : 'SAR'}
            </span>
          )}
        </div>

        {/* Action Button */}
        <Button
          onClick={handleAdd}
          disabled={!inStock}
          variant={inStock ? (added ? 'success' : 'gradient') : 'secondary'}
          className="mt-3.5 w-full rounded-2xl py-2.5 text-xs font-bold shadow-md transition-all duration-300 hover:shadow-lg gap-2"
        >
          {added ? <Check className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />}
          {added ? (isAr ? 'تمت الإضافة!' : 'Added!') : (isAr ? 'إضافة للسلة' : 'Add to Cart')}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;

