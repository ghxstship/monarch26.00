/**
 * Comment Moderation Page
 * Manage and moderate user comments
 */

'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRequireAuth } from '@/lib/hooks';
import { CheckCircle, XCircle, Trash2, MessageSquare } from 'lucide-react';

interface Comment {
  id: string;
  content: string;
  status: string;
  createdAt: string;
  user: {
    name: string | null;
    email: string;
  };
  post: {
    title: string;
  };
}

export default function CommentsPage() {
  const { user, loading: authLoading } = useRequireAuth('EDITOR');
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('PENDING');

  const fetchComments = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('auth_token');
      // Note: This endpoint would need to be created
      const response = await fetch(`/api/comments?status=${filter}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        setComments(data.comments || []);
      }
    } catch (error) {
      console.error('Failed to fetch comments:', error);
      setComments([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    if (user) {
      fetchComments();
    }
  }, [user, fetchComments]);

  const handleModerate = async (commentId: string, status: string) => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`/api/comments/${commentId}/moderate`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      });

      if (response.ok) {
        fetchComments();
      }
    } catch (error) {
      console.error('Failed to moderate comment:', error);
    }
  };

  const handleDelete = async (commentId: string) => {
    if (!confirm('Are you sure you want to delete this comment?')) return;

    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        fetchComments();
      }
    } catch (error) {
      console.error('Failed to delete comment:', error);
    }
  };

  if (authLoading || !user) {
    return <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Comment Moderation</h1>
        <p className="text-gray-600 mt-1">Review and moderate user comments</p>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="flex border-b border-gray-200">
          {['PENDING', 'APPROVED', 'REJECTED'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`flex-1 px-6 py-3 text-sm font-medium transition-colors ${
                filter === status
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Comments List */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white rounded-lg shadow p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : comments.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No {filter.toLowerCase()} comments</p>
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-medium text-gray-900">
                      {comment.user.name || comment.user.email}
                    </span>
                    <span className="text-sm text-gray-500">
                      on &ldquo;{comment.post.title}&rdquo;
                    </span>
                  </div>
                  <p className="text-gray-700">{comment.content}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {new Date(comment.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  {comment.status === 'PENDING' && (
                    <>
                      <button
                        onClick={() => handleModerate(comment.id, 'APPROVED')}
                        className="p-2 text-green-600 hover:bg-green-50 rounded"
                        title="Approve"
                      >
                        <CheckCircle className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleModerate(comment.id, 'REJECTED')}
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                        title="Reject"
                      >
                        <XCircle className="w-5 h-5" />
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => handleDelete(comment.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Pending" value={0} color="yellow" />
        <StatCard title="Approved" value={0} color="green" />
        <StatCard title="Rejected" value={0} color="red" />
      </div>
    </div>
  );
}

function StatCard({ title, value, color }: { title: string; value: number; color: string }) {
  const colorClasses = {
    yellow: 'bg-yellow-100 text-yellow-800',
    green: 'bg-green-100 text-green-800',
    red: 'bg-red-100 text-red-800',
  }[color];

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <p className="text-sm text-gray-600">{title}</p>
      <p className={`text-2xl font-bold mt-1 ${colorClasses}`}>{value}</p>
    </div>
  );
}
