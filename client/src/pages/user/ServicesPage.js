import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Syringe, ClipboardCheck, Pill, Shield, Clock, Phone, Stethoscope, CheckCircle2 } from 'lucide-react';
import CampaignBannerCard from '../../components/ui/CampaignBannerCard';

const ServicesPage = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language?.startsWith('ar');

  const services = [
    {
      id: 'consultations',
      name: isAr ? 'الاستشارات الصيدلانية السريرية' : 'Clinical Consultations',
      description: isAr ? 'استشر صيادلة مرخصين وأطباء أخصائيين للحصول على توجيه دوائي آمن واستعراض التداخلات الدوائية 24/7' : 'Consult certified clinical pharmacists online for safe drug guidance & interactions review 24/7.',
      icon: Stethoscope,
      image: '/images/ads/4.png',
    },
    {
      id: 'chronic-medication',
      name: isAr ? 'إدارة ومتابعة الأمراض المزمنة' : 'Chronic Care Management',
      description: isAr ? 'متابعة دورية وجداول صرف مبرمجة لأدوية الضغط والسكر والقلب مع تذكيرات ذكية للتجديد' : 'Scheduled refill management for hypertension, diabetes, and cardiovascular medications.',
      icon: Pill,
      image: '/images/ads/6.png',
    },
    {
      id: 'health-checks',
      name: isAr ? 'الفحوصات والمتابعة الدورية' : 'Health Screening & Checks',
      description: isAr ? 'فحوصات ضغط الدم والسكري والكولسترول بالتعاون مع مراكز الرعاية الطبية المعتمدة' : 'Blood pressure, glucose, and cholesterol screenings with MOH certified partners.',
      icon: ClipboardCheck,
      image: '/images/ads/12.png',
    },
    {
      id: 'vaccinations',
      name: isAr ? 'التطعيمات واللقاحات الموسمية' : 'Vaccinations & Immunization',
      description: isAr ? 'تطعيمات الإنفلونزا الموسمية ولقاحات السفر والجرعات المنشطة بتوصيل مبرد معتمد' : 'Seasonal flu shots & travel immunizations delivered under temperature-controlled logistics.',
      icon: Syringe,
      image: '/images/ads/2.png',
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white py-8 md:py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">

        {/* 1. Top Wide Services Banner Strip */}
        <div className="mb-8">
          <CampaignBannerCard
            src="/images/ads/top-view-cosmetic-products-makeup.jpg"
            alt="صيدلية عون القحطاني - الخدمات والاستشارات الطبية المعتمدة"
            to="/contact"
            badgeText={isAr ? 'صيدلية عون القحطاني - الخدمات الطبية المعتمدة' : 'Awon Al-Qahtani Certified Services'}
            maxH="220px"
          />
        </div>

        {/* 2. Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1 text-xs font-black text-emerald-700 dark:text-emerald-400 mb-3">
            <Shield className="h-3.5 w-3.5" />
            {isAr ? 'خدمات صيدلانية متكاملة' : 'Integrated Pharmaceutical Services'}
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-3">
            {isAr ? 'الخدمات والرعاية الصحية' : 'Expert Healthcare Services'}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base max-w-xl mx-auto font-medium">
            {isAr
              ? 'نقدم رعاية صيدلانية متخصصة تلبي احتياجاتك واحتياجات أسرتك بأعلى معايير الجودة والسلامة'
              : 'Professional pharmaceutical & health care services designed to support your wellness journey.'}
          </p>
        </div>

        {/* 3. Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="group rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm dark:shadow-none transition-all duration-300 hover:border-emerald-500/40 hover:shadow-xl">
                <div className="relative h-56 overflow-hidden bg-slate-200 dark:bg-slate-950">
                  <img src={s.image} alt={s.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 start-4 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center shadow-lg">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-black text-white">{s.name}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium mb-4">{s.description}</p>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 text-xs font-black text-emerald-600 dark:text-emerald-400 hover:underline"
                  >
                    <span>{isAr ? 'احجز استشارة الآن ←' : 'Book Consultation →'}</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* 4. Secondary Campaign Banner */}
        <div className="mb-10">
          <CampaignBannerCard
            src="/images/ads/6.png"
            alt="متابعة الأدوية المزمنة والصحة العامة"
            to="/prescriptions"
            badgeText={isAr ? 'رعاية الأمراض المزمنة' : 'Chronic Condition Support'}
          />
        </div>

      </div>
    </div>
  );
};

export default ServicesPage;
