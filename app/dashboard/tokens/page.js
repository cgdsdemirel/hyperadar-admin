'use client';

import { useEffect, useState } from 'react';
import StatCard  from '../../../components/StatCard';
import DataTable from '../../../components/DataTable';
import Chart     from '../../../components/Chart';
import api       from '../../../lib/api';

const TOP_USERS_COLUMNS = [
  { key: 'email',            label: 'User' },
  {
    key: 'plan',
    label: 'Plan',
    render: (v) => (
      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
        v === 'premium' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
      }`}>
        {v}
      </span>
    ),
  },
  { key: 'tokens_this_month', label: 'Tokens This Month', render: (v) => (v ?? 0).toLocaleString() },
  { key: 'query_count',       label: 'Queries',           render: (v) => (v ?? 0).toLocaleString() },
];

export default function TokensPage() {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');

  useEffect(() => {
    api.get('/tokens')
      .then((res) => setData(res.data))
      .catch(() => setError('Failed to load token data'))
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
        <h1 className="text-2xl font-bold text-gray-900">Token Usage</h1>
        <p className="text-sm text-gray-500 mt-1">Consumption analytics</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard title="Tokens Today"         value={(data.tokens_today      || 0).toLocaleString()} />
        <StatCard title="Tokens This Month"    value={(data.tokens_this_month || 0).toLocaleString()} />
        <StatCard title="Avg Tokens / Query"   value={(data.avg_tokens_per_query || 0).toLocaleString()} />
        <StatCard title="Most Popular Category" value={data.most_popular_category || '—'} />
        <StatCard title="Most Popular Region"   value={data.most_popular_region   || '—'} />
      </div>

      <Chart
        type="bar"
        data={data.category_chart}
        xKey="category"
        yKey="tokens"
        title="Token Usage by Category — Last 30 Days"
        color="#7c3aed"
      />

      <div>
        <h2 className="text-base font-semibold text-gray-800 mb-3">
          Top 20 Users by Token Consumption This Month
        </h2>
        <DataTable
          columns={TOP_USERS_COLUMNS}
          data={data.top_users}
          loading={false}
        />
      </div>
    </div>
  );
}
