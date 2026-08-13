// src/pages/admin/MarketingTools.js
// Real marketing tools: coupon management (CRUD), WhatsApp marketing message
// generator, and newsletter subscriber management.
import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Ticket, Plus, Trash2, Power, Download, MessageCircle, Users, Copy, Check, RefreshCw,
} from 'lucide-react';
import { adminApi } from '../../services/adminApi';

const EMPTY_COUPON = {
  code: '',
  type: 'percent',
  value: '',
  minOrder: '',
  maxDiscount: '',
  usageLimit: '',
  expiresAt: '',
};

const CouponRow = ({ coupon, onToggle, onDelete }) => (
  <tr className="border-b border-border hover:bg-muted/40">
    <td className="p-3">
      <span className="rounded bg-primary/10 px-2 py-0.5 font-mono text-xs font-semibold text-primary">{coupon.code}</span>
    </td>
    <td className="p-3 text-foreground">
      {coupon.type === 'percent' ? `${coupon.value}%` : `SAR ${coupon.value}`}
      {coupon.minOrder > 0 && <span className="block text-xs text-muted-foreground">min. SAR {coupon.minOrder}</span>}
    </td>
    <td className="p-3 text-sm text-muted-foreground">
      {coupon.usedCount || 0}{coupon.usageLimit ? ` / ${coupon.usageLimit}` : ''} used
    </td>
    <td className="p-3 text-sm text-muted-foreground">
      {coupon.expiresAt ? new Date(coupon.expiresAt).toLocaleDateString('en-GB') : 'Never'}
    </td>
    <td className="p-3">
      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${coupon.active ? 'bg-success/15 text-success' : 'bg-muted text-muted-foreground'}`}>
        {coupon.active ? 'Active' : 'Disabled'}
      </span>
    </td>
    <td className="p-3">
      <div className="flex items-center gap-2">
        <button
          onClick={() => onToggle(coupon)}
          className={`inline-flex items-center gap-1 rounded border border-border px-2 py-1 text-xs ${coupon.active ? 'text-warning hover:bg-warning/10' : 'text-success hover:bg-success/10'}`}
        >
          <Power className="h-3 w-3" /> {coupon.active ? 'Disable' : 'Enable'}
        </button>
        <button
          onClick={() => onDelete(coupon)}
          className="inline-flex items-center gap-1 rounded border border-border px-2 py-1 text-xs text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="h-3 w-3" /> Delete
        </button>
      </div>
    </td>
  </tr>
);

const MarketingTools = () => {
  const { t } = useTranslation();
  const [coupons, setCoupons] = useState([]);
  const [form, setForm] = useState(EMPTY_COUPON);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const [subscribers, setSubscribers] = useState([]);
  const [subscriberCount, setSubscriberCount] = useState(0);

  // WhatsApp generator
  const [waNumber, setWaNumber] = useState('');
  const [waText, setWaText] = useState('');
  const [copied, setCopied] = useState(false);

  const load = useCallback(async () => {
    try {
      const data = await adminApi('/admin/coupons');
      setCoupons(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e.message);
    }
  }, []);

  const loadSubscribers = useCallback(async () => {
    try {
      const data = await adminApi('/marketing/newsletter');
      setSubscribers(Array.isArray(data) ? data : []);
      setSubscriberCount(Array.isArray(data) ? data.length : 0);
    } catch (e) {
      // non-fatal
    }
  }, []);

  useEffect(() => {
    load();
    loadSubscribers();
  }, [load, loadSubscribers]);

  const flash = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const createCoupon = async (e) => {
    e.preventDefault();
    if (!form.code.trim() || form.value === '') {
      setError('Code and value are required');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const payload = {
        code: form.code,
        type: form.type,
        value: Number(form.value),
        minOrder: form.minOrder !== '' ? Number(form.minOrder) : undefined,
        maxDiscount: form.maxDiscount !== '' ? Number(form.maxDiscount) : undefined,
        usageLimit: form.usageLimit !== '' ? Number(form.usageLimit) : undefined,
        expiresAt: form.expiresAt || null,
      };
      await adminApi('/admin/coupons', { method: 'POST', body: payload });
      setForm(EMPTY_COUPON);
      flash(`Coupon ${payload.code.toUpperCase()} created`);
      load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const toggleCoupon = async (coupon) => {
    try {
      await adminApi(`/admin/coupons/${coupon.id}`, { method: 'PUT', body: { active: !coupon.active } });
      flash(`Coupon ${coupon.code} ${coupon.active ? 'disabled' : 'enabled'}`);
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteCoupon = async (coupon) => {
    if (!window.confirm(`Delete coupon ${coupon.code}?`)) return;
    try {
      await adminApi(`/admin/coupons/${coupon.id}`, { method: 'DELETE' });
      flash(`Coupon ${coupon.code} deleted`);
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  const exportCSV = async () => {
    try {
      const res = await fetch('/api/marketing/newsletter/export', {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
      });
      if (!res.ok) throw new Error('Export failed');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'newsletter.csv';
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.message);
    }
  };

  const waLink = (() => {
    const num = waNumber.replace(/[^0-9]/g, '');
    if (num.length < 9) return '';
    return `https://wa.me/${num}?text=${encodeURIComponent(waText)}`;
  })();

  const copyWa = () => {
    if (!waLink) return;
    navigator.clipboard.writeText(waLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="min-h-screen bg-background p-6 text-foreground">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Marketing Tools</h2>
        <p className="text-sm text-muted-foreground">Coupons, WhatsApp broadcasts and newsletter subscribers</p>
      </div>

      {message && (
        <div className="mb-4 rounded border border-success/40 bg-success/10 px-4 py-3 text-sm text-success">{message}</div>
      )}

      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Coupons */}
        <div className="rounded-lg bg-card p-6 shadow">
          <div className="mb-4 flex items-center gap-2">
            <Ticket className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Promo Codes</h3>
          </div>

          <form onSubmit={createCoupon} className="mb-5 rounded-lg border border-border p-4">
            <h4 className="mb-3 text-sm font-medium text-foreground">Create Coupon</h4>
            {error && <div className="mb-3 rounded border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive">{error}</div>}
            <div className="grid grid-cols-2 gap-3">
              <input
                name="code"
                value={form.code}
                onChange={handleChange}
                placeholder="Code e.g. RAMADAN10"
                className="rounded border border-input bg-background p-2 text-sm"
              />
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="rounded border border-input bg-background p-2 text-sm"
              >
                <option value="percent">% Discount</option>
                <option value="fixed">Fixed SAR</option>
              </select>
              <input
                name="value"
                type="number"
                min="0"
                value={form.value}
                onChange={handleChange}
                placeholder={form.type === 'percent' ? '10 (%)' : 'Amount (SAR)'}
                className="rounded border border-input bg-background p-2 text-sm"
              />
              <input
                name="minOrder"
                type="number"
                min="0"
                value={form.minOrder}
                onChange={handleChange}
                placeholder="Min order (SAR)"
                className="rounded border border-input bg-background p-2 text-sm"
              />
              {form.type === 'percent' && (
                <input
                  name="maxDiscount"
                  type="number"
                  min="0"
                  value={form.maxDiscount}
                  onChange={handleChange}
                  placeholder="Max discount (SAR)"
                  className="rounded border border-input bg-background p-2 text-sm"
                />
              )}
              <input
                name="usageLimit"
                type="number"
                min="0"
                value={form.usageLimit}
                onChange={handleChange}
                placeholder="Usage limit"
                className="rounded border border-input bg-background p-2 text-sm"
              />
              <input
                name="expiresAt"
                type="date"
                value={form.expiresAt}
                onChange={handleChange}
                className="col-span-2 rounded border border-input bg-background p-2 text-sm"
              />
            </div>
            <button
              type="submit"
              disabled={saving}
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
            >
              <Plus className="h-4 w-4" /> {saving ? 'Creating...' : 'Create Coupon'}
            </button>
          </form>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  <th className="p-2">Code</th>
                  <th className="p-2">Value</th>
                  <th className="p-2">Usage</th>
                  <th className="p-2">Expires</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {coupons.map((c) => (
                  <CouponRow key={c.id} coupon={c} onToggle={toggleCoupon} onDelete={deleteCoupon} />
                ))}
                {coupons.length === 0 && (
                  <tr>
                    <td colSpan="6" className="p-6 text-center text-sm text-muted-foreground">No coupons yet. Create your first one above.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* WhatsApp generator */}
        <div className="rounded-lg bg-card p-6 shadow">
          <div className="mb-4 flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-success" />
            <h3 className="text-lg font-semibold">WhatsApp Marketing Link</h3>
          </div>
          <p className="mb-4 text-sm text-muted-foreground">
            Build a pre-filled WhatsApp message (broadcast to customers, order request, etc.). Share the generated link.
          </p>
          <label className="mb-1 block text-sm font-medium text-foreground">Your WhatsApp number</label>
          <input
            value={waNumber}
            onChange={(e) => setWaNumber(e.target.value)}
            placeholder="9665xxxxxxxx"
            dir="ltr"
            className="mb-3 w-full rounded border border-input bg-background p-2 text-sm"
          />
          <label className="mb-1 block text-sm font-medium text-foreground">Message text</label>
          <textarea
            value={waText}
            onChange={(e) => setWaText(e.target.value)}
            rows="4"
            placeholder="Hello! Special offer at Awon Pharmacy..."
            className="mb-3 w-full rounded border border-input bg-background p-2 text-sm"
          />
          {waLink ? (
            <div className="rounded border border-border bg-muted/40 p-3">
              <p className="mb-1 text-xs text-muted-foreground">Generated link:</p>
              <p className="mb-2 break-all text-xs text-foreground" dir="ltr">{waLink}</p>
              <div className="flex gap-2">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 rounded bg-success px-3 py-1.5 text-xs font-medium text-success-foreground hover:bg-success/90"
                >
                  <MessageCircle className="h-3.5 w-3.5" /> Open in WhatsApp
                </a>
                <button
                  onClick={copyWa}
                  className="inline-flex items-center gap-1 rounded border border-border px-3 py-1.5 text-xs font-medium hover:bg-muted"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">Enter a valid number to generate the link.</p>
          )}

          <div className="mt-6 border-t border-border pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <h4 className="font-medium text-foreground">Newsletter Subscribers</h4>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={exportCSV}
                  className="inline-flex items-center gap-1 rounded border border-border px-3 py-1.5 text-xs font-medium hover:bg-muted"
                >
                  <Download className="h-3.5 w-3.5" /> Export CSV
                </button>
                <button
                  onClick={loadSubscribers}
                  className="inline-flex items-center gap-1 rounded border border-border px-3 py-1.5 text-xs font-medium hover:bg-muted"
                >
                  <RefreshCw className="h-3.5 w-3.5" /> Refresh
                </button>
              </div>
            </div>
            <p className="mt-2 text-2xl font-bold text-foreground">{subscriberCount}</p>
            <div className="mt-2 max-h-32 space-y-1 overflow-y-auto">
              {subscribers.slice(0, 20).map((s) => (
                <p key={s.id} className="truncate text-sm text-muted-foreground" dir="ltr">{s.email}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketingTools;
