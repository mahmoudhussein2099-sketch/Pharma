import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AdminPageWrapper from '../../components/AdminPageWrapper';

const Delivery = () => {
  const { t } = useTranslation();
  const [deliveries, setDeliveries] = useState([
    { id: 1, order: '#ORD-001', customer: 'John Doe', address: '123 Main St', status: 'In Transit' },
    { id: 2, order: '#ORD-002', customer: 'Jane Smith', address: '456 Oak Ave', status: 'Delivered' },
  ]);

  return (
    <AdminPageWrapper title={t('delivery', 'Delivery Management')}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-2">{t('order', 'Order')}</th>
              <th className="text-left p-2">{t('customer', 'Customer')}</th>
              <th className="text-left p-2">{t('address', 'Address')}</th>
              <th className="text-left p-2">{t('status', 'Status')}</th>
              <th className="text-left p-2">{t('actions', 'Actions')}</th>
            </tr>
          </thead>
          <tbody>
            {deliveries.map(delivery => (
              <tr key={delivery.id} className="border-b border-border">
                <td className="p-2">{delivery.order}</td>
                <td className="p-2">{delivery.customer}</td>
                <td className="p-2">{delivery.address}</td>
                <td className="p-2">
                  <span className={`px-2 py-1 rounded text-xs ${
                    delivery.status === 'Delivered' ? 'bg-success/15 text-success' : 'bg-warning/15 text-warning'
                  }`}>
                    {delivery.status}
                  </span>
                </td>
                <td className="p-2">
                  <button className="bg-primary text-primary-foreground px-3 py-1 rounded hover:bg-primary/90">
                    {t('track', 'Track')}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminPageWrapper>
  );
};

export default Delivery;
