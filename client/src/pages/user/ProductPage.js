import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronRight, Heart, LayoutGrid, SearchX, SlidersHorizontal, PackageOpen, Pill, Star } from 'lucide-react';
import { findSubcategoryByKey, findCategoryBySlug, categoryLink } from '../../lib/categoryDirectory';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import UserSidebar from '../../components/dashboard/UserSidebar';
import { useProducts } from '../../context/ProductDataContext';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Skeleton } from '../../components/ui/skeleton';
import { cn } from '../../lib/utils';

const ProductPage = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith('ar') ? 'ar' : 'en';
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { products, getProductsByCategory } = useProducts();
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('featured');

  const category = searchParams.get('category');
  const subcategory = searchParams.get('subcategory');
  const searchQuery = searchParams.get('search') || '';
  const nameParam = searchParams.get('name');

  const entry = subcategory ? findSubcategoryByKey(subcategory) : null;
  const catEntry = category ? findCategoryBySlug(category) : null;
  const pageTitle = nameParam
    ? decodeURIComponent(nameParam)
    : entry
      ? entry.sub[lang]
      : subcategory
        ? subcategory.charAt(0).toUpperCase() + subcategory.slice(1)
        : catEntry
          ? catEntry.title[lang]
          : category
            ? category.charAt(0).toUpperCase() + category.slice(1)
            : t('allProducts', 'All Products');

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      let filtered = products;
      
      if (category) {
        filtered = getProductsByCategory(category, subcategory);
      }
      
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        filtered = filtered.filter(p =>
          p.name.toLowerCase().includes(q) ||
          (p.description && p.description.toLowerCase().includes(q)) ||
          (p.subcategory && p.subcategory.toLowerCase().includes(q))
        );
      }
      
      setFilteredProducts(filtered);
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [category, subcategory, searchQuery]);

  const handleAddToCart = (product) => {
    addToCart(product, 1);
  };

  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc': return a.price - b.price;
      case 'price-desc': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      case 'name': return a.name.localeCompare(b.name);
      default: return 0;
    }
  });

  if (loading) {
    return (
      <div className="flex min-h-screen bg-background">
        <UserSidebar />
        <div className="flex-1 p-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {[...Array(8)].map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-4">
                    <Skeleton className="mb-3 h-48 w-full rounded-lg" />
                    <Skeleton className="mb-2 h-4 w-3/4" />
                    <Skeleton className="mb-2 h-3 w-1/2" />
                    <Skeleton className="h-9 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left Sidebar */}
      <UserSidebar />
      
      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="mx-auto max-w-7xl">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center text-sm text-muted-foreground" aria-label="Breadcrumb">
            <Link to="/" className="transition-colors hover:text-primary">{t('home', 'Home')}</Link>
            <ChevronRight className="mx-2 h-4 w-4 rtl:rotate-180" />
            <Link to="/products" className="transition-colors hover:text-primary">{t('products', 'Products')}</Link>
            {catEntry && (
              <>
                <ChevronRight className="mx-2 h-4 w-4 rtl:rotate-180" />
                <Link to={categoryLink(lang, category)} className="transition-colors hover:text-primary">
                  {catEntry.title[lang]}
                </Link>
              </>
            )}
            {(entry || nameParam) && (
              <>
                <ChevronRight className="mx-2 h-4 w-4 rtl:rotate-180" />
                <span className="text-foreground">
                  {nameParam ? decodeURIComponent(nameParam) : entry.sub[lang]}
                </span>
              </>
            )}
          </nav>

          {/* Header with Creative Design */}
          <div className="mb-8 rounded-2xl bg-gradient-to-r from-primary to-secondary p-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="mb-2 text-4xl font-bold">
                  {pageTitle}
                </h1>
                <p className="text-lg text-teal-50">
                  {filteredProducts.length} {t('productsFound', 'high-quality products found')}
                </p>
              </div>
              <div className="hidden md:block">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/20 text-primary">
                  <Pill className="h-11 w-11" strokeWidth={1.5} />
                </div>
              </div>
            </div>
          </div>

          {/* Filter & Sort Bar */}
          <Card className="mb-8 p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-2 font-medium text-foreground">
                  <SlidersHorizontal className="h-4 w-4" />
                  Sort by:
                </span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Rating</option>
                  <option value="name">Name A-Z</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">View:</span>
                <div className="flex items-center rounded-md border border-input p-0.5">
                  <Button variant="ghost" size="icon" className="h-8 w-8 bg-primary text-primary-foreground hover:bg-primary/90">
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Products Grid with Creative Cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {sortedProducts.map(product => (
              <Card 
                key={product.id}
                className="group overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg"
              >
                <div className="relative overflow-hidden">
                  <Link to={`/products/${product.id}`}>
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </Link>
                  {product.discount && (
                    <Badge className="absolute start-3 top-3 shadow">
                      -{product.discount}%
                    </Badge>
                  )}
                  {!product.inStock && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                      <span className="rounded-full bg-destructive px-4 py-2 font-bold text-destructive-foreground">
                        Out of Stock
                      </span>
                    </div>
                  )}
                  <div className="absolute end-3 top-3">
                    <button 
                      onClick={() => toggleWishlist(product)}
                      aria-label="Toggle wishlist"
                      className={cn(
                        'flex h-10 w-10 items-center justify-center rounded-full bg-background/90 shadow transition-colors hover:bg-background',
                        isInWishlist(product.id) && 'text-destructive'
                      )}
                    >
                      <Heart className={cn('h-5 w-5', isInWishlist(product.id) ? 'fill-current' : 'text-muted-foreground')} />
                    </button>
                  </div>
                </div>
                
                <CardContent className="p-5">
                  <Link to={`/products/${product.id}`}>
                    <div className="mb-2">
                      <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                        {product.subcategory}
                      </span>
                    </div>
                    
                    <h3 className="mb-2 line-clamp-2 font-bold text-foreground transition-colors group-hover:text-primary">
                      {product.name}
                    </h3>
                    
                    <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
                      {product.description}
                    </p>
                    
                    <div className="mb-3 flex items-center gap-1">
                      <div className="flex text-warning text-sm">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={cn('h-4 w-4', i < Math.floor(product.rating) ? 'fill-current' : 'text-muted-foreground/30')} />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">({product.reviews})</span>
                    </div>
                    
                    <div className="mb-4 flex items-center gap-2">
                      <span className="text-xl font-bold text-foreground">
                        SAR {product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          SAR {product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </Link>
                  
                  <Button 
                    onClick={() => handleAddToCart(product)}
                    disabled={!product.inStock}
                    className="w-full"
                  >
                    {product.inStock ? t('addToCart', 'Add to Cart') : t('outOfStock', 'Out of Stock')}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {sortedProducts.length === 0 && (
            <div className="rounded-2xl border border-border bg-card py-16 text-center shadow-sm">
              {entry ? (
                <>
                  <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
                    <PackageOpen className="h-12 w-12 text-primary" />
                  </div>
                  <h3 className="mb-3 text-2xl font-bold text-foreground">{t('comingSoon', 'Coming Soon')}</h3>
                  <p className="mx-auto mb-8 max-w-md text-muted-foreground">
                    {t('comingSoonDesc', 'This section is being stocked. Please check back soon — new products are added regularly.')}
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <Link to={categoryLink(lang, entry.category.slug)}>
                      <Button size="lg" className="bg-gradient-to-r from-primary to-secondary">
                        {t('browseCategory', 'Browse this category')}
                      </Button>
                    </Link>
                    <Link to="/products">
                      <Button size="lg" variant="outline">
                        {t('allProducts', 'All Products')}
                      </Button>
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <SearchX className="mx-auto mb-6 h-20 w-20 text-muted-foreground" />
                  <h3 className="mb-4 text-2xl font-bold text-foreground">{t('noProductsFound', 'No products found')}</h3>
                  <p className="mb-8 text-muted-foreground">{t('noProductsDesc', 'Try browsing other categories from the sidebar')}</p>
                  <Link to="/products">
                    <Button size="lg">
                      {t('browseAllCategories', 'Browse All Categories')}
                    </Button>
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
