/**
 * Admin Sidebar
 * Navigation sidebar for admin dashboard
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  FolderKanban, 
  FileText, 
  Image, 
  MessageSquare, 
  BarChart3,
  Settings,
  LogOut
} from 'lucide-react';
import { useAuth } from '@/lib/hooks/useAuth';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Users', href: '/admin/users', icon: Users, role: 'ADMIN' },
  { name: 'Projects', href: '/admin/projects', icon: FolderKanban },
  { name: 'Blog', href: '/admin/blog', icon: FileText },
  { name: 'Media', href: '/admin/media', icon: Image },
  { name: 'Comments', href: '/admin/comments', icon: MessageSquare },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart3, role: 'ADMIN' },
  { name: 'Settings', href: '/admin/settings', icon: Settings, role: 'ADMIN' },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const canAccess = (requiredRole?: string) => {
    if (!requiredRole || !user) return true;
    const roleHierarchy = ['VIEWER', 'EDITOR', 'ADMIN', 'SUPER_ADMIN'];
    const userRoleIndex = roleHierarchy.indexOf(user.role);
    const requiredRoleIndex = roleHierarchy.indexOf(requiredRole);
    return userRoleIndex >= requiredRoleIndex;
  };

  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col h-full flex-shrink-0">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <Link href="/admin" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold">
            G
          </div>
          <span className="text-xl font-bold">GHXSTSHIP</span>
        </Link>
        <p className="text-xs text-gray-400 mt-1">Admin Dashboard</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          if (item.role && !canAccess(item.role)) return null;
          
          const isActive = pathname === item.href || 
                          (item.href !== '/admin' && pathname?.startsWith(item.href));
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Info & Logout */}
      <div className="p-4 border-t border-gray-800">
        {user && (
          <div className="mb-3">
            <p className="text-sm font-medium truncate">{user.name || user.email}</p>
            <p className="text-xs text-gray-400">{user.role}</p>
          </div>
        )}
        <button
          onClick={() => logout()}
          className="flex items-center space-x-3 px-4 py-2 w-full rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}
