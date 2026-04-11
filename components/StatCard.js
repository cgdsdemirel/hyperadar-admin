export default function StatCard({ title, value, subtitle, trend }) {
  const isPositive = trend > 0;
  const isNegative = trend < 0;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <p className="text-sm font-medium text-gray-500 truncate">{title}</p>

      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-2xl font-bold text-gray-900">
          {value ?? '—'}
        </span>

        {trend !== undefined && trend !== null && (
          <span
            className={`text-xs font-semibold px-1.5 py-0.5 rounded ${
              isPositive ? 'bg-green-50 text-green-600' :
              isNegative ? 'bg-red-50 text-red-600'    :
                           'bg-gray-100 text-gray-500'
            }`}
          >
            {isPositive ? '↑' : isNegative ? '↓' : '→'} {Math.abs(trend)}%
          </span>
        )}
      </div>

      {subtitle && (
        <p className="mt-1 text-xs text-gray-400">{subtitle}</p>
      )}
    </div>
  );
}
