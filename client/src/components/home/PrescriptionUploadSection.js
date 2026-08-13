import React, { useState } from 'react';
import { Upload, ChevronLeft, ChevronRight, CheckCircle2, Check, ShieldCheck, Clock, FileUp, Camera } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { cn } from '../../lib/utils';

const PrescriptionUploadSection = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith('ar') ? 'ar' : 'en';
  const isAr = lang === 'ar';
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
      setCurrentStep(2);
    }
  };

  const steps = [
    { number: 1, title: isAr ? 'رفع الروشتة' : 'Upload Rx', description: isAr ? 'صورة أو ملف PDF' : 'Image or PDF' },
    { number: 2, title: isAr ? 'بيانات التواصل' : 'Contact Info', description: isAr ? 'رقم الجوال والعنوان' : 'Phone & Address' },
    { number: 3, title: isAr ? 'تأكيد الصرف' : 'Confirmation', description: isAr ? 'مراجعة الصيدلي' : 'Pharmacist Review' },
  ];

  return (
    <section className="relative overflow-hidden bg-slate-900 text-white py-16 md:py-24">
      {/* Background Lights */}
      <div className="pointer-events-none absolute -top-32 -start-32 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -end-32 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />

      <div className="relative container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-10 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-4 py-1.5 text-xs font-bold text-emerald-400 border border-emerald-500/20 mb-3">
              <ShieldCheck className="h-4 w-4" />
              {isAr ? 'خدمة صرف الوصفات الطبية المعتمدة' : 'Licensed Prescription Service'}
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              {isAr ? 'ارفع روشتتك وسنجهز أوديتك فوراً' : 'Upload Prescription & Order Instantly'}
            </h2>
            <p className="mt-2 text-slate-300 text-sm md:text-base font-medium max-w-xl mx-auto">
              {isAr ? 'صيدلي معتمد سيراجع الوصفة ويدقق الأدوية والجرعات ثم يتواصل معك لتوصيلها لعتبة دارك' : 'A licensed pharmacist will review your Rx and confirm delivery to your doorstep'}
            </p>
          </div>

          {/* Stepper */}
          <div className="mb-10 flex justify-center">
            <div className="flex items-center gap-2 sm:gap-4">
              {steps.map((step, index) => (
                <React.Fragment key={step.number}>
                  <div className="flex items-center gap-2.5">
                    <div
                      className={cn(
                        'flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl text-sm font-black transition-all duration-300',
                        currentStep >= step.number
                          ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30'
                          : 'bg-slate-800 text-slate-400 border border-slate-700'
                      )}
                    >
                      {currentStep > step.number ? <Check className="h-5 w-5 stroke-[3]" /> : step.number}
                    </div>
                    <div className="hidden sm:block">
                      <div className={cn('text-xs font-extrabold', currentStep >= step.number ? 'text-white' : 'text-slate-400')}>
                        {step.title}
                      </div>
                      <div className="text-[11px] text-slate-400 font-medium">{step.description}</div>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={cn(
                        'h-1 w-8 sm:w-16 rounded-full transition-colors duration-300',
                        currentStep > step.number ? 'bg-emerald-500' : 'bg-slate-800'
                      )}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Form Card */}
          <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6 shadow-2xl backdrop-blur-xl sm:p-10">
            {currentStep === 1 && (
              <div className="text-center">
                <div className="group rounded-3xl border-2 border-dashed border-slate-800 p-8 sm:p-12 transition-all duration-300 hover:border-emerald-500/50 hover:bg-slate-900/60">
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:scale-110 transition-transform duration-300">
                    <FileUp className="h-10 w-10" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-white">
                    {isAr ? 'اسحب صورة الروشتة هنا أو اضغط للرفع' : 'Drag prescription file or click to upload'}
                  </h3>
                  <p className="mb-6 text-xs sm:text-sm text-slate-400">
                    {isAr ? 'تقبل الصيدلية صيغ الصور (JPG, PNG) أو ملفات الـ PDF حتى 15 ميجابايت' : 'Accepts JPG, PNG, PDF formats up to 15MB'}
                  </p>
                  
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="prescription-upload"
                  />
                  <label htmlFor="prescription-upload" className="inline-block cursor-pointer">
                    <Button asChild className="gap-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold px-8 py-3 text-sm shadow-lg shadow-emerald-500/20">
                      <span>
                        <Camera className="h-4 w-4" />
                        {isAr ? 'اختيار صورة الروشتة' : 'Select Prescription'}
                      </span>
                    </Button>
                  </label>

                  {uploadedFile && (
                    <p className="mt-4 text-xs font-bold text-emerald-400">✓ {uploadedFile.name}</p>
                  )}
                </div>

                {/* Trust info footer */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 text-xs text-slate-400">
                  <div className="flex items-center justify-center gap-2">
                    <Clock className="h-4 w-4 text-emerald-400" />
                    <span>{isAr ? 'مراجعة خلال 15 دقيقة' : '15 Min Review'}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-emerald-400" />
                    <span>{isAr ? 'سرية تامة لبياناتك' : '100% Confidential'}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>{isAr ? 'توصيل لجميع مناطق المملكة' : 'Delivery Across KSA'}</span>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div>
                <h3 className="mb-6 text-xl font-extrabold text-white">
                  {isAr ? 'بيانات للتواصل والتوصيل' : 'Contact & Delivery Details'}
                </h3>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <Input type="text" placeholder={isAr ? 'الاسم الكامل' : 'Full Name'} className="h-12 rounded-2xl bg-slate-900 border-slate-800 text-white placeholder:text-slate-500" />
                  <Input type="tel" placeholder={isAr ? 'رقم الجوال (05xxxxxxx)' : 'Mobile (05xxxxxxx)'} className="h-12 rounded-2xl bg-slate-900 border-slate-800 text-white placeholder:text-slate-500" />
                  <Input type="text" placeholder={isAr ? 'المدينة والعنوان التفصيلي' : 'City & Address'} className="h-12 rounded-2xl bg-slate-900 border-slate-800 text-white placeholder:text-slate-500 md:col-span-2" />
                </div>
                <div className="mt-8 flex justify-between gap-3">
                  <Button variant="outline" onClick={() => setCurrentStep(1)} className="rounded-2xl border-slate-800 text-slate-300 hover:bg-slate-900">
                    {isAr ? 'السابق' : 'Back'}
                  </Button>
                  <Button onClick={() => setCurrentStep(3)} className="rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold px-8">
                    {isAr ? 'تأكيد الإرسال' : 'Submit Prescription'}
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="py-8 text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 ring-8 ring-emerald-500/20">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <h3 className="mb-2 text-2xl font-black text-white">
                  {isAr ? 'تم استلام الوصفة الطبية بنجاح!' : 'Prescription Received Successfully!'}
                </h3>
                <p className="mb-8 text-slate-300 text-sm max-w-md mx-auto">
                  {isAr ? 'يقوم الصيدلي المناظر لم منطقتك بمراجعتها فوراً وسيصلك اتصال لتأكيد تفاصيل الأدوية والتوصيل.' : 'Our licensed pharmacist is inspecting your prescription and will contact you shortly.'}
                </p>
                <Button
                  onClick={() => {
                    setCurrentStep(1);
                    setUploadedFile(null);
                  }}
                  className="rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold px-8"
                >
                  {isAr ? 'رفع روشتة أخرى' : 'Upload Another Rx'}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrescriptionUploadSection;

