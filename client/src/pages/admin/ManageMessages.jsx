import { useEffect, useState } from 'react';
import api from '../../utils/api';
import { FiMail, FiTrash2, FiSearch, FiEye, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { toast } from 'react-toastify';

export default function ManageMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [viewing, setViewing] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/contact?page=${page}&limit=15&search=${search}`);
      if (res.data.success) { setMessages(res.data.data); setPagination(res.data.pagination); }
    } catch {} finally { setLoading(false); }
  };

  useEffect(() => { fetchMessages(); }, [page, search]);

  const handleMarkRead = async (id) => {
    try { await api.put(`/contact/${id}/read`); fetchMessages(); } catch {}
  };

  const handleDelete = async (id) => {
    try { await api.delete(`/contact/${id}`); toast.success('Message deleted', { theme: 'dark' }); setDeleteConfirm(null); fetchMessages(); }
    catch { toast.error('Delete failed', { theme: 'dark' }); }
  };

  const viewMessage = (msg) => {
    setViewing(msg);
    if (!msg.isRead) handleMarkRead(msg._id);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-4xl tracking-wider" style={{ color: 'var(--text-primary)' }}>MESSAGES</h1>
        <p className="font-body text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{pagination.total || 0} total messages</p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <FiSearch size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
        <input type="text" value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} placeholder="Search messages..."
          className="w-full pl-12 pr-4 py-3 rounded-xl font-body text-sm focus:outline-none focus:ring-2"
          style={{ background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }} />
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-10 h-10 border-4 border-t-transparent rounded-full animate-spin" style={{ borderColor: 'var(--accent-red)', borderTopColor: 'transparent' }} />
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {messages.map(msg => (
              <div key={msg._id} className={`glass-card p-5 cursor-pointer transition-all hover:scale-[1.01] ${!msg.isRead ? 'border-l-4' : ''}`}
                style={{ borderLeftColor: !msg.isRead ? 'var(--accent-red)' : undefined }} onClick={() => viewMessage(msg)}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {!msg.isRead && <div className="w-2 h-2 rounded-full shrink-0" style={{ background: 'var(--accent-red)' }} />}
                      <p className="font-body text-sm font-semibold truncate" style={{ color: 'var(--text-primary)' }}>{msg.name}</p>
                      <span className="font-body text-xs" style={{ color: 'var(--text-muted)' }}>• {msg.email}</span>
                    </div>
                    <p className="font-body text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>{msg.subject}</p>
                    <p className="font-body text-xs truncate mt-1" style={{ color: 'var(--text-muted)' }}>{msg.message}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-code text-[10px]" style={{ color: 'var(--text-muted)' }}>
                      {new Date(msg.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                    </span>
                    <button onClick={e => { e.stopPropagation(); setDeleteConfirm(msg._id); }} className="p-2 rounded-lg" style={{ color: '#ef4444' }}>
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {messages.length === 0 && <p className="text-center py-12 font-body text-sm" style={{ color: 'var(--text-muted)' }}>No messages found</p>}
          </div>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="flex items-center justify-center gap-4">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="p-2 rounded-lg disabled:opacity-30" style={{ color: 'var(--text-primary)' }}>
                <FiChevronLeft size={20} />
              </button>
              <span className="font-body text-sm" style={{ color: 'var(--text-secondary)' }}>Page {page} of {pagination.pages}</span>
              <button onClick={() => setPage(p => Math.min(pagination.pages, p + 1))} disabled={page === pagination.pages} className="p-2 rounded-lg disabled:opacity-30" style={{ color: 'var(--text-primary)' }}>
                <FiChevronRight size={20} />
              </button>
            </div>
          )}
        </>
      )}

      {/* View Modal */}
      {viewing && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={() => setViewing(null)}>
          <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }} />
          <div className="relative w-full max-w-lg glass-card p-8" onClick={e => e.stopPropagation()}>
            <button onClick={() => setViewing(null)} className="absolute top-4 right-4 p-2" style={{ color: 'var(--text-muted)' }}><FiX size={20} /></button>
            <div className="flex items-center gap-3 mb-1"><FiMail size={20} style={{ color: 'var(--accent-red)' }} /><h2 className="font-heading text-2xl tracking-wider" style={{ color: 'var(--text-primary)' }}>MESSAGE</h2></div>
            <div className="space-y-4 mt-6">
              <div><p className="font-body text-xs uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>From</p><p className="font-body text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{viewing.name} ({viewing.email})</p></div>
              <div><p className="font-body text-xs uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Subject</p><p className="font-body text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{viewing.subject}</p></div>
              <div><p className="font-body text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>Message</p><p className="font-body text-sm leading-relaxed p-4 rounded-xl" style={{ color: 'var(--text-secondary)', background: 'var(--bg-card)' }}>{viewing.message}</p></div>
              <p className="font-code text-xs" style={{ color: 'var(--text-muted)' }}>Received: {new Date(viewing.createdAt).toLocaleString()}</p>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={() => setDeleteConfirm(null)}>
          <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.7)' }} />
          <div className="relative glass-card p-8 max-w-sm w-full text-center" onClick={e => e.stopPropagation()}>
            <h3 className="font-heading text-2xl tracking-wider mb-2" style={{ color: 'var(--text-primary)' }}>DELETE MESSAGE?</h3>
            <p className="font-body text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 px-4 py-3 rounded-xl font-body text-sm font-semibold text-white" style={{ background: '#ef4444' }}>Delete</button>
              <button onClick={() => setDeleteConfirm(null)} className="btn-secondary flex-1">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
