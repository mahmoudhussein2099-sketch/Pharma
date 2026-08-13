import React, { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { SecurityContext } from '../../context/SecurityContext';

const SecurePaymentForm = ({ onPaymentComplete }) => {
  const { t } = useTranslation();
  const { securePayment } = useContext(SecurityContext);
  
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  });
  
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);
  const [maskedCard, setMaskedCard] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Format card number with spaces
    if (name === 'cardNumber') {
      const cleaned = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
      const formatted = cleaned.length > 0 
        ? cleaned.match(/.{1,4}/g).join(' ')
        : '';
      
      setPaymentData({
        ...paymentData,
        [name]: formatted.slice(0, 19) // Limit to 16 digits + 3 spaces
      });
      
      // Update masked version for display
      if (cleaned.length > 4) {
        setMaskedCard(securePayment.maskCreditCard(cleaned));
      } else {
        setMaskedCard('');
      }
    } 
    // Format expiry date
    else if (name === 'expiryDate') {
      const cleaned = value.replace(/[^0-9]/gi, '');
      let formatted = cleaned;
      
      if (cleaned.length > 2) {
        formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
      }
      
      setPaymentData({
        ...paymentData,
        [name]: formatted.slice(0, 5) // MM/YY format
      });
    }
    // Format CVV
    else if (name === 'cvv') {
      const cleaned = value.replace(/[^0-9]/gi, '');
      setPaymentData({
        ...paymentData,
        [name]: cleaned.slice(0, 3)
      });
    }
    // Other fields
    else {
      setPaymentData({
        ...paymentData,
        [name]: value
      });
    }
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    // Validate card number (simple check for length)
    if (paymentData.cardNumber.replace(/\s+/g, '').length !== 16) {
      newErrors.cardNumber = t('invalidCardNumber');
    }
    
    // Validate card holder
    if (!paymentData.cardHolder.trim()) {
      newErrors.cardHolder = t('requiredField');
    }
    
    // Validate expiry date
    const expiryPattern = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!expiryPattern.test(paymentData.expiryDate)) {
      newErrors.expiryDate = t('invalidExpiryDate');
    } else {
      // Check if card is expired
      const [month, year] = paymentData.expiryDate.split('/');
      const expiryDate = new Date(2000 + parseInt(year), parseInt(month) - 1);
      const currentDate = new Date();
      
      if (expiryDate < currentDate) {
        newErrors.expiryDate = t('cardExpired');
      }
    }
    
    // Validate CVV
    if (paymentData.cvv.length !== 3) {
      newErrors.cvv = t('invalidCVV');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setProcessing(true);
    
    try {
      // Encrypt payment data before sending to server
      const encryptedData = await securePayment.encryptPaymentDetails(paymentData);
      
      // Simulate API call to payment processor
      setTimeout(() => {
        console.log('Encrypted payment data:', encryptedData);
        
        // In a real app, you would send the encrypted data to your server
        // and process the payment there
        
        setProcessing(false);
        onPaymentComplete({
          success: true,
          transactionId: 'TX' + Math.floor(Math.random() * 1000000),
          last4: paymentData.cardNumber.slice(-4)
        });
      }, 2000);
    } catch (error) {
      console.error('Payment processing error:', error);
      setProcessing(false);
      setErrors({
        general: t('paymentProcessingError')
      });
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold mb-4">{t('securePayment')}</h3>
      
      {/* Security badge */}
      <div className="flex items-center mb-4 p-2 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800">
        <svg className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
        </svg>
        <span className="text-sm text-green-700 dark:text-green-300">{t('secureEncryptedConnection')}</span>
      </div>
      
      {/* Payment form */}
      <form onSubmit={handleSubmit}>
        {/* Card number */}
        <div className="mb-4">
          <label htmlFor="cardNumber" className="block text-sm font-medium mb-1">
            {t('cardNumber')}
          </label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={paymentData.cardNumber}
            onChange={handleChange}
            placeholder="1234 5678 9012 3456"
            className={`w-full p-2 border rounded ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'}`}
            autoComplete="cc-number"
          />
          {errors.cardNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
          )}
          {maskedCard && (
            <p className="text-gray-500 text-sm mt-1">{t('maskedCardNumber')}: {maskedCard}</p>
          )}
        </div>
        
        {/* Card holder */}
        <div className="mb-4">
          <label htmlFor="cardHolder" className="block text-sm font-medium mb-1">
            {t('cardHolder')}
          </label>
          <input
            type="text"
            id="cardHolder"
            name="cardHolder"
            value={paymentData.cardHolder}
            onChange={handleChange}
            placeholder="John Doe"
            className={`w-full p-2 border rounded ${errors.cardHolder ? 'border-red-500' : 'border-gray-300'}`}
            autoComplete="cc-name"
          />
          {errors.cardHolder && (
            <p className="text-red-500 text-sm mt-1">{errors.cardHolder}</p>
          )}
        </div>
        
        {/* Expiry date and CVV */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="expiryDate" className="block text-sm font-medium mb-1">
              {t('expiryDate')}
            </label>
            <input
              type="text"
              id="expiryDate"
              name="expiryDate"
              value={paymentData.expiryDate}
              onChange={handleChange}
              placeholder="MM/YY"
              className={`w-full p-2 border rounded ${errors.expiryDate ? 'border-red-500' : 'border-gray-300'}`}
              autoComplete="cc-exp"
            />
            {errors.expiryDate && (
              <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>
            )}
          </div>
          <div>
            <label htmlFor="cvv" className="block text-sm font-medium mb-1">
              {t('cvv')}
            </label>
            <input
              type="password"
              id="cvv"
              name="cvv"
              value={paymentData.cvv}
              onChange={handleChange}
              placeholder="123"
              className={`w-full p-2 border rounded ${errors.cvv ? 'border-red-500' : 'border-gray-300'}`}
              autoComplete="cc-csc"
            />
            {errors.cvv && (
              <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
            )}
          </div>
        </div>
        
        {/* General error */}
        {errors.general && (
          <div className="mb-4 p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded">
            <p className="text-red-600 dark:text-red-400 text-sm">{errors.general}</p>
          </div>
        )}
        
        {/* Submit button */}
        <button
          type="submit"
          disabled={processing}
          className={`w-full p-3 rounded text-white ${
            processing ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {processing ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {t('processing')}
            </span>
          ) : (
            t('payNow')
          )}
        </button>
      </form>
      
      {/* Payment security info */}
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {t('paymentSecurityInfo')}
        </p>
      </div>
    </div>
  );
};

export default SecurePaymentForm;