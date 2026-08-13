// src/pages/admin/Orders.js
// Real order management: lists orders from the API, updates status, deletes.
import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Search, RefreshCw, Trash2, Phone, MapPin, CreditCard, ChevronDown, ChevronUp,
} from 'lucide-react';
import { adminApi } from '../../services/adminApi';

const STATUSES = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

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

const OrderRow = ({ order, onStatus, onDelete }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <tr className="border-b border-border hover:bg-muted/40">
        <td className="p-3">
          <button onClick={() => setOpen((o) => !o)} className="inline-flex items-center gap-1 text-primary hover:underline">
            {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            #{String(order.id).padStart(3, '0')}
          </button>
        </td>
        <td className="p-3">
          <p className="font-medium text-foreground">{order.customerName}</p>
          <p className="text-xs text-muted-foreground" dir="ltr">{order.phone}</p>
        </td>
        <td className="p-3 font-semibold text-foreground">SAR {Number(order.total).toFixed(2)}</td>
        <td className="p-3">
          <select
            value={order.status}
            onChange={(e) => onStatus(order, e.target.value)}
            className={`rounded-full border-0 px-3 py-1 text-xs font-medium cursor-pointer ${STATUS_STYLE[order.status] || 'bg-muted text-muted-foreground'}`}
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </td>
        <td className="p-3 text-sm text-muted-foreground">{fmtDate(order.createdAt)}</td>
        <td className="p-3">
          <button
            onClick={() => onDelete(order)}
            className="inline-flex items-center gap-1 rounded border border-border px-2 py-1 text-xs text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-3 w-3" /> Delete
          </button>
        </td>
      </tr>
      {open && (
        <tr className="border-b border-border bg-muted/30">
          <td colSpan="6" className="p-4">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              <div className="rounded-lg border border-border bg-card p-4">
                <h4 className="mb-2 text-sm font-semibold text-foreground">Customer</h4>
                <p className="flex items-center gap-1 text-sm text-muted-foreground"><Phone className="h-3.5 w-3.5" /> <span dir="ltr">{order.phone}</span></p>
                <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground"><MapPin className="h-3.5 w-3.5" /> {order.address}{order.city ? `, ${order.city}` : ''}</p>
                {order.email && <p className="mt-1 text-sm text-muted-foreground">{order.email}</p>}
                <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                  <CreditCard className="h-3.5 w-3.5" />
                  {order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod}
                </p>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <h4 className="mb-2 text-sm font-semibold text-foreground">Items ({order.items?.length || 0})</h4>
                <div className="max-h-48 space-y-2 overflow-y-auto">
                  {order.items?.map((it, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <div className="h-8 w-8 shrink-0 overflow-hidden rounded bg-muted">
                        {it.image && (
                          <img src={it.image} alt={it.name} className="h-full w-full object-cover" />
                        )}
                      </div>
                      <span className="flex-1 truncate text-foreground">{it.name}</span>
                      <span className="text-muted-foreground">x{it.quantity}</span>
                      <span className="font-medium text-foreground">SAR {Number(it.price * it.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <h4 className="mb-2 text-sm font-semibold text-foreground">Totals</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>SAR {Number(order.subtotal).toFixed(2)}</span></div>
                  {order.discount > 0 && (
                    <div className="flex justify-between text-success"><span>Discount{order.couponCode ? ` (${order.couponCode})` : ''}</span><span>-SAR {Number(order.discount).toFixed(2)}</span></div>
                  )}
                  <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{Number(order.shipping) === 0 ? 'FREE' : `SAR ${Number(order.shipping).toFixed(2)}`}</span></div>
                  <div className="flex justify-between border-t border-border pt-1 font-bold text-foreground"><span>Total</span><span>SAR {Number(order.total).toFixed(2)}</span></div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

const Orders = () => {
  const { t } = useTranslation();
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const loadOrders = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.set('status', statusFilter);
      if (search.trim()) params.set('search', search.trim());
      const data = await adminApi(`/orders?${params.toString()}`);
      setOrders(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, search]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const flash = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  const updateStatus = async (order, status) => {
    if (status === order.status) return;
    try {
      await adminApi(`/orders/${order.id}/status`, { method: 'PUT', body: { status } });
      flash(`Order #${order.id} → ${status}`);
      loadOrders();
    } catch (e) {
      setError(e.message);
    }
  };

  const deleteOrder = async (order) => {
    if (!window.confirm(`Delete order #${order.id}?`)) return;
    try {
      await adminApi(`/orders/${order.id}`, { method: 'DELETE' });
      flash(`Order #${order.id} deleted`);
      loadOrders();
    } catch (e) {
      setError(e.message);
    }
  };

  const counts = orders.reduce((acc, o) => {
    acc[o.status] = (acc[o.status] || 0) + 1;
    acc.all = (acc.all || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="p-6 min-h-screen bg-background text-foreground">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Order Management</h2>
          <p className="text-sm text-muted-foreground">{orders.length} order(s) shown</p>
        </div>
        <button
          onClick={loadOrders}
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

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative min-w-[200px] flex-1">
          <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by order #, name, phone or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded border border-input bg-background p-2 ps-10 text-sm"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded border border-input bg-background p-2 text-sm"
        >
          <option value="all">All statuses ({counts.all || 0})</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s} ({counts[s] || 0})</option>
          ))}
        </select>
      </div>

      <div className="overflow-hidden rounded-lg bg-card shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-background">
                <th className="p-3 text-start text-xs font-medium uppercase tracking-wider text-muted-foreground">{t('orderId', 'Order')}</th>
                <th className="p-3 text-start text-xs font-medium uppercase tracking-wider text-muted-foreground">{t('customer', 'Customer')}</th>
                <th className="p-3 text-start text-xs font-medium uppercase tracking-wider text-muted-foreground">{t('total', 'Total')}</th>
                <th className="p-3 text-start text-xs font-medium uppercase tracking-wider text-muted-foreground">{t('status', 'Status')}</th>
                <th className="p-3 text-start text-xs font-medium uppercase tracking-wider text-muted-foreground">{t('date', 'Date')}</th>
                <th className="p-3 text-start text-xs font-medium uppercase tracking-wider text-muted-foreground">{t('actions', 'Actions')}</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <OrderRow key={order.id} order={order} onStatus={updateStatus} onDelete={deleteOrder} />
              ))}
              {!loading && orders.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-12 text-center text-sm text-muted-foreground">No orders found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
