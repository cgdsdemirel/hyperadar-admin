'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logout } from '../lib/auth';

const NAV = [
  { href: '/dashboard',          label: 'Dashboard', icon: '▦' },
  { href: '/dashboard/users',    label: 'Users',     icon: '👤' },
  { href: '/dashboard/revenue',  label: 'Revenue',   icon: '💰' },
  { href: '/dashboard/tokens',   label: 'Tokens',    icon: '🪙' },
  { href: '/dashboard/pipeline', label: 'Pipeline',  icon: '⚙' },
];

export default function Sidebar() {
  const pathname = usePathname();

  function isActive(href) {
    return href === '/dashboard'
      ? pathname === '/dashboard'
      : pathname.startsWith(href);
  }

  return (
    <aside className="w-60 min-h-screen bg-gray-900 flex flex-col flex-shrink-0">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-gray-700">
        <h1 className="text-white text-xl font-bold tracking-tight">HypeRadar</h1>
        <p className="text-gray-500 text-xs mt-0.5">Admin Panel</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV.map(({ href, label, icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              isActive(href)
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <span>{icon}</span>
            {label}
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-gray-700">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
        >
          <span>↩</span>
          Sign out
        </button>
      </div>
    </aside>
  );
}
