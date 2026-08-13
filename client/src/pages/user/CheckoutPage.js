// src/pages/user/CheckoutPage.js
// Real checkout: validates a promo code against the API and submits the
// order to /api/orders/create (Cash on Delivery for the pharmacy model).
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Ticket, Loader2, CheckCircle2, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const FREE_SHIPPING_THRESHOLD = 200;
const SHIPPING_FEE = 15;

const CheckoutPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();

  const subtotal = cart.reduce((sum, item) => sum + (Number(item.price) * Number(item.quantity)), 0);
  const [coupon, setCoupon] = useState('');
  const [couponState, setCouponState] = useState({ applied: null, discount: 0, loading: false, error: '' });

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = Math.round((subtotal - couponState.discount + shipping) * 100) / 100;

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'cod',
    notes: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [placedOrder, setPlacedOrder] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const applyCoupon = async () => {
    const code = coupon.trim();
    if (!code) return;
    setCouponState((s) => ({ ...s, loading: true, error: '' }));
    try {
      const res = await fetch('/api/admin/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, subtotal }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.valid) {
        setCouponState((s) => ({ ...s, loading: false, applied: null, discount: 0, error: data.message || data.error || 'Invalid promo code' }));
        return;
      }
      setCouponState({ applied: code, discount: Number(data.discount) || 0, loading: false, error: '' });
    } catch (e) {
      setCouponState((s) => ({ ...s, loading: false, error: 'Could not validate promo code. Please try again.' }));
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');
    try {
      const res = await fetch('/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: `${formData.firstName} ${formData.lastName}`.trim(),
          phone: formData.phone,
          email: formData.email,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          paymentMethod: 'cod',
          couponCode: couponState.applied || undefined,
          items: cart.map((it) => ({
            id: it.id,
            name: it.name,
            price: Number(it.price),
            quantity: it.quantity,
            image: it.image,
          })),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || data.message || 'Could not place your order');
      }
      setPlacedOrder(data.order);
      clearCart();
      setStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (cart.length === 0 && step !== 3) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <ShoppingBag className="h-8 w-8 text-muted-foreground" />
          </div>
          <h1 className="mb-2 text-2xl font-bold text-foreground">Your cart is empty</h1>
          <p className="mb-6 text-muted-foreground">Add some products before checking out.</p>
          <button
            onClick={() => navigate('/products')}
            className="rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground hover:bg-primary/90"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <h1 className="mb-8 text-3xl font-bold text-foreground">{t('checkout', 'Checkout')}</h1>

        {step !== 3 && (
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {[1, 2].map((i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full ${step >= i ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                    {i}
                  </div>
                  <span className="mt-2 text-sm text-muted-foreground">
                    {i === 1 ? t('information', 'Information') : t('confirmation', 'Confirmation')}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-2 h-1 bg-muted">
              <div className="h-full bg-primary transition-all" style={{ width: `${(step - 1) * 100}%` }} />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {step === 1 && (
              <form onSubmit={handleNext} className="rounded-2xl bg-card p-6 shadow-lg">
                <h2 className="mb-6 text-xl font-bold text-foreground">{t('customerInformation', 'Customer Information')}</h2>
                <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className="mb-1 block text-sm font-medium text-foreground">First Name *</label>
                    <input type="text" id="firstName" name="firstName" autoComplete="given-name" required value={formData.firstName} onChange={handleChange} className="w-full rounded-lg border border-input bg-background p-3 text-foreground" />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="mb-1 block text-sm font-medium text-foreground">Last Name *</label>
                    <input type="text" id="lastName" name="lastName" autoComplete="family-name" required value={formData.lastName} onChange={handleChange} className="w-full rounded-lg border border-input bg-background p-3 text-foreground" />
                  </div>
                  <div>
                    <label htmlFor="checkout-email" className="mb-1 block text-sm font-medium text-foreground">Email *</label>
                    <input type="email" id="checkout-email" name="email" autoComplete="email" required value={formData.email} onChange={handleChange} className="w-full rounded-lg border border-input bg-background p-3 text-foreground" />
                  </div>
                  <div>
                    <label htmlFor="checkout-phone" className="mb-1 block text-sm font-medium text-foreground">Phone *</label>
                    <input type="tel" id="checkout-phone" name="phone" autoComplete="tel" dir="ltr" required value={formData.phone} onChange={handleChange} placeholder="+966 5x xxx xxxx" className="w-full rounded-lg border border-input bg-background p-3 text-foreground" />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="address" className="mb-1 block text-sm font-medium text-foreground">Address *</label>
                    <input type="text" id="address" name="address" autoComplete="street-address" required value={formData.address} onChange={handleChange} className="w-full rounded-lg border border-input bg-background p-3 text-foreground" />
                  </div>
                  <div>
                    <label htmlFor="city" className="mb-1 block text-sm font-medium text-foreground">City *</label>
                    <input type="text" id="city" name="city" autoComplete="address-level2" required value={formData.city} onChange={handleChange} className="w-full rounded-lg border border-input bg-background p-3 text-foreground" />
                  </div>
                  <div>
                    <label htmlFor="postalCode" className="mb-1 block text-sm font-medium text-foreground">Postal Code</label>
                    <input type="text" id="postalCode" name="postalCode" autoComplete="postal-code" value={formData.postalCode} onChange={handleChange} className="w-full rounded-lg border border-input bg-background p-3 text-foreground" />
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="notes" className="mb-1 block text-sm font-medium text-foreground">Order Notes (optional)</label>
                  <textarea id="notes" name="notes" rows="2" value={formData.notes} onChange={handleChange} placeholder="Any special instructions for delivery..." className="w-full rounded-lg border border-input bg-background p-3 text-foreground" />
                </div>

                <div className="flex justify-end">
                  <button type="submit" className="rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground hover:bg-primary/90">
                    {t('continue', 'Continue')}
                  </button>
                </div>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handlePlaceOrder} className="rounded-2xl bg-card p-6 shadow-lg">
                <h2 className="mb-6 text-xl font-bold text-foreground">Payment Method</h2>

                <div className="mb-6 rounded-lg border border-border p-4">
                  <label className="flex cursor-pointer items-start gap-3">
                    <input type="radio" name="paymentMethod" value="cod" checked className="mt-1" readOnly />
                    <div>
                      <p className="font-medium text-foreground">Cash on Delivery (COD)</p>
                      <p className="text-sm text-muted-foreground">Pay in cash when your order arrives. We will call you to confirm before dispatch.</p>
                    </div>
                  </label>
                </div>

                <div className="mb-6 rounded-lg border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
                  <p className="font-medium text-foreground">Delivery to:</p>
                  <p>{formData.firstName} {formData.lastName} · {formData.phone}</p>
                  <p>{formData.address}, {formData.city} {formData.postalCode}</p>
                </div>

                {submitError && (
                  <div className="mb-4 rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">{submitError}</div>
                )}

                <div className="flex justify-between">
                  <button type="button" onClick={() => setStep(1)} className="rounded-lg border border-border px-6 py-3 font-medium text-foreground hover:bg-muted">
                    {t('back', 'Back')}
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
                  >
                    {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                    {submitting ? 'Placing order...' : `Place Order · SAR ${total.toFixed(2)}`}
                  </button>
                </div>
              </form>
            )}

            {step === 3 && placedOrder && (
              <div className="rounded-2xl bg-card p-6 text-center shadow-lg">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-success/15" aria-hidden="true">
                  <CheckCircle2 className="h-10 w-10 text-success" />
                </div>
                <h2 className="mb-2 text-2xl font-bold text-foreground">Order Confirmed!</h2>
                <p className="mb-1 text-muted-foreground">Thank you, {formData.firstName}. We received your order and will contact you to confirm delivery.</p>
                <p className="mb-6 text-sm text-foreground">
                  Order #<span className="font-bold text-primary">{placedOrder.id}</span> · Total <span className="font-bold">SAR {Number(placedOrder.total).toFixed(2)}</span>
                </p>
                <div className="flex justify-center gap-3">
                  <button onClick={() => navigate('/products')} className="rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground hover:bg-primary/90">
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl bg-card p-6 shadow-lg">
              <h2 className="mb-6 text-xl font-bold text-foreground">{t('orderSummary', 'Order Summary')}</h2>

              <div className="mb-6 max-h-64 space-y-4 overflow-y-auto pe-1">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center">
                    <div className="me-4 flex h-16 w-16 items-center justify-center overflow-hidden rounded bg-muted">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain" />
                      ) : (
                        <ShoppingBag className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-foreground">{item.name}</h4>
                      <p className="text-xs text-muted-foreground">{t('quantity', 'Quantity')}: {item.quantity}</p>
                    </div>
                    <div className="text-sm font-medium text-foreground">SAR {(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 border-t border-border pt-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">SAR {subtotal.toFixed(2)}</span>
                </div>
                {couponState.applied && (
                  <div className="flex justify-between text-success">
                    <span>Discount ({couponState.applied})</span>
                    <span>-SAR {couponState.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-foreground">{shipping === 0 ? 'FREE' : `SAR ${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between border-t border-border pt-2 mt-2">
                  <span className="font-bold text-foreground">Total</span>
                  <span className="font-bold text-primary">SAR {total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6">
                <label htmlFor="promo-code" className="mb-1 block text-sm font-medium text-foreground">
                  {t('promoCode', 'Promo Code')}
                </label>
                <div className="flex gap-2">
                  <input
                    id="promo-code"
                    type="text"
                    autoComplete="off"
                    placeholder="e.g. SAVE10"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    disabled={!!couponState.applied}
                    className="flex-1 rounded-lg border border-input bg-background p-2 text-sm text-foreground disabled:opacity-50"
                  />
                  {couponState.applied ? (
                    <button
                      type="button"
                      onClick={() => { setCouponState({ applied: null, discount: 0, loading: false, error: '' }); setCoupon(''); }}
                      className="rounded-lg bg-secondary px-4 py-2 text-sm font-medium hover:bg-muted"
                    >
                      Remove
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={applyCoupon}
                      disabled={couponState.loading || !coupon.trim()}
                      className="inline-flex items-center gap-1 rounded-lg bg-secondary px-4 py-2 text-sm font-medium hover:bg-muted disabled:opacity-50"
                    >
                      {couponState.loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Ticket className="h-4 w-4" />}
                      Apply
                    </button>
                  )}
                </div>
                {couponState.error && <p className="mt-2 text-xs text-destructive">{couponState.error}</p>}
                {couponState.applied && !couponState.error && (
                  <p className="mt-2 text-xs text-success">Promo code applied — you save SAR {couponState.discount.toFixed(2)}!</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
