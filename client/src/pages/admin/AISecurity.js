import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { adminApi } from '../../services/adminApi';

const AISecurity = () => {
  const { t } = useTranslation();
  const [scanning, setScanning] = useState(false);
  const [threats, setThreats] = useState([]);
  const [summary, setSummary] = useState(null);
  const [lastScan, setLastScan] = useState('');
  const [error, setError] = useState('');

  const startScan = useCallback(async () => {
    setScanning(true);
    setError('');
    try {
      const data = await adminApi('/admin/ai/security');
      setThreats(data.details || []);
      setSummary(data);
      setLastScan(data.lastScan);
    } catch (e) {
      setError(e.message);
    } finally {
      setScanning(false);
    }
  }, []);

  return (
    <div className="p-6 min-h-screen bg-background text-foreground">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            {t('aiSecurity', 'AI Security')}
          </h2>
          <p className="text-sm text-muted-foreground">Live scan of server error log + failed logins</p>
        </div>
        <button
          onClick={startScan}
          disabled={scanning}
          className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 disabled:opacity-50"
        >
          {scanning ? t('scanning', 'Scanning...') : t('startScan', 'Start Scan')}
        </button>
      </div>

      {error && <div className="mb-6 rounded border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-lg bg-destructive/15">
          <h4 className="font-medium text-destructive">
            {t('threatsDetected', 'Threats Detected')}
          </h4>
          <p className="text-2xl font-bold text-destructive">
            {summary ? summary.threatsDetected : (threats.length || '—')}
          </p>
        </div>
        <div className="p-4 rounded-lg bg-success/15">
          <h4 className="font-medium text-success">
            {t('threatsStopped', 'Threats Stopped')}
          </h4>
          <p className="text-2xl font-bold text-success">
            {summary ? summary.threatsStopped : '—'}
          </p>
        </div>
        <div className="p-4 rounded-lg bg-primary/10">
          <h4 className="font-medium text-primary">
            {t('lastScan', 'Last Scan')}
          </h4>
          <p className="text-sm text-primary">
            {lastScan || 'No scan yet'}
          </p>
        </div>
      </div>

      <div className="rounded-lg shadow p-6 bg-card">
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          {t('threatDetails', 'Threat Details')}
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-2 text-foreground">{t('threatType', 'Type')}</th>
                <th className="text-left p-2 text-foreground">{t('severity', 'Severity')}</th>
                <th className="text-left p-2 text-foreground">Status</th>
                <th className="text-left p-2 text-foreground">{t('ipAddress', 'IP Address')}</th>
                <th className="text-left p-2 text-foreground">{t('time', 'Time')}</th>
              </tr>
            </thead>
            <tbody>
              {threats.map((threat, index) => (
                <tr key={index} className="border-b border-border">
                  <td className="p-2 text-foreground">{threat.type}</td>
                  <td className="p-2">
                    <span className={`px-2 py-1 rounded text-xs ${
                      threat.severity === 'High'
                        ? 'bg-destructive/15 text-destructive'
                        : 'bg-warning/15 text-warning'
                    }`}>
                      {threat.severity}
                    </span>
                  </td>
                  <td className="p-2 text-foreground">{threat.status}</td>
                  <td className="p-2 text-foreground">{threat.ip}</td>
                  <td className="p-2 text-foreground">{threat.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {threats.length === 0 && !scanning && (
            <p className="py-6 text-center text-sm text-muted-foreground">
              No scan results yet. Press “{t('startScan', 'Start Scan')}”.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AISecurity;
