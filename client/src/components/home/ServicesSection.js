import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import TiltCard from '../../components/ui/TiltCard';
import { GlassCard } from '../../components/ui/glass-card';
import SectionHeader from '../ui/SectionHeader';

const services = [
  {
    id: 1,
    nameKey: 'serviceConsultation',
    name: 'Online Consultation',
    descKey: 'serviceConsultationDesc',
    description: 'Consult with certified pharmacists and doctors online',
    image:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
    href: '/services/consultations',
  },
  {
    id: 2,
    nameKey: 'serviceDelivery',
    name: 'Prescription Delivery',
    descKey: 'serviceDeliveryDesc',
    description: 'Fast and secure delivery of your prescriptions',
    image:
      'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
    href: '/services/prescription-delivery',
  },
  {
    id: 3,
    nameKey: 'serviceCheckups',
    name: 'Health Checkups',
    descKey: 'serviceCheckupsDesc',
    description: 'Regular health monitoring and checkup services',
    image:
      'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
    href: '/services/health-checks',
  },
  {
    id: 4,
    nameKey: 'serviceReminders',
    name: 'Medication Reminders',
    descKey: 'serviceRemindersDesc',
    description: 'Never miss your medication with smart reminders',
    image:
      'https://images.unsplash.com/photo-1576602976047-174e57a47881?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80',
    href: '/services',
  },
];

const ServicesSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <SectionHeader
          eyebrow={t('ourServices', 'Our Services')}
          title={t('expertServices', 'Expert Healthcare Services')}
          subtitle={t('servicesSubtitle', 'Professional pharmaceutical services to support your health journey')}
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <Link key={service.id} to={service.href} className="group block" aria-label={t(service.nameKey, service.name)}>
              <TiltCard className="h-full" max={10} scale={1.02}>
                <div className="tilt-inner h-full">
                  <GlassCard className="h-full overflow-hidden p-0 shadow-card-3d transition-all duration-300 group-hover:shadow-premium">
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={service.image}
                        alt={t(service.nameKey, service.name)}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <span className="absolute bottom-3 start-3 inline-flex items-center gap-1 rounded-full bg-primary/90 px-3 py-1 text-xs font-semibold text-primary-foreground backdrop-blur-sm">
                        {t(service.nameKey, service.name)}
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="mb-2 text-lg font-bold text-foreground transition-colors group-hover:text-primary">
                        {t(service.nameKey, service.name)}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {t(service.descKey, service.description)}
                      </p>
                      <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                        {t('learnMore', 'Learn More')}
                        <ArrowLeft className="h-3.5 w-3.5 rtl:rotate-180" aria-hidden="true" />
                      </span>
                    </div>
                  </GlassCard>
                </div>
              </TiltCard>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
