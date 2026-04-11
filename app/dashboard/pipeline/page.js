'use client';

import { useEffect, useState } from 'react';
import StatCard  from '../../../components/StatCard';
import DataTable from '../../../components/DataTable';
import api       from '../../../lib/api';

// ─── Status badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }) {
  const styles = {
    success: 'bg-green-100 text-green-700',
    running: 'bg-blue-100 text-blue-700',
    failed:  'bg-red-100  text-red-700',
  };
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${styles[status] || styles.running}`}>
      {status}
    </span>
  );
}

// ─── Toast ────────────────────────────────────────────────────────────────────

function Toast({ message, type, onDismiss }) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 4000);
    return () => clearTimeout(t);
  }, [onDismiss]);

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl shadow-lg text-sm font-medium text-white transition-all ${
        type === 'success' ? 'bg-green-600' : 'bg-red-600'
      }`}
    >
      {message}
    </div>
  );
}

// ─── Columns ─────────────────────────────────────────────────────────────────

const LOG_COLUMNS = [
  { key: 'started_at',   label: 'Started',   render: (v) => new Date(v).toLocaleString() },
  { key: 'completed_at', label: 'Completed', render: (v) => v ? new Date(v).toLocaleString() : '—' },
  { key: 'status',       label: 'Status',    render: (v) => <StatusBadge status={v} /> },
  { key: 'trends_added', label: 'Trends Added', render: (v) => (v ?? 0).toLocaleString() },
  {
    key: 'error_message',
    label: 'Error',
    render: (v) => v
      ? <span className="text-red-600 text-xs truncate max-w-xs block" title={v}>{v}</span>
      : '—',
  },
];

const REGION_COLS    = [{ key: 'region',   label: 'Region' },   { key: 'count', label: 'Trends', render: (v) => (v ?? 0).toLocaleString() }];
const CATEGORY_COLS  = [{ key: 'category', label: 'Category' }, { key: 'count', label: 'Trends', render: (v) => (v ?? 0).toLocaleString() }];

// ─── Main page ────────────────────────────────────────────────────────────────

export default function PipelinePage() {
  const [data,       setData]       = useState(null);
  const [loading,    setLoading]    = useState(true);
  const [running,    setRunning]    = useState(false);
  const [toast,      setToast]      = useState(null);
  const [error,      setError]      = useState('');

  function fetchData() {
    api.get('/pipeline')
      .then((res) => setData(res.data))
      .catch(() => setError('Failed to load pipeline data'))
      .finally(() => setLoading(false));
  }

  useEffect(() => { fetchData(); }, []);

  async function triggerPipeline() {
    setRunning(true);
    try {
      await api.post('/pipeline/run');
      setToast({ message: 'Pipeline started successfully', type: 'success' });
      // Refresh stats after 3 s to pick up the new running log entry
      setTimeout(fetchData, 3000);
    } catch {
      setToast({ message: 'Failed to trigger pipeline', type: 'error' });
    } finally {
      setRunning(false);
    }
  }

  if (loading) return (
    <div className="p-8 flex justify-center">
      <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (error) return <div className="p-8 text-red-600">{error}</div>;

  const lastRun = data.last_run_time
    ? new Date(data.last_run_time).toLocaleString()
    : 'Never';

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pipeline</h1>
          <p className="text-sm text-gray-500 mt-1">Data pipeline health and history</p>
        </div>

        <button
          onClick={triggerPipeline}
          disabled={running}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-semibold rounded-xl transition-colors"
        >
          {running ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Starting…
            </>
          ) : (
            <>⚙ Run Pipeline Now</>
          )}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Last Successful Run" value={lastRun} />
        <StatCard title="Total Trends in DB"  value={(data.total_trends   || 0).toLocaleString()} />
        <StatCard title="Trends Last 24h"     value={(data.trends_last_24h || 0).toLocaleString()} />
      </div>

      {/* Breakdown tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Trends by Region</h2>
          <DataTable columns={REGION_COLS} data={data.trends_by_region} />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Trends by Category</h2>
          <DataTable columns={CATEGORY_COLS} data={data.trends_by_category} />
        </div>
      </div>

      {/* Log table */}
      <div>
        <h2 className="text-base font-semibold text-gray-800 mb-3">Recent Pipeline Runs</h2>
        <DataTable columns={LOG_COLUMNS} data={data.logs} />
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onDismiss={() => setToast(null)}
        />
      )}
    </div>
  );
}
