import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const BackupSettings = () => {
  const { t } = useTranslation();
  const [autoBackup, setAutoBackup] = useState(true);
  const [backupFrequency, setBackupFrequency] = useState('daily');
  const [backupTime, setBackupTime] = useState('02:00');
  const [retentionDays, setRetentionDays] = useState(30);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [backupInProgress, setBackupInProgress] = useState(false);

  // Mock backup history
  const backupHistory = [
    { id: 1, date: '2024-03-15 02:00:00', size: '156 MB', status: 'Success', type: 'Automatic' },
    { id: 2, date: '2024-03-14 02:00:00', size: '155 MB', status: 'Success', type: 'Automatic' },
    { id: 3, date: '2024-03-13 02:00:00', size: '154 MB', status: 'Success', type: 'Automatic' },
    { id: 4, date: '2024-03-12 14:25:10', size: '153 MB', status: 'Success', type: 'Manual' },
    { id: 5, date: '2024-03-12 02:00:00', size: '153 MB', status: 'Success', type: 'Automatic' },
  ];

  const handleSaveChanges = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleBackupNow = () => {
    setBackupInProgress(true);
    
    // Simulate backup process
    setTimeout(() => {
      setBackupInProgress(false);
      alert(t('backupCompleted'));
    }, 3000);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">{t('backupSettings')}</h3>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">{t('automaticBackups')}</h4>
            <p className="text-sm text-gray-500">{t('automaticBackupsDesc')}</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={autoBackup}
              onChange={() => setAutoBackup(!autoBackup)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        
        {autoBackup && (
          <>
            <div>
              <h4 className="font-medium mb-2">{t('backupFrequency')}</h4>
              <select
                value={backupFrequency}
                onChange={(e) => setBackupFrequency(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="daily">{t('daily')}</option>
                <option value="weekly">{t('weekly')}</option>
                <option value="monthly">{t('monthly')}</option>
              </select>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">{t('backupTime')}</h4>
              <input
                type="time"
                value={backupTime}
                onChange={(e) => setBackupTime(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <p className="text-sm text-gray-500 mt-1">{t('backupTimeDesc')}</p>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">{t('retentionPeriod')}</h4>
              <div className="flex items-center">
                <input
                  type="number"
                  value={retentionDays}
                  onChange={(e) => setRetentionDays(e.target.value)}
                  className="w-24 p-2 border rounded mr-2"
                />
                <span>{t('days')}</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">{t('retentionPeriodDesc')}</p>
            </div>
          </>
        )}
        
        <div>
          <h4 className="font-medium mb-2">{t('manualBackup')}</h4>
          <button
            onClick={handleBackupNow}
            disabled={backupInProgress}
            className={`px-4 py-2 rounded ${backupInProgress ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'} text-white`}
          >
            {backupInProgress ? t('backingUp') : t('backupNow')}
          </button>
          <p className="text-sm text-gray-500 mt-1">{t('manualBackupDesc')}</p>
        </div>
        
        <div>
          <h4 className="font-medium mb-2">{t('backupHistory')}</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('date')}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('size')}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('type')}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('status')}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('actions')}</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {backupHistory.map((backup) => (
                  <tr key={backup.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{backup.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{backup.size}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{backup.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        backup.status === 'Success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {backup.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">{t('download')}</button>
                      <button className="text-blue-600 hover:text-blue-900 mr-3">{t('restore')}</button>
                      <button className="text-red-600 hover:text-red-900">{t('delete')}</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="pt-4 border-t flex items-center justify-between">
          <button 
            onClick={handleSaveChanges}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            {t('saveChanges')}
          </button>
          
          {saveSuccess && (
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded">
              {t('settingsSaved')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BackupSettings;