import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AdminPageWrapper from '../../components/AdminPageWrapper';

const BlockList = () => {
  const { t } = useTranslation();
  const [blockedUsers, setBlockedUsers] = useState([
    { id: 1, email: 'spam@example.com', reason: 'Spam', date: '2024-01-15' },
    { id: 2, email: 'abuse@example.com', reason: 'Abuse', date: '2024-01-14' },
  ]);

  return (
    <AdminPageWrapper title={t('blockList', 'Block List')}>
      <div className="space-y-4">
        {blockedUsers.map(user => (
          <div key={user.id} className="flex justify-between items-center p-4 border rounded">
            <div>
              <p className="font-medium">{user.email}</p>
              <p className="text-sm text-muted-foreground">{user.reason} - {user.date}</p>
            </div>
            <button className="bg-destructive text-destructive-foreground px-3 py-1 rounded hover:bg-destructive/90">
              {t('unblock', 'Unblock')}
            </button>
          </div>
        ))}
      </div>
    </AdminPageWrapper>
  );
};

export default BlockList;