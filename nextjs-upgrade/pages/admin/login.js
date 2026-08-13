import React from 'react';
import Link from '../../src/components/Link';
import Header from '../../src/components/layout/Header';
import Footer from '../../src/components/layout/Footer';

export default function AdminLogin() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Admin Login</h1>
        <p className="mb-4">This is the admin login page.</p>
        <Link href="/" className="text-blue-500 hover:underline">
          Back to Home
        </Link>
      </main>
      <Footer />
    </div>
  );
}