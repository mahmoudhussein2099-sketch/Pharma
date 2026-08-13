import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LayoutDashboard, Package, ShoppingCart, Megaphone, BarChart3, ShieldCheck, MessageSquare, ClipboardList, Truck, Ban, Bot, Settings as SettingsIcon } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import AdminDashboard from './AdminDashboard';
import ProductManagement from './ProductManagement';
import Orders from './Orders';
import MarketingTools from './MarketingTools';
import Analytics from './Analytics';
import AISecurity from './AISecurity';
import WhatsAppMessages from './WhatsAppMessages';
import UserRequests from './UserRequests';
import Delivery from './Delivery';
import BlockList from './BlockList';
import Settings from './Settings';
import AIDashboard from './AIDashboard';

const UnifiedDashboard = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('dashboard');

  const navItems = [
    { id: 'dashboard', name: t('dashboard'), icon: LayoutDashboard },
    { id: 'products', name: t('products'), icon: Package },
    { id: 'orders', name: t('orders'), icon: ShoppingCart },
    { id: 'marketing', name: t('marketing'), icon: Megaphone },
    { id: 'analytics', name: t('analytics'), icon: BarChart3 },
    { id: 'security', name: t('aiSecurity'), icon: ShieldCheck },
    { id: 'whatsapp', name: t('whatsApp'), icon: MessageSquare },
    { id: 'requests', name: t('userRequests'), icon: ClipboardList },
    { id: 'delivery', name: t('delivery'), icon: Truck },
    { id: 'blocklist', name: t('blockList'), icon: Ban },
    { id: 'ai', name: t('aiTools'), icon: Bot },
    { id: 'settings', name: t('settings'), icon: SettingsIcon },
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('user');
    window.location.href = '/admin/login';
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'products':
        return <ProductManagement />;
      case 'orders':
        return <Orders />;
      case 'marketing':
        return <MarketingTools />;
      case 'analytics':
        return <Analytics />;
      case 'security':
        return <AISecurity />;
      case 'whatsapp':
        return <WhatsAppMessages />;
      case 'requests':
        return <UserRequests />;
      case 'delivery':
        return <Delivery />;
      case 'blocklist':
        return <BlockList />;
      case 'ai':
        return <AIDashboard />;
      case 'settings':
        return <Settings />;
      default:
        return <AdminDashboard onNavigate={setActiveTab} />;
    }
  };

  return (
    <DashboardLayout
      nav={navItems.map((item) => ({
        ...item,
        href: `/dashboard/${item.id}`,
        onClick: () => setActiveTab(item.id),
        end: item.id === 'dashboard',
      }))}
      pathname={`/dashboard/${activeTab}`}
      title={t('adminPanel')}
      subtitle="Awon Pharmacy"
      onLogout={handleLogout}
    >
      {renderContent()}
    </DashboardLayout>
  );
};

export default UnifiedDashboard;
