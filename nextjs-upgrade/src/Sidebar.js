import React from "react";

const categories = [
  {
    title: "Prescription Medicines",
    items: [
      { name: "Antibiotics", count: 32 },
      { name: "Blood Pressure", count: 28 },
      { name: "Diabetes Care", count: 23 },
      { name: "Heart Medications", count: 38 },
      { name: "Pain Relief", count: 15 },
      { name: "Antidepressants", count: 12 },
      { name: "Thyroid Medications", count: 10 },
    ],
  },
  {
    title: "Over-the-Counter",
    items: [
      { name: "Cold & Flu", count: 25 },
      { name: "Allergy Relief", count: 18 },
      { name: "Digestive Health", count: 22 },
      { name: "Sleep Aids", count: 8 },
      { name: "Headache Relief", count: 15 },
      { name: "Cough Syrups", count: 12 },
    ],
  },
  {
    title: "Vitamins & Supplements",
    items: [
      { name: "Multivitamins", count: 35 },
      { name: "Vitamin D", count: 20 },
      { name: "Omega 3", count: 15 },
      { name: "Probiotics", count: 18 },
      { name: "Protein Supplements", count: 25 },
      { name: "Iron & B12", count: 22 },
      { name: "Calcium", count: 16 },
    ],
  },
];

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white dark:bg-gray-900 h-screen fixed top-0 left-0 shadow-lg p-4 overflow-y-auto">
      <h2 className="text-xl font-bold mb-6 text-teal-700">Awon Alqhtani Pharmacy</h2>
      {categories.map((category) => (
        <div key={category.title} className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">{category.title}</h3>
          <ul>
            {category.items.map((item) => (
              <li key={item.name} className="flex justify-between py-1 px-2 rounded hover:bg-teal-100 dark:hover:bg-teal-800 cursor-pointer">
                <span className="text-gray-800 dark:text-gray-200">{item.name}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{item.count}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <button className="w-full bg-teal-600 text-white py-3 rounded-lg mt-4 hover:bg-teal-700 transition">
        Quick Order Upload Prescription
      </button>
      <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
        Licensed Pharmacy<br />
        MOH License #123456/789<br />
        Certified Since 2015
      </div>
    </aside>
  );
};

export default Sidebar;
