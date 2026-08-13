import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const AutoCaptcha = ({ onVerify, suspiciousScore = 0 }) => {
  const { t } = useTranslation();
  const [captchaCode, setCaptchaCode] = useState('');
  const [userInput, setUserInput] = useState('');
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [error, setError] = useState(false);

  // Generate a random captcha code
  const generateCaptcha = () => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(result);
    return result;
  };

  // Check if user should see captcha based on suspicious score
  useEffect(() => {
    if (suspiciousScore > 0.6) {
      setShowCaptcha(true);
      generateCaptcha();
    }
  }, [suspiciousScore]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (userInput === captchaCode) {
      setError(false);
      setShowCaptcha(false);
      setAttempts(0);
      onVerify(true);
    } else {
      setError(true);
      setAttempts(attempts + 1);
      generateCaptcha();
      
      // If too many failed attempts, implement additional security measures
      if (attempts >= 2) {
        // In a real app, you might want to implement a timeout or IP logging here
        setTimeout(() => {
          generateCaptcha();
          setAttempts(0);
        }, 30000); // 30 second timeout
      }
      
      onVerify(false);
    }
    
    setUserInput('');
  };

  if (!showCaptcha) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">{t('securityVerification')}</h2>
        <p className="mb-4 text-gray-600 dark:text-gray-300">{t('captchaExplanation')}</p>
        
        <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded text-center">
          <div className="select-none text-2xl font-mono tracking-widest" style={{ 
            fontFamily: 'monospace',
            textShadow: '2px 2px 3px rgba(0,0,0,0.3)',
            letterSpacing: '0.5em',
            fontStyle: 'italic',
            textDecoration: 'line-through'
          }}>
            {captchaCode}
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="captcha" className="block text-sm font-medium mb-1">
              {t('enterCodeAbove')}
            </label>
            <input
              type="text"
              id="captcha"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className={`w-full p-2 border rounded ${error ? 'border-red-500' : 'border-gray-300'}`}
              placeholder={t('enterCaptchaCode')}
              required
            />
            {error && (
              <p className="text-red-500 text-sm mt-1">{t('incorrectCaptcha')}</p>
            )}
          </div>
          
          <div className="flex justify-between">
            <button
              type="button"
              onClick={generateCaptcha}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded hover:bg-gray-300 dark:hover:bg-gray-500"
            >
              {t('refreshCaptcha')}
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {t('verify')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AutoCaptcha;