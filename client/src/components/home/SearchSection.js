import React, { useState } from 'react';
import { SearchCheck, Flame } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Icon3D } from '../ui/brand-icons';
import { cn } from '../../lib/utils';

const SearchSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestions = [
    t('panadolExtra', 'Panadol'),
    t('vitaminC', 'Vitamin C'),
    t('faceMasks', 'Face Mask'),
    t('babyFormula', 'Baby Formula'),
    t('bloodPressureMonitors', 'Blood Pressure Monitor'),
  ];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    navigate(`/products?search=${encodeURIComponent(suggestion)}`);
  };

  return (
    <div className="relative z-20 mx-4 -mt-9 sm:mx-auto sm:max-w-3xl lg:max-w-4xl">
      <div className="rounded-2xl border border-border bg-card/90 p-4 shadow-card-3d backdrop-blur-xl sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
          <div className="relative flex-1">
            <Icon3D
              name="zoom"
              aria-hidden="true"
              className="pointer-events-none absolute start-3 top-1/2 h-8 w-8 -translate-y-1/2 ring-0"
            />
            <Input
              type="text"
              placeholder={t('searchPlaceholder', 'Search for medicines, health products...')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              onKeyDown={handleKeyPress}
              className="h-12 rounded-xl ps-14"
            />
            {showSuggestions && searchQuery && (
              <div className="absolute start-0 end-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-border bg-popover text-popover-foreground shadow-card-3d">
                {suggestions
                  .filter((suggestion) => suggestion.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((suggestion, index) => (
                    <div
                      key={index}
                      className={cn(
                        'cursor-pointer px-4 py-2.5 transition-colors hover:bg-accent hover:text-accent-foreground',
                        index !== 0 && 'border-t border-border'
                      )}
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </div>
                  ))}
              </div>
            )}
          </div>
          <Button
            onClick={handleSearch}
            size="lg"
            className="h-12 gap-2 rounded-xl px-8 shadow-lg shadow-primary/25"
          >
            <SearchCheck className="h-4 w-4" />
            {t('search', 'Search')}
          </Button>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2 ps-1">
          <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground">
            <Flame className="h-3.5 w-3.5 text-warning" aria-hidden="true" />
            {t('popularSearches', 'Popular:')}
          </span>
          {suggestions.slice(0, 4).map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => handleSuggestionClick(suggestion)}
              className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground transition-all duration-200 hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
