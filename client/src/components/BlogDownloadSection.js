// src/components/BlogDownloadSection.js
import React from "react";

function BlogDownloadSection() {
  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-primary dark:text-white mb-6">
          Stay Healthy, Stay Informed
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Read our expert blog on health tips, pharmacy advice, and AI healthcare trends.
        </p>
        <button className="bg-primary text-white px-6 py-3 rounded-full hover:bg-primary-dark">
          Visit Health Blog
        </button>

        <div className="mt-12">
          <h3 className="text-2xl font-semibold mb-2 dark:text-white">Get the App</h3>
          <p className="text-gray-600 dark:text-gray-400">Order faster from your phone</p>
          <div className="flex justify-center mt-4 gap-4">
            <img src="/assets/google-play.png" alt="Google Play" className="h-12" />
            <img src="/assets/app-store.png" alt="App Store" className="h-12" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default BlogDownloadSection;
