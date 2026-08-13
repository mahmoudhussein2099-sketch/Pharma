import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ShoppingCart, ShieldCheck, Clock, PhoneCall, Sparkles, Stethoscope, CheckCircle2, Volume2, VolumeX } from 'lucide-react';
import { catalogueProducts } from '../../data/catalogueProducts';

const HeroSection = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith('ar') ? 'ar' : 'en';
  const isAr = lang === 'ar';
  const videoRef = useRef(null);
  const [muted, setMuted] = React.useState(true);

  const heroProducts = catalogueProducts.slice(0, 4);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(videoRef.current.muted);
    }
  };

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      {/* ─── Full-Width Video Background ─── */}
      <div className="relative w-full h-[70vh] min-h-[500px] max-h-[800px]">
        <video
          ref={videoRef}
          src="/videos/hero-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark overlay gradient for legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-slate-950/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

        {/* Mute/Unmute button */}
        <button
          onClick={toggleMute}
          className="absolute bottom-6 end-6 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-slate-900/80 text-white border border-slate-700 backdrop-blur-md hover:bg-emerald-600 hover:border-emerald-500 transition-all duration-300"
          aria-label={muted ? 'تشغيل الصوت' : 'كتم الصوت'}
        >
          {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </button>

        {/* ─── Content over video ─── */}
        <div className="relative z-10 h-full container mx-auto px-4">
          <div className="flex h-full items-center">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1.5 text-xs font-bold text-emerald-400 border border-emerald-500/20 mb-5">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>{isAr ? 'صيدلية موثوقة ومعتمدة في المملكة العربية السعودية' : 'Licensed & Certified KSA Pharmacy'}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight text-white leading-tight mb-5 drop-shadow-lg">
                {isAr ? 'صيدليتك الذكية' : 'Smart Healthcare'}{' '}
                <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                  {isAr ? 'لخدمتك دائماً' : 'Always for You'}
                </span>
              </h1>

              <p className="text-slate-200 text-base sm:text-lg mb-8 max-w-lg font-medium drop-shadow">
                {isAr
                  ? 'أدويتك الأصلية 100% والمستلزمات الطبية المعتمدة تصلك لعتبة دارك بسرعة وأمان مع استشارة صيدلانية مجانية.'
                  : '100% genuine medications & medical supplies delivered fast to your door with free pharmacist consultation.'}
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-10">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-7 py-3.5 text-sm font-black shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:scale-105"
                >
                  <span>{isAr ? 'تصفح الأدوية والمنتجات' : 'Explore Medications'}</span>
                  <ChevronLeft className="h-4 w-4 rtl:rotate-0 ltr:rotate-180" />
                </Link>
                <Link
                  to="/prescriptions"
                  className="inline-flex items-center gap-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-3.5 text-sm font-bold backdrop-blur-md transition-all duration-300"
                >
                  <Stethoscope className="h-4 w-4 text-emerald-400" />
                  <span>{isAr ? 'صرف الروشتة الطبية' : 'Upload Prescription'}</span>
                </Link>
              </div>

              {/* Trust row */}
              <div className="flex flex-wrap items-center gap-6 text-xs text-slate-300">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>{isAr ? 'أدوية رسمية مسجلة' : 'Registered Drugs'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-emerald-400" />
                  <span>{isAr ? 'توصيل سريع' : 'Fast Delivery'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <PhoneCall className="h-4 w-4 text-emerald-400" />
                  <span>{isAr ? 'دعم طبي 24/7' : '24/7 Support'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Floating Mini Products Panel (below the video, still dark section) ─── */}
      <div className="relative bg-slate-950 py-8">
        <div className="pointer-events-none absolute -top-20 -end-20 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              {isAr ? 'الأكثر طلباً اليوم في المملكة' : 'Most Requested in KSA Today'}
            </span>
            <Link to="/products" className="text-xs font-bold text-slate-400 hover:text-emerald-400 transition-colors">
              {isAr ? 'عرض الكل ←' : 'View All →'}
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {heroProducts.map((p) => (
              <Link
                key={p.id}
                to={`/products/${p.id}`}
                className="group flex items-center gap-3 rounded-2xl bg-slate-900 border border-slate-800 p-3 transition-all duration-300 hover:border-emerald-500/40 hover:bg-slate-800/70"
              >
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-white p-1">
                  <img src={p.image} alt={p.name} className="h-full w-full object-contain" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-[11px] font-bold text-white truncate group-hover:text-emerald-400 transition-colors leading-tight">
                    {p.name}
                  </h4>
                  <span className="text-xs font-extrabold text-emerald-400 mt-1 block">
                    {p.price} {isAr ? 'ر.س' : 'SAR'}
                  </span>
                </div>
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
                  <ShoppingCart className="h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
