import React from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, Clock, Phone, Award, Star, Play, Sparkles } from 'lucide-react';

import UserSidebar from '../../components/dashboard/UserSidebar';
import HeroSection from '../../components/home/HeroSection';
import HeroFeatureStrip from '../../components/home/HeroFeatureStrip';
import CategoryGrid from '../../components/home/CategoryGrid';
import FeaturedCollections from '../../components/home/FeaturedCollections';
import ProductShowcase from '../../components/home/ProductShowcase';
import PrescriptionUploadSection from '../../components/home/PrescriptionUploadSection';
import BrandShowcase from '../../components/home/BrandShowcase';
import TrustIndicators from '../../components/home/TrustIndicators';
import Newsletter from '../../components/home/Newsletter';

import CampaignBannerCard from '../../components/ui/CampaignBannerCard';

/* ── WhyAwon Section ─────────────────────────────────── */
const WhyAwon = ({ isAr }) => {
  const stats = [
    { value: '+5K',  arLabel: 'منتج أصلي معتمد',    enLabel: 'MOH Certified Products' },
    { value: '+10K', arLabel: 'عميل سعيد في المملكة', enLabel: 'Happy KSA Customers' },
    { value: '24/7', arLabel: 'دعم واستشارة صيدلانية', enLabel: 'Pharmacist Support' },
    { value: '100%', arLabel: 'أدوية رسمية مسجلة',    enLabel: 'Authentic Medicines' },
  ];

  const reasons = [
    {
      icon: ShieldCheck,
      arTitle: 'أدوية أصلية ومضمونة 100٪',
      enTitle: '100% Certified Genuine Medicines',
      arDesc: 'جميع الأدوية والمستلزمات مسجلة ومعتمدة من الهيئة العامة للغذاء والدواء بالمملكة',
      enDesc: 'Fully registered & approved by Saudi FDA and Ministry of Health',
    },
    {
      icon: Clock,
      arTitle: 'توصيل آمن وسريع لدارك',
      enTitle: 'Fast & Secure Doorstep Delivery',
      arDesc: 'نظام نقل مبرد للوصول السريع لجميع مناطق مدن المملكة العربية السعودية',
      enDesc: 'Temperature-controlled logistics for fast delivery across KSA',
    },
    {
      icon: Phone,
      arTitle: 'استشارة صيدلانية مجانية 24/7',
      enTitle: 'Free 24/7 Pharmacist Consultation',
      arDesc: 'صيادلة مرخصون متاحون على مدار الساعة للإجابة على جميع الاستفسارات الطبية',
      enDesc: 'Licensed clinical pharmacists ready to assist with your medical questions',
    },
    {
      icon: Award,
      arTitle: 'جودة عالمية بأسعار معتمدة',
      enTitle: 'Global Standard Quality at Certified Prices',
      arDesc: 'أرقى الماركات الصيدلانية والعناية بالبشرة بأسعار تنافسية رسمية',
      enDesc: 'Top global health & beauty brands at official certified pricing',
    },
  ];

  return (
    <section className="relative bg-slate-50 dark:bg-slate-900 py-16 md:py-24 overflow-hidden border-y border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-black text-emerald-700 dark:text-emerald-400 mb-3 shadow-sm">
            <Star className="h-3.5 w-3.5 fill-emerald-400" />
            {isAr ? 'لماذا صيدلية عون القحطاني؟' : 'Why Awon Al-Qahtani Pharmacy?'}
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            {isAr ? 'شريكك الطبي الموثوق' : 'Your Trusted Health Partner'}{' '}
            <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
              {isAr ? 'في جميع أنحاء المملكة' : 'Across KSA'}
            </span>
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 max-w-xl mx-auto text-sm md:text-base font-medium">
            {isAr
              ? 'خبرة صيدلانية متكاملة لتقديم أعلى معايير الرعاية الصحية وتوفير الدواء الأصلي بسرعة وأمان'
              : 'Integrated pharmaceutical expertise delivering high-standard healthcare directly to your door'}
          </p>
        </div>

        {/* Video & Reasons Showcase */}
        <div className="grid lg:grid-cols-12 gap-8 items-center mb-16">
          {/* Left Video Showcase */}
          <div className="lg:col-span-6 relative rounded-3xl overflow-hidden aspect-video bg-slate-950 border border-slate-300 dark:border-slate-800 shadow-2xl group">
            <video
              src="/videos/hero-video.mp4"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              autoPlay muted loop playsInline
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
            <div className="absolute bottom-6 start-6 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30">
                <Play className="h-5 w-5 fill-slate-950" />
              </div>
              <div>
                <p className="text-sm font-black text-white">{isAr ? 'تعرّف على صيدلية عون' : 'Discover Awon Pharmacy'}</p>
                <p className="text-xs text-slate-300 font-medium">{isAr ? 'فيديو تعريفي بخدماتنا الصيدلانية' : 'Official Healthcare Introduction'}</p>
              </div>
            </div>
          </div>

          {/* Right Reasons List */}
          <div className="lg:col-span-6 space-y-4">
            {reasons.map((r, i) => {
              const Icon = r.icon;
              return (
                <div key={i} className="group flex items-start gap-4 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 p-4 shadow-sm dark:shadow-none transition-all duration-300 hover:border-emerald-500/40">
                  <div className="h-11 w-11 shrink-0 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-slate-950 text-emerald-600 dark:text-emerald-400 transition-colors duration-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {isAr ? r.arTitle : r.enTitle}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed font-medium">
                      {isAr ? r.arDesc : r.enDesc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <div key={i} className="text-center rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 p-6 shadow-sm dark:shadow-none transition-all duration-300 hover:border-emerald-500/40">
              <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent mb-1">
                {s.value}
              </div>
              <div className="text-xs font-bold text-slate-600 dark:text-slate-400">
                {isAr ? s.arLabel : s.enLabel}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ── Main HomePage Component ─────────────────────────── */
const HomePage = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language?.startsWith('ar');

  return (
    <div className="flex min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      {/* Collapsible Left Sidebar */}
      <UserSidebar />

      {/* Main Page Area */}
      <div className="min-w-0 flex-1">
        {/* 1. Hero Full Video Section */}
        <HeroSection />

        {/* 2. Trust Feature Strip (3D icons mapped 1-to-1) */}
        <HeroFeatureStrip />

        {/* 3. Portrait Story Campaign Showcase 1 (3 Columns Edge-to-Edge Fill - No Empty Spaces) */}
        <section className="bg-slate-50 dark:bg-slate-950 py-10 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1 text-xs font-black text-emerald-700 dark:text-emerald-400">
                  <Sparkles className="h-3.5 w-3.5" />
                  {isAr ? 'حملات عون الحصرية' : 'Awon Exclusive Campaigns'}
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mt-2">
                  {isAr ? 'عروض وحملات الصحة والجمال' : 'Featured Health & Wellness Banners'}
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <CampaignBannerCard
                src="/images/ads/7.png"
                alt="عروض عون الحصرية"
                to="/products"
                ctaText={isAr ? 'تصفح العروض' : 'Explore Offers'}
                badgeText={isAr ? 'عروض حصرية' : 'Exclusive Deal'}
                aspectRatio="aspect-[9/16]"
              />
              <CampaignBannerCard
                src="/images/ads/1.png"
                alt="العناية بالبشرة والجمال"
                to="/products?category=beauty"
                ctaText={isAr ? 'منتجات العناية' : 'Skincare Care'}
                badgeText={isAr ? 'العناية بالبشرة' : 'Skincare'}
                aspectRatio="aspect-[9/16]"
              />
              <CampaignBannerCard
                src="/images/ads/9.png"
                alt="الفيتامينات والمكملات الغذائية"
                to="/products?category=vitamins"
                ctaText={isAr ? 'تصفح الفيتامينات' : 'Vitamins Range'}
                badgeText={isAr ? 'فيتامينات معتمدة' : 'Vitamins'}
                aspectRatio="aspect-[9/16]"
              />
            </div>
          </div>
        </section>

        {/* 4. Category Grid (Hand-crafted unique SVG icons) */}
        <CategoryGrid />

        {/* 5. Portrait Story Campaign Showcase 2 (3 Columns Edge-to-Edge Fill) */}
        <section className="bg-slate-50 dark:bg-slate-950 py-10 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <CampaignBannerCard
                src="/images/ads/المنتجات.png"
                alt="الأدوية والمستلزمات الطبية"
                to="/products"
                ctaText={isAr ? 'تصفح الكتالوج' : 'View Catalog'}
                badgeText={isAr ? 'كتالوج الأدوية' : 'Full Catalog'}
                aspectRatio="aspect-[9/16]"
              />
              <CampaignBannerCard
                src="/images/ads/الوصفة الطبية.png"
                alt="صرف الوصفة الطبية"
                to="/prescriptions"
                ctaText={isAr ? 'صرف الروشتة' : 'Upload Rx'}
                badgeText={isAr ? 'خدمة صرف الوصفة' : 'Rx Service'}
                aspectRatio="aspect-[9/16]"
              />
              <CampaignBannerCard
                src="/images/ads/من نحن.png"
                alt="صيدلية عون القحطاني"
                to="/about"
                ctaText={isAr ? 'تعرّف علينا' : 'About Awon'}
                badgeText={isAr ? 'رؤيتنا الطبية' : 'Our Vision'}
                aspectRatio="aspect-[9/16]"
              />
            </div>
          </div>
        </section>

        {/* 6. Special Offers & Featured Collections */}
        <FeaturedCollections />

        {/* 7. Product Showcase Grid */}
        <ProductShowcase />

        {/* 8. Why Awon Healthcare Section */}
        <WhyAwon isAr={isAr} />

        {/* 9. Prescription Upload Dedicated Section */}
        <PrescriptionUploadSection />

        {/* 10. Secondary Portrait Story Campaign Showcase 3 (3 Columns Edge-to-Edge Fill) */}
        <section className="bg-slate-50 dark:bg-slate-950 py-10 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <CampaignBannerCard
                src="/images/ads/5.png"
                alt="صحة ومستلزمات الأسرة"
                to="/products?category=medical"
                ctaText={isAr ? 'تصفح مستلزمات الأسرة' : 'Browse Family Care'}
                badgeText={isAr ? 'صحة الأسرة' : 'Family Care'}
                aspectRatio="aspect-[9/16]"
              />
              <CampaignBannerCard
                src="/images/ads/2.png"
                alt="العناية بالأم والطفل"
                to="/products?category=baby"
                ctaText={isAr ? 'العناية بالطفل' : 'Baby Care'}
                badgeText={isAr ? 'الأم والطفل' : 'Mother & Baby'}
                aspectRatio="aspect-[9/16]"
              />
              <CampaignBannerCard
                src="/images/ads/10.png"
                alt="الأدوية والمستحضرات الطبية المعتمدة"
                to="/products?category=prescription"
                ctaText={isAr ? 'أدوية معتمدة' : 'MOH Medicines'}
                badgeText={isAr ? 'أدوية معتمدة' : 'Certified Drugs'}
                aspectRatio="aspect-[9/16]"
              />
            </div>
          </div>
        </section>

        {/* 11. Certified Brand Showcase */}
        <BrandShowcase />

        {/* 12. Trust Indicators */}
        <TrustIndicators />

        {/* 13. Newsletter */}
        <Newsletter />
      </div>
    </div>
  );
};

export default HomePage;
