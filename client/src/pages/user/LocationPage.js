import React from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Clock, Navigation, Star, ExternalLink, Map, Truck, FileText, MessageSquare } from 'lucide-react';
import { GlassCard } from '../../components/ui/glass-card';

const MAP_EMBED_URL = 'https://maps.google.com/maps?q=3RV5%2B56J%20Al%20Wadeen%2062263%20Saudi%20Arabia&z=16&output=embed';
const MAPS_LINK_URL = 'https://www.google.com/maps/search/?api=1&query=3RV5%2B56J%20Al%20Wadeen%2062263%20Saudi%20Arabia';
const DIRECTIONS_URL = 'https://www.google.com/maps/dir/?api=1&destination=3RV5%2B56J%20Al%20Wadeen%2062263%20Saudi%20Arabia';

const hours = [
  { labelKey: 'hoursWeek', valueKey: 'hoursWeekValue' },
  { labelKey: 'hoursFri', valueKey: 'hoursFriValue' },
];

const services = [
  { icon: Truck, labelKey: 'deliveryService' },
  { icon: FileText, labelKey: 'prescriptionService' },
  { icon: MessageSquare, labelKey: 'consultService' },
];

const LocationPage = () => {
  const { t } = useTranslation();

  const handleNavigate = () => {
    window.open(DIRECTIONS_URL, '_blank', 'noopener,noreferrer');
  };

  const handleOpenMap = () => {
    window.open(MAPS_LINK_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-secondary">
        <div className="absolute inset-0 opacity-10">
          <svg className="h-full w-full" aria-hidden="true">
            <defs>
              <pattern id="mapgrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M40 0H0V40" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#mapgrid)" />
          </svg>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

        <div className="relative container mx-auto px-4 py-16 text-center text-white md:py-20">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-teal-50 backdrop-blur-sm">
            <MapPin className="h-3.5 w-3.5" />
            {t('featuredStore', 'Store Location')}
          </span>
          <h1 className="mb-3 text-4xl font-extrabold drop-shadow-lg sm:text-5xl">
            {t('locationHeroTitle', 'Awon Pharmacy Location')}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-teal-50/90 drop-shadow">
            {t('locationHeroSubtitle', 'We are at your service in the heart of Al Wadeen - visit us or get in touch')}
          </p>
        </div>
      </section>

      {/* Store + Map */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              {t('alWadeen', 'Al Wadeen')}
            </span>
            <h2 className="text-gradient mb-3 text-3xl font-extrabold md:text-4xl">
              {t('storeLocationTitle', 'Al Wadeen Branch Location')}
            </h2>
            <p className="mx-auto max-w-xl text-muted-foreground">
              {t('storeLocationSubtitle', 'The main Awon Pharmacy store in Al Wadeen, Asir - head straight there via the map or call us')}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
            {/* Store info */}
            <div className="lg:col-span-2">
              <GlassCard className="h-full p-0 shadow-card-3d">
                <div className="bg-gradient-to-r from-primary to-secondary p-5 text-white">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-extrabold">{t('storeName', 'Awon Pharmacy')}</h3>
                      <p className="mt-0.5 text-sm text-teal-50/90">{t('storeTagline', 'Al Wadeen Branch')}</p>
                    </div>
                    <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
                      {t('mainStore', 'Main Store')}
                    </span>
                  </div>
                  <div className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-black/20 px-3 py-1.5">
                    <Star className="h-4 w-4 fill-current text-yellow-300" />
                    <span className="text-sm font-bold">4.4</span>
                    <span className="text-xs text-teal-50/85">
                      · {421} {t('storeReviews', 'reviews on Google')}
                    </span>
                  </div>
                </div>

                <div className="space-y-5 p-6">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">{t('address', 'Address')}</h4>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {t('fullAddress', '3RV5+56J, Main Street, Al Wadeen 62263, Saudi Arabia')}
                      </p>
                      <span className="mt-2 inline-block rounded-md bg-muted px-2 py-0.5 text-[11px] font-mono font-medium text-muted-foreground">
                        {t('plusCode', 'Plus Code')}: 3RV5+56J
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">{t('phoneLabel', 'Phone')}</h4>
                      <a
                        href="tel:+966172530257"
                        className="mt-1 block text-sm font-medium text-primary transition-colors hover:text-secondary"
                        dir="ltr"
                      >
                        +966 17 253 0257
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-foreground">{t('hoursTitle', 'Working Hours')}</h4>
                      <ul className="mt-2 space-y-1.5">
                        {hours.map((row) => (
                          <li key={row.labelKey} className="flex items-center justify-between gap-3 text-sm">
                            <span className="text-muted-foreground">{t(row.labelKey)}</span>
                            <span className="font-medium text-foreground" dir="ltr">
                              {t(row.valueKey)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 border-t border-border pt-5">
                    {services.map(({ icon: Icon, labelKey }) => (
                      <div key={labelKey} className="flex flex-col items-center gap-1.5 rounded-xl bg-muted/60 px-2 py-3 text-center">
                        <Icon className="h-5 w-5 text-primary" />
                        <span className="text-[11px] font-medium leading-tight text-muted-foreground">
                          {t(labelKey)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <button
                      onClick={handleNavigate}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-secondary px-5 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                    >
                      <Navigation className="h-4 w-4" />
                      {t('getDirections', 'Get Directions')}
                    </button>
                    <button
                      onClick={handleOpenMap}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground transition-all duration-300 hover:border-primary hover:text-primary"
                    >
                      <ExternalLink className="h-4 w-4" />
                      {t('openInMaps', 'Open in Google Maps')}
                    </button>
                  </div>
                </div>
              </GlassCard>
            </div>

            {/* Map */}
            <div className="lg:col-span-3">
              <GlassCard className="h-full overflow-hidden p-0 shadow-card-3d">
                <div className="relative h-[320px] sm:h-[400px] lg:h-[520px]">
                  <iframe
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={MAP_EMBED_URL}
                    title={t('storeName', 'Awon Pharmacy')}
                    className="absolute inset-0"
                  />
                  <div className="pointer-events-none absolute top-4 start-4 rounded-xl bg-background/95 px-4 py-2.5 shadow-lg backdrop-blur-sm">
                    <p className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                      <Map className="h-3.5 w-3.5 text-primary" />
                      {t('alWadeen', 'Al Wadeen')}
                    </p>
                    <p className="mt-0.5 text-[11px] text-muted-foreground" dir="ltr">
                      3RV5+56J · {t('storeName', 'Awon Pharmacy')}
                    </p>
                  </div>
                </div>
              </GlassCard>

              <div className="mt-4 rounded-2xl border border-border bg-card p-5">
                <h4 className="mb-2 flex items-center gap-2 font-semibold text-foreground">
                  <MapPin className="h-4 w-4 text-primary" />
                  {t('howToReach', 'How to Reach Us')}
                </h4>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {t('howToReachText', 'Click the map to open the location in Google Maps, or use the directions button to get a route from your place')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LocationPage;
