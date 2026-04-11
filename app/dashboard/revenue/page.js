'use client';

import { useEffect, useState } from 'react';
import StatCard  from '../../../components/StatCard';
import DataTable from '../../../components/DataTable';
import Chart     from '../../../components/Chart';
import api       from '../../../lib/api';

const COLUMNS = [
  { key: 'email',        label: 'User' },
  {
    key: 'platform',
    label: 'Platform',
    render: (v) => (
      <span className={`inline-block text-xs px-2 py-0.5 rounded-full font-medium ${
        v === 'apple'
          ? 'bg-gray-900 text-white'
          : 'bg-green-600 text-white'
      }`}>
        {v === 'apple' ? '🍎 Apple' : '🤖 Google'}
      </span>
    ),
  },
  { key: 'package_name', label: 'Package' },
  { key: 'tokens_added', label: 'Tokens',  render: (v) => (v ?? 0).toLocaleString() },
  { key: 'price_usd',    label: 'Revenue', render: (v) => `$${parseFloat(v).toFixed(2)}` },
  { key: 'created_at',   label: 'Date',    render: (v) => new Date(v).toLocaleString() },
];

export default function RevenuePage() {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');

  useEffect(() => {
    api.get('/revenue')
      .then((res) => setData(res.data))
      .catch(() => setError('Failed to load revenue data'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="p-8 flex justify-center">
      <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (error) return <div className="p-8 text-red-600">{error}</div>;

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Revenue</h1>
        <p className="text-sm text-gray-500 mt-1">In-app purchase analytics</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Revenue This Month"
          value={`$${parseFloat(data.revenue_this_month || 0).toFixed(2)}`}
        />
        <StatCard
          title="Transactions This Month"
          value={(data.transactions_this_month || 0).toLocaleString()}
        />
        <StatCard
          title="Avg Revenue / Premium User"
          value={`$${data.avg_revenue_per_premium || '0.00'}`}
        />
      </div>

      <Chart
        type="line"
        data={data.daily_revenue}
        xKey="day"
        yKey="revenue"
        title="Daily IAP Revenue — Last 30 Days"
        color="#16a34a"
      />

      <div>
        <h2 className="text-base font-semibold text-gray-800 mb-3">Recent Transactions</h2>
        <DataTable
          columns={COLUMNS}
          data={data.recent_transactions}
          loading={false}
        />
      </div>
    </div>
  );
}
