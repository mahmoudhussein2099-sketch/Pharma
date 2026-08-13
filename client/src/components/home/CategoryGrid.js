import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight } from 'lucide-react';
import { useProducts } from '../../context/ProductDataContext';
import {
  IconPrescription, IconOTC, IconVitamins, IconBaby,
  IconBeauty, IconMedical, IconFirstAid, IconEye
} from '../icons/CategorySVGIcons';

const CATEGORIES = [
  {
    id: 'prescription',
    ar: 'أدوية بوصفة طبية',
    en: 'Prescription Medicines',
    subAr: 'أدوية Rx معتمدة',
    subEn: 'MOH Certified Rx',
    Icon: IconPrescription,
    badgeBg: 'bg-teal-500/10 text-teal-700 dark:text-teal-300 border-teal-500/30',
    badge: 'Rx',
  },
  {
    id: 'otc',
    ar: 'أدوية بدون وصفة',
    en: 'Over-the-Counter',
    subAr: 'بدون وصفة طبية',
    subEn: 'No Prescription Needed',
    Icon: IconOTC,
    badgeBg: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30',
    badge: 'OTC',
  },
  {
    id: 'vitamins',
    ar: 'فيتامينات ومكملات',
    en: 'Vitamins & Supplements',
    subAr: 'تغذية وصحة الجسم',
    subEn: 'Wellness Essentials',
    Icon: IconVitamins,
    badgeBg: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30',
    badge: 'NEW',
  },
  {
    id: 'baby',
    ar: 'العناية بالأم والطفل',
    en: 'Baby & Mother Care',
    subAr: 'رعاية متخصصة ومعتمدة',
    subEn: 'Premium Baby Care',
    Icon: IconBaby,
    badgeBg: 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/30',
    badge: '♡',
  },
  {
    id: 'beauty',
    ar: 'الجمال والعناية الشخصية',
    en: 'Beauty & Personal Care',
    subAr: 'ماركات عالمية أصيلة',
    subEn: 'Luxury Brands',
    Icon: IconBeauty,
    badgeBg: 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/30',
    badge: '✦',
  },
  {
    id: 'medical',
    ar: 'الأجهزة والمستلزمات الطبية',
    en: 'Medical Devices',
    subAr: 'أجهزة قياس معتمدة',
    subEn: 'Certified Equipment',
    Icon: IconMedical,
    badgeBg: 'bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/30',
    badge: '⊕',
  },
  {
    id: 'firstaid',
    ar: 'الإسعافات الأولية',
    en: 'First Aid',
    subAr: 'طوارئ وإسعاف فوري',
    subEn: 'Emergency Ready',
    Icon: IconFirstAid,
    badgeBg: 'bg-red-500/10 text-red-700 dark:text-red-300 border-red-500/30',
    badge: '+',
  },
  {
    id: 'eye',
    ar: 'العناية بالعيون',
    en: 'Eye Care',
    subAr: 'قطرات وعدسات لاصقة',
    subEn: 'Lenses & Drops',
    Icon: IconEye,
    badgeBg: 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-500/30',
    badge: '◎',
  },
];

const CategoryGrid = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language?.startsWith('ar');
  const { products } = useProducts();

  const getCategoryCount = (id) =>
    products ? (products.filter((p) => p.category === id).length || 12) : 12;

  return (
    <section className="relative bg-white dark:bg-slate-950 py-14 md:py-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 relative z-10">

        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1 text-xs font-black text-emerald-700 dark:text-emerald-400 mb-3">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              {isAr ? 'الأقسام الطبية المعتمدة' : 'Certified Medical Categories'}
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              {isAr ? 'تصفح حسب القسم' : 'Explore by Category'}
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-md font-medium">
              {isAr
                ? 'أكثر من ٥٠٠٠ منتج طبي وصيدلاني أصلي ومعتمد من وزارة الصحة السعودية'
                : 'Over 5,000 authentic, MOH-certified pharmaceutical products'}
            </p>
          </div>
          <Link
            to="/products"
            className="shrink-0 inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/60 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 px-5 py-2.5 text-sm font-bold transition-all duration-200 group"
          >
            {isAr ? 'جميع المنتجات' : 'All Products'}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 md:gap-4">
          {CATEGORIES.map((cat) => {
            const count = getCategoryCount(cat.id);
            const { Icon } = cat;
            return (
              <Link
                key={cat.id}
                to={`/products?category=${cat.id}`}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/90 p-5 shadow-sm dark:shadow-none transition-all duration-300 hover:border-emerald-500/50 hover:shadow-xl hover:-translate-y-1.5 flex flex-col justify-between"
              >
                {/* Top: icon + badge */}
                <div className="flex items-start justify-between mb-5">
                  <div className="transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                    <Icon className="h-12 w-12" />
                  </div>
                  <span className={`text-[10px] font-black rounded-lg px-2 py-0.5 border ${cat.badgeBg}`}>
                    {cat.badge}
                  </span>
                </div>

                {/* Text */}
                <div className="mt-auto">
                  <h3 className="text-sm md:text-[15px] font-black text-slate-900 dark:text-white leading-snug group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {isAr ? cat.ar : cat.en}
                  </h3>
                  <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    {isAr ? cat.subAr : cat.subEn}
                  </p>
                  <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-200/80 dark:border-slate-800">
                    <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                      {count} {isAr ? 'منتج' : 'items'}
                    </span>
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all duration-300">
                      <ArrowUpRight className="h-3 w-3 rtl:rotate-90" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
