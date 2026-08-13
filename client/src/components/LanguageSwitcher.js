import React from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    // Set HTML dir attribute for RTL/LTR support
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lng;
    // Store language preference
    localStorage.setItem('language', lng);
  };

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'ar', label: 'عربي' },
    { code: 'hi', label: 'हिंदी' },
  ];

  return (
    <div className="flex items-center gap-1 rounded-md bg-muted p-1" role="group" aria-label="Language">
      {languages.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => changeLanguage(code)}
          className={cn(
            'rounded px-2 py-1 text-xs font-medium transition-colors',
            i18n.language === code
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
