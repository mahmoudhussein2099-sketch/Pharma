import React from 'react';

const SocialMediaQuickContact = () => {
  return (
    <div className="fixed bottom-4 right-4 flex flex-col space-y-3 z-50">
      <a
        href="https://wa.me/966123456789"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg flex items-center justify-center"
        aria-label="WhatsApp Chat"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M20.52 3.48A11.94 11.94 0 0012 0C5.37 0 0 5.37 0 12a11.94 11.94 0 001.64 6.12L0 24l5.88-1.56A11.94 11.94 0 0012 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.2-3.48-8.52zM12 21.5a9.5 9.5 0 01-4.84-1.4l-.35-.21-3.5.93.93-3.41-.22-.36A9.5 9.5 0 1121.5 12 9.5 9.5 0 0112 21.5zm5.3-7.1c-.29-.15-1.7-.84-1.96-.94-.26-.1-.45-.15-.64.15s-.73.94-.9 1.13c-.17.19-.34.21-.63.07a7.3 7.3 0 01-2.15-1.33 8.2 8.2 0 01-1.52-1.88c-.16-.28 0-.43.13-.57.13-.13.29-.34.44-.51.15-.17.2-.29.3-.48.1-.19.05-.36-.02-.51-.07-.15-.64-1.54-.88-2.11-.23-.55-.46-.48-.64-.49-.17-.01-.37-.01-.57-.01s-.51.07-.78.36c-.27.29-1.04 1.02-1.04 2.48s1.07 2.87 1.22 3.07c.15.19 2.11 3.22 5.12 4.52a17.3 17.3 0 002.3.98c.3.12.57.1.78.06.24-.05.73-.3.83-.59.1-.29.1-.54.07-.59-.03-.05-.26-.1-.55-.25z" />
        </svg>
      </a>
      <a
        href="tel:+966123456789"
        className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg flex items-center justify-center"
        aria-label="Phone Call"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 5a2 2 0 012-2h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 010 1.414L8.414 8.414a16.06 16.06 0 007.172 7.172l1.293-1.293a1 1 0 011.414 0l2.414 2.414a1 1 0 01.293.707V19a2 2 0 01-2 2h-1c-9.94 0-18-8.06-18-18v-1z"
          />
        </svg>
      </a>
      <a
        href="https://m.me/yourpage"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg flex items-center justify-center"
        aria-label="Facebook Messenger Chat"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12c0 4.41 2.86 8.15 6.84 9.5v-6.72H7.9v-2.78h1.94V9.41c0-1.92 1.17-2.98 2.95-2.98.85 0 1.74.15 1.74.15v1.92h-1c-.99 0-1.3.62-1.3 1.25v1.5h2.22l-.36 2.78h-1.86v6.72C19.14 20.15 22 16.41 22 12c0-5.52-4.48-10-10-10z" />
        </svg>
      </a>
      <a
        href="https://instagram.com/yourprofile"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-pink-600 hover:bg-pink-700 text-white p-3 rounded-full shadow-lg flex items-center justify-center"
        aria-label="Instagram"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm4.75-.88a1.12 1.12 0 11-2.24 0 1.12 1.12 0 012.24 0z" />
        </svg>
      </a>
      <a
        href="https://twitter.com/yourprofile"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-400 hover:bg-blue-500 text-white p-3 rounded-full shadow-lg flex items-center justify-center"
        aria-label="Twitter"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M23 3a10.9 10.9 0 01-3.14.86 4.48 4.48 0 001.98-2.48 9.14 9.14 0 01-2.88 1.1 4.52 4.52 0 00-7.7 4.13A12.8 12.8 0 013 4.89a4.52 4.52 0 001.4 6.04 4.48 4.48 0 01-2.05-.57v.06a4.52 4.52 0 003.63 4.43 4.52 4.52 0 01-2.04.08 4.52 4.52 0 004.22 3.14A9.05 9.05 0 012 19.54a12.8 12.8 0 006.92 2.03c8.3 0 12.84-6.88 12.84-12.84 0-.2 0-.42-.02-.63A9.22 9.22 0 0023 3z" />
        </svg>
      </a>
    </div>
  );
};

export default SocialMediaQuickContact;
