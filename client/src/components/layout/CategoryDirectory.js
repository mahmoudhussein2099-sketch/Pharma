import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, LayoutGrid } from 'lucide-react';
import { CATEGORY_DIRECTORY, categoryLink, subcategoryLink } from '../../lib/categoryDirectory';

const CategoryDirectory = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith('ar') ? 'ar' : 'en';
  const count = CATEGORY_DIRECTORY.reduce((acc, cat) => acc + cat.subs.length, 0);

  return (
    <section className="border-b border-border/60 bg-background/40 py-14" aria-labelledby="category-directory-title">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex flex-col items-center text-center">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            <LayoutGrid className="h-3.5 w-3.5" aria-hidden="true" />
            {t('browseAllCategories', 'Browse All Categories')}
          </span>
          <h2
            id="category-directory-title"
            className="text-gradient mb-2 text-3xl font-extrabold md:text-4xl"
          >
            {t('shopByCategory', 'Shop by Category')}
          </h2>
          <p className="mx-auto max-w-xl text-sm text-muted-foreground">
            {t('categoryDirectorySubtitle', `Explore our full range across ${count}+ subcategories, all in one place`)}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {CATEGORY_DIRECTORY.map((cat) => (
            <div
              key={cat.id}
              className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg"
            >
              <Link
                to={categoryLink(lang, cat.slug)}
                className="mb-4 flex items-center justify-between gap-2 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 px-4 py-3 transition-colors hover:from-primary/15 hover:to-secondary/15"
              >
                <span className="text-sm font-bold leading-snug text-foreground">
                  {cat.title[lang]}
                </span>
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-white transition-transform duration-300 group-hover:-translate-x-0.5 rtl:rotate-180">
                  <ChevronLeft className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
                </span>
              </Link>

              <ul className="space-y-1.5">
                {cat.subs.map((sub) => (
                  <li key={sub.ar}>
                    <Link
                      to={subcategoryLink(lang, cat.slug, sub)}
                      className="inline-flex items-start gap-1.5 text-xs text-foreground/70 transition-colors hover:text-primary"
                    >
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-secondary group-hover:bg-primary/60" aria-hidden="true" />
                      {sub[lang]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryDirectory;
