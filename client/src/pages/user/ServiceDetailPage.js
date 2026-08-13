import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Syringe,
  ClipboardCheck,
  Stethoscope,
  Pill,
  Clock,
  Phone,
  CheckCircle,
  ArrowLeft,
  Calendar,
  FileText,
  User,
  MessageCircle,
} from 'lucide-react';
import { GlassCard } from '../../components/ui/glass-card';
import { Button } from '../../components/ui/button';

const serviceData = {
  vaccinations: {
    icon: <Syringe className="h-10 w-10 text-primary" />,
    title: 'vaccinations',
    color: 'from-blue-500 to-indigo-600',
    image: 'https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    overview:
      'احصل على أحدث التوصيات الوقائية ولقاحات موسمية، سفر، وطفرات روتينية مُدارة من قبل أطباء معتمدين.',
    features: [
      'لقاحات موسمية (فلو) محدثة',
      'لقاحات سفر وفقاً للبلاد',
      'تمارين طفراوية كاملة',
      'لقاحات للبالغين والأطفال',
      'جرعات تعزيم COVID-19',
      'سجلات مناعية رقمية',
    ],
    cta: 'احجز موعدك الآن',
  },
  'health-checks': {
    icon: <ClipboardCheck className="h-10 w-10 text-primary" />,
    title: 'healthChecks',
    color: 'from-green-500 to-emerald-600',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    overview:
      'راقب صحتك باستخدام باقات فحص شاملة تشمل فحوصات دم، ضغط دم، سكري، كوليسترول، وأكثر — مع تقرير شخصي.',
    features: [
      'فحص كامل للجسم',
      'مراقبة ضغط الدم',
      'فحوصات سكري وكوليسترول',
      'فحوصات سمع وبصر',
      'نصائح غذائية مخصصة',
    ],
    cta: 'احجز فحصك',
  },
  consultations: {
    icon: <Stethoscope className="h-10 w-10 text-primary" />,
    title: 'consultations',
    color: 'from-purple-500 to-violet-600',
    image: 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    overview:
      'استشارة آمنة وسريعة مع صيادلة وأطباء معتمدين عبر فيديو أو دردشة — للحصول على نصيحة حول دواء أو حالة صحية.',
    features: [
      'مقابلات فيديو آمنة',
      'صيادلة معتمدون',
      'مراجعة وصفات طبية',
      'توصيات أدوية',
      'استشارات ٢٤/٧',
    ],
    cta: 'ابدأ الاستشارة',
  },
  'chronic-medication': {
    icon: <Pill className="h-10 w-10 text-primary" />,
    title: 'chronicMedication',
    color: 'from-amber-500 to-orange-600',
    image: 'https://images.unsplash.com/photo-1587854692154-cbe660dbde88?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    overview:
      'إدارة شاملة للحالات الم chronic مثل السكري، الضغط، الربو، والقلب — مع جدول مراجعة أدوية شخصي ومتابعة دورية.',
    features: [
      'جداول مراجعة مخصصة',
      'تطبيق تتبع أدوية',
      'مراجعات منتظمة',
      'فحوصات معملية',
      'تنسيق رعاية طبي',
    ],
    cta: 'ابدأ البرنامج',
  },
};

const ServiceDetailPage = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const service = serviceData[id];

  if (!service) {
    return (
      <section className="py-24 text-center">
        <h2 className="mb-4 text-3xl font-bold">الخدمة غير موجودة</h2>
        <Button asChild>
          <Link to="/services">{t('viewAllServices', 'View All Services')}</Link>
        </Button>
      </section>
    );
  }

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative min-h-[300px] overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="text-white">
            <Link
              to="/services"
              className="mb-4 inline-flex items-center gap-1 text-teal-200 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
              {t('viewAllServices', 'View All Services')}
            </Link>
            <h1 className="mt-4 text-3xl font-extrabold drop-shadow sm:text-4xl">
              {t(service.title, service.title)}
            </h1>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-3 lg:items-start">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <GlassCard className="p-8">
                <h2 className="mb-4 text-2xl font-bold">نظرة عامة</h2>
                <p className="text-muted-foreground">{service.overview}</p>
              </GlassCard>

              <GlassCard className="p-8">
                <h2 className="mb-4 text-2xl font-bold">المميزات</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {service.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>

              <GlassCard className="p-8">
                <h2 className="mb-4 text-2xl font-bold">الخطوات القادمة</h2>
                <ol className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Calendar className="mt-1 h-5 w-5 text-primary" />
                    <div>
                      <h4 className="font-semibold">حجز الموعد</h4>
                      <p className="text-sm text-muted-foreground">اختر التوقيت المناسب وحدد الخدمة</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <User className="mt-1 h-5 w-5 text-primary" />
                    <div>
                      <h4 className="font-semibold">لقاء مع المتخصص</h4>
                      <p className="text-sm text-muted-foreground">قابلنا صيدلياً أو طبيباً معتمداً</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <FileText className="mt-1 h-5 w-5 text-primary" />
                    <div>
                      <h4 className="font-semibold">متابعة ونتائج</h4>
                      <p className="text-sm text-muted-foreground">احصل على تقريرك وخطة متابعة</p>
                    </div>
                  </li>
                </ol>
              </GlassCard>
            </div>

            {/* Sidebar / CTA */}
            <div className="space-y-6">
              <GlassCard className="p-8 text-center shadow-premium">
                <div className="mb-4 flex justify-center">{service.icon}</div>
                <h3 className="mb-2 text-xl font-bold">{t(service.title, service.title)}</h3>
                <p className="mb-6 text-sm text-muted-foreground">
                  {service.overview}
                </p>
                <Button
                  className="w-full gap-2 bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90"
                  size="lg"
                >
                  <Calendar className="h-5 w-5" />
                  {t('cta', service.cta)}
                </Button>
              </GlassCard>

              <GlassCard className="p-6">
                <h4 className="mb-3 font-semibold">هل لديك سؤال؟</h4>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>+966 123 456 7890</span>
                </div>
                <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <MessageCircle className="h-4 w-4 text-primary" />
                  <span>info@awonpharmacy.com</span>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetailPage;
