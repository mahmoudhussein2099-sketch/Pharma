import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || 'Invalid email or password');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user || { email, role: 'user' }));
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full bg-card rounded-xl shadow-lg p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-6">
            {t('signIn', 'Sign In')}
          </h1>
        </div>
        
        {error && (
          <div role="alert" className="bg-destructive/15 text-destructive p-3 rounded-lg mb-6">
            {error}
          </div>
        )}
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">
              {t('email', 'Email')}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              spellCheck={false}
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-input bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder={t('enterEmail', 'Enter your email')}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="password" className="block text-sm font-medium text-muted-foreground">
                {t('password', 'Password')}
              </label>
              <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                {t('forgotPassword', 'Forgot password?')}
              </Link>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-input bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder={t('enterPassword', 'Enter your password')}
            />
          </div>

          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-primary focus:ring-primary border-input rounded"
            />
            <label htmlFor="remember-me" className="ms-2 block text-sm text-muted-foreground">
              {t('rememberMe', 'Remember me')}
            </label>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm bg-primary text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? t('signingIn', 'Signing in…') : t('signIn', 'Sign In')}
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-card text-muted-foreground">
                {t('orContinueWith', 'Or continue with')}
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <button aria-label="Facebook" className="w-full flex items-center justify-center py-2 px-4 border border-border rounded-lg shadow-sm bg-card text-muted-foreground hover:bg-muted">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </button>
            <button aria-label="X (Twitter)" className="w-full flex items-center justify-center py-2 px-4 border border-border rounded-lg shadow-sm bg-card text-muted-foreground hover:bg-muted">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </button>
            <button aria-label="Google" className="w-full flex items-center justify-center py-2 px-4 border border-border rounded-lg shadow-sm bg-card text-muted-foreground hover:bg-muted">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z" fill="#EA4335"/>
                <path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" fill="#4285F4"/>
                <path d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z" fill="#FBBC05"/>
                <path d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.2154 17.135 5.2704 14.29L1.2804 17.385C3.2554 21.31 7.3104 24.0001 12.0004 24.0001Z" fill="#34A853"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            {t('noAccount', "Don't have an account?")}{' '}
            <Link to="/register" className="font-medium text-primary hover:underline">
              {t('signUp', 'Sign up')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;