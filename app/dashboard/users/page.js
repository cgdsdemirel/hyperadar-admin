'use client';

import { useEffect, useState, useCallback } from 'react';
import DataTable from '../../../components/DataTable';
import api       from '../../../lib/api';

// ─── User detail modal ────────────────────────────────────────────────────────

function UserModal({ user, onClose }) {
  const [detail, setDetail]   = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/users/${user.id}`)
      .then((res) => setDetail(res.data))
      .finally(() => setLoading(false));
  }, [user.id]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900">{user.email}</h2>
            <span className={`mt-1 inline-block text-xs px-2 py-0.5 rounded-full font-medium ${
              user.plan === 'premium'
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-100 text-gray-600'
            }`}>
              {user.plan}
            </span>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-xl">✕</button>
        </div>

        <div className="p-6 space-y-6">
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : detail ? (
            <>
              {/* Balance */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Token Balance</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500">Monthly</p>
                    <p className="text-lg font-bold text-gray-900">
                      {detail.balance?.monthly_tokens ?? 0}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500">Purchased</p>
                    <p className="text-lg font-bold text-gray-900">
                      {detail.balance?.purchased_tokens ?? 0}
                    </p>
                  </div>
                </div>
              </div>

              {/* Last queries */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Last 10 Queries</h3>
                {detail.queries.length === 0 ? (
                  <p className="text-sm text-gray-400">No queries yet</p>
                ) : (
                  <div className="space-y-2">
                    {detail.queries.map((q) => (
                      <div key={q.id} className="flex justify-between items-center text-sm py-2 border-b border-gray-50 last:border-0">
                        <div>
                          <span className="text-gray-700">{(q.categories || []).join(', ')}</span>
                          <span className="mx-1 text-gray-300">·</span>
                          <span className="text-gray-500">{(q.regions || []).join(', ')}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-700 font-medium">{q.token_spent} tokens</p>
                          <p className="text-gray-400 text-xs">
                            {new Date(q.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

const COLUMNS = [
  { key: 'email',   label: 'Email' },
  {
    key: 'plan',
    label: 'Plan',
    render: (val) => (
      <span className={`inline-block text-xs px-2 py-0.5 rounded-full font-medium ${
        val === 'premium'
          ? 'bg-green-100 text-green-700'
          : 'bg-gray-100 text-gray-600'
      }`}>
        {val}
      </span>
    ),
  },
  { key: 'monthly_tokens',   label: 'Monthly Tokens',   render: (v) => (v ?? 0).toLocaleString() },
  { key: 'purchased_tokens', label: 'Purchased Tokens', render: (v) => (v ?? 0).toLocaleString() },
  { key: 'total_queries',    label: 'Queries',          render: (v) => (v ?? 0).toLocaleString() },
  { key: 'created_at',       label: 'Joined',           render: (v) => new Date(v).toLocaleDateString() },
];

export default function UsersPage() {
  const [users,      setUsers]      = useState([]);
  const [total,      setTotal]      = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page,       setPage]       = useState(1);
  const [search,     setSearch]     = useState('');
  const [plan,       setPlan]       = useState('');
  const [loading,    setLoading]    = useState(true);
  const [selected,   setSelected]   = useState(null);

  const fetchUsers = useCallback(() => {
    setLoading(true);
    const params = new URLSearchParams({ page, limit: 20 });
    if (search) params.set('search', search);
    if (plan)   params.set('plan',   plan);

    api.get(`/users?${params}`)
      .then((res) => {
        setUsers(res.data.users);
        setTotal(res.data.total);
        setTotalPages(res.data.total_pages);
      })
      .finally(() => setLoading(false));
  }, [page, search, plan]);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Users</h1>
        <p className="text-sm text-gray-500 mt-1">{total.toLocaleString()} total users</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Search by email…"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 w-64"
        />
        <select
          value={plan}
          onChange={(e) => { setPlan(e.target.value); setPage(1); }}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All plans</option>
          <option value="free">Free</option>
          <option value="premium">Premium</option>
        </select>
      </div>

      <DataTable
        columns={columns}
        data={users}
        loading={loading}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        onRowClick={setSelected}
      />

      {selected && (
        <UserModal user={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}

// Re-export columns for DataTable (needs to be in scope)
const columns = COLUMNS;
