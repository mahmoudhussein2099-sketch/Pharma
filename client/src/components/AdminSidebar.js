import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AdminSidebar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  
  const adminLinks = [
    { name: "Dashboard", path: "/admin/dashboard", icon: "📊" },
    { name: "Products", path: "/admin/products", icon: "📦" },
    { name: "Orders", path: "/admin/orders", icon: "🛒" },
    { name: "Marketing", path: "/admin/marketing", icon: "📣" },
    { name: "Analytics", path: "/admin/analytics", icon: "📈" },
    { name: "AI Security", path: "/admin/ai-security", icon: "🔒" },
    { name: "WhatsApp", path: "/admin/whatsapp", icon: "💬" },
    { name: "User Requests", path: "/admin/user-requests", icon: "📝" },
    { name: "Delivery", path: "/admin/delivery", icon: "🚚" },
    { name: "Block List", path: "/admin/blocklist", icon: "⛔" },
    { name: "Settings", path: "/admin/settings", icon: "⚙️" },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-gray-900 h-screen fixed top-0 left-0 shadow-lg p-4 overflow-y-auto">
      <div className="flex items-center justify-center mb-8">
        <h2 className="text-xl font-bold text-teal-700 dark:text-teal-500">
          {t('adminPanel')}
        </h2>
      </div>
      
      <nav>
        <ul className="space-y-2">
          {adminLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`flex items-center p-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-teal-100 text-teal-800 dark:bg-teal-800 dark:text-teal-100"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  }`}
                >
                  <span className="mr-3">{link.icon}</span>
                  <span>{t(link.name)}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="absolute bottom-4 left-0 right-0 px-4">
        <Link
          to="/"
          className="block text-center py-2 px-4 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          {t('backToStore')}
        </Link>
        
        <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
          {t('adminVersion')} 1.0.0
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;