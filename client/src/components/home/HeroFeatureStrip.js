import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * HeroFeatureStrip
 * Core brand features using 3D icons, supporting Light and Dark mode dynamically.
 */
const features = [
  {
    icon: '/images/3d-icons/3dicons-rocket-dynamic-color.png',
    titleAr: 'توصيل سريع لكل المناطق',
    titleEn: 'Fast KSA Express Shipping',
    descAr: 'توصيل خلال ساعات لكافة أنحاء المملكة',
    descEn: 'Same-day delivery across Saudi Arabia',
  },
  {
    icon: '/images/3d-icons/3dicons-shield-dynamic-color.png',
    titleAr: 'أدوية رسمية معتمدة 100٪',
    titleEn: '100% Certified MOH Medicines',
    descAr: 'مرخصة ومسجلة من وزارة الصحة',
    descEn: 'Licensed & fully authenticated drugs',
  },
  {
    icon: '/images/3d-icons/3dicons-call-in-dynamic-color.png',
    titleAr: 'استشارة صيدلانية مجانية',
    titleEn: 'Free Pharmacist Consultation',
    descAr: 'دعم صيدلاني متخصص على مدار 24/7',
    descEn: '24/7 Expert medical support',
  },
  {
    icon: '/images/3d-icons/3dicons-medal-dynamic-color.png',
    titleAr: 'جودة عالمية وأسعار عادلة',
    titleEn: 'World-Class Quality & Fair Prices',
    descAr: 'أفضل الماركات العالمية المضمونة',
    descEn: 'Top certified global health brands',
  },
];

const HeroFeatureStrip = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language?.startsWith('ar');

  return (
    <section className="relative bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800/80 py-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <div
              key={i}
              className="group relative flex items-center gap-4 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 p-4 shadow-sm dark:shadow-none transition-all duration-300 hover:border-emerald-500/40 hover:bg-slate-50 dark:hover:bg-slate-800/90"
            >
              {/* 3D Icon Container */}
              <div className="relative shrink-0 h-14 w-14 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 shadow-sm">
                <img
                  src={f.icon}
                  alt={isAr ? f.titleAr : f.titleEn}
                  className="h-10 w-10 object-contain drop-shadow-md"
                  loading="lazy"
                />
              </div>

              {/* Text Info */}
              <div className="min-w-0 flex-1">
                <h3 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white truncate leading-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {isAr ? f.titleAr : f.titleEn}
                </h3>
                <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate">
                  {isAr ? f.descAr : f.descEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroFeatureStrip;
