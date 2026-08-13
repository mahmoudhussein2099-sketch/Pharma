// src/components/ServicesSection.js
import React from "react";
import { FaStethoscope, FaTruck, FaUserMd } from "react-icons/fa";

function ServicesSection() {
  return (
    <section className="py-12 bg-gray-900 text-center text-white">
      <h2 className="text-3xl font-bold mb-6">
        Our Services
      </h2>
      <p className="text-gray-300 mb-10 max-w-xl mx-auto">
        At Awon Al Qhtany Pharmacy, we provide comprehensive healthcare services to meet your needs.
      </p>
      <div className="grid md:grid-cols-3 gap-8 px-4">
        {/* Service Cards */}
        {[{
          icon: <FaStethoscope />,
          title: "Health Checkups",
          desc: "Comprehensive health screenings and consultations."
        }, {
          icon: <FaTruck />,
          title: "Home Delivery",
          desc: "Fast and reliable delivery of your medications to your doorstep."
        }, {
          icon: <FaUserMd />,
          title: "Pharmaceutical Consultation",
          desc: "Expert advice and personalized pharmaceutical care."
        }].map((s, i) => (
          <div key={i} className="bg-gray-800 p-6 rounded-2xl shadow hover:shadow-lg transition">
            <div className="text-4xl text-teal-400 mb-4 mx-auto">{s.icon}</div>
            <h3 className="text-xl font-semibold">{s.title}</h3>
            <p className="text-gray-300 mt-2">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ServicesSection;
