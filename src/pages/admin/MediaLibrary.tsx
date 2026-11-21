import React, { useState, useEffect, useRef } from 'react';
import { usePortfolioData } from '../../context/DataContext';
import { MediaFileRecord } from '../../types/database';
import {
  UploadCloud,
  Trash2,
  Copy,
  Check,
  Image as ImageIcon,
  AlertCircle,
  ExternalLink,
  FileText,
  X,
} from 'lucide-react';

export const MediaLibrary: React.FC = () => {
  const { getAllMediaFiles, uploadMediaFile, deleteMediaFile } = usePortfolioData();
  const [mediaList, setMediaList] = useState<MediaFileRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadMedia = async () => {
    setIsLoading(true);
    try {
      const data = await getAllMediaFiles();
      setMediaList(data);
    } catch (err: any) {
      console.warn('Could not load media files:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMedia();
  }, []);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setStatusMsg({ type: 'error', text: 'File size exceeds maximum limit of 5MB.' });
      return;
    }

    // Validate mime type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      setStatusMsg({ type: 'error', text: 'Invalid file format. Please upload PNG, JPG, WEBP, or SVG images.' });
      return;
    }

    setIsUploading(true);
    setStatusMsg(null);

    const { data, error } = await uploadMediaFile(file);
    setIsUploading(false);

    if (error) {
      setStatusMsg({ type: 'error', text: error.message || 'Failed to upload media asset to storage.' });
    } else {
      setStatusMsg({ type: 'success', text: `Uploaded "${file.name}" successfully.` });
      if (fileInputRef.current) fileInputRef.current.value = '';
      await loadMedia();
    }
  };

  const handleCopyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (id: string, storagePath: string) => {
    const { error } = await deleteMediaFile(id, storagePath);
    setDeleteConfirmId(null);

    if (error) {
      setStatusMsg({ type: 'error', text: error.message || 'Failed to delete media asset.' });
    } else {
      setStatusMsg({ type: 'success', text: 'Asset removed from library.' });
      await loadMedia();
    }
  };

  return (
    <div>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          marginBottom: '28px',
        }}
      >
        <div>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.06em', color: '#3B82F6', textTransform: 'uppercase' }}>
            STORAGE & ASSETS
          </span>
          <h1 style={{ fontSize: 'clamp(1.5rem, 2.2vw, 1.9rem)', fontWeight: 600, color: '#F2EFF5', marginTop: '2px' }}>
            Media Library
          </h1>
          <p style={{ color: '#ABA7B6', fontSize: '0.88rem', marginTop: '4px' }}>
            Upload, preview, and copy URLs for project screenshots, icons, and portfolio assets.
          </p>
        </div>

        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/*"
            style={{ display: 'none' }}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              backgroundColor: '#3B82F6',
              borderRadius: '5px',
              color: '#FFFFFF',
              fontSize: '0.86rem',
              fontWeight: 600,
              cursor: isUploading ? 'not-allowed' : 'pointer',
              border: 'none',
              opacity: isUploading ? 0.7 : 1,
            }}
          >
            <UploadCloud size={16} />
            <span>{isUploading ? 'Uploading to Bucket...' : 'Upload Image'}</span>
          </button>
        </div>
      </div>

      {/* Toast */}
      {statusMsg && (
        <div
          style={{
            padding: '14px 18px',
            backgroundColor: statusMsg.type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            border: `1px solid ${statusMsg.type === 'success' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
            borderRadius: '6px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: statusMsg.type === 'success' ? '#6EE7B7' : '#FCA5A5',
            fontSize: '0.88rem',
          }}
        >
          <span>{statusMsg.text}</span>
          <button onClick={() => setStatusMsg(null)} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>
            <X size={16} />
          </button>
        </div>
      )}

      {/* Drag & Drop Upload Zone */}
      <div
        onClick={() => fileInputRef.current?.click()}
        style={{
          border: '2px dashed rgba(59, 130, 246, 0.3)',
          borderRadius: '8px',
          padding: '40px 24px',
          textAlign: 'center',
          backgroundColor: 'rgba(59, 130, 246, 0.03)',
          marginBottom: '36px',
          cursor: 'pointer',
          transition: 'all 0.25s ease',
        }}
        className="upload-dropzone"
      >
        <UploadCloud size={32} style={{ color: '#60A5FA', margin: '0 auto 12px' }} />
        <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#F2EFF5', marginBottom: '6px' }}>
          Select or drag images to upload
        </h3>
        <p style={{ fontSize: '0.82rem', color: '#ABA7B6' }}>
          Supports PNG, JPG, JPEG, WEBP, or SVG up to 5MB. Stored in Supabase <code>portfolio-media</code> bucket.
        </p>
      </div>

      {/* Media Grid */}
      {mediaList.length === 0 ? (
        <div
          style={{
            padding: '48px 24px',
            textAlign: 'center',
            backgroundColor: 'rgba(12, 13, 20, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.07)',
            borderRadius: '6px',
            color: '#ABA7B6',
          }}
        >
          <ImageIcon size={32} style={{ color: '#797585', margin: '0 auto 12px' }} />
          <h4 style={{ fontSize: '0.96rem', fontWeight: 600, color: '#F2EFF5', marginBottom: '4px' }}>
            No Media Assets Stored
          </h4>
          <p style={{ fontSize: '0.82rem' }}>
            Upload your project screenshots, architecture diagrams, or profile imagery above.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '20px',
          }}
        >
          {mediaList.map((media) => (
            <div
              key={media.id}
              style={{
                backgroundColor: 'rgba(12, 13, 20, 0.85)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '6px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Preview */}
              <div
                style={{
                  height: '160px',
                  backgroundColor: 'rgba(6, 6, 10, 0.95)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <img
                  src={media.public_url}
                  alt={media.filename}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    // Fallback placeholder if asset link is broken
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>

              {/* Details */}
              <div style={{ padding: '14px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div
                    style={{
                      fontSize: '0.84rem',
                      fontWeight: 600,
                      color: '#F2EFF5',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      marginBottom: '4px',
                    }}
                    title={media.filename}
                  >
                    {media.filename}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#797585' }}>
                    {(media.file_size / 1024).toFixed(1)} KB · {media.mime_type.split('/')[1]?.toUpperCase()}
                  </div>
                </div>

                {/* Actions */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: '14px',
                    paddingTop: '10px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                  }}
                >
                  <button
                    onClick={() => handleCopyUrl(media.id, media.public_url)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      padding: '4px 8px',
                      backgroundColor: copiedId === media.id ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid',
                      borderColor: copiedId === media.id ? '#10B981' : 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '3px',
                      color: copiedId === media.id ? '#6EE7B7' : '#ABA7B6',
                      fontSize: '0.72rem',
                      fontFamily: 'var(--font-mono)',
                      cursor: 'pointer',
                    }}
                  >
                    {copiedId === media.id ? <Check size={12} /> : <Copy size={12} />}
                    <span>{copiedId === media.id ? 'COPIED' : 'COPY URL'}</span>
                  </button>

                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <a
                      href={media.public_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Open full image in new tab"
                      style={{ color: '#ABA7B6', padding: '4px' }}
                    >
                      <ExternalLink size={14} />
                    </a>

                    {deleteConfirmId === media.id ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <button
                          onClick={() => handleDelete(media.id, media.storage_path)}
                          style={{
                            padding: '3px 6px',
                            backgroundColor: '#EF4444',
                            color: '#FFFFFF',
                            borderRadius: '3px',
                            fontSize: '0.68rem',
                            fontWeight: 600,
                            border: 'none',
                            cursor: 'pointer',
                          }}
                        >
                          DELETE
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(null)}
                          style={{ background: 'none', border: 'none', color: '#ABA7B6', cursor: 'pointer' }}
                        >
                          <X size={13} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirmId(media.id)}
                        title="Delete image"
                        style={{ background: 'none', border: 'none', color: '#F87171', padding: '4px', cursor: 'pointer' }}
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        .upload-dropzone:hover {
          border-color: #3B82F6 !important;
          background-color: rgba(59, 130, 246, 0.06) !important;
        }
      `}</style>
    </div>
  );
};

export default MediaLibrary;
