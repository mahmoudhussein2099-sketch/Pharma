import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useProducts } from '../../context/ProductDataContext';
import { CATEGORY_ICONS, CATEGORY_GRADIENTS } from '../icons/CategoryIcons';

const CATEGORY_ORDER = ['prescription', 'otc', 'vitamins', 'baby', 'beauty', 'medical', 'firstaid', 'eye'];

const CategoriesShowcase = () => {
  const { t } = useTranslation();
  const { products } = useProducts();

  const categories = useMemo(() => {
    const counts = {};
    for (const p of products) {
      counts[p.category] = (counts[p.category] || 0) + 1;
    }
    return CATEGORY_ORDER
      .filter((slug) => (counts[slug] || 0) > 0)
      .map((slug) => ({
        slug,
        name: t(`dashboard.${slug}`),
        count: counts[slug],
        gradient: CATEGORY_GRADIENTS[slug],
        Icon: CATEGORY_ICONS[slug]
      }));
  }, [t, products]);

  return (
    <section className="bg-muted/40 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-foreground">
            {t('exploreCategories', 'Explore Categories')}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {t('exploreCategoriesSubtitle', 'Browse our wide range of healthcare categories')}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const Icon = category.Icon;
            return (
              <Link
                key={category.slug}
                to={`/products?category=${category.slug}`}
                className="group h-full"
                aria-label={category.name}
              >
                <div className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-card shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                  <div className={`relative h-44 overflow-hidden bg-gradient-to-br ${category.gradient}`}>
                    <div className="absolute -end-10 -top-10 h-32 w-32 rounded-full bg-white/20 blur-2xl transition-opacity duration-300 group-hover:opacity-100"></div>
                    <div className="absolute -start-6 bottom-0 h-24 w-40 rounded-full bg-black/10 blur-xl"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent"></div>

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-card/95 text-primary shadow-xl backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6">
                        <Icon className="h-10 w-10" aria-hidden="true" />
                      </div>
                    </div>

                    <div className="absolute bottom-0 start-0 end-0 p-6 text-center">
                      <h3 className="text-xl font-bold text-white">{category.name}</h3>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col items-center justify-between p-6 text-center">
                    <p className="mb-4 text-muted-foreground">
                      {t(`dashboard.${category.slug}Desc`, category.count + ' products in this category, ready for delivery.')}
                    </p>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1.5 font-semibold text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      {category.count} {t('products', 'products')}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 group-hover:rtl:-translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoriesShowcase;
