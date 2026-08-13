import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const AISecurityScanner = () => {
  const { t } = useTranslation();
  const [scanning, setScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [scanResults, setScanResults] = useState(null);
  const [scanProgress, setScanProgress] = useState(0);

  const startScan = () => {
    setScanning(true);
    setScanComplete(false);
    setScanProgress(0);
    
    // Simulate scanning progress
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          completeScan();
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const completeScan = () => {
    // Mock scan results
    const results = {
      threatLevel: 'Low',
      threatsDetected: 3,
      threatsStopped: 3,
      vulnerabilities: 2,
      recommendations: [
        'Update SSL certificate on payment gateway',
        'Enable rate limiting on login endpoints',
        'Implement additional validation on user input forms'
      ],
      details: [
        { type: 'Suspicious Login', severity: 'Medium', status: 'Blocked', ip: '185.176.43.72', time: new Date().toLocaleString() },
        { type: 'SQL Injection Attempt', severity: 'High', status: 'Blocked', ip: '103.235.46.108', time: new Date().toLocaleString() },
        { type: 'Brute Force Attack', severity: 'Medium', status: 'Blocked', ip: '45.227.253.98', time: new Date().toLocaleString() }
      ]
    };
    
    setScanResults(results);
    setScanning(false);
    setScanComplete(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">{t('aiSecurityScanner')}</h3>
        <button
          onClick={startScan}
          disabled={scanning}
          className={`px-4 py-2 rounded ${scanning ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
        >
          {scanning ? t('scanning') : t('startScan')}
        </button>
      </div>
      
      {scanning && (
        <div className="mb-6">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">{t('scanningSystem')}</span>
            <span className="text-sm font-medium">{scanProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${scanProgress}%` }}></div>
          </div>
        </div>
      )}
      
      {scanComplete && scanResults && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`p-4 rounded-lg ${
              scanResults.threatLevel === 'High' ? 'bg-red-100' :
              scanResults.threatLevel === 'Medium' ? 'bg-yellow-100' :
              'bg-green-100'
            }`}>
              <p className="text-sm text-gray-500">{t('threatLevel')}</p>
              <p className={`text-xl font-bold ${
                scanResults.threatLevel === 'High' ? 'text-red-700' :
                scanResults.threatLevel === 'Medium' ? 'text-yellow-700' :
                'text-green-700'
              }`}>{scanResults.threatLevel}</p>
            </div>
            <div className="p-4 rounded-lg bg-blue-100">
              <p className="text-sm text-gray-500">{t('threatsDetected')}</p>
              <p className="text-xl font-bold text-blue-700">{scanResults.threatsDetected}</p>
            </div>
            <div className="p-4 rounded-lg bg-green-100">
              <p className="text-sm text-gray-500">{t('threatsStopped')}</p>
              <p className="text-xl font-bold text-green-700">{scanResults.threatsStopped}</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">{t('recommendations')}</h4>
            <ul className="list-disc pl-5 space-y-1">
              {scanResults.recommendations.map((rec, index) => (
                <li key={index} className="text-sm">{rec}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">{t('threatDetails')}</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('threatType')}</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('severity')}</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('status')}</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('ipAddress')}</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('time')}</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {scanResults.details.map((threat, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">{threat.type}</td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          threat.severity === 'High' ? 'bg-red-100 text-red-800' :
                          threat.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {threat.severity}
                        </span>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          threat.status === 'Blocked' ? 'bg-green-100 text-green-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {threat.status}
                        </span>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">{threat.ip}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">{threat.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
              {t('downloadReport')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AISecurityScanner;