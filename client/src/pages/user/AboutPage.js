import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';
import CampaignBannerCard from '../../components/ui/CampaignBannerCard';

const AboutPage = () => {
  const values = [
    {
      icon: '/images/3d-icons/3dicons-shield-dynamic-color.png',
      title: 'الأمان والموثوقية المطلقة',
      description: 'جميع منتجاتنا وأدويتنا مرخصة ومسجلة رسمياً من الهيئة العامة للغذاء والدواء بالملكة.',
    },
    {
      icon: '/images/3d-icons/3dicons-medal-dynamic-color.png',
      title: 'الجودة والتميز العالمي',
      description: 'نوفر لك أفضل الماركات الصيدلانية العالمية والمحلية المعتمدة بأسعار رسمية.',
    },
    {
      icon: '/images/3d-icons/3dicons-rocket-dynamic-color.png',
      title: 'التوصيل السريع بالمملكة',
      description: 'نمتلك أسطول نقل مبرد معتمد يضمن وصول الدواء والمستلزمات فوراً وبأمان تّام.',
    },
    {
      icon: '/images/3d-icons/3dicons-call-in-dynamic-color.png',
      title: 'الدعم والاستشارة 24/7',
      description: 'فريق صيدلاني إكلينيكي متخصص متاح على مدار الساعة للإجابة على الاستفسارات الطبية.',
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white py-8 md:py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">

        {/* 1. Compact Wide Banner Strip */}
        <div className="mb-10">
          <CampaignBannerCard
            src="/images/ads/promo-about.png"
            alt="عن صيدلية عون القحطاني"
            to="#"
            badgeText="رؤية صيدلية عون القحطاني"
            maxH="220px"
          />
        </div>

        {/* 2. Page Intro Text */}
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-black text-emerald-700 dark:text-emerald-400 mb-4 shadow-sm">
            <ShieldCheck className="h-4 w-4" />
            الرعاية الصحية الصيدلانية المعتمدة
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-6 leading-tight">
            نؤمن بأن صحتك وصحة أسرتك هي{' '}
            <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
              أغلى ما نملك
            </span>
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed mb-6 font-medium">
            تأسست صيدلية عون القحطاني لتقديم مفهوم جديد ورائد في الرعاية الصيدلانية بالمملكة العربية السعودية، حيث نجمع بين الأصالة الطبية المطلقة، والتقنية الذكية التي تسهل وصول الدواء الأصلي والمستلزمات الطبية المعتمدة إلى باب منزلك بسرعة وراحة تامة.
          </p>
          <div className="flex flex-wrap justify-center gap-6 pt-4 border-t border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>أدوية مسجلة رسمياً بالهيئة</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>شحن مبرد لكل المدن</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>فريق صيدلاني معتمد 24/7</span>
            </div>
          </div>
        </div>

        {/* 3. Core Values Grid */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-2">قيمنا الأساسية في الرعاية</h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm max-w-md mx-auto font-medium">ركائز العمل الصيدلاني الذي نلتزم به مع كل عميل بالمملكة</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((v, i) => (
              <div key={i} className="group rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm dark:shadow-none transition-all duration-300 hover:border-emerald-500/40 hover:-translate-y-1">
                <div className="h-14 w-14 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <img src={v.icon} alt={v.title} className="h-10 w-10 object-contain drop-shadow-md" />
                </div>
                <h3 className="text-base font-black text-slate-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{v.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{v.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;
