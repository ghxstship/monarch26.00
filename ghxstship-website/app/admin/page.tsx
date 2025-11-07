/**
 * Admin Dashboard Page
 * Main dashboard with statistics and overview
 */

'use client';

import { useEffect, useState } from 'react';
import { useRequireAuth } from '@/lib/hooks';
import { 
  Users, 
  FolderKanban, 
  FileText, 
  Eye, 
  Activity
} from 'lucide-react';

interface Stats {
  users: { total: number; active: number };
  projects: { total: number; published: number };
  blog: { total: number; published: number };
  analytics: { pageViews: number; uniqueVisitors: number };
}

export default function AdminDashboard() {
  const { user, loading } = useRequireAuth();
  const [stats, setStats] = useState<Stats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchStats();
    }
  }, [user]);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const [projectsRes, blogRes, analyticsRes] = await Promise.all([
        fetch('/api/projects/stats', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('/api/blog/stats', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('/api/analytics/stats?days=30', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);

      const [projects, blog, analytics] = await Promise.all([
        projectsRes.json(),
        blogRes.json(),
        analyticsRes.json()
      ]);

      setStats({
        users: { total: 0, active: 0 }, // Would need user stats endpoint
        projects: {
          total: projects.stats?.total || 0,
          published: projects.stats?.published || 0
        },
        blog: {
          total: blog.stats?.total || 0,
          published: blog.stats?.published || 0
        },
        analytics: {
          pageViews: analytics.stats?.totalPageViews || 0,
          uniqueVisitors: analytics.stats?.uniqueVisitors || 0
        }
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setStatsLoading(false);
    }
  };

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back, {user.name || user.email}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Users */}
        <StatCard
          title="Total Users"
          value={stats?.users.total || 0}
          subtitle={`${stats?.users.active || 0} active`}
          icon={Users}
          color="blue"
          loading={statsLoading}
        />

        {/* Projects */}
        <StatCard
          title="Projects"
          value={stats?.projects.total || 0}
          subtitle={`${stats?.projects.published || 0} published`}
          icon={FolderKanban}
          color="green"
          loading={statsLoading}
        />

        {/* Blog Posts */}
        <StatCard
          title="Blog Posts"
          value={stats?.blog.total || 0}
          subtitle={`${stats?.blog.published || 0} published`}
          icon={FileText}
          color="purple"
          loading={statsLoading}
        />

        {/* Page Views */}
        <StatCard
          title="Page Views"
          value={stats?.analytics.pageViews || 0}
          subtitle={`${stats?.analytics.uniqueVisitors || 0} unique visitors`}
          icon={Eye}
          color="orange"
          loading={statsLoading}
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <QuickAction
            title="Create Project"
            description="Add a new case study or project"
            href="/admin/projects/new"
            icon={FolderKanban}
          />
          <QuickAction
            title="Write Blog Post"
            description="Create a new blog article"
            href="/admin/blog/new"
            icon={FileText}
          />
          <QuickAction
            title="View Analytics"
            description="Check site performance"
            href="/admin/analytics"
            icon={Activity}
          />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <ActivityItem
            action="Project published"
            item="New Portfolio Website"
            time="2 hours ago"
          />
          <ActivityItem
            action="Blog post created"
            item="10 Design Trends for 2025"
            time="5 hours ago"
          />
          <ActivityItem
            action="User registered"
            item="john@example.com"
            time="1 day ago"
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  color, 
  loading 
}: { 
  title: string; 
  value: number; 
  subtitle: string; 
  icon: React.ComponentType<{ className?: string }>; 
  color: string;
  loading: boolean;
}) {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600',
  }[color];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <div className={`p-2 rounded-lg ${colorClasses}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      {loading ? (
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-20 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-32"></div>
        </div>
      ) : (
        <>
          <p className="text-3xl font-bold text-gray-900">{value.toLocaleString()}</p>
          <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
        </>
      )}
    </div>
  );
}

function QuickAction({ 
  title, 
  description, 
  href, 
  icon: Icon 
}: { 
  title: string; 
  description: string; 
  href: string; 
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <a
      href={href}
      className="block p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all"
    >
      <div className="flex items-start space-x-3">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Icon className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
      </div>
    </a>
  );
}

function ActivityItem({ 
  action, 
  item, 
  time 
}: { 
  action: string; 
  item: string; 
  time: string;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
      <div>
        <p className="text-sm font-medium text-gray-900">{action}</p>
        <p className="text-sm text-gray-600">{item}</p>
      </div>
      <span className="text-xs text-gray-500">{time}</span>
    </div>
  );
}
