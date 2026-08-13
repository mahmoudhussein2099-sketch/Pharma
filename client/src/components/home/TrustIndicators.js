import React from 'react';
import { GlassCard } from '../ui/glass-card';
import { Icon3D } from '../ui/brand-icons';
import SectionHeader from '../ui/SectionHeader';

const indicators = [
  {
    icon: 'medal',
    title: 'Licensed Pharmacy',
    description: 'Fully licensed and regulated by health authorities',
  },
  {
    icon: 'rocket',
    title: 'Fast Delivery',
    description: 'Same-day delivery available in major cities',
  },
  {
    icon: 'shield',
    title: 'Genuine Products',
    description: 'All products sourced directly from manufacturers',
  },
  {
    icon: 'callIn',
    title: 'Expert Pharmacists',
    description: 'Qualified pharmacists available for consultation',
  },
  {
    icon: 'lock',
    title: 'Secure & Private',
    description: 'Your health information is protected and confidential',
  },
  {
    icon: 'thumbUp',
    title: 'Best Prices',
    description: 'Competitive pricing with regular discounts and offers',
  },
];

const TrustIndicators = () => {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 bg-dots-brand opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,black,transparent)]" aria-hidden="true" />
      <div className="relative container mx-auto px-4">
        <SectionHeader
          eyebrow="Why Awon?"
          title="Why Choose Awon Pharmacy?"
          subtitle="Your trusted healthcare partner with uncompromising quality and service"
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {indicators.map((indicator, index) => {
            return (
              <GlassCard
                key={index}
                className="group p-6 text-center shadow-card-3d transition-all duration-300 hover:-translate-y-1"
              >
                <div className="mb-4 flex justify-center">
                  <Icon3D
                    name={indicator.icon}
                    className="h-16 w-16 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3"
                  />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                  {indicator.title}
                </h3>
                <p className="text-sm text-muted-foreground">{indicator.description}</p>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;
