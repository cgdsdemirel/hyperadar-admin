'use client';

import { useEffect, useState } from 'react';
import StatCard from '../../components/StatCard';
import Chart    from '../../components/Chart';
import api      from '../../lib/api';

function Spinner() {
  return (
    <div className="flex items-center justify-center h-48">
      <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function DashboardPage() {
  const [stats,   setStats]   = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');

  useEffect(() => {
    api.get('/stats')
      .then((res) => setStats(res.data))
      .catch(() => setError('Failed to load stats'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="p-8"><Spinner /></div>
  );

  if (error) return (
    <div className="p-8 text-red-600">{error}</div>
  );

  const fmt = (n) => (n ?? 0).toLocaleString();
  const lastRun = stats.last_pipeline_run
    ? new Date(stats.last_pipeline_run).toLocaleString()
    : 'Never';

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Platform overview</p>
      </div>

      {/* Stat cards — 3 column grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard title="Total Users"           value={fmt(stats.total_users)} />
        <StatCard title="Free Users"            value={fmt(stats.free_users)} />
        <StatCard title="Premium Users"         value={fmt(stats.premium_users)} />
        <StatCard title="Queries Today"         value={fmt(stats.queries_today)} />
        <StatCard title="Queries This Month"    value={fmt(stats.queries_this_month)} />
        <StatCard title="Tokens Spent Today"    value={fmt(stats.tokens_today)} />
        <StatCard title="Tokens This Month"     value={fmt(stats.tokens_this_month)} />
        <StatCard title="Total Trends in DB"    value={fmt(stats.total_trends)} />
        <StatCard title="Last Pipeline Run"     value={lastRun} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Chart
          type="line"
          data={stats.daily_new_users}
          xKey="day"
          yKey="count"
          title="New Users — Last 30 Days"
          color="#2563eb"
        />
        <Chart
          type="line"
          data={stats.daily_queries}
          xKey="day"
          yKey="count"
          title="Daily Queries — Last 30 Days"
          color="#7c3aed"
        />
      </div>
    </div>
  );
}
