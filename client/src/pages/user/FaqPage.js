import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, Search, HelpCircle, Shield, CreditCard, FileText, SearchX, MessageCircle } from 'lucide-react';
import { GlassCard } from '../../components/ui/glass-card';
import TiltCard from '../../components/ui/TiltCard';

const faqs = [
  {
    id: 1,
    category: 'orders',
    question: 'كيف أضع أمر شراء؟',
    answer: 'اختر المنتجات التي تريدها وأضفها إلى السلة ثم أنهِ الشراء باتباع الخطوات. يمكنك الدفع عبر بطاقة ائتمان، تحويل بنكي، أو عند الاستلام.',
    icon: ShoppingCartIcon,
  },
  {
    id: 2,
    category: 'orders',
    question: 'هل يمكنني تعديل طلبي بعد إرساله؟',
    answer: 'بالتأكيد! يمكنك تعديل الطلب قبل إرساله للمعالجة. بمجرد بدء التحضير، يرجى التواصل مع خدمة العملاء لطلب التغييرات.',
    icon: ShoppingCartIcon,
  },
  {
    id: 3,
    category: 'shipping',
    question: 'ما هي طرق التوصيل؟',
    answer: 'نقدم التوصيل إلى جميع أنحاء المملكة العربية السعودية مع شركات موثوقة. التوصيل المجاني متاح للطلبات فوق 200 ريال.',
    icon: TruckIcon,
  },
  {
    id: 4,
    category: 'shipping',
    question: 'كم تستغرق عملية التوصيل؟',
    answer: 'عادةً 1-3 أيام عمل في المدن الكبرى، و 3-5 أيام للمناطق الأخرى. ستحصل على رابط تتبع الطلب عبر البريد الإلكتروني.',
    icon: TruckIcon,
  },
  {
    id: 5,
    category: 'returns',
    question: 'ما سياسة الإرجاع؟',
    answer: 'لدينا سياسة إرجاع للسلع غير المفتوحة خلال 14 يومًا من تاريخ الاستلام. يرجى التواصل مع خدمة العملاء قبل إرجاع المنتج.',
    icon: RefreshCwIcon,
  },
  {
    id: 6,
    category: 'returns',
    question: 'كيف أرجع المنتج؟',
    answer: 'اتصل بنا عبر "اتصل بنا" أو الدردشة الحية، وسنرسل لك بطاقة إرجاع والتعليمات. بعد استلام المنتج وفحصه، سيتم إصدار الاسترداد.',
    icon: RefreshCwIcon,
  },
  {
    id: 7,
    category: 'account',
    question: 'هل أحتاج لحساب للشراء؟',
    answer: 'لا، يمكنك الشراء كضيف. لكن إنشاء حساب يتيح لك حفظ بياناتك، تتبع الطلبات، وإدارة العروض المفضلة.',
    icon: UserIcon,
  },
  {
    id: 8,
    category: 'account',
    question: 'كيف أتابع طلبي؟',
    answer: 'بعد إرسال الطلب، ستحصل على بريد إلكتروني ورسالة نصية تحتوي على رابط تتبع الحالة في لوحة حسابك.',
    icon: UserIcon,
  },
  {
    id: 9,
    category: 'payment',
    question: 'ما طرق الدفع المقبولة؟',
    answer: 'نقبل بطاقات ائتمان (Visa, Mastercard, Mada)، تحويل بنكي، Apple Pay، ودفع عند الاستلام.',
    icon: CreditCard,
  },
  {
    id: 10,
    category: 'prescription',
    question: 'هل يتطلب بعض المنتجات وصفة طبية؟',
    answer: 'نعم، بعض الأدوية تتطلب وصفة طبية معتمدة. يمكنك رفعها عبر صفحة "رفع الوصفة" وسيقوم صيدلانينا بمراجعتها.',
    icon: FileText,
  },
  {
    id: 11,
    category: 'prescription',
    question: 'كيف أرفع الوصفة الطبية؟',
    answer: 'اتبع هذه الخطوات: 1) انتقل إلى صفحة الوصفات، 2) ارفع صورة الوصفة، 3) أدخل تفاصيل المريض، 4) سيتم مراجعة الوصفة خلوياً خلال 30 دقيقة.',
    icon: FileText,
  },
  {
    id: 12,
    category: 'services',
    question: 'ما هي خدمات الاستشارة الصيدلانية؟',
    answer: 'نقدم استشارات صيدلانية مجانية عبر الدردشة أو المكالمة مع صيادلة معتمدين للإجابة على أسئلتك حول الأدوية.',
    icon: HelpCircle,
  },
];

const categories = [
  { id: 'all', label: 'الكل', icon: HelpCircle },
  { id: 'orders', label: 'الطلبات', icon: ShoppingCartIcon },
  { id: 'shipping', label: 'التوصيل', icon: TruckIcon },
  { id: 'returns', label: 'الإرجاع', icon: RefreshCwIcon },
  { id: 'payment', label: 'الدفع', icon: CreditCard },
  { id: 'prescription', label: 'الوصفات', icon: FileText },
  { id: 'services', label: 'الخدمات', icon: Shield },
];

function ShoppingCartIcon(props) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.89 2.67M7 13h10l-.89-2.67M7 13 5.89 10.33M7 13l-2.295 7c-.12.37-.46.63-.85.63-.48 0-.9-.33-.9-.8V5.5A1.5 1.5 0 015 4h14a1.5 1.5 0 011.5 1.5v10a1.5 1.5 0 01-1.5 1.5m-9 5a1 1 0 11-2 0 1 1 0 012 0zm9 0a1 1 0 11-2 0 1 1 0 012 0z" />
    </svg>
  );
}

function TruckIcon(props) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 12v2a2 2 0 002 2h6a2 2 0 002-2v-2M8 7l7-4 5 3v6a2 2 0 01-2 2H9a2 2 0 01-2-2V7z" />
    </svg>
  );
}

function RefreshCwIcon(props) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M4 4l5 5M4 4l5-5m11 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}

function UserIcon(props) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}

const FaqPage = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('all');
  const [openFaq, setOpenFaq] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFaqs = faqs.filter(
    (faq) =>
      (activeCategory === 'all' || faq.category === activeCategory) &&
      (faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <div className="w-full">
      <section className="relative min-h-[280px] overflow-hidden offer-stage">
        <div className="absolute inset-0 bg-dots-brand opacity-30" />
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-teal-400/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="relative container mx-auto px-4 py-16 text-center text-white md:py-20">
          <h1 className="mb-4 text-4xl font-extrabold drop-shadow-lg sm:text-5xl">
            {t('faqTitle', 'الأسئلة الشائعة')}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-white/80 drop-shadow">
            {t('faqSubtitle', 'إجابات على الأسئلة الأكثر شيوعاً حول موقع أون للصيدلية')}
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder={t('searchFaq', 'ابحث في الأسئلة...')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-full border border-input bg-card py-3 pl-10 pr-4 text-sm text-foreground outline-none transition-shadow placeholder:text-muted-foreground/50 focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
          </div>

          <div className="mb-8 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.id);
                  setSearchTerm('');
                }}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  activeCategory === category.id
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                }`}
              >
                <category.icon className="h-4 w-4" />
                {category.label}
              </button>
            ))}
          </div>

          <div className="mx-auto max-w-3xl space-y-3">
            {filteredFaqs.length === 0 ? (
              <GlassCard className="p-8 text-center">
                <div className="mb-3 flex justify-center text-primary" aria-hidden="true">
                  <SearchX className="h-12 w-12" strokeWidth={1.3} />
                </div>
                <p className="text-muted-foreground">
                  {t('noFaqsFound', 'لم يتم العثور على أسئلة مطابقة لبحثك')}
                </p>
              </GlassCard>
            ) : (
              filteredFaqs.map((faq) => (
                <TiltCard key={faq.id} className="h-full" max={3} scale={1.01}>
                  <div className="tilt-inner h-full">
                    <GlassCard className="shadow-card-3d transition-all duration-300 hover:-translate-y-0.5 hover:shadow-premium">
                      <div className="p-0">
                        <button
                          onClick={() => toggleFaq(faq.id)}
                          className="flex w-full items-center justify-between p-5 text-left"
                          aria-expanded={openFaq === faq.id}
                        >
                          <h3 className="text-lg font-semibold text-foreground">{faq.question}</h3>
                          <ChevronDown
                            className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${
                              openFaq === faq.id ? 'rotate-180' : ''
                            }`}
                          />
                        </button>

                        <div
                          className={`overflow-hidden transition-all duration-300 ${
                            openFaq === faq.id ? 'max-h-96' : 'max-h-0'
                          }`}
                        >
                          <div className="px-5 pb-5">
                            <div className="border-t border-border/20 pt-3">
                              <p className="text-sm text-muted-foreground">{faq.answer}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </GlassCard>
                  </div>
                </TiltCard>
              ))
            )}
          </div>

          <div className="mt-12">
            <GlassCard className="p-8 text-center shadow-premium">
              <div className="mb-4 flex justify-center text-primary" aria-hidden="true">
                <MessageCircle className="h-10 w-10" strokeWidth={1.3} />
              </div>
              <h3 className="mb-2 text-xl font-bold text-foreground">
                {t('stillHaveQuestions', 'ما زالت لديك أسئلة؟')}
              </h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {t('contactSupport', 'تواصل مع فريق الدعم مباشرة وسيساعدك في أقرب وقت')}
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                {t('contactUs', 'اتصل بنا')}
              </Link>
            </GlassCard>
          </div>
        </div>
      </section>
    </div>
  );
};

const Link = ({ to, children, className }) => {
  return (
    <a href={to} className={className}>
      {children}
    </a>
  );
};

export default FaqPage;
