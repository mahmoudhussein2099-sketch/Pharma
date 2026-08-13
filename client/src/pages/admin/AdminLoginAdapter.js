import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Lock, Mail, LogIn } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

const AdminLoginAdapter = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('user', JSON.stringify(data.admin || { email, role: 'admin' }));

      navigate('/admin');
    } catch (err) {
      console.error('Login error:', err.message);
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary">
            {t('adminLogin', 'Admin Login')}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">
                {t('email', 'Email')}
              </Label>
              <div className="relative">
                <Mail className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="email"
                  id="email"
                  autoFocus
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 ps-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">
                {t('password', 'Password')}
              </Label>
              <div className="relative">
                <Lock className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="password"
                  id="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 ps-10"
                />
              </div>
            </div>

            {error && (
              <p className="text-center text-sm text-destructive">
                {error}
              </p>
            )}

            {error && /no admin account|setup/i.test(error) && (
              <div className="rounded-lg bg-amber-50 p-3 text-center text-sm text-amber-800">
                First-time setup: the setup token is printed in the server console at
                <code className="font-mono"> server/data/setup-admin.txt</code>.
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full gap-2"
            >
              <LogIn className="h-4 w-4" />
              {loading ? t('loggingIn', 'Logging in...') : t('login', 'Login')}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLoginAdapter;
