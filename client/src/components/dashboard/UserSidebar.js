import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ChevronsLeft,
  ChevronsRight,
  ChevronDown,
  FileUp,
  ShieldCheck
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useProducts } from '../../context/ProductDataContext';
import { CATEGORY_ICONS, CATEGORY_GRADIENTS } from '../icons/CategoryIcons';

const CATEGORY_ORDER = ['prescription', 'otc', 'vitamins', 'baby', 'beauty', 'medical', 'firstaid', 'eye'];

const SUBCATEGORIES = [
  // Prescription
  { cat: 'prescription', name: 'Antibiotics', key: 'antibiotics' },
  { cat: 'prescription', name: 'Blood Pressure', key: 'bloodPressure' },
  { cat: 'prescription', name: 'Diabetes Care', key: 'diabetesCare' },
  { cat: 'prescription', name: 'Heart Medications', key: 'heartMedications' },
  { cat: 'prescription', name: 'Thyroid Medications', key: 'thyroidMedications' },
  { cat: 'prescription', name: 'General Health', key: 'generalHealth' },
  // OTC
  { cat: 'otc', name: 'Cold & Flu', key: 'coldFlu' },
  { cat: 'otc', name: 'Allergy Relief', key: 'allergyRelief' },
  { cat: 'otc', name: 'Digestive Health', key: 'digestiveHealth' },
  { cat: 'otc', name: 'Sleep Aids', key: 'sleepAids' },
  { cat: 'otc', name: 'Headache Relief', key: 'headacheRelief' },
  { cat: 'otc', name: 'Cough Syrups', key: 'coughSyrups' },
  { cat: 'otc', name: 'Pain Relief', key: 'painRelief' },
  { cat: 'otc', name: 'General Health', key: 'generalHealth' },
  // Vitamins
  { cat: 'vitamins', name: 'Multivitamins', key: 'multivitamins' },
  { cat: 'vitamins', name: 'Vitamin D', key: 'vitaminD' },
  { cat: 'vitamins', name: 'Omega-3', key: 'omega3' },
  { cat: 'vitamins', name: 'Probiotics', key: 'probiotics' },
  { cat: 'vitamins', name: 'Protein Supplements', key: 'proteinSupplements' },
  { cat: 'vitamins', name: 'Iron & B12', key: 'ironB12' },
  { cat: 'vitamins', name: 'Calcium', key: 'calcium' },
  { cat: 'vitamins', name: 'Supplements', key: 'supplements' },
  // Baby
  { cat: 'baby', name: 'Baby Formula', key: 'babyFormula' },
  { cat: 'baby', name: 'Diapers & Wipes', key: 'diapersWipes' },
  { cat: 'baby', name: 'Baby Skincare', key: 'babySkincare' },
  { cat: 'baby', name: 'Maternity Care', key: 'maternityCare' },
  // Beauty
  { cat: 'beauty', name: 'Skincare Products', key: 'skincareProducts' },
  { cat: 'beauty', name: 'Hair Care', key: 'hairCare' },
  { cat: 'beauty', name: 'Oral Care', key: 'oralCare' },
  { cat: 'beauty', name: 'Body Care', key: 'bodyCare' },
  { cat: 'beauty', name: 'Sunscreen', key: 'sunscreen' },
  { cat: 'beauty', name: 'Anti-Aging', key: 'antiAging' },
  // Medical devices
  { cat: 'medical', name: 'Blood Pressure Monitors', key: 'bloodPressureMonitors' },
  { cat: 'medical', name: 'Thermometers', key: 'thermometers' },
  { cat: 'medical', name: 'Glucose Meters', key: 'glucoseMeters' },
  { cat: 'medical', name: 'Pulse Oximeters', key: 'pulseOximeters' },
  // First aid
  { cat: 'firstaid', name: 'Bandages & Gauze', key: 'bandagesGauze' },
  { cat: 'firstaid', name: 'Face Masks', key: 'faceMasks' },
  { cat: 'firstaid', name: 'Hand Sanitizers', key: 'handSanitizers' },
  { cat: 'firstaid', name: 'First Aid Kits', key: 'firstAidKits' },
  // Eye
  { cat: 'eye', name: 'Contact Lenses', key: 'contactLenses' },
  { cat: 'eye', name: 'Eye Drops', key: 'eyeDrops' },
  { cat: 'eye', name: 'Reading Glasses', key: 'readingGlasses' },
  { cat: 'eye', name: 'Lens Solutions', key: 'lensSolutions' },
  { cat: 'eye', name: 'Eye Care', key: 'eyeCare' }
];

const UserSidebar = () => {
  const { t } = useTranslation();
  const [collapsed, setCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.localStorage.getItem('awonSidebarCollapsed') === '1';
    }
    return false;
  });
  const [expandedCategories, setExpandedCategories] = useState({});
  const { products } = useProducts();

  const categoryCounts = useMemo(() => {
    const byCat = {};
    const bySub = {};
    for (const p of products) {
      byCat[p.category] = (byCat[p.category] || 0) + 1;
      bySub[`${p.category}/${p.subcategory}`] = (bySub[`${p.category}/${p.subcategory}`] || 0) + 1;
    }
    return { byCat, bySub };
  }, [products]);

  const categories = useMemo(() =>
    CATEGORY_ORDER
      .filter((cat) => (categoryCounts.byCat[cat] || 0) > 0)
      .map((cat) => ({
        id: cat,
        name: t(`dashboard.${cat}`),
        count: categoryCounts.byCat[cat] || 0,
        gradient: CATEGORY_GRADIENTS[cat],
        Icon: CATEGORY_ICONS[cat],
        items: SUBCATEGORIES
          .filter((s) => s.cat === cat && (categoryCounts.bySub[`${s.cat}/${s.name}`] || 0) > 0)
          .map((s) => ({ name: s.name, label: t(`dashboard.${s.key}`, s.name), count: categoryCounts.bySub[`${s.cat}/${s.name}`] || 0 }))
      })), [categoryCounts, t]);

  const toggleCollapse = () => {
    setCollapsed((prev) => {
      const next = !prev;
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('awonSidebarCollapsed', next ? '1' : '0');
      }
      return next;
    });
  };

  return (
    <div className={cn(
      'hidden h-screen shrink-0 flex-col overflow-y-auto border-e border-border bg-card transition-[width] duration-300 lg:flex',
      collapsed ? 'w-16' : 'w-80'
    )}>
      {/* Collapse toggle */}
      <div className="flex items-center justify-between p-3">
        {!collapsed && (
          <h2 className="px-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {t('categories', 'Categories')}
          </h2>
        )}
        <button
          type="button"
          onClick={toggleCollapse}
          aria-label={collapsed ? t('expandSidebar', 'Expand sidebar') : t('collapseSidebar', 'Collapse sidebar')}
          aria-expanded={!collapsed}
          className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {collapsed
            ? <ChevronsRight className="h-4 w-4 rtl:rotate-180" />
            : <ChevronsLeft className="h-4 w-4 rtl:rotate-180" />}
        </button>
      </div>

      {/* Categories */}
      <div className={cn('flex-1', collapsed ? 'p-2' : 'p-4 pt-0')}>
        {categories.map(category => {
          const Icon = category.Icon;
          const isOpen = !!expandedCategories[category.id];

          if (collapsed) {
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setExpandedCategories({ [category.id]: !isOpen })}
                title={category.name}
                aria-label={category.name}
                aria-expanded={isOpen}
                className="mx-auto mb-2 flex h-11 w-11 items-center justify-center rounded-xl transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className={cn('flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-sm', category.gradient)}>
                  <Icon className="h-5 w-5" />
                </span>
              </button>
            );
          }

          return (
            <div key={category.id} className="mb-2">
              <button
                type="button"
                onClick={() => setExpandedCategories(prev => ({ ...prev, [category.id]: !prev[category.id] }))}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between rounded-lg p-3 transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className="flex min-w-0 items-center">
                  <span className={cn('me-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-white shadow-sm', category.gradient)}>
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="truncate font-medium text-foreground">{category.name}</span>
                </span>
                <span className="flex shrink-0 items-center gap-2">
                  <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">{category.count}</span>
                  <ChevronDown className={cn('h-4 w-4 text-muted-foreground transition-transform', isOpen && 'rotate-180')} />
                </span>
              </button>

              {isOpen && (
                <ul className="mt-1 space-y-0.5 border-s-2 border-muted ps-3 ms-6">
                  {category.items.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={`/products?category=${category.id}&subcategory=${encodeURIComponent(item.name)}`}
                        className="flex items-center justify-between rounded p-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <span className="truncate">{item.label}</span>
                        <span className="shrink-0 text-xs text-muted-foreground/70">{item.count}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>

      {/* Quick Order Section */}
      <div className="border-t border-border p-3">
        <Link
          to="/prescriptions"
          title={collapsed ? t('uploadPrescription', 'Upload Prescription') : undefined}
          aria-label={t('uploadPrescription', 'Upload Prescription')}
          className={cn(
            'flex items-center justify-center gap-2 rounded-lg bg-primary font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            collapsed ? 'mx-auto h-10 w-10' : 'w-full p-3'
          )}
        >
          <FileUp className="h-5 w-5 shrink-0" aria-hidden="true" />
          {!collapsed && <span className="truncate">{t('quickOrder', 'Quick Order')}</span>}
        </Link>
      </div>

      {/* License Info */}
      {!collapsed && (
        <div className="border-t border-border bg-muted/40 p-4">
          <div className="text-center">
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-success/15 text-success">
              <ShieldCheck className="h-6 w-6" aria-hidden="true" />
            </div>
            <h4 className="text-sm font-semibold text-foreground">{t('licensedPharmacy', 'Licensed Pharmacy')}</h4>
            <p className="mt-1 text-xs text-muted-foreground">{t('mohLicense', 'MOH License #123456/789')}</p>
            <p className="text-xs text-muted-foreground/70">{t('certifiedSince', 'Certified since 2024')}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSidebar;
