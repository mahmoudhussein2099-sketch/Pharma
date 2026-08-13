import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className="flex min-h-screen items-center justify-center bg-background px-4">
    <div className="max-w-md text-center">
      <p className="text-7xl font-black text-primary">404</p>
      <h1 className="mt-4 text-2xl font-bold text-foreground">Page not found</h1>
      <p className="mt-2 text-muted-foreground">
        The page you are looking for doesn’t exist or has been moved.
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <Link
          to="/"
          className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          Back to Home
        </Link>
        <Link
          to="/products"
          className="rounded-lg bg-muted px-5 py-2.5 text-sm font-semibold text-foreground transition-opacity hover:bg-muted/80"
        >
          Browse Products
        </Link>
      </div>
    </div>
  </div>
);

export default NotFoundPage;
