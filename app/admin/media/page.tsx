/**
 * Media Library Page
 * Manage uploaded files and media
 */

'use client';

import { useEffect, useState, useRef } from 'react';
import { useRequireAuth } from '@/lib/hooks';
import { Upload, Search, Trash2, Download, Image as ImageIcon, File } from 'lucide-react';
import Image from 'next/image';

interface MediaFile {
  id: string;
  filename: string;
  url: string;
  mimeType: string;
  size: number;
  createdAt: string;
  uploadedBy: {
    name: string | null;
    email: string;
  };
}

export default function MediaPage() {
  const { user, loading: authLoading } = useRequireAuth('EDITOR');
  const [media, setMedia] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      fetchMedia();
    }
  }, [user]);

  const fetchMedia = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch('/api/media', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        setMedia(data.media || []);
      }
    } catch (error) {
      console.error('Failed to fetch media:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setUploading(true);
    const token = localStorage.getItem('auth_token');

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('/api/media/upload', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` },
          body: formData
        });

        if (response.ok) {
          console.log(`Uploaded: ${file.name}`);
        }
      } catch (error) {
        console.error(`Failed to upload ${file.name}:`, error);
      }
    }

    setUploading(false);
    fetchMedia();
  };

  const handleDelete = async (mediaId: string) => {
    if (!confirm('Are you sure you want to delete this file?')) return;

    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`/api/media/${mediaId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        fetchMedia();
      }
    } catch (error) {
      console.error('Failed to delete media:', error);
    }
  };

  const filteredMedia = media.filter(file =>
    file.filename.toLowerCase().includes(search.toLowerCase())
  );

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

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
          <h1 className="text-3xl font-bold text-gray-900">Media Library</h1>
          <p className="text-gray-600 mt-1">Manage your uploaded files</p>
        </div>
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          <Upload className="w-5 h-5" />
          <span>{uploading ? 'Uploading...' : 'Upload Files'}</span>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={(e) => handleUpload(e.target.files)}
          className="hidden"
          accept="image/*,application/pdf"
        />
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search files..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Media Grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredMedia.map((file) => (
            <div key={file.id} className="group relative bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden">
              <div className="aspect-square flex items-center justify-center bg-gray-100">
                {file.mimeType.startsWith('image/') ? (
                  <Image
                    src={file.url}
                    alt={file.filename}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <File className="w-12 h-12 text-gray-400" />
                )}
              </div>
              
              <div className="p-2">
                <p className="text-xs font-medium text-gray-900 truncate">{file.filename}</p>
                <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
              </div>

              {/* Hover Actions */}
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                <a
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white rounded-lg hover:bg-gray-100"
                  title="View"
                >
                  <ImageIcon className="w-5 h-5 text-gray-700" />
                </a>
                <a
                  href={file.url}
                  download
                  className="p-2 bg-white rounded-lg hover:bg-gray-100"
                  title="Download"
                >
                  <Download className="w-5 h-5 text-gray-700" />
                </a>
                <button
                  onClick={() => handleDelete(file.id)}
                  className="p-2 bg-white rounded-lg hover:bg-gray-100"
                  title="Delete"
                >
                  <Trash2 className="w-5 h-5 text-red-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && filteredMedia.length === 0 && (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">No files uploaded yet</p>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Upload className="w-5 h-5" />
            <span>Upload Your First File</span>
          </button>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Total Files" value={media.length} />
        <StatCard title="Images" value={media.filter(f => f.mimeType.startsWith('image/')).length} />
        <StatCard 
          title="Total Size" 
          value={formatFileSize(media.reduce((sum, f) => sum + f.size, 0))} 
          isString 
        />
      </div>
    </div>
  );
}

function StatCard({ title, value, isString = false }: { title: string; value: number | string; isString?: boolean }) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <p className="text-sm text-gray-600">{title}</p>
      <p className="text-2xl font-bold text-gray-900 mt-1">
        {isString ? value : typeof value === 'number' ? value.toLocaleString() : value}
      </p>
    </div>
  );
}
