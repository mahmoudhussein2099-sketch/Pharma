import React from 'react';

const PharmacyLocationMap = () => {
  return (
    <section className="my-16 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
        Our Location
      </h2>
      <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg">
        <iframe
          title="Awon Alqhtany Pharmacy Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3623.1234567890123!2d46.6753!3d24.7136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15fca3a10886f5b9%3A0x56fc3c30e343c3cd!2sAwon%20Alqhtany%20Pharmacy!5e0!3m2!1sen!2ssa!4v1680000000000!5m2!1sen!2ssa"
          width="100%"
          height="100%"
          frameBorder="0"
          style={{ border: 0 }}
          allowFullScreen=""
          aria-hidden="false"
          tabIndex="0"
        ></iframe>
      </div>
    </section>
  );
};

export default PharmacyLocationMap;
