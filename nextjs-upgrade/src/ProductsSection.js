import React from "react";

const products = [
  {
    name: "Panadol Extra",
    image: "/images/panadol-extra.png",
    price: "SAR 18.00",
    description: "Advanced pain relief with caffeine boost.",
  },
  {
    name: "Vitamin C 1000mg",
    image: "/images/vitamin-c.png",
    price: "SAR 25.00",
    description: "Effervescent tablets for immune support.",
  },
  {
    name: "Cough Syrup 200ml",
    image: "/images/cough-syrup.png",
    price: "SAR 15.00",
    description: "Soothing formula to relieve dry cough.",
  },
];

const ProductsSection = () => {
  return (
    <section className="py-16 px-6 bg-white dark:bg-gray-900 transition">
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-10">
        Featured Products 💊
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {products.map((product, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-xl transition"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-contain mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              {product.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
              {product.description}
            </p>
            <p className="font-bold text-teal-600 dark:text-teal-300">
              {product.price}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductsSection;
