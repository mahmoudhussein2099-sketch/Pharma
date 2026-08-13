import React from "react";

const ProductCard = ({ title, price, image }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden transition transform hover:-translate-y-1">
      <img src={image} alt={title} className="w-full h-40 object-contain p-4" />
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{title}</h3>
        <p className="text-green-600 dark:text-green-300 font-bold mt-2">{price}</p>
        <button className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
