import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, CheckCircle2, FileText, Upload, ShieldCheck } from 'lucide-react';
import CampaignBannerCard from '../../components/ui/CampaignBannerCard';

const PrescriptionsPage = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language?.startsWith('ar');
  const [step, setStep] = useState(1);
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    deliveryOption: 'delivery'
  });

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    setFileName(file ? file.name : '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      setStep(4);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white py-8 md:py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">

        {/* ── 1. Top Wide Rx Banner Strip ── */}
        <div className="mb-8">
          <CampaignBannerCard
            src="/images/ads/promo-prescriptions.png"
            alt="صرف الوصفات الطبية - صيدلية عون القحطاني"
            to="#"
            badgeText={isAr ? 'صيدلية عون القحطاني - خدمة صرف الروشتة' : 'Awon Al-Qahtani Rx Service'}
            maxH="220px"
          />
        </div>

        {/* ── 2. Page Header ── */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-black text-emerald-700 dark:text-emerald-400 mb-3 shadow-sm">
            <ShieldCheck className="h-4 w-4" />
            {isAr ? 'خدمة صرف الروشتة المعتمدة' : 'Official MOH Rx Dispensing'}
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-3">
            {isAr ? 'صرف الروشتة والوصفة الطبية' : 'Upload Prescription'}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base max-w-xl mx-auto font-medium">
            {isAr
              ? 'ارفع صورتك الروشتة أو ملف العلاج وسيتولى صيدلينا المعتمد التجهيز والتأكد من التوافق العلاجي والتأمين'
              : 'Upload your Rx document or photo. Our certified clinical pharmacists will review & prepare your order promptly.'}
          </p>
        </div>

          {/* ── 3. Step Upload Form Container ── */}
        <div className="max-w-3xl mx-auto rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 md:p-10 shadow-xl relative overflow-hidden mb-12">
          <div className="pointer-events-none absolute -top-24 -end-24 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />

            {step === 1 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <img src="/images/3d-icons/3dicons-folder-dynamic-color.png" alt="Upload" className="h-10 w-10 object-contain drop-shadow-md" />
                  <div>
                    <h2 className="text-lg font-black text-slate-900 dark:text-white">
                      {isAr ? 'الخطوة الأولى: رفع ملف الروشتة' : 'Step 1: Upload Rx File'}
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      {isAr ? 'اختر صورة من الجوال أو ملف PDF' : 'Select an image or PDF document'}
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950/60 p-8 text-center transition-colors hover:border-emerald-500">
                  <div className="mb-4 flex justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      <FileText className="h-8 w-8" />
                    </div>
                  </div>
                  <p className="mb-4 text-sm font-medium text-slate-700 dark:text-slate-300">
                    {isAr ? 'اسحب ملف الروشتة هنا أو اضغط للاختيار' : 'Drag & drop your prescription file here'}
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    id="prescription-upload-input"
                  />
                  <label
                    htmlFor="prescription-upload-input"
                    className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-6 py-2.5 text-sm font-black transition-all hover:scale-105 shadow-lg shadow-emerald-500/20"
                  >
                    <Upload className="h-4 w-4" />
                    {isAr ? 'استعراض الملفات' : 'Browse Files'}
                  </label>
                  {fileName && (
                    <p className="mt-3 text-sm font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 py-1 px-3 rounded-lg inline-block">
                      ✓ {fileName}
                    </p>
                  )}
                  <p className="mt-3 text-xs text-slate-500 font-medium">
                    {isAr ? 'الصيغ المسموحة: JPG, PNG, PDF' : 'Accepted formats: JPG, PNG, PDF'}
                  </p>
                </div>

                <button
                  onClick={() => setStep(2)}
                  disabled={!fileName}
                  className={`mt-6 w-full inline-flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-black transition-all shadow-lg ${
                    fileName
                      ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <span>{isAr ? 'المتابعة للخطوة التالية' : 'Continue'}</span>
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </button>
              </div>
            )}

            {step === 2 && (
              <form onSubmit={handleSubmit}>
                <div className="flex items-center gap-3 mb-6">
                  <img src="/images/3d-icons/3dicons-call-in-dynamic-color.png" alt="Contact" className="h-10 w-10 object-contain drop-shadow-md" />
                  <div>
                    <h2 className="text-lg font-black text-slate-900 dark:text-white">
                      {isAr ? 'الخطوة الثانية: بيانات التواصل والتوصيل' : 'Step 2: Contact Info'}
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      {isAr ? 'سيتواصل معك الصيدلي لتأكيد الدواء والتوصيل' : 'Pharmacist will reach out to confirm your order'}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-slate-700 dark:text-slate-300">
                      {isAr ? 'الاسم الكامل' : 'Full Name'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={isAr ? 'مثال: محمد القحطاني' : 'e.g. John Doe'}
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 p-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-slate-700 dark:text-slate-300">
                      {isAr ? 'رقم الجوال' : 'Phone Number'}
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="05X XXX XXXX"
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 p-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-5 py-2.5 text-sm font-bold hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    {isAr ? 'السابق' : 'Back'}
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-6 py-2.5 text-sm font-black transition-all shadow-lg shadow-emerald-500/20"
                  >
                    {isAr ? 'إرسال الروشتة للصيدلي' : 'Submit Prescription'}
                  </button>
                </div>
              </form>
            )}

            {step >= 3 && (
              <div className="text-center py-6">
                <div className="mb-4 flex justify-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                </div>
                <h2 className="mb-2 text-2xl font-black text-slate-900 dark:text-white">
                  {isAr ? 'تم استلام الروشتة بنجاح!' : 'Prescription Received!'}
                </h2>
                <p className="mb-6 text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-md mx-auto font-medium">
                  {isAr
                    ? 'شكراً لك. يقوم الصيدلي المناظر لموقعك بمراجعة الروشتة والتواصل معك فوراً لتأكيد التجهيز والتوصيل.'
                    : 'Thank you. Our pharmacist is reviewing your Rx and will contact you immediately.'}
                </p>
                <button
                  onClick={() => { setStep(1); setFileName(''); }}
                  className="rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-6 py-2.5 text-sm font-black shadow-lg shadow-emerald-500/20"
                >
                  {isAr ? 'رفع روشتة أخرى' : 'Upload Another'}
                </button>
              </div>
            )}
          </div>

        {/* ── 3. Trust Badges ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <div className="flex items-center gap-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 shadow-sm dark:shadow-none">
            <img src="/images/3d-icons/3dicons-shield-dynamic-color.png" alt="MOH" className="h-10 w-10 object-contain" />
            <div>
              <h4 className="text-xs font-black text-slate-900 dark:text-white">{isAr ? 'مرخص رسمياً' : 'MOH Certified'}</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">{isAr ? 'ترخيص وزارة الصحة #12345' : 'Official License'}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 shadow-sm dark:shadow-none">
            <img src="/images/3d-icons/3dicons-rocket-dynamic-color.png" alt="Express" className="h-10 w-10 object-contain" />
            <div>
              <h4 className="text-xs font-black text-slate-900 dark:text-white">{isAr ? 'توصيل مبرد' : 'Cold Logistics'}</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">{isAr ? 'حفظ الأدوية بدرجة حرارة آمنة' : 'Safe Drug Storage'}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl bg-slate-900 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 shadow-sm dark:shadow-none">
            <img src="/images/3d-icons/3dicons-call-in-dynamic-color.png" alt="Support" className="h-10 w-10 object-contain" />
            <div>
              <h4 className="text-xs font-black text-slate-900 dark:text-white">{isAr ? 'متابعة الدواء' : 'Rx Follow-up'}</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">{isAr ? 'تتبع مجاني لطلبك' : 'Free Order Tracking'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionsPage;
