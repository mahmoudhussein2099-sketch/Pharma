// src/pages/admin/Analytics.js
// Real analytics from /api/admin/stats: revenue, orders by status, category
// distribution, top products and stock alerts.
import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import { cn } from '../../lib/utils';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/tabs';
import { adminApi } from '../../services/adminApi';

const COLORS = ['var(--primary)', 'var(--success)', 'var(--warning)', 'var(--destructive)', 'var(--accent)', '#94a3b8'];
const tooltipStyle = { background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8 };

const Analytics = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
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
    load();
  }, [load]);

  const statusData = stats
    ? Object.entries(stats.statusCounts).map(([name, value]) => ({ name, value }))
    : [];

  const categoryData = stats
    ? Object.entries(stats.categoryCounts).map(([name, value]) => ({ name, value }))
    : [];

  const statCard = (label, value, hint, hintClass = 'text-success') => (
    <div className="rounded-lg border border-border bg-muted/40 p-4">
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="mt-1 text-2xl font-bold text-foreground">{value}</div>
      {hint && <div className={cn('text-sm', hintClass)}>{hint}</div>}
    </div>
  );

  if (loading && !stats) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Analytics</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[1, 2, 3].map((i) => <div key={i} className="h-28 animate-pulse rounded-lg bg-muted" />)}
        </div>
        <div className="h-64 animate-pulse rounded-lg bg-muted" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">Analytics</h2>
        <Button variant="outline" onClick={load}>{t('refresh')}</Button>
      </div>

      {error && (
        <div className="rounded border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</div>
      )}

      {stats && (
        <>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {statCard('Total Revenue (SAR)', `SAR ${stats.totalRevenue.toLocaleString()}`)}
            {statCard('Revenue Today', `SAR ${stats.todayRevenue.toLocaleString()}`)}
            {statCard('Total Orders', stats.totalOrders)}
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="overview">{t('overview')}</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="growth">Growth</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Orders by Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={statusData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                          <XAxis dataKey="name" stroke="var(--muted-foreground)" />
                          <YAxis allowDecimals={false} stroke="var(--muted-foreground)" />
                          <Tooltip contentStyle={tooltipStyle} />
                          <Bar dataKey="value" name="Orders" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Products by Category</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={categoryData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            dataKey="value"
                            nameKey="name"
                            label={({ name }) => name}
                          >
                            {categoryData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip contentStyle={tooltipStyle} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                {statCard('Active Products', stats.activeProducts)}
                {statCard('Pending Orders', stats.pendingOrders, stats.pendingOrders > 0 ? 'Needs attention' : 'All clear', stats.pendingOrders > 0 ? 'text-warning' : 'text-success')}
                {statCard('Coupons', stats.coupons)}
              </div>
            </TabsContent>

            <TabsContent value="products">
              <Card>
                <CardHeader>
                  <CardTitle>Top Selling Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {stats.topProducts.length === 0 && <p className="text-sm text-muted-foreground">No sales yet.</p>}
                    {stats.topProducts.map((p, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="h-3 w-3 shrink-0 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                        <div className="w-40 truncate text-sm text-foreground">{p.name}</div>
                        <div className="flex-1">
                          <div className="h-6 overflow-hidden rounded-full bg-muted">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${(p.quantity / (stats.topProducts[0]?.quantity || 1)) * 100}%`,
                                backgroundColor: COLORS[index % COLORS.length],
                              }}
                            ></div>
                          </div>
                        </div>
                        <div className="w-16 text-end text-sm text-foreground">{p.quantity}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                    {statCard('Total Products', stats.totalProducts)}
                    {statCard('Low Stock', stats.lowStock.length, undefined, 'text-warning')}
                    {statCard('Newsletter Subs', stats.newsletter)}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="growth">
              <Card>
                <CardHeader>
                  <CardTitle>Store Health</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {statCard('Today Orders', stats.todayOrders)}
                    {statCard('Today Revenue', `SAR ${stats.todayRevenue.toLocaleString()}`)}
                    {statCard('Contact Messages', stats.contacts)}
                    {statCard('Coupons', stats.coupons)}
                  </div>
                  <p className="mt-6 text-sm text-muted-foreground">
                    {stats.todayOrders > 0
                      ? `You have ${stats.todayOrders} order(s) today. Keep it up!`
                      : 'No orders today yet. Try sharing a coupon or WhatsApp broadcast to boost sales.'}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default Analytics;
