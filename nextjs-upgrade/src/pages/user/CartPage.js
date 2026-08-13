import React from 'react';
import { useCart } from '../../context/CartContext';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const { cartItems, removeFromCart, total } = useCart();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen pt-20 px-4 py-8 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">{t('cartTitle')}</h2>

        {cartItems.length === 0 ? (
          <p className="text-lg">{t('cartEmpty')}</p>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row items-center justify-between bg-white dark:bg-gray-800 shadow rounded-lg p-4"
              >
                <div className="flex items-center gap-4">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                  )}
                  <div>
                    <h3 className="text-xl font-semibold">{item.name}</h3>
                    <p className="text-gray-500 dark:text-gray-300">
                      {t('quantity')}: {item.quantity}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end mt-4 md:mt-0">
                  <p className="text-lg font-semibold text-teal-600 dark:text-teal-400">
                    {t('price')}: ${item.price * item.quantity}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="mt-2 text-sm text-red-600 hover:underline"
                  >
                    {t('remove')}
                  </button>
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mt-6">
              <p className="text-2xl font-bold">{t('total')}:</p>
              <span className="text-2xl text-teal-700 dark:text-teal-400">${total}</span>
            </div>

            <div className="flex justify-between mt-6">
              <Link
                to="/products"
                className="px-6 py-3 rounded-md bg-gray-300 text-black hover:bg-gray-400 dark:bg-gray-700 dark:text-white"
              >
                ← {t('backToShop')}
              </Link>
              <Link
                to="/checkout"
                className="px-6 py-3 rounded-md bg-teal-600 text-white hover:bg-teal-700"
              >
                {t('checkoutNow')}
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
