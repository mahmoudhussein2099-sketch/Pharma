// src/components/TestimonialsSection.js
import React from "react";

function TestimonialsSection() {
  return (
    <section className="py-12 bg-white dark:bg-gray-950">
      <h2 className="text-3xl font-bold text-center text-primary dark:text-white mb-8">
        What Our Customers Say
      </h2>
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 px-4">
        {[
          {
            name: "Faisal A.",
            review: "Fast delivery and very professional support. The AI suggestions helped a lot!",
          },
          {
            name: "Aisha R.",
            review: "Great products and everything arrives on time. I love how easy it is to reorder.",
          },
          {
            name: "Mohammed K.",
            review: "Trusted pharmacy with all health needs. Their app and website are user-friendly.",
          },
        ].map((t, i) => (
          <div
            key={i}
            className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-md text-center"
          >
            <p className="text-gray-700 dark:text-gray-200 italic">"{t.review}"</p>
            <p className="mt-4 font-semibold text-primary dark:text-white">- {t.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TestimonialsSection;
