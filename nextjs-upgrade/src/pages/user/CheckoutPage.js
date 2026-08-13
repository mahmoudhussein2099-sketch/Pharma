import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCart } from '../../context/CartContext';

const CheckoutPage = () => {
  const { t } = useTranslation();
  const { cart, clearCart } = useCart();
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    paymentMethod: 'credit-card',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvv: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Process order
      processOrder();
    }
  };
  
  const processOrder = () => {
    // In a real app, this would call an API to process the order
    console.log('Processing order with data:', { items: cart, total, ...formData });
    
    // Clear cart and show success
    clearCart();
    setStep(4);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">{t('checkout', 'Checkout')}</h1>
        
        {/* Checkout Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= i ? 'bg-teal-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}>
                  {i}
                </div>
                <span className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {i === 1 ? t('information', 'Information') : 
                   i === 2 ? t('shipping', 'Shipping') : 
                   t('payment', 'Payment')}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-2 h-1 bg-gray-200 dark:bg-gray-700">
            <div 
              className="h-full bg-teal-600" 
              style={{ width: `${(step - 1) * 50}%` }}
            ></div>
          </div>
        </div>
        
        {/* Order Summary (Sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Step 1: Customer Information */}
            {step === 1 && (
              <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">{t('customerInformation', 'Customer Information')}</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t('firstName', 'First Name')}*
                    </label>
                    <input 
                      type="text" 
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t('lastName', 'Last Name')}*
                    </label>
                    <input 
                      type="text" 
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t('email', 'Email')}*
                    </label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t('phone', 'Phone')}*
                    </label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end mt-6">
                  <button 
                    type="submit" 
                    className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg"
                  >
                    {t('continue', 'Continue')}
                  </button>
                </div>
              </form>
            )}
            
            {/* Step 2: Shipping Information */}
            {step === 2 && (
              <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">{t('shippingInformation', 'Shipping Information')}</h2>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('address', 'Address')}*
                  </label>
                  <input 
                    type="text" 
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t('city', 'City')}*
                    </label>
                    <input 
                      type="text" 
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t('postalCode', 'Postal Code')}*
                    </label>
                    <input 
                      type="text" 
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('country', 'Country')}*
                  </label>
                  <select 
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="">{t('selectCountry', 'Select Country')}</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                    <option value="AU">Australia</option>
                    <option value="SA">Saudi Arabia</option>
                    <option value="AE">United Arab Emirates</option>
                  </select>
                </div>
                
                <div className="flex justify-between mt-6">
                  <button 
                    type="button" 
                    onClick={() => setStep(1)}
                    className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {t('back', 'Back')}
                  </button>
                  <button 
                    type="submit" 
                    className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg"
                  >
                    {t('continue', 'Continue')}
                  </button>
                </div>
              </form>
            )}
            
            {/* Step 3: Payment Information */}
            {step === 3 && (
              <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">{t('paymentInformation', 'Payment Information')}</h2>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('paymentMethod', 'Payment Method')}
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <label className="flex items-center p-4 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer">
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="credit-card"
                        checked={formData.paymentMethod === 'credit-card'}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      <span className="text-gray-700 dark:text-gray-300">{t('creditCard', 'Credit Card')}</span>
                    </label>
                    <label className="flex items-center p-4 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer">
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="paypal"
                        checked={formData.paymentMethod === 'paypal'}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      <span className="text-gray-700 dark:text-gray-300">PayPal</span>
                    </label>
                    <label className="flex items-center p-4 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer">
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="apple-pay"
                        checked={formData.paymentMethod === 'apple-pay'}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      <span className="text-gray-700 dark:text-gray-300">Apple Pay</span>
                    </label>
                  </div>
                </div>
                
                {formData.paymentMethod === 'credit-card' && (
                  <>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {t('cardNumber', 'Card Number')}*
                      </label>
                      <input 
                        type="text" 
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        placeholder="1234 5678 9012 3456"
                        required
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {t('nameOnCard', 'Name on Card')}*
                      </label>
                      <input 
                        type="text" 
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          {t('expiryDate', 'Expiry Date')}*
                        </label>
                        <input 
                          type="text" 
                          name="cardExpiry"
                          value={formData.cardExpiry}
                          onChange={handleChange}
                          placeholder="MM/YY"
                          required
                          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          {t('cvv', 'CVV')}*
                        </label>
                        <input 
                          type="text" 
                          name="cardCvv"
                          value={formData.cardCvv}
                          onChange={handleChange}
                          placeholder="123"
                          required
                          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>
                  </>
                )}
                
                <div className="flex justify-between mt-6">
                  <button 
                    type="button" 
                    onClick={() => setStep(2)}
                    className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {t('back', 'Back')}
                  </button>
                  <button 
                    type="submit" 
                    className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg"
                  >
                    {t('placeOrder', 'Place Order')}
                  </button>
                </div>
              </form>
            )}
            
            {/* Step 4: Order Confirmation */}
            {step === 4 && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {t('orderConfirmed', 'Order Confirmed!')}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {t('orderConfirmationMessage', 'Thank you for your order. We have received your order and will process it shortly.')}
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  {t('orderConfirmationEmail', 'A confirmation email has been sent to')} <span className="font-medium">{formData.email}</span>
                </p>
                <div className="flex justify-center">
                  <a 
                    href="/"
                    className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg"
                  >
                    {t('continueShopping', 'Continue Shopping')}
                  </a>
                </div>
              </div>
            )}
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">{t('orderSummary', 'Order Summary')}</h2>
              
              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center mr-4">
                      {item.image ? (
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="max-w-full max-h-full object-contain"
                        />
                      ) : (
                        <span className="text-gray-400">📦</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-800 dark:text-white">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {t('quantity')}: {item.quantity}
                      </p>
                    </div>
                    <div className="text-sm font-medium text-gray-800 dark:text-white">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Totals */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">{t('subtotal', 'Subtotal')}</span>
                  <span className="text-gray-800 dark:text-white">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">{t('shipping', 'Shipping')}</span>
                  <span className="text-gray-800 dark:text-white">$5.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">{t('tax', 'Tax')}</span>
                  <span className="text-gray-800 dark:text-white">${(total * 0.05).toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
                  <span className="font-bold text-gray-800 dark:text-white">{t('total', 'Total')}</span>
                  <span className="font-bold text-gray-800 dark:text-white">
                    ${(total + 5 + (total * 0.05)).toFixed(2)}
                  </span>
                </div>
              </div>
              
              {/* Promo Code */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('promoCode', 'Promo Code')}
                </label>
                <div className="flex">
                  <input 
                    type="text" 
                    placeholder={t('enterPromoCode', 'Enter promo code')}
                    className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-l-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <button className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-r-lg hover:bg-gray-300 dark:hover:bg-gray-500">
                    {t('apply', 'Apply')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;