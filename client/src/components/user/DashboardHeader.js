import React from 'react';
import { useTranslation } from 'react-i18next';

const DashboardHeader = ({ user }) => {
  const { t } = useTranslation();
  
  return (
    <div className="bg-gradient-to-r from-teal-500 to-blue-500 rounded-2xl p-6 mb-6 text-white">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          {user.avatar ? (
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-16 h-16 rounded-full border-4 border-white/30 object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-teal-700 flex items-center justify-center text-2xl font-bold">
              {user.name.charAt(0)}
            </div>
          )}
          
          <div className="ml-4">
            <h1 className="text-2xl font-bold">{t('welcomeBack')}, {user.name}!</h1>
            <p className="text-teal-100">{user.email}</p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg backdrop-blur-sm transition-colors flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {t('editProfile')}
          </button>
          
          <button className="bg-white text-teal-600 hover:bg-teal-50 px-4 py-2 rounded-lg font-medium transition-colors flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {t('shopNow')}
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <p className="text-sm text-teal-100">{t('totalOrders')}</p>
          <p className="text-2xl font-bold">{user.stats.orders}</p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <p className="text-sm text-teal-100">{t('loyaltyPoints')}</p>
          <p className="text-2xl font-bold">{user.stats.points}</p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <p className="text-sm text-teal-100">{t('savedItems')}</p>
          <p className="text-2xl font-bold">{user.stats.savedItems}</p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <p className="text-sm text-teal-100">{t('prescriptions')}</p>
          <p className="text-2xl font-bold">{user.stats.prescriptions}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;