import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { adminApi } from '../services/adminApi';

const AIResponseGenerator = ({ onSelectResponse, messageType }) => {
  const { t } = useTranslation();
  const [generating, setGenerating] = useState(false);
  const [responses, setResponses] = useState([]);
  const [error, setError] = useState('');

  const generateResponses = useCallback(async () => {
    setGenerating(true);
    setError('');
    try {
      const data = await adminApi('/admin/ai/response', {
        method: 'POST',
        body: { messageType },
      });
      setResponses(data.responses || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setGenerating(false);
    }
  }, [messageType]);

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

      {error && <div className="mb-3 rounded border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}

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
