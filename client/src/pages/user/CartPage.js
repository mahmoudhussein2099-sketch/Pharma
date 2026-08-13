import React from 'react';
import { useCart } from '../../context/CartContext';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ShoppingBag, Trash2 } from 'lucide-react';
import { Button } from '../../components/ui/button';

const CartPage = () => {
  const { cart, removeFromCart } = useCart();
  const { t } = useTranslation();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const formatPrice = (value) => `SAR ${Number(value).toFixed(2)}`;

  return (
    <div className="min-h-screen bg-background px-4 py-8 pt-20 text-foreground">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-6 text-3xl font-bold">{t('cartTitle')}</h1>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/40 py-20 text-center">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
              <ShoppingBag className="h-9 w-9" strokeWidth={1.4} />
            </div>
            <p className="text-lg text-muted-foreground">{t('cartEmpty')}</p>
            <Link to="/products" className="mt-6">
              <Button variant="gradient">{t('backToShop')}</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center justify-between rounded-xl border border-border/60 bg-card p-4 shadow-sm transition-shadow hover:shadow-md md:flex-row"
              >
                <div className="flex items-center gap-4">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-20 w-20 rounded-xl object-cover shadow-sm"
                    />
                  )}
                  <div>
                    <h3 className="text-xl font-semibold">{item.name}</h3>
                    <p className="text-muted-foreground">
                      {t('quantity')}: {item.quantity}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex flex-col items-end md:mt-0">
                  <p className="text-lg font-semibold text-primary">
                    {t('price')}: {formatPrice(item.price * item.quantity)}
                  </p>
                  <button
                    onClick={() => {
                      if (window.confirm(t('removeConfirm', 'Remove this item from cart?'))) {
                        removeFromCart(item.id);
                      }
                    }}
                    className="mt-2 inline-flex items-center gap-1.5 text-sm text-destructive hover:underline"
                  >
                    <Trash2 className="h-4 w-4" />
                    {t('remove')}
                  </button>
                </div>
              </div>
            ))}

            <div className="mt-6 flex items-center justify-between rounded-xl bg-card p-4 shadow-md">
              <p className="text-2xl font-bold">{t('total')}:</p>
              <span className="text-2xl text-primary">{formatPrice(total)}</span>
            </div>

            <div className="mt-6 flex flex-col justify-between gap-3 sm:flex-row">
              <Link to="/products">
                <Button variant="outline" className="w-full sm:w-auto">
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                  {t('backToShop')}
                </Button>
              </Link>
              <Link to="/checkout">
                <Button variant="gradient" className="w-full sm:w-auto">
                  {t('checkoutNow')}
                  <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
