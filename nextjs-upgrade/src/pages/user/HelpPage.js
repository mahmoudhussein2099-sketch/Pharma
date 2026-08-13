import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const HelpPage = () => {
  const { t } = useTranslation();

  return (
    <div className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">
            {t('helpAndFAQ', 'Help & FAQ')}
          </h1>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t('navigationHelp', 'Navigation Help')}
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {t('productsVsCategories', 'Products vs Categories')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {t('productsVsCategoriesDesc', 'Our website has two different ways to browse our inventory:')}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-bold text-teal-600 dark:text-teal-400 mb-2">
                      {t('products', 'Products')}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">
                      {t('productsPageDesc', 'The Products page shows all individual products with filtering and sorting options.')}
                    </p>
                    <Link to="/products" className="text-teal-600 dark:text-teal-400 hover:underline">
                      {t('viewProducts', 'View Products')} →
                    </Link>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-bold text-teal-600 dark:text-teal-400 mb-2">
                      {t('categories', 'Categories')}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">
                      {t('categoriesPageDesc', 'The Categories page groups products by type, making it easier to browse related items.')}
                    </p>
                    <Link to="/categories" className="text-teal-600 dark:text-teal-400 hover:underline">
                      {t('viewCategories', 'View Categories')} →
                    </Link>
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300">
                  {t('navigationTip', 'Tip: Use Categories to discover product types, then use Products to filter and sort specific items.')}
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {t('loginOptions', 'Login Options')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {t('loginOptionsDesc', 'We offer different login options depending on your role:')}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-bold text-teal-600 dark:text-teal-400 mb-2">
                      {t('customerLogin', 'Customer Login')}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">
                      {t('customerLoginDesc', 'For regular customers to access their account, orders, and prescriptions.')}
                    </p>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      <p>{t('demoEmail', 'Demo Email')}: user@example.com</p>
                      <p>{t('demoPassword', 'Demo Password')}: password</p>
                    </div>
                    <Link to="/login" className="block mt-3 text-teal-600 dark:text-teal-400 hover:underline">
                      {t('customerLogin', 'Customer Login')} →
                    </Link>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-bold text-teal-600 dark:text-teal-400 mb-2">
                      {t('adminLogin', 'Admin Login')}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">
                      {t('adminLoginDesc', 'For staff members to manage products, orders, and site content.')}
                    </p>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      <p>{t('demoEmail', 'Demo Email')}: admin@admin.com</p>
                      <p>{t('demoPassword', 'Demo Password')}: password</p>
                    </div>
                    <Link to="/admin/login" className="block mt-3 text-teal-600 dark:text-teal-400 hover:underline">
                      {t('adminLogin', 'Admin Login')} →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t('frequentlyAskedQuestions', 'Frequently Asked Questions')}
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {t('faqQuestion1', 'How do I find specific products?')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t('faqAnswer1', 'You can use the search bar at the top of the page, browse by category, or use filters on the Products page to narrow down your search.')}
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {t('faqQuestion2', 'How do I upload a prescription?')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t('faqAnswer2', 'Visit the Prescriptions page, where you can upload an image or PDF of your prescription. Our pharmacists will review it and contact you for fulfillment.')}
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {t('faqQuestion3', 'What payment methods do you accept?')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t('faqAnswer3', 'We accept all major credit cards, debit cards, and digital wallets. Payment options are displayed during checkout.')}
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {t('faqQuestion4', 'How long does delivery take?')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t('faqAnswer4', 'Standard delivery takes 2-3 business days. Express delivery (available in select areas) is delivered within 24 hours.')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;