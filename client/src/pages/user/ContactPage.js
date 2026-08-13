import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Send, CheckCircle2 } from 'lucide-react';

const ContactPage = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language?.startsWith('ar');
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 5000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactCards = [
    {
      icon: '/images/3d-icons/3dicons-call-in-dynamic-color.png',
      title: isAr ? 'رقم الهاتف المباشر' : 'Direct Phone',
      value: '+966 17 253 0257',
      sub: isAr ? 'خدمة الاستشارات الطبية 24/7' : '24/7 Pharmacist Consultation',
      action: 'tel:+966172530257',
      actionText: isAr ? 'اتصل الآن' : 'Call Now',
    },
    {
      icon: '/images/3d-icons/3dicons-whatsapp-dynamic-color.png',
      title: isAr ? 'واتساب الصيدلية المباشر' : 'WhatsApp Support',
      value: '+966 50 000 0000',
      sub: isAr ? 'رد سريع من الصيدلي المناظر' : 'Instant response from pharmacist',
      action: 'https://wa.me/966500000000',
      actionText: isAr ? 'محادثة واتساب' : 'Chat on WhatsApp',
    },
    {
      icon: '/images/3d-icons/3dicons-map-pin-dynamic-color.png',
      title: isAr ? 'العنوان والمقر الرئيسي' : 'Pharmacy Address',
      value: isAr ? 'الشارع الرئيسي، الوادين 62263، المملكة العربية السعودية' : 'Main Street, Al Wadeen 62263, KSA',
      sub: isAr ? 'مواعيد العمل: يومياً من ٩ ص - ١١ م' : 'Open daily 9:00 AM - 11:00 PM',
      action: '/location',
      actionText: isAr ? 'عرض الفروع والخريطة' : 'View Locations',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-4 py-1.5 text-xs font-black text-emerald-400 mb-3">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            {isAr ? 'تواصل معنا في أي وقت' : 'We are here to help'}
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-3">
            {isAr ? 'تواصل مع صيدلية عون القحطاني' : 'Contact Awon Pharmacy'}
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto font-medium">
            {isAr
              ? 'يسعدنا الإجابة على استفساراتك الدوائية والطبية، وتلقي طلبات الرعاية الخاصة بك'
              : 'Our clinical pharmacy team is available to assist with your medical questions and orders.'}
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {contactCards.map((c, i) => (
            <div key={i} className="group rounded-3xl bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between transition-all duration-300 hover:border-emerald-500/40 hover:-translate-y-1">
              <div>
                <div className="h-16 w-16 rounded-2xl bg-slate-800 border border-slate-700/60 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <img src={c.icon} alt={c.title} className="h-11 w-11 object-contain drop-shadow-md" />
                </div>
                <h3 className="text-base font-black text-white mb-1 group-hover:text-emerald-400 transition-colors">{c.title}</h3>
                <p className="text-sm font-bold text-emerald-400 mb-2 dir-ltr text-start">{c.value}</p>
                <p className="text-xs text-slate-400 font-medium mb-6">{c.sub}</p>
              </div>
              <a
                href={c.action}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 border border-slate-700 text-white px-4 py-2.5 text-xs font-black transition-all"
              >
                {c.actionText}
              </a>
            </div>
          ))}
        </div>

        {/* Contact Form & Info */}
        <div className="max-w-3xl mx-auto rounded-3xl bg-slate-900 border border-slate-800 p-8 shadow-2xl relative overflow-hidden">
          <div className="pointer-events-none absolute -bottom-24 -start-24 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />

          <div className="flex items-center gap-3 mb-6">
            <img src="/images/3d-icons/3dicons-chat-text-dynamic-color.png" alt="Message" className="h-10 w-10 object-contain drop-shadow-md" />
            <div>
              <h2 className="text-xl font-black text-white">{isAr ? 'إرسال رسالة أو استفسار طبي' : 'Send a Medical Inquiry'}</h2>
              <p className="text-xs text-slate-400">{isAr ? 'سيرد عليك الصيدلي المناظر في أقرب وقت' : 'Pharmacist will respond promptly'}</p>
            </div>
          </div>

          {sent ? (
            <div className="py-10 text-center">
              <CheckCircle2 className="h-16 w-16 text-emerald-400 mx-auto mb-4 animate-bounce" />
              <h3 className="text-xl font-black text-white mb-2">{isAr ? 'تم إرسال استفسارك بنجاح!' : 'Message Sent Successfully!'}</h3>
              <p className="text-sm text-slate-400">{isAr ? 'شكراً لك، سيتواصل معك الصيدلي المناظر فوراً.' : 'Thank you. Our pharmacist will get back to you shortly.'}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-xs font-bold text-slate-300">{isAr ? 'الاسم الكامل' : 'Full Name'}</label>
                  <input
                    type="text"
                    required
                    placeholder={isAr ? 'اسمك الكريم' : 'Your name'}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold text-slate-300">{isAr ? 'البريد الإلكتروني / الجوال' : 'Email / Phone'}</label>
                  <input
                    type="text"
                    required
                    placeholder="example@mail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold text-slate-300">{isAr ? 'عنوان الاستفسار' : 'Subject'}</label>
                <input
                  type="text"
                  required
                  placeholder={isAr ? 'استفسار عن دواء / استشارة' : 'Inquiry subject'}
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold text-slate-300">{isAr ? 'تفاصيل الرسالة' : 'Message Details'}</label>
                <textarea
                  rows={4}
                  required
                  placeholder={isAr ? 'اكتب تفاصيل استفسارك هنا...' : 'Write your message here...'}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-sm text-white focus:outline-none focus:border-emerald-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 py-3.5 text-sm font-black transition-all shadow-lg shadow-emerald-500/20"
              >
                <Send className="h-4 w-4" />
                <span>{isAr ? 'إرسال الاستفسار للصيدلي' : 'Send Inquiry'}</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};

export default ContactPage;
