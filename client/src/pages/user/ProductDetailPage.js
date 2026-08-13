import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronRight, Heart, Minus, Plus, ShoppingCart, Star, CheckCircle2, Image } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useProducts } from '../../context/ProductDataContext';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent } from '../../components/ui/card';
import { Textarea } from '../../components/ui/textarea';
import { Skeleton } from '../../components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { cn } from '../../lib/utils';

// Request a higher-resolution version of the product image so the detail
// page does not look pixelated next to the crisp list thumbnails.
const hiRes = (url, size = 800) => {
  if (!url) return url;
  return url
    .replace(/width=\d+/g, `width=${size}`)
    .replace(/height=\d+/g, `height=${size}`)
    .replace(/w=\d+/g, `w=${size}`)
    .replace(/h=\d+/g, `h=${size}`)
    .replace(/canvas=[\d.,]+/g, `canvas=${size},${size}`);
};

const ProductDetailPage = () => {
  const { id } = useParams();
  const { products } = useProducts();
  const { t } = useTranslation();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [reviewSent, setReviewSent] = useState(false);
  
  // Fetch product data
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const found = products.find(p => String(p.id) === String(id));
      setProduct(found || null);
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [id]);

  // Handle quantity change
  const handleQuantityChange = (value) => {
    if (!product) return;
    const newQuantity = quantity + value;
    if (newQuantity >= 1 && newQuantity <= p.stock) {
      setQuantity(newQuantity);
    }
  };

  // Handle add to cart
  const handleAddToCart = () => {
    if (product) {
      addToCart({
        ...product,
        quantity
      });
      
      setAdded(true);
      setTimeout(() => setAdded(false), 3000);
    }
  };

  // Handle wishlist toggle
  const toggleWishlist = () => {
    if (product) {
      if (isInWishlist(p.id)) {
        removeFromWishlist(p.id);
      } else {
        addToWishlist(product);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="grid w-full max-w-5xl grid-cols-1 gap-8 p-8 md:grid-cols-2">
          <Skeleton className="h-96 rounded-2xl" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-5 w-1/3" />
            <Skeleton className="h-12 w-1/2" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="mb-2 text-2xl font-bold text-foreground">{t('productNotFound', 'Product not found')}</h2>
          <p className="text-muted-foreground">{t('productNotFoundDesc', 'Sorry, the product you are looking for does not exist.')}</p>
        </div>
      </div>
    );
  }

  const raw = product;
  const p = {
    ...raw,
    stock: raw.inStock ? 1 : 0,
    images: (Array.isArray(raw.images) && raw.images.length)
      ? raw.images.map(img => hiRes(img))
      : [hiRes(raw.image)].filter(Boolean),
    details: (Array.isArray(raw.details) && raw.details.length)
      ? raw.details
      : [raw.description].filter(Boolean),
    usage: raw.usage || 'Follow the directions on the package or consult your pharmacist.',
    ingredients: raw.ingredients || 'See the product packaging for the full ingredient list.',
    tags: (Array.isArray(raw.tags) && raw.tags.length)
      ? raw.tags
      : [raw.subcategory, raw.category].filter(Boolean),
    relatedProducts: (Array.isArray(raw.relatedProducts) && raw.relatedProducts.length)
      ? raw.relatedProducts
      : [],
    sku: raw.sku || String(raw.id)
  };

  const inWishlist = isInWishlist(p.id);
  const discountPrice = p.discount > 0 ? (p.price * (1 - p.discount / 100)) : p.price;

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center text-sm text-muted-foreground">
          <Link to="/" className="transition-colors hover:text-primary">{t('home', 'Home')}</Link>
          <ChevronRight className="mx-2 h-4 w-4 rtl:rotate-180" aria-hidden="true" />
          <Link to="/products" className="transition-colors hover:text-primary">{t('products', 'Products')}</Link>
          <ChevronRight className="mx-2 h-4 w-4 rtl:rotate-180" aria-hidden="true" />
          <Link to={`/products?category=${encodeURIComponent(p.category)}`} className="transition-colors hover:text-primary">{p.category}</Link>
          <ChevronRight className="mx-2 h-4 w-4 rtl:rotate-180" aria-hidden="true" />
          <span className="text-foreground" aria-current="page">{p.name}</span>
        </nav>

        {/* Product Details */}
        <Card className="overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Product Images */}
            <div className="p-6 md:p-8">
              {/* Main Image */}
              <div className="mb-4 flex h-80 items-center justify-center overflow-hidden rounded-xl bg-muted">
                {p.images[activeImage] ? (
                  <img
                    src={p.images[activeImage]}
                    alt={p.name}
                    className="h-full w-full object-cover"
                    onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextSibling.style.display = 'flex'; }}
                  />
                ) : null}
                <div className="hidden h-full w-full items-center justify-center text-muted-foreground" aria-hidden="true">
                  <Image className="h-16 w-16" strokeWidth={1.2} />
                </div>
              </div>
              
              {/* Image Gallery */}
              <div className="grid grid-cols-4 gap-2">
                {p.images.map((image, index) => (
                  <button 
                    key={index}
                    onClick={() => setActiveImage(index)}
                    aria-label={`${t('viewImage', 'View image')} ${index + 1}`}
                    aria-pressed={activeImage === index}
                    className={cn(
                      'cursor-pointer overflow-hidden rounded-lg border-2 transition-colors',
                      activeImage === index
                        ? 'border-primary'
                        : 'border-transparent hover:border-primary/50'
                    )}
                  >
                    <div className="flex h-20 w-full items-center justify-center bg-muted text-xl text-muted-foreground">
                      {index + 1}
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Product Info */}
            <div className="border-t border-border p-6 md:border-t-0 md:border-s md:p-8">
              {/* Product Title */}
              <h1 className="mb-2 text-3xl font-bold text-foreground">
                {p.name}
              </h1>
              
              {/* Rating */}
              <div className="mb-4 flex items-center">
                <div className="flex text-warning" aria-hidden="true">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn('h-5 w-5', i < Math.floor(p.rating) ? 'fill-current' : 'stroke-current fill-none')}
                    />
                  ))}
                </div>
                <span className="ms-2 text-sm text-muted-foreground">
                  {p.rating} ({p.reviews} {t('reviews', 'reviews')})
                </span>
              </div>
              
              {/* Price */}
              <div className="mb-6">
                {p.discount > 0 ? (
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-3xl font-bold text-primary">
                      SAR {discountPrice.toFixed(2)}
                    </span>
                    <span className="text-lg text-muted-foreground line-through">
                      SAR {p.price.toFixed(2)}
                    </span>
                    <Badge variant="destructive">{p.discount}% OFF</Badge>
                  </div>
                ) : (
                  <span className="text-3xl font-bold text-primary">
                    SAR {p.price.toFixed(2)}
                  </span>
                )}
              </div>
              
              {/* Short Description */}
              <div className="mb-6">
                <p className="text-muted-foreground">
                  {p.description}
                </p>
              </div>
              
              {/* Stock Status */}
              <div className="mb-6 space-y-2">
                <div className="flex items-center">
                  <span className="me-2 text-sm font-medium text-foreground">
                    {t('availability')}:
                  </span>
                  {p.stock > 0 ? (
                    <Badge variant="success">
                      {t('inStock')} ({p.stock} {t('available')})
                    </Badge>
                  ) : (
                    <Badge variant="destructive">
                      {t('outOfStock')}
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center">
                  <span className="me-2 text-sm font-medium text-foreground">
                    SKU:
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {p.sku}
                  </span>
                </div>
              </div>
              
              {/* Product Actions */}
              <div>
                {/* Quantity Selector */}
                <div className="mb-6 flex items-center">
                  <span className="me-4 text-sm font-medium text-foreground">
                    {t('quantity', 'Quantity')}:
                  </span>
                  <div className="flex items-center rounded-md border border-input">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                      aria-label={t('decreaseQuantity', 'Decrease quantity')}
                      className="h-10 w-10"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-medium text-foreground" aria-live="polite">
                      {quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= p.stock}
                      aria-label={t('increaseQuantity', 'Increase quantity')}
                      className="h-10 w-10"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                {/* Add to Cart Button */}
                <Button
                  onClick={handleAddToCart}
                  disabled={p.stock <= 0}
                  size="lg"
                  className="mb-4 w-full gap-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {p.stock > 0 ? t('addToCart', 'Add to Cart') : t('outOfStock', 'Out of Stock')}
                </Button>
                {added && (
                  <p role="status" className="mb-4 flex items-center gap-2 rounded-lg bg-success/15 p-3 text-sm text-success">
                    <CheckCircle2 className="h-4 w-4" />
                    {t('addedToCart', 'Product added to cart!')}
                  </p>
                )}
                
                {/* Wishlist Button */}
                <Button
                  onClick={toggleWishlist}
                  aria-label={inWishlist ? t('removeFromWishlist', 'Remove from Wishlist') : t('addToWishlist', 'Add to Wishlist')}
                  variant={inWishlist ? 'destructive' : 'outline'}
                  className="w-full gap-2"
                >
                  <Heart className={cn('h-5 w-5', inWishlist && 'fill-current')} />
                  {inWishlist ? t('removeFromWishlist', 'Remove from Wishlist') : t('addToWishlist', 'Add to Wishlist')}
                </Button>
              </div>
              
              {/* Tags */}
              <div className="mt-6 flex flex-wrap gap-2">
                {p.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          {/* Product Tabs */}
          <div className="border-t border-border">
            <Tabs defaultValue="description">
              <TabsList className="w-full justify-start rounded-none border-b border-border bg-transparent p-0">
                <TabsTrigger value="description" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
                  {t('description')}
                </TabsTrigger>
                <TabsTrigger value="details" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
                  {t('details')}
                </TabsTrigger>
                <TabsTrigger value="ingredients" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
                  {t('ingredients')}
                </TabsTrigger>
                <TabsTrigger value="reviews" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
                  {t('reviews')} ({p.reviews})
                </TabsTrigger>
              </TabsList>
              
              <div className="p-6 md:p-8">
                {/* Description Tab */}
                <TabsContent value="description">
                  <p className="text-muted-foreground">
                    {p.description}
                  </p>
                </TabsContent>
                
                {/* Details Tab */}
                <TabsContent value="details">
                  <h3 className="mb-4 text-lg font-medium text-foreground">
                    {t('productDetails')}
                  </h3>
                  <ul className="list-disc space-y-2 ps-5 text-muted-foreground">
                    {p.details.map((detail, index) => (
                      <li key={index}>{detail}</li>
                    ))}
                  </ul>
                  
                  <h3 className="mb-4 mt-6 text-lg font-medium text-foreground">
                    {t('recommendedUsage')}
                  </h3>
                  <p className="text-muted-foreground">
                    {p.usage}
                  </p>
                </TabsContent>
                
                {/* Ingredients Tab */}
                <TabsContent value="ingredients">
                  <h3 className="mb-4 text-lg font-medium text-foreground">
                    {t('ingredients')}
                  </h3>
                  <p className="text-muted-foreground">
                    {p.ingredients}
                  </p>
                </TabsContent>
                
                {/* Reviews Tab */}
                <TabsContent value="reviews">
                  <h3 className="mb-4 text-lg font-medium text-foreground">
                    {t('customerReviews')}
                  </h3>
                  <div className="mb-6 flex items-center">
                    <div className="flex text-warning me-2" aria-hidden="true">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn('h-5 w-5', i < Math.floor(p.rating) ? 'fill-current' : 'stroke-current fill-none')}
                        />
                      ))}
                    </div>
                    <span className="text-lg font-medium text-foreground">
                      {p.rating} out of 5
                    </span>
                  </div>
                  
                  <p className="mb-4 text-muted-foreground">
                    {p.reviews} {t('customerReviews')}
                  </p>
                  
                  {!showReviewForm && (
                    <Button
                      onClick={() => setShowReviewForm(true)}
                    >
                      {t('writeReview')}
                    </Button>
                  )}
                  
                  {showReviewForm && (
                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (reviewText.trim()) {
                          setReviewSent(true);
                          setShowReviewForm(false);
                          setReviewText('');
                          setTimeout(() => setReviewSent(false), 4000);
                        }
                      }}
                      className="space-y-4"
                    >
                      <div>
                        <label htmlFor="review-text" className="mb-1 block text-sm font-medium text-foreground">
                          {t('yourReview', 'Your Review')}
                        </label>
                        <Textarea
                          id="review-text"
                          required
                          rows={4}
                          value={reviewText}
                          onChange={(e) => setReviewText(e.target.value)}
                          placeholder={t('yourReview', 'Write your review...')}
                        />
                      </div>
                      <div className="flex gap-3">
                        <Button type="submit">
                          {t('submitReview', 'Submit Review')}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setShowReviewForm(false)}
                        >
                          {t('cancel', 'Cancel')}
                        </Button>
                      </div>
                    </form>
                  )}
                  
                  {reviewSent && (
                    <p role="status" className="mt-4 flex items-center gap-2 rounded-lg bg-success/15 p-3 text-sm text-success">
                      <CheckCircle2 className="h-4 w-4" />
                      {t('reviewSubmitted', 'Thank you! Your review has been submitted.')}
                    </p>
                  )}
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </Card>
        
        {/* Related Products */}
        {p.relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="mb-6 text-2xl font-bold text-foreground">
            {t('relatedProducts')}
          </h2>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {p.relatedProducts.map((relatedProduct) => (
              <Link 
                key={relatedProduct.id}
                to={`/products/${relatedProduct.id}`}
                className="group"
              >
                <Card className="transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
                  <CardContent className="p-4">
                    <div className="mb-4 flex h-40 items-center justify-center rounded-lg bg-muted">
                      {relatedProduct.image ? (
                        <img
                          src={relatedProduct.image}
                          alt={relatedProduct.name}
                          className="h-full w-full rounded-lg object-cover"
                          onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextSibling.style.display = 'flex'; }}
                        />
                      ) : null}
                      <div className="hidden h-full w-full items-center justify-center text-muted-foreground" aria-hidden="true">
                        <Image className="h-12 w-12" strokeWidth={1.2} />
                      </div>
                    </div>
                    <h3 className="mb-2 font-medium text-foreground transition-colors group-hover:text-primary">
                      {relatedProduct.name}
                    </h3>
                    <p className="font-bold text-primary">
                      SAR {relatedProduct.price.toFixed(2)}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
