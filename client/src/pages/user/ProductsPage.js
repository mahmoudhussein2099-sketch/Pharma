import React, { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Check, ChevronDown, PackageSearch, RotateCcw, Search, SlidersHorizontal, X } from 'lucide-react';
import { useProducts } from '../../context/ProductDataContext';
import ProductCard from '../../components/product/ProductCard';
import CampaignBannerCard from '../../components/ui/CampaignBannerCard';
import { localizeCategory, localizeSubcategory } from '../../lib/categoryLabels';

const SORT_OPTIONS = [
  { value: 'featured', labelKey: 'sortFeatured' },
  { value: 'price-asc', labelKey: 'sortPriceAsc' },
  { value: 'price-desc', labelKey: 'sortPriceDesc' },
  { value: 'rating', labelKey: 'sortRating' },
  { value: 'discount', labelKey: 'sortDiscount' },
  { value: 'name', labelKey: 'sortName' },
];

const ProductsPage = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n?.language || 'en';
  const { products, loading } = useProducts();
  const [searchParams] = useSearchParams();

  const urlCategory = searchParams.get('category') || '';
  const urlSubcategory = searchParams.get('subcategory') || '';

  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategories, setSelectedCategories] = useState(
    urlCategory ? [urlCategory] : []
  );
  const [selectedSubcategory, setSelectedSubcategory] = useState(urlSubcategory || '');
  const [expandedCategory, setExpandedCategory] = useState(urlCategory || '');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [brandQuery, setBrandQuery] = useState('');
  const [showAllBrands, setShowAllBrands] = useState(false);

  const categoryCounts = useMemo(() => {
    const map = {};
    for (const p of products) {
      const c = p.category || 'other';
      map[c] = (map[c] || 0) + 1;
    }
    return map;
  }, [products]);

  const subcategoryCounts = useMemo(() => {
    const map = {};
    for (const p of products) {
      const c = p.category || 'other';
      const s = p.subcategory || 'Other';
      map[c] = map[c] || {};
      map[c][s] = (map[c][s] || 0) + 1;
    }
    return map;
  }, [products]);

  const brandCounts = useMemo(() => {
    const map = {};
    for (const p of products) {
      const b = p.brand || 'Other';
      map[b] = (map[b] || 0) + 1;
    }
    return map;
  }, [products]);

  const categoryList = useMemo(
    () => Object.keys(categoryCounts).sort((a, b) => categoryCounts[b] - categoryCounts[a]),
    [categoryCounts]
  );
  const brandList = useMemo(
    () => Object.keys(brandCounts).sort((a, b) => brandCounts[b] - brandCounts[a]),
    [brandCounts]
  );

  const visibleBrands = useMemo(() => {
    const q = brandQuery.trim().toLowerCase();
    let list = brandList;
    if (q) list = list.filter((b) => b.toLowerCase().includes(q));
    if (!showAllBrands && !q) list = list.slice(0, 20);
    return list;
  }, [brandList, brandQuery, showAllBrands]);

  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return products.filter((p) => {
      if (q) {
        const name = String(p.name || '');
        const nameAr = String(p.nameAr || '');
        const brand = String(p.brand || '');
        const category = String(p.category || '');
        const subcategory = String(p.subcategory || '');
        const categoryLabelEn = localizeCategory(p.category, 'en', p.category || '');
        const categoryLabelAr = localizeCategory(p.category, 'ar', p.category || '');
        const subcategoryLabelEn = localizeSubcategory(p.subcategory, 'en', p.subcategory || '');
        const subcategoryLabelAr = localizeSubcategory(p.subcategory, 'ar', p.subcategory || '');
        const haystack = [
          name,
          nameAr,
          brand,
          category,
          subcategory,
          categoryLabelEn,
          categoryLabelAr,
          subcategoryLabelEn,
          subcategoryLabelAr,
        ]
          .join(' ')
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      if (selectedCategories.length > 0 && !selectedCategories.includes(p.category)) return false;
      if (selectedSubcategory && p.subcategory !== selectedSubcategory) return false;
      if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand || 'Other')) return false;
      if (inStockOnly && p.inStock === false) return false;
      return true;
    });
  }, [products, searchTerm, selectedCategories, selectedSubcategory, selectedBrands, inStockOnly, lang]);

  const results = useMemo(() => {
    const list = [...filtered];
    switch (sortBy) {
      case 'price-asc':
        list.sort((a, b) => Number(a.price || 0) - Number(b.price || 0));
        break;
      case 'price-desc':
        list.sort((a, b) => Number(b.price || 0) - Number(a.price || 0));
        break;
      case 'rating':
        list.sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0));
        break;
      case 'discount':
        list.sort((a, b) => Number(b.discount || 0) - Number(a.discount || 0));
        break;
      case 'name':
        list.sort((a, b) => String(a.name || '').localeCompare(String(b.name || ''), lang));
        break;
      default:
        list.sort(
          (a, b) =>
            Number(b.rating || 0) - Number(a.rating || 0) || Number(b.reviews || 0) - Number(a.reviews || 0)
        );
    }
    return list;
  }, [filtered, sortBy, lang]);

  const toggleCategory = (cat) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories((prev) => prev.filter((c) => c !== cat));
      if (selectedSubcategory) setSelectedSubcategory('');
      return;
    }
    setSelectedCategories((prev) => [...prev, cat]);
    setSelectedSubcategory('');
    setExpandedCategory(cat);
  };

  const toggleSubcategory = (cat, sub) => {
    if (selectedCategories.includes(cat) && selectedSubcategory === sub) {
      setSelectedCategories((prev) => prev.filter((c) => c !== cat));
      setSelectedSubcategory('');
      return;
    }
    setSelectedCategories([cat]);
    setSelectedSubcategory(sub);
    setExpandedCategory(cat);
  };

  const toggleBrand = (brand) =>
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );

  const clearAll = () => {
    setSelectedCategories([]);
    setSelectedSubcategory('');
    setExpandedCategory('');
    setSelectedBrands([]);
    setBrandQuery('');
    setShowAllBrands(false);
    setInStockOnly(false);
    setSearchTerm('');
    setSortBy('featured');
  };

  const activeFilterCount =
    selectedCategories.length + selectedBrands.length + (inStockOnly ? 1 : 0);

  const renderFilterPanel = () => (
    <div className="flex h-full flex-col gap-6">
      {/* Categories */}
      <fieldset aria-label={t('filterByCategory', 'Filter by category')}>
        <legend className="mb-3 text-sm font-bold text-foreground">
          {t('categories', 'Categories')}
        </legend>
        <div className="space-y-1.5">
          {categoryList.map((cat) => {
            const active = selectedCategories.includes(cat);
            const expanded = expandedCategory === cat;
            const subs = Object.keys(subcategoryCounts[cat] || {}).sort(
              (a, b) => subcategoryCounts[cat][b] - subcategoryCounts[cat][a]
            );
            return (
              <div key={cat} className="overflow-hidden rounded-xl border border-border">
                <button
                  type="button"
                  onClick={() => {
                    setExpandedCategory(expanded ? '' : cat);
                    if (expanded && selectedCategories.includes(cat)) {
                      setSelectedCategories((prev) => prev.filter((c) => c !== cat));
                      setSelectedSubcategory('');
                    }
                  }}
                  aria-expanded={expanded}
                  className={`flex w-full items-center gap-2 px-3 py-2.5 text-sm font-medium transition-colors ${
                    active
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card text-foreground hover:bg-accent'
                  }`}
                >
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 transition-transform ${expanded ? 'rotate-180' : ''}`}
                  />
                  <span className="flex-1 text-start">{localizeCategory(cat, lang, cat)}</span>
                  <span className={`text-xs ${active ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                    {categoryCounts[cat]}
                  </span>
                </button>
                {expanded && (
                  <div className="border-t border-border bg-muted/40 p-2">
                    <button
                      type="button"
                      onClick={() => toggleCategory(cat)}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                        active && !selectedSubcategory
                          ? 'bg-primary/10 font-semibold text-primary'
                          : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                      }`}
                    >
                      <span>{t('allCategory', 'All')}</span>
                      <span className="text-xs">{categoryCounts[cat]}</span>
                    </button>
                    {subs.map((sub) => {
                      const subActive = active && selectedSubcategory === sub;
                      return (
                        <button
                          key={sub}
                          type="button"
                          onClick={() => toggleSubcategory(cat, sub)}
                          className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                            subActive
                              ? 'bg-primary/10 font-semibold text-primary'
                              : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                          }`}
                        >
                          <span className="text-start">{localizeSubcategory(sub, lang, sub)}</span>
                          <span className="text-xs">{subcategoryCounts[cat][sub]}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </fieldset>

      {/* Brands */}
      {brandList.length > 0 && (
        <fieldset aria-label={t('filterByBrand', 'Filter by brand')}>
          <legend className="mb-3 text-sm font-bold text-foreground">{t('brands', 'Brands')}</legend>
          <div className="relative mb-2">
            <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={brandQuery}
              onChange={(e) => setBrandQuery(e.target.value)}
              placeholder={t('searchBrands', 'Search brands…')}
              aria-label={t('searchBrands', 'Search brands…')}
              className="w-full rounded-xl border border-border bg-background py-2 ps-9 pe-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <div className="space-y-1.5">
            {visibleBrands.map((brand) => {
              const active = selectedBrands.includes(brand);
              return (
                <label
                  key={brand}
                  className="flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-2 transition-colors hover:border-primary/50"
                  style={{ borderColor: active ? 'var(--color-primary)' : 'var(--border)' }}
                >
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={() => toggleBrand(brand)}
                    className="h-4 w-4 accent-[var(--color-primary)]"
                  />
                  <span className="flex-1 text-sm text-foreground">{brand}</span>
                  <span className="text-xs text-muted-foreground">{brandCounts[brand]}</span>
                </label>
              );
            })}
            {visibleBrands.length === 0 && (
              <p className="px-2 py-1 text-sm text-muted-foreground">
                {t('noBrandsFound', 'No brands match your search')}
              </p>
            )}
          </div>
          {brandList.length > 20 && (
            <button
              type="button"
              onClick={() => setShowAllBrands((v) => !v)}
              className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
            >
              {showAllBrands ? t('showLess', 'Show less') : t('showAll', 'Show all')}
              <ChevronDown className={`h-4 w-4 transition-transform ${showAllBrands ? 'rotate-180' : ''}`} />
            </button>
          )}
        </fieldset>
      )}

      {/* Availability */}
      <fieldset aria-label={t('availability', 'Availability')}>
        <legend className="mb-3 text-sm font-bold text-foreground">
          {t('availability', 'Availability')}
        </legend>
        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-border px-3 py-2 transition-colors hover:border-primary/50">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={() => setInStockOnly((v) => !v)}
            className="h-4 w-4 accent-[var(--color-primary)]"
          />
          <span className="text-sm text-foreground">{t('inStockOnly', 'In stock only')}</span>
        </label>
      </fieldset>

      {activeFilterCount > 0 && (
        <button
          type="button"
          onClick={clearAll}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:border-destructive/40 hover:text-destructive"
        >
          <RotateCcw className="h-4 w-4" />
          {t('clearFilters', 'Clear filters')} ({activeFilterCount})
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Top Compact Wide Catalog Banner Strip */}
      <section className="bg-slate-100 dark:bg-slate-950 py-3 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <CampaignBannerCard
            src="/images/ads/promo-products.png"
            alt="صيدلية عون القحطاني - كتالوج الأدوية والمستحضرات المعتمدة"
            to="/products"
            badgeText={lang === 'ar' ? 'صيدلية عون القحطاني - الكتالوج المعتمد' : 'Awon Al-Qahtani Pharmacy Catalog'}
            maxH="220px"
          />
        </div>
      </section>

      {/* Page header band */}
      <section className="bg-cinematic relative overflow-hidden border-b border-border">
        <div className="bg-dots-brand absolute inset-0 opacity-40" />
        <div className="vignette" />
        <div className="relative container mx-auto px-4 py-14 text-center md:py-20">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
            {t('productsEyebrow', 'Awon Pharmacy')}
          </p>
          <h1 className="mb-3 text-3xl font-extrabold tracking-tight text-foreground md:text-5xl">
            {t('ourProducts', 'Our Products')}
          </h1>
          <p className="mx-auto mb-8 max-w-xl text-muted-foreground">
            {t('productsSubtitle', 'Browse our full catalogue of trusted medications and healthcare products')}
          </p>

          {/* Search */}
          <div className="relative mx-auto max-w-2xl">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="relative"
              role="search"
              aria-label={t('searchProducts', 'Search products…')}
            >
              <Search className="pointer-events-none absolute start-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t('searchProducts', 'Search products…')}
                aria-label={t('searchProducts', 'Search products…')}
                className="w-full rounded-2xl border border-border bg-background/80 py-3.5 ps-12 pe-10 text-base text-foreground shadow-glass backdrop-blur-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  aria-label={t('clearSearch', 'Clear search')}
                  className="absolute end-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:bg-accent hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </form>
            {searchTerm.trim() !== '' && (
              <p className="mt-3 text-sm text-muted-foreground">
                {results.length} {t('products', 'products')} {t('matchingSearch', 'matching your search')}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Toolbar */}
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            {results.length} {t('products', 'products')}
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setFiltersOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground shadow-glass transition-colors hover:border-primary/50 lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" />
              {t('filters', 'Filters')}
              {activeFilterCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-bold text-primary-foreground">
                  {activeFilterCount}
                </span>
              )}
            </button>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label={t('sortBy', 'Sort by')}
                className="appearance-none rounded-xl border border-border bg-card py-2 pe-10 ps-4 text-sm font-semibold text-foreground shadow-glass focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {t(opt.labelKey, opt.value)}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute end-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-8">
          {/* Desktop filters */}
          <aside className="sticky top-24 hidden h-fit max-h-[calc(100vh-8rem)] overflow-auto rounded-2xl border border-border bg-card p-5 shadow-glass lg:block">
            {renderFilterPanel()}
          </aside>

          {/* Grid */}
          <div>
            {loading && results.length === 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-80 animate-pulse rounded-2xl border border-border bg-muted" />
                ))}
              </div>
            ) : results.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/50 py-20 text-center">
                <PackageSearch className="mb-4 h-16 w-16 text-muted-foreground/40" />
                <h2 className="mb-1 text-xl font-bold text-foreground">
                  {t('noProductsTitle', 'No products found')}
                </h2>
                <p className="mb-6 max-w-sm text-sm text-muted-foreground">
                  {t('noProductsSub', 'Try adjusting your search or filters to find what you are looking for.')}
                </p>
                <button
                  type="button"
                  onClick={clearAll}
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-card3d"
                >
                  <RotateCcw className="h-4 w-4" />
                  {t('resetAll', 'Reset all')}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                {results.map((product) => (
                  <ProductCard key={String(product.id)} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filters drawer */}
      {filtersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label={t('filters', 'Filters')}>
          <div
            className="absolute inset-0 bg-background/60 backdrop-blur-sm"
            onClick={() => setFiltersOpen(false)}
          />
          <div className="absolute inset-y-0 start-0 flex w-[88%] max-w-sm flex-col bg-card shadow-card3d">
            <div className="flex items-center justify-between border-b border-border p-4">
              <h2 className="text-lg font-bold text-foreground">{t('filters', 'Filters')}</h2>
              <button
                type="button"
                onClick={() => setFiltersOpen(false)}
                aria-label={t('closeFilters', 'Close filters')}
                className="rounded-full p-2 text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-auto p-5">{renderFilterPanel()}</div>
            <div className="border-t border-border p-4">
              <button
                type="button"
                onClick={() => setFiltersOpen(false)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground shadow-premium hover:bg-primary/90"
              >
                <Check className="h-4 w-4" />
                {t('showResults', 'Show results')} ({results.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
