import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const WhatsAppMessages = () => {
  const { t } = useTranslation();
  const [activeChat, setActiveChat] = useState(1);
  const [messageText, setMessageText] = useState('');
  const [chats, setChats] = useState([
    {
      id: 1,
      name: 'Ahmed Al-Saud',
      lastMessage: 'Is my prescription ready?',
      time: '10:30 AM',
      unread: 2,
      messages: [
        { id: 1, text: 'Hello, I submitted my prescription yesterday. Is it ready?', sender: 'customer', time: '10:25 AM' },
        { id: 2, text: 'I need to pick it up today if possible.', sender: 'customer', time: '10:30 AM' },
      ]
    },
    {
      id: 2,
      name: 'Fatima Hassan',
      lastMessage: 'Thank you for the information',
      time: '9:45 AM',
      unread: 0,
      messages: [
        { id: 1, text: 'Do you have Panadol Extra in stock?', sender: 'customer', time: '9:30 AM' },
        { id: 2, text: 'Yes, we have Panadol Extra in stock. Would you like us to reserve some for you?', sender: 'admin', time: '9:35 AM' },
        { id: 3, text: 'Thank you for the information. I will come by later today.', sender: 'customer', time: '9:45 AM' },
      ]
    },
    {
      id: 3,
      name: 'Mohammed Ali',
      lastMessage: 'What are your opening hours?',
      time: 'Yesterday',
      unread: 1,
      messages: [
        { id: 1, text: 'What are your opening hours?', sender: 'customer', time: 'Yesterday' },
      ]
    }
  ]);

  const [aiResponses, setAiResponses] = useState({
    'Is my prescription ready?': 'Your prescription for Lisinopril is ready for pickup. You can collect it anytime today before 9 PM.',
    'What are your opening hours?': 'Our pharmacy is open from 8 AM to 9 PM on weekdays, and 9 AM to 7 PM on weekends.',
    'Do you have Panadol Extra in stock?': 'Yes, we currently have Panadol Extra in stock. Would you like me to reserve some for you?',
    'How much does it cost?': 'Panadol Extra costs SAR 15.50 per pack of 24 tablets.',
    'Do you deliver?': 'Yes, we offer delivery services. For orders over SAR 100, delivery is free. Otherwise, there is a SAR 10 delivery fee.',
  });

  const activeMessages = chats.find(chat => chat.id === activeChat)?.messages || [];

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    
    // Add the admin message
    const updatedChats = chats.map(chat => {
      if (chat.id === activeChat) {
        return {
          ...chat,
          messages: [
            ...chat.messages,
            { 
              id: chat.messages.length + 1, 
              text: messageText, 
              sender: 'admin', 
              time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) 
            }
          ],
          lastMessage: messageText,
          time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        };
      }
      return chat;
    });
    
    setChats(updatedChats);
    setMessageText('');
  };

  const handleAIResponse = () => {
    const currentChat = chats.find(chat => chat.id === activeChat);
    if (!currentChat) return;
    
    const lastCustomerMessage = [...currentChat.messages]
      .filter(msg => msg.sender === 'customer')
      .pop();
      
    if (!lastCustomerMessage) return;
    
    // Find AI response for this message or use a default
    const aiResponse = aiResponses[lastCustomerMessage.text] || 
      "Thank you for your message. One of our pharmacists will respond shortly.";
    
    // Add the AI response
    const updatedChats = chats.map(chat => {
      if (chat.id === activeChat) {
        return {
          ...chat,
          messages: [
            ...chat.messages,
            { 
              id: chat.messages.length + 1, 
              text: aiResponse, 
              sender: 'admin', 
              time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) 
            }
          ],
          lastMessage: aiResponse,
          time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
          unread: 0
        };
      }
      return chat;
    });
    
    setChats(updatedChats);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">{t('whatsAppMessages')}</h2>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="flex h-[600px]">
          {/* Chat List */}
          <div className="w-1/3 border-r">
            <div className="p-4 border-b">
              <input 
                type="text" 
                placeholder={t('searchChats')} 
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="overflow-y-auto h-[calc(600px-64px)]">
              {chats.map(chat => (
                <div 
                  key={chat.id}
                  onClick={() => setActiveChat(chat.id)}
                  className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${activeChat === chat.id ? 'bg-gray-100' : ''}`}
                >
                  <div className="flex justify-between items-start">
                    <div className="font-medium">{chat.name}</div>
                    <div className="text-xs text-gray-500">{chat.time}</div>
                  </div>
                  <div className="text-sm text-gray-600 truncate">{chat.lastMessage}</div>
                  {chat.unread > 0 && (
                    <div className="mt-1">
                      <span className="bg-green-500 text-white text-xs rounded-full px-2 py-1">
                        {chat.unread} {t('new')}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Chat Area */}
          <div className="w-2/3 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b flex justify-between items-center">
              <div className="font-medium">{chats.find(chat => chat.id === activeChat)?.name}</div>
              <div className="flex space-x-2">
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
              {activeMessages.map(message => (
                <div 
                  key={message.id}
                  className={`mb-4 flex ${message.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.sender === 'admin' 
                        ? 'bg-teal-500 text-white' 
                        : 'bg-white border'
                    }`}
                  >
                    <div>{message.text}</div>
                    <div className={`text-xs mt-1 ${message.sender === 'admin' ? 'text-teal-100' : 'text-gray-500'}`}>
                      {message.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* AI Response Button */}
            <div className="p-2 border-t border-b bg-gray-50">
              <button 
                onClick={handleAIResponse}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                {t('generateAIResponse')}
              </button>
            </div>
            
            {/* Message Input */}
            <div className="p-4 flex items-center">
              <button className="p-2 rounded-full hover:bg-gray-100 mr-2">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
              </button>
              <input 
                type="text" 
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder={t('typeMessage')} 
                className="flex-1 p-2 border rounded-lg"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button 
                onClick={handleSendMessage}
                className="p-2 rounded-full hover:bg-gray-100 ml-2"
              >
                <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppMessages;