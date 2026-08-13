// src/pages/admin/AdminDashboard.js
// Real dashboard: stats, status distribution, top products, low stock and
// recent orders all come from /api/admin/stats.
import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Package, ShoppingCart, Banknote, AlertTriangle, RefreshCw, Plus,
  ClipboardList, TrendingUp, Users, Ticket,
} from 'lucide-react';
import { adminApi } from '../../services/adminApi';

const STATUS_STYLE = {
  Pending: 'bg-warning/15 text-warning',
  Processing: 'bg-primary/15 text-primary',
  Shipped: 'bg-accent text-accent-foreground',
  Delivered: 'bg-success/15 text-success',
  Cancelled: 'bg-destructive/15 text-destructive',
};

const fmtDate = (iso) => {
  if (!iso) return '—';
  try {
    return new Date(iso).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  } catch {
    return iso;
  }
};

const StatCard = ({ icon: Icon, label, value, sub, tone = 'primary' }) => {
  const tones = {
    primary: 'bg-primary/10 text-primary',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    destructive: 'bg-destructive/10 text-destructive',
  };
  return (
    <div className="rounded-xl bg-card p-6 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-medium text-foreground">{label}</h3>
        <span className={`flex h-10 w-10 items-center justify-center rounded-full ${tones[tone]}`}>
          <Icon className="h-5 w-5" />
        </span>
      </div>
      <p className="text-3xl font-bold text-foreground">{value}</p>
      {sub && <p className="mt-2 text-sm text-muted-foreground">{sub}</p>}
    </div>
  );
};

const AdminDashboard = ({ onNavigate }) => {
  const { t } = useTranslation();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadStats = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await adminApi('/admin/stats');
      setStats(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  const go = (tab) => {
    if (typeof onNavigate === 'function') onNavigate(tab);
  };

  return (
    <div className="p-6">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground">Live numbers from the store — refreshed on every visit</p>
        </div>
        <button
          onClick={loadStats}
          className="inline-flex items-center gap-2 rounded bg-muted px-4 py-2 text-sm font-medium hover:bg-muted/80"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
        </button>
      </div>

      {error && (
        <div className="mb-6 rounded border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</div>
      )}

      {!stats && loading && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-36 animate-pulse rounded-xl bg-muted" />
          ))}
        </div>
      )}

      {stats && (
        <>
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <StatCard icon={Package} label="Products" value={stats.totalProducts} sub={`${stats.activeProducts} active`} tone="primary" />
            <StatCard icon={ShoppingCart} label="Total Orders" value={stats.totalOrders} sub={`${stats.todayOrders} today`} tone="success" />
            <StatCard icon={Banknote} label="Revenue (SAR)" value={stats.totalRevenue.toLocaleString()} sub={`SAR ${stats.todayRevenue.toLocaleString()} today`} tone="primary" />
            <StatCard icon={AlertTriangle} label="Low Stock" value={stats.lowStock.length} sub="Items with ≤10 units" tone={stats.lowStock.length > 0 ? 'destructive' : 'success'} />
          </div>

          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl bg-card p-6 shadow-lg">
              <h2 className="mb-4 text-lg font-bold text-foreground">Orders by Status</h2>
              <div className="space-y-3">
                {Object.entries(stats.statusCounts).map(([status, count]) => (
                  <div key={status} className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{status}</span>
                    <span className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-foreground">{count}</span>
                      <span className={`rounded-full px-2 py-0.5 text-xs ${STATUS_STYLE[status] || 'bg-muted text-muted-foreground'}`}>{status}</span>
                    </span>
                  </div>
                ))}
                {Object.keys(stats.statusCounts).length === 0 && (
                  <p className="text-sm text-muted-foreground">No orders yet.</p>
                )}
              </div>
            </div>

            <div className="rounded-xl bg-card p-6 shadow-lg">
              <h2 className="mb-4 text-lg font-bold text-foreground">Top Products</h2>
              <div className="space-y-3">
                {stats.topProducts.map((p, i) => (
                  <div key={i} className="flex items-center justify-between gap-2">
                    <span className="flex-1 truncate text-sm text-foreground">{p.name}</span>
                    <span className="rounded bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">{p.quantity} sold</span>
                  </div>
                ))}
                {stats.topProducts.length === 0 && <p className="text-sm text-muted-foreground">No sales yet.</p>}
              </div>
            </div>

            <div className="rounded-xl bg-card p-6 shadow-lg">
              <h2 className="mb-4 text-lg font-bold text-foreground">Low Stock Alert</h2>
              <div className="space-y-3">
                {stats.lowStock.map((p) => (
                  <div key={p.id} className="flex items-center justify-between gap-2">
                    <span className="flex-1 truncate text-sm text-foreground">{p.name}</span>
                    <span className="rounded bg-destructive/10 px-2 py-0.5 text-xs font-semibold text-destructive">{p.stock} left</span>
                  </div>
                ))}
                {stats.lowStock.length === 0 && <p className="text-sm text-muted-foreground">All products well stocked.</p>}
              </div>
            </div>
          </div>

          <div className="mb-8 rounded-xl bg-card p-6 shadow-lg">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">Recent Orders</h2>
              <button onClick={() => go('orders')} className="text-sm font-medium text-primary hover:underline">View All →</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    <th className="pb-3 font-medium">Order</th>
                    <th className="pb-3 font-medium">Customer</th>
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Amount</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {stats.recentOrders.map((o) => (
                    <tr key={o.id}>
                      <td className="py-3 pe-4 font-medium text-foreground">#{String(o.id).padStart(3, '0')}</td>
                      <td className="py-3 pe-4 text-foreground">{o.customerName}</td>
                      <td className="py-3 pe-4 text-sm text-muted-foreground">{fmtDate(o.createdAt)}</td>
                      <td className="py-3 pe-4 font-medium text-foreground">SAR {Number(o.total).toFixed(2)}</td>
                      <td className="py-3">
                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_STYLE[o.status] || 'bg-muted text-muted-foreground'}`}>{o.status}</span>
                      </td>
                    </tr>
                  ))}
                  {stats.recentOrders.length === 0 && (
                    <tr>
                      <td colSpan="5" className="py-8 text-center text-sm text-muted-foreground">No orders yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-xl bg-card p-6 shadow-lg">
            <h2 className="mb-6 text-xl font-bold text-foreground">Quick Actions</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <button onClick={() => go('products')} className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-primary-foreground hover:bg-primary/90">
                <Plus className="h-5 w-5" /> Add Product
              </button>
              <button onClick={() => go('orders')} className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-primary-foreground hover:bg-primary/90">
                <ClipboardList className="h-5 w-5" /> Process Orders
              </button>
              <button onClick={() => go('analytics')} className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent p-4 font-medium text-accent-foreground hover:bg-accent/90">
                <TrendingUp className="h-5 w-5" /> View Reports
              </button>
              <button onClick={() => go('marketing')} className="inline-flex items-center justify-center gap-2 rounded-lg bg-warning p-4 font-medium text-warning-foreground hover:bg-warning/90">
                <Ticket className="h-5 w-5" /> Create Coupon
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
