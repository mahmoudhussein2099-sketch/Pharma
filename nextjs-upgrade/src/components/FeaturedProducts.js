import React from "react";
import { useTranslation } from "react-i18next";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const products = [
  {
    id: 1,
    nameKey: "Panadol Extra",
    price: 18,
    image: "/images/products/panadol.png",
    badge: "SALE",
  },
  {
    id: 2,
    nameKey: "Vitamin C Effervescent",
    price: 25,
    image: "/images/products/vitamin-c.png",
    badge: "DISCOUNT",
  },
  {
    id: 3,
    nameKey: "Cough Syrup",
    price: 30,
    image: "/images/products/cough-syrup.png",
  },
];

const FeaturedProducts = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleProductClick = (product) => {
    addToCart({ ...product, name: t(product.nameKey) });
    navigate('/cart');
  };

  return (
    <section
      dir={isRTL ? "rtl" : "ltr"}
      className="py-16 px-6 bg-white dark:bg-gray-900 transition"
    >
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-10">
        {t("ourProducts")}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => handleProductClick(product)}
            className="cursor-pointer bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition relative"
          >
            {product.badge && (
              <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                {product.badge}
              </div>
            )}
            <img
              src={product.image}
              alt={product.nameKey}
              className="w-full h-48 object-contain bg-gray-50 dark:bg-gray-700"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                {t(product.nameKey)}
              </h3>
              <p className="text-teal-600 dark:text-teal-300 font-medium mt-1">
                {product.price} SAR
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart({ ...product, name: t(product.nameKey) });
                }}
                className="mt-4 bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-md w-full transition"
              >
                {t("addToCart")}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
