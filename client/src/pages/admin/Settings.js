// src/pages/admin/Settings.js
// Real store settings: loads from /api/settings (public GET),
// saves via PUT (admin only).
import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Save, RefreshCw } from 'lucide-react';
import { adminApi } from '../../services/adminApi';

const Settings = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [form, setForm] = useState({
    storeName: 'Awon Pharmacy',
    currency: 'SAR',
    currencySymbol: 'SAR',
    phone: '',
    whatsapp: '',
    email: '',
    address: '',
    announcement: '',
  });

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await adminApi('/settings');
      setForm((prev) => ({ ...prev, ...data }));
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setMessage('');
    try {
      await adminApi('/settings', { method: 'PUT', body: form });
      setMessage('Settings saved successfully');
      setTimeout(() => setMessage(''), 3000);
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const fields = [
    { name: 'storeName', label: 'Store Name', type: 'text' },
    { name: 'email', label: 'Store Email', type: 'email' },
    { name: 'phone', label: 'Phone', type: 'tel' },
    { name: 'whatsapp', label: 'WhatsApp', type: 'tel' },
    { name: 'currency', label: 'Currency Code', type: 'text' },
    { name: 'currencySymbol', label: 'Currency Symbol', type: 'text' },
    { name: 'address', label: 'Address', type: 'text' },
  ];

  return (
    <div className="min-h-screen bg-background p-6 text-foreground">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">{t('settings', 'Settings')}</h2>
        <button
          onClick={load}
          className="inline-flex items-center gap-2 rounded bg-muted px-4 py-2 text-sm font-medium hover:bg-muted/80"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
        </button>
      </div>

      {message && (
        <div className="mb-4 rounded border border-success/40 bg-success/10 px-4 py-3 text-sm text-success">{message}</div>
      )}
      {error && (
        <div className="mb-4 rounded border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</div>
      )}

      {loading && !form.storeName ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-12 animate-pulse rounded-lg bg-muted" />
          ))}
        </div>
      ) : (
        <form onSubmit={handleSave} className="rounded-lg bg-card p-6 shadow">
          <h3 className="mb-6 text-lg font-semibold text-foreground">General Settings</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {fields.map((f) => (
              <div key={f.name}>
                <label htmlFor={f.name} className="mb-1 block text-sm font-medium text-foreground">
                  {f.label}
                </label>
                <input
                  id={f.name}
                  name={f.name}
                  type={f.type}
                  value={form[f.name] || ''}
                  onChange={handleChange}
                  className="w-full rounded border border-input bg-background p-2 text-foreground"
                />
              </div>
            ))}
            <div className="md:col-span-2">
              <label htmlFor="announcement" className="mb-1 block text-sm font-medium text-foreground">
                Announcement
              </label>
              <textarea
                id="announcement"
                name="announcement"
                value={form.announcement || ''}
                onChange={handleChange}
                rows="2"
                className="w-full rounded border border-input bg-background p-2 text-foreground"
              />
            </div>
          </div>

          <div className="mt-6 border-t border-border pt-4">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
            >
              <Save className="h-4 w-4" /> {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Settings;
