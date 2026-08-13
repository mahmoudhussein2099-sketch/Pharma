import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const AISecurity = () => {
  const { t } = useTranslation();
  const [activeIssue, setActiveIssue] = useState(null);
  const [fixing, setFixing] = useState(false);

  const securityIssues = [
    {
      id: 1,
      title: 'Potential SQL Injection Vulnerability',
      description: 'Detected unsanitized user input in product search function',
      severity: 'High',
      status: 'Open'
    },
    {
      id: 2,
      title: 'Weak Password Policy',
      description: 'Current password policy does not enforce sufficient complexity',
      severity: 'Medium',
      status: 'Open'
    },
    {
      id: 3,
      title: 'Session Timeout Too Long',
      description: 'User sessions remain active for extended periods',
      severity: 'Medium',
      status: 'Open'
    }
  ];

  const handleFix = (issueId) => {
    setActiveIssue(issueId);
    setFixing(true);
    
    // Simulate fixing process
    setTimeout(() => {
      setFixing(false);
      // Update the issue status
      document.getElementById(`status-${issueId}`).textContent = 'Fixed';
      document.getElementById(`status-${issueId}`).className = 'px-2 py-1 rounded-full text-xs bg-green-100 text-green-800';
    }, 2000);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">{t('aiSecurity')}</h2>
      
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">{t('securityScan')}</h3>
        <p className="mb-4">{t('lastScan')}: 2024-06-24 10:15 AM</p>
        
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-6">
          {t('runNewScan')}
        </button>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('issue')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('severity')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('status')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('action')}</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {securityIssues.map(issue => (
                <tr key={issue.id}>
                  <td className="px-6 py-4">
                    <div className="font-medium">{issue.title}</div>
                    <div className="text-sm text-gray-500">{issue.description}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      issue.severity === 'High' ? 'bg-red-100 text-red-800' : 
                      issue.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {issue.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span id={`status-${issue.id}`} className={`px-2 py-1 rounded-full text-xs ${
                      issue.status === 'Open' ? 'bg-red-100 text-red-800' : 
                      'bg-green-100 text-green-800'
                    }`}>
                      {issue.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => handleFix(issue.id)}
                      disabled={fixing && activeIssue === issue.id}
                      className="bg-teal-600 text-white px-3 py-1 rounded hover:bg-teal-700 disabled:bg-gray-400"
                    >
                      {fixing && activeIssue === issue.id ? t('fixing') : t('fix')}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-4">{t('securitySettings')}</h3>
          
          <div className="space-y-4">
            <div>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-teal-600" defaultChecked />
                <span>{t('enableAIScan')}</span>
              </label>
            </div>
            
            <div>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-teal-600" defaultChecked />
                <span>{t('autoFix')}</span>
              </label>
            </div>
            
            <div>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-teal-600" defaultChecked />
                <span>{t('emailAlerts')}</span>
              </label>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('scanFrequency')}</label>
              <select className="w-full p-2 border rounded">
                <option value="daily">{t('daily')}</option>
                <option value="weekly">{t('weekly')}</option>
                <option value="monthly">{t('monthly')}</option>
              </select>
            </div>
            
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-2">
              {t('saveSettings')}
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-4">{t('securityLog')}</h3>
          
          <div className="space-y-3 max-h-64 overflow-y-auto">
            <div className="p-3 bg-gray-50 rounded">
              <div className="font-medium">2024-06-24 10:15 AM</div>
              <div className="text-sm text-gray-600">Security scan completed. 3 issues found.</div>
            </div>
            <div className="p-3 bg-gray-50 rounded">
              <div className="font-medium">2024-06-23 09:30 AM</div>
              <div className="text-sm text-gray-600">Security scan completed. 4 issues found.</div>
            </div>
            <div className="p-3 bg-gray-50 rounded">
              <div className="font-medium">2024-06-22 11:45 AM</div>
              <div className="text-sm text-gray-600">Security scan completed. 4 issues found.</div>
            </div>
            <div className="p-3 bg-gray-50 rounded">
              <div className="font-medium">2024-06-21 10:00 AM</div>
              <div className="text-sm text-gray-600">Security scan completed. 5 issues found.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AISecurity;