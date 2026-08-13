import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const WhatsAppMessages = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState([
    { id: 1, customer: 'John Doe', message: 'Hello, I need help with my order', time: '10:30 AM', status: 'unread' },
    { id: 2, customer: 'Jane Smith', message: 'Thank you for the quick delivery!', time: '09:15 AM', status: 'read' },
  ]);

  return (
    <div className="p-6 min-h-screen bg-background text-foreground">
      <h2 className="text-2xl font-bold mb-6">
        {t('whatsAppMessages', 'WhatsApp Messages')}
      </h2>

      <div className="p-4 rounded-lg mb-6 bg-success/15">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-medium text-success">
              {t('totalMessages', 'Total Messages')}
            </h3>
            <p className="text-2xl font-bold text-success">
              {messages.length}
            </p>
          </div>
          <div>
            <h3 className="font-medium text-success">
              {t('unreadMessages', 'Unread Messages')}
            </h3>
            <p className="text-2xl font-bold text-success">
              {messages.filter(m => m.status === 'unread').length}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg shadow p-6 bg-card">
        <div className="space-y-4">
          {messages.map(message => (
            <div key={message.id} className={`border rounded p-4 border-border ${
              message.status === 'unread' ? 'bg-primary/10' : ''
            }`}>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium text-foreground">
                    {message.customer}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {message.time}
                  </p>
                </div>
                {message.status === 'unread' && (
                  <span className="px-2 py-1 rounded text-xs bg-primary text-primary-foreground">
                    {t('new', 'New')}
                  </span>
                )}
              </div>
              <p className="mb-3 text-foreground">
                {message.message}
              </p>
              <div className="flex gap-2">
                <button className="bg-success text-success-foreground px-3 py-1 rounded hover:bg-success/90">
                  {t('reply', 'Reply')}
                </button>
                <button className="bg-primary text-primary-foreground px-3 py-1 rounded hover:bg-primary/90">
                  {t('generateAIResponse', 'AI Response')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhatsAppMessages;