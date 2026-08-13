import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Star, Award, MapPin, ExternalLink, Phone, Mail } from 'lucide-react';
import { GlassCard } from '../../components/ui/glass-card';
import TiltCard from '../../components/ui/TiltCard';

const teamMembers = [
  {
    id: 1,
    name: 'Dr. Fatema Al-Ahmadi',
    role: 'Dentist Specialist',
    specialization: 'Dental Surgery & Cosmetic Dentistry',
    image: 'https://images.unsplash.com/photo-1559839734-6b5c3a1f5e5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    credentials: ['BDS', 'MDS (Implants)'],
    rating: 4.9,
    location: 'Riyadh Main Branch',
    contact: { phone: '+966 12 345 6789', email: 'dr.fatemah@awon.com' },
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    id: 2,
    name: 'Dr. Mohammed Al-Otaibi',
    role: 'Family Medicine',
    specialization: 'Preventive Care & Family Health',
    image: 'https://images.unsplash.com/photo-1622253676392-3f8e4c1b1029?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    credentials: ['MBBS', 'IFMCP', 'DHA'],
    rating: 4.8,
    location: 'Jeddah Branch',
    contact: { phone: '+966 12 345 6790', email: 'dr.mohammed@awon.com' },
    gradient: 'from-teal-500 to-cyan-600',
  },
  {
    id: 3,
    name: 'Dr. Sarah Al-Najdi',
    role: 'Licensed Pharmacist',
    specialization: 'Clinical Pharmacy & Home Healthcare',
    image: 'https://images.unsplash.com/photo-1594803684833-4f8d0a899601?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    credentials: ['BPharm', 'MPharm', 'DHA'],
    rating: 4.7,
    location: 'Riyadh Main Branch',
    contact: { phone: '+966 12 345 6791', email: 'dr.sara@awon.com' },
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    id: 4,
    name: 'Eng. Mohammed Al-Qahtani',
    role: 'Nutrition Specialist',
    specialization: 'Clinical Nutrition & Diet Therapy',
    image: 'https://images.unsplash.com/photo-1607746193542-57c55390e2f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    credentials: ['BS Nutrition', 'CNS', 'ACS'],
    rating: 4.6,
    location: 'Al-Madinah Branch',
    contact: { phone: '+966 12 345 6792', email: 'nutri.mohammed@awon.com' },
    gradient: 'from-purple-500 to-violet-600',
  },
  {
    id: 5,
    name: 'Dr. Lily Al-Harbi',
    role: 'Pediatric Specialist',
    specialization: 'Pediatric & Neonatal Care',
    image: 'https://images.unsplash.com/photo-1622906418895-ba28953e1289?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    credentials: ['MBBS', 'MRCPCH', 'Saudi Pediatrics'],
    rating: 4.9,
    location: 'Riyadh Main Branch',
    contact: { phone: '+966 12 345 6793', email: 'dr.leyla@awon.com' },
    gradient: 'from-pink-500 to-rose-600',
  },
  {
    id: 6,
    name: 'Pharm. Khaled Al-Anasiri',
    role: 'Clinical Pharmacist',
    specialization: 'Chronic Medication Management',
    image: 'https://images.unsplash.com/photo-1622257356345-8a0b8c8e4e2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    credentials: ['BPharm', 'DHA', 'Certified Medication Manager'],
    rating: 4.5,
    location: 'Jeddah Branch',
    contact: { phone: '+966 12 345 6794', email: 'ph.khalid@awon.com' },
    gradient: 'from-amber-500 to-orange-600',
  },
];

const TeamPage = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full">
      <section className="relative min-h-[380px] overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-secondary">
        <div className="absolute inset-0">
          <img
            src="/images/team-hero.jpg"
            alt=""
            className="h-full w-full object-cover"
            loading="eager"
            style={{ opacity: 0.12 }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>

        <div className="relative container mx-auto px-4 py-24 md:py-32 text-center text-white">
          <h1 className="mb-6 text-4xl font-extrabold drop-shadow-lg sm:text-5xl">
            {t('ourTeam', 'Our Expert Team')}
          </h1>
          <p className="mx-auto mb-4 max-w-2xl text-lg text-teal-50/90 drop-shadow">
            {t('teamSubtitle', 'A team of certified specialists committed to providing the best healthcare for you and your family')}
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-teal-200/80">
            <div className="flex items-center gap-1.5">
              <Award className="h-4 w-4 text-yellow-300" />
              <span>{teamMembers.length} {t('experts', 'Experts')}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Star className="h-4 w-4 text-yellow-300 fill-current" />
              <span>{t('averageRating', 'Average Rating')} 4.7/5</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-teal-300" />
              <span>{t('multipleBranches', 'Multiple Branches')}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              {t('medicalExperts', 'Medical Experts')}
            </span>
            <h2 className="text-gradient mb-3 text-3xl font-extrabold md:text-4xl">
              {t('meetOurExperts', 'Meet Our Experts')}
            </h2>
            <p className="mx-auto max-w-xl text-muted-foreground">
              {t('teamDescription', 'Our team of certified doctors and pharmacists provides comprehensive healthcare services with the highest quality standards.')}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <TiltCard
                key={member.id}
                className="h-full"
                max={8}
                scale={1.02}
              >
                <div className="tilt-inner h-full">
                  <GlassCard
                    className="relative h-full overflow-hidden p-0 shadow-card-3d transition-all duration-300 hover:-translate-y-1 hover:shadow-premium"
                    hover
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${member.gradient} opacity-30`} />
                      <div className="absolute top-3 right-3 rounded-full bg-white/10 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
                        {member.role}
                      </div>
                    </div>

                    <div className="p-5">
                      <h3 className="mb-1 text-xl font-bold text-foreground">{member.name}</h3>
                      <p className="mb-2 text-sm text-muted-foreground">{member.specialization}</p>

                      <div className="mb-3 flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{member.rating}</span>
                      </div>

                      <div className="mb-3 flex flex-wrap gap-1.5">
                        {member.credentials.map((cred, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center rounded-full bg-primary/5 px-2.5 py-1 text-xs font-medium text-primary"
                          >
                            {cred}
                          </span>
                        ))}
                      </div>

                      <div className="space-y-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-3 w-3 text-secondary" />
                          <span>{member.location}</span>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center gap-3 border-t border-border/20 pt-3">
                        <a
                          href={`tel:${member.contact.phone}`}
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                          aria-label={`Call ${member.name}`}
                        >
                          <Phone className="h-4 w-4" />
                        </a>
                        <a
                          href={`mailto:${member.contact.email}`}
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                          aria-label={`Email ${member.name}`}
                        >
                          <Mail className="h-4 w-4" />
                        </a>
                        <Link
                          to="/contact"
                          className="ms-auto text-xs font-medium text-primary hover:underline"
                        >
                          {t('bookConsultation', 'Book Consultation')}
                        </Link>
                      </div>
                    </div>
                  </GlassCard>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeamPage;
