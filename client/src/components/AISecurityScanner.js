import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { adminApi } from '../services/adminApi';

const AISecurityScanner = () => {
  const { t } = useTranslation();
  const [scanning, setScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [scanResults, setScanResults] = useState(null);
  const [error, setError] = useState('');

  const runScan = useCallback(async () => {
    setScanning(true);
    setError('');
    try {
      const data = await adminApi('/admin/ai/security');
      setScanResults({
        threatLevel: data.threatLevel,
        threatsDetected: data.threatsDetected,
        threatsStopped: data.threatsStopped,
        vulnerabilities: data.vulnerabilities,
        recommendations: data.recommendations,
        details: (data.details || []).map((d, i) => ({
          id: i,
          type: d.type,
          severity: d.severity,
          status: d.status,
          ip: d.ip,
          time: d.time,
        })),
        lastScan: data.lastScan,
      });
      setScanComplete(true);
    } catch (e) {
      setError(e.message);
    } finally {
      setScanning(false);
    }
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold">{t('aiSecurityScanner')}</h3>
          <p className="text-sm text-gray-500 mt-1">Reads the real server error log + failed login attempts.</p>
        </div>
        <button
          onClick={runScan}
          disabled={scanning}
          className={`px-4 py-2 rounded ${scanning ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
        >
          {scanning ? t('scanning') : (scanComplete ? t('rescan') || 'Rescan' : t('startScan'))}
        </button>
      </div>

      {error && (
        <div className="rounded border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      )}

      {scanComplete && scanResults && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className={`p-4 rounded-lg ${
              scanResults.threatLevel === 'High' ? 'bg-red-100' :
              scanResults.threatLevel === 'Medium' ? 'bg-yellow-100' : 'bg-green-100'
            }`}>
              <p className="text-sm text-gray-500">{t('threatLevel')}</p>
              <p className={`text-xl font-bold ${
                scanResults.threatLevel === 'High' ? 'text-red-700' :
                scanResults.threatLevel === 'Medium' ? 'text-yellow-700' : 'text-green-700'
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
            <div className="p-4 rounded-lg bg-purple-100">
              <p className="text-sm text-gray-500">High severity</p>
              <p className="text-xl font-bold text-purple-700">{scanResults.vulnerabilities}</p>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">{t('recommendations')}</h4>
            <ul className="list-disc pl-5 space-y-1">
              {(scanResults.recommendations || []).map((rec, index) => (
                <li key={index} className="text-sm">{rec}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-2">{t('threatDetails')} <span className="text-xs text-gray-400">(from live log)</span></h4>
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
                  {(scanResults.details || []).map((threat) => (
                    <tr key={threat.id}>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">{threat.type}</td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          threat.severity === 'High' ? 'bg-red-100 text-red-800' :
                          threat.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {threat.severity}
                        </span>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          threat.status === 'Blocked' || threat.status === 'Rate-limited' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
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
              {(scanResults.details || []).length === 0 && (
                <p className="py-4 text-center text-sm text-gray-500">No events in the log — the server is clean.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {!scanComplete && !error && (
        <p className="py-8 text-center text-sm text-gray-500">
          Press “{t('startScan')}” to run a live scan of the server error log and failed login attempts.
        </p>
      )}
    </div>
  );
};

export default AISecurityScanner;
