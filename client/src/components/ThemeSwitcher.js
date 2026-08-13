import React, { useContext } from 'react';
import { Moon, Sun } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';

const ThemeSwitcher = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleDarkMode}
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      className="flex h-8 w-8 items-center justify-center rounded-md bg-muted text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
    >
      {darkMode ? <Sun className="h-4 w-4 text-warning" /> : <Moon className="h-4 w-4" />}
    </button>
  );
};

export default ThemeSwitcher;
