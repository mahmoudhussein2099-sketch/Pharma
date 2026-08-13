import React from 'react';
import NextLink from 'next/link';

// This component serves as a compatibility layer between react-router-dom's Link and Next.js Link
const Link = ({ to, href, children, className, ...props }) => {
  // Use either to (react-router-dom style) or href (Next.js style)
  const destination = to || href || '/';
  
  return (
    <NextLink href={destination} className={className} {...props}>
      {children}
    </NextLink>
  );
};

export default Link;