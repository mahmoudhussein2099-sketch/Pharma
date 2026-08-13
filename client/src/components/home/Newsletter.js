import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Mail, Gift, Bell, TrendingUp } from 'lucide-react';
import { useToast } from '../../components/ui/toast';

const Newsletter = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setSubscribed(true);
        setEmail('');
        setTimeout(() => setSubscribed(false), 3000);
        toast('تم الاشتراك بنجاح!', { variant: 'success' });
      } else {
        throw new Error('Subscription failed');
      }
    } catch (error) {
      toast('حدث خطأ في الاشتراك', { variant: 'error' });
    }
  };

  const benefits = [
    { icon: <Gift className="h-5 w-5" />, text: t('newsletterExclusive', 'حصريات وعروض خاصة') },
    { icon: <Bell className="h-5 w-5" />, text: t('newsletterTips', 'نصائح صحية أسبوعية') },
    { icon: <TrendingUp className="h-5 w-5" />, text: t('newsletterPromotions', 'عروض وتخفيضات جديدة') },
  ];

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-secondary" />

      <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-teal-400/20 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />

      <div className="relative container mx-auto flex items-center justify-center px-4">
        <div className="mx-auto w-full max-w-2xl rounded-3xl bg-white/5 p-8 md:p-12 text-center shadow-premium backdrop-blur-md border border-white/10">
          <h2 className="mb-4 text-3xl font-extrabold text-white sm:text-4xl">
            {t('newsletterTitle', 'ابقى محدث')}
          </h2>
          <p className="mb-8 text-lg text-teal-50/90">
            {t('newsletterSubtitle', 'اشترك للحصول على عروض خاصة، نصائح صحية، وتحديثات منتجات جديدة')}
          </p>

          {!subscribed ? (
            <form onSubmit={handleSubmit} className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
              <label htmlFor="newsletter-email" className="sr-only">
                {t('emailAddress', 'Email address')}
              </label>
              <Input
                id="newsletter-email"
                name="email"
                type="email"
                autoComplete="email"
                spellCheck={false}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('emailPlaceholder', 'أدخل بريدك الإلكتروني')}
                className="h-14 flex-1 border-0 bg-white/10 px-6 text-foreground placeholder:text-teal-200/50 focus-visible:ring-2 focus-visible:ring-teal-300"
                required
              />
              <Button
                type="submit"
                className="h-14 gap-2 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-500 px-8 font-semibold text-primary shadow-lg hover:from-teal-300 hover:to-cyan-400"
              >
                <Mail className="h-4 w-4" />
                {t('subscribe', 'اشتراك')}
              </Button>
            </form>
          ) : (
            <div className="mx-auto max-w-md animate-in fade-in duration-500">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/15 text-white shadow-inner ring-1 ring-white/25" aria-hidden="true">
                <Mail className="h-8 w-8" />
              </div>
              <p className="font-bold text-xl text-white">
                {t('subscriptionSuccess', 'شكراً! تم الاشتراك بنجاح')}
              </p>
              <p className="mt-1 text-sm text-teal-200/80">
                {t('subscriptionConfirm', 'ستصلك أوليات العروض على بريدك')}
              </p>
            </div>
          )}

          <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-teal-200/70">
            {benefits.map((benefit, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <span className="text-teal-300">{benefit.icon}</span>
                {benefit.text}
              </div>
            ))}
          </div>

          <p className="mt-4 text-xs text-teal-200/50">
            {t('newsletterPrivacy', 'نلتزم بخصوصيتك. إلغاء الاشتراك في أي وقت.')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
