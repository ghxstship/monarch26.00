/**
 * Analytics Dashboard Page
 * View site analytics and statistics
 */

'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRequireAuth } from '@/lib/hooks';
import { TrendingUp, Eye, Users, Activity, BarChart3 } from 'lucide-react';

interface AnalyticsData {
  totalPageViews: number;
  uniqueVisitors: number;
  topPages: Array<{ page: string; views: number }>;
  period: string;
}

export default function AnalyticsPage() {
  const { user, loading: authLoading } = useRequireAuth('ADMIN');
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(30);

  const fetchAnalytics = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`/api/analytics/stats?days=${days}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        setAnalytics(data.stats);
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
    }
  }, [days]);

  useEffect(() => {
    if (user) {
      fetchAnalytics();
    }
  }, [user, fetchAnalytics]);

  if (authLoading || !user) {
    return <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600 mt-1">Track your site performance</p>
        </div>
        <select
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value={7}>Last 7 days</option>
          <option value={30}>Last 30 days</option>
          <option value={90}>Last 90 days</option>
        </select>
      </div>

      {/* Stats Cards */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-white rounded-lg shadow p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard
            title="Page Views"
            value={analytics?.totalPageViews || 0}
            icon={Eye}
            color="blue"
            trend="+12%"
          />
          <StatCard
            title="Unique Visitors"
            value={analytics?.uniqueVisitors || 0}
            icon={Users}
            color="green"
            trend="+8%"
          />
          <StatCard
            title="Avg. Session"
            value="3m 24s"
            icon={Activity}
            color="purple"
            trend="+5%"
          />
          <StatCard
            title="Bounce Rate"
            value="42%"
            icon={TrendingUp}
            color="orange"
            trend="-3%"
          />
        </div>
      )}

      {/* Top Pages */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
            <BarChart3 className="w-6 h-6" />
            <span>Top Pages</span>
          </h2>
        </div>
        <div className="p-6">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-2 bg-gray-200 rounded w-full"></div>
                </div>
              ))}
            </div>
          ) : analytics?.topPages && analytics.topPages.length > 0 ? (
            <div className="space-y-4">
              {analytics.topPages.map((page, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{page.page}</p>
                    <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{
                          width: `${(page.views / (analytics.topPages[0]?.views || 1)) * 100}%`
                        }}
                      ></div>
                    </div>
                  </div>
                  <span className="ml-4 text-sm font-semibold text-gray-900">
                    {page.views.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No data available</p>
          )}
        </div>
      </div>

      {/* Traffic Sources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Traffic Sources</h3>
          <div className="space-y-3">
            <SourceItem source="Direct" percentage={45} color="blue" />
            <SourceItem source="Search" percentage={30} color="green" />
            <SourceItem source="Social" percentage={15} color="purple" />
            <SourceItem source="Referral" percentage={10} color="orange" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Device Breakdown</h3>
          <div className="space-y-3">
            <SourceItem source="Desktop" percentage={60} color="blue" />
            <SourceItem source="Mobile" percentage={35} color="green" />
            <SourceItem source="Tablet" percentage={5} color="purple" />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  color, 
  trend 
}: { 
  title: string; 
  value: number | string; 
  icon: React.ComponentType<{ className?: string }>; 
  color: string;
  trend: string;
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
      <p className="text-3xl font-bold text-gray-900 mb-1">
        {typeof value === 'number' ? value.toLocaleString() : value}
      </p>
      <p className="text-sm text-green-600 font-medium">{trend} from last period</p>
    </div>
  );
}

function SourceItem({ 
  source, 
  percentage, 
  color 
}: { 
  source: string; 
  percentage: number; 
  color: string;
}) {
  const colorClasses = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    purple: 'bg-purple-600',
    orange: 'bg-orange-600',
  }[color];

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">{source}</span>
        <span className="text-sm font-semibold text-gray-900">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`${colorClasses} h-2 rounded-full`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
