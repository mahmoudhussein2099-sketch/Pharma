import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const AIResponseGenerator = ({ onSelectResponse, messageType }) => {
  const { t } = useTranslation();
  const [generating, setGenerating] = useState(false);
  const [responses, setResponses] = useState([]);

  // Sample AI-generated responses based on message type
  const sampleResponses = {
    inquiry: [
      "Thank you for your inquiry. Yes, we have this medication in stock. Would you like to place an order?",
      "Thank you for contacting Awon Pharmacy. We currently have this item available. Would you like me to help you place an order?",
      "We appreciate your interest. This product is in stock and available for delivery. Would you like to proceed with ordering?"
    ],
    order: [
      "Your order has been received. We'll process it right away and deliver it within 24 hours. Thank you for choosing Awon Pharmacy!",
      "Thank you for your order! We've received it and will begin processing immediately. You can expect delivery by tomorrow.",
      "We've received your order and it's being prepared. Delivery will be made within our standard 24-hour timeframe. Thank you!"
    ],
    complaint: [
      "We sincerely apologize for the inconvenience. We take this matter seriously and will resolve it immediately. Could you provide more details so we can assist you better?",
      "I'm sorry to hear about your experience. Customer satisfaction is our priority, and we'd like to make this right. Please share more information so we can help resolve this issue.",
      "We apologize for the problem you've encountered. We're committed to resolving this for you as quickly as possible. Could you provide additional details to help us address this properly?"
    ],
    prescription: [
      "Thank you for submitting your prescription. Our pharmacist will review it shortly and prepare your medication. We'll notify you when it's ready for pickup or delivery.",
      "We've received your prescription and it's being reviewed by our pharmacist. We'll have it ready for you soon and will send a confirmation when it's prepared.",
      "Your prescription has been received. Our team will process it and have your medication ready shortly. We'll contact you when it's ready for collection or delivery."
    ]
  };

  const generateResponses = () => {
    setGenerating(true);
    
    // Simulate AI processing time
    setTimeout(() => {
      setResponses(sampleResponses[messageType] || sampleResponses.inquiry);
      setGenerating(false);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">{t('aiResponseGenerator')}</h3>
        <button
          onClick={generateResponses}
          disabled={generating}
          className={`px-4 py-2 rounded ${generating ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
        >
          {generating ? t('generating') : t('generateResponses')}
        </button>
      </div>
      
      {responses.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm text-gray-500 mb-2">{t('suggestedResponses')}:</p>
          {responses.map((response, index) => (
            <div 
              key={index}
              onClick={() => onSelectResponse(response)}
              className="p-3 border rounded cursor-pointer hover:bg-blue-50"
            >
              {response}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AIResponseGenerator;