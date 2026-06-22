import { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiCheck, FiSearch } from 'react-icons/fi';
import { toast } from 'react-toastify';

/**
 * Reusable CRUD management component for admin pages.
 * Props:
 * - title: string
 * - items: array
 * - fields: [{ key, label, type, options?, required?, placeholder? }]
 * - onAdd(data): Promise
 * - onUpdate(id, data): Promise
 * - onDelete(id): Promise
 * - onRefresh(): void
 * - tableColumns: [{ key, label, render? }]
 * - loading: boolean
 */
export default function CrudManager({ title, items, fields, onAdd, onUpdate, onDelete, onRefresh, tableColumns, loading }) {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({});
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const openAddForm = () => {
    setEditing(null);
    const initial = {};
    fields.forEach(f => { initial[f.key] = f.type === 'array' ? '' : (f.defaultValue ?? ''); });
    setFormData(initial);
    setShowForm(true);
  };

  const openEditForm = (item) => {
    setEditing(item._id);
    const data = {};
    fields.forEach(f => {
      if (f.type === 'array') {
        data[f.key] = Array.isArray(item[f.key]) ? item[f.key].join(', ') : '';
      } else {
        data[f.key] = item[f.key] ?? '';
      }
    });
    setFormData(data);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...formData };
      fields.forEach(f => {
        if (f.type === 'array' && typeof payload[f.key] === 'string') {
          payload[f.key] = payload[f.key].split(',').map(s => s.trim()).filter(Boolean);
        }
        if (f.type === 'number') payload[f.key] = Number(payload[f.key]) || 0;
        if (f.type === 'boolean') payload[f.key] = payload[f.key] === true || payload[f.key] === 'true';
      });
      if (editing) {
        await onUpdate(editing, payload);
        toast.success('Updated successfully!', { theme: 'dark' });
      } else {
        await onAdd(payload);
        toast.success('Created successfully!', { theme: 'dark' });
      }
      setShowForm(false);
      onRefresh();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Operation failed', { theme: 'dark' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await onDelete(id);
      toast.success('Deleted successfully!', { theme: 'dark' });
      setDeleteConfirm(null);
      onRefresh();
    } catch (err) {
      toast.error('Delete failed', { theme: 'dark' });
    }
  };

  const filtered = items.filter(item => {
    if (!searchTerm) return true;
    return JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-t-transparent rounded-full animate-spin" style={{ borderColor: 'var(--accent-red)', borderTopColor: 'transparent' }} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-4xl tracking-wider" style={{ color: 'var(--text-primary)' }}>{title}</h1>
          <p className="font-body text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{items.length} total items</p>
        </div>
        <button onClick={openAddForm} className="btn-primary inline-flex items-center gap-2 text-sm">
          <FiPlus size={18} /> Add New
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <FiSearch size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
        <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search..."
          className="w-full pl-12 pr-4 py-3 rounded-xl font-body text-sm focus:outline-none focus:ring-2"
          style={{ background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', '--tw-ring-color': 'rgba(226,54,54,0.3)' }} />
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                {tableColumns.map(col => (
                  <th key={col.key} className="px-6 py-4 text-left font-body text-xs uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{col.label}</th>
                ))}
                <th className="px-6 py-4 text-right font-body text-xs uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(item => (
                <tr key={item._id} className="transition-colors hover:bg-white/[0.02]" style={{ borderBottom: '1px solid var(--border-color)' }}>
                  {tableColumns.map(col => (
                    <td key={col.key} className="px-6 py-4 font-body text-sm" style={{ color: 'var(--text-primary)' }}>
                      {col.render ? col.render(item) : (typeof item[col.key] === 'boolean' ? (item[col.key] ? '✅' : '—') : (Array.isArray(item[col.key]) ? item[col.key].join(', ') : (item[col.key] || '—')))}
                    </td>
                  ))}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEditForm(item)} className="p-2 rounded-lg transition-colors" style={{ color: 'var(--accent-blue)' }} title="Edit">
                        <FiEdit2 size={16} />
                      </button>
                      <button onClick={() => setDeleteConfirm(item._id)} className="p-2 rounded-lg transition-colors" style={{ color: '#ef4444' }} title="Delete">
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={tableColumns.length + 1} className="px-6 py-12 text-center font-body text-sm" style={{ color: 'var(--text-muted)' }}>
                    No items found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }} />
          <div className="relative w-full max-w-lg glass-card p-8 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-2xl tracking-wider" style={{ color: 'var(--text-primary)' }}>
                {editing ? 'EDIT' : 'ADD NEW'}
              </h2>
              <button onClick={() => setShowForm(false)} className="p-2 rounded-lg" style={{ color: 'var(--text-muted)' }}>
                <FiX size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {fields.map(field => (
                <div key={field.key}>
                  <label className="block font-body text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
                    {field.label} {field.required && <span style={{ color: 'var(--accent-red)' }}>*</span>}
                  </label>
                  {field.type === 'select' ? (
                    <select value={formData[field.key] || ''} onChange={e => setFormData({ ...formData, [field.key]: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl font-body text-sm focus:outline-none focus:ring-2"
                      style={{ background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}
                      required={field.required}>
                      <option value="">Select...</option>
                      {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  ) : field.type === 'textarea' ? (
                    <textarea value={formData[field.key] || ''} onChange={e => setFormData({ ...formData, [field.key]: e.target.value })}
                      rows={4} className="w-full px-4 py-3 rounded-xl font-body text-sm resize-none focus:outline-none focus:ring-2"
                      style={{ background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}
                      placeholder={field.placeholder} required={field.required} />
                  ) : field.type === 'boolean' ? (
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" checked={formData[field.key] === true || formData[field.key] === 'true'}
                        onChange={e => setFormData({ ...formData, [field.key]: e.target.checked })}
                        className="w-5 h-5 rounded accent-red-500" />
                      <span className="font-body text-sm" style={{ color: 'var(--text-secondary)' }}>{field.placeholder || 'Enable'}</span>
                    </label>
                  ) : (
                    <input type={field.type === 'number' ? 'number' : 'text'} value={formData[field.key] || ''}
                      onChange={e => setFormData({ ...formData, [field.key]: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl font-body text-sm focus:outline-none focus:ring-2"
                      style={{ background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}
                      placeholder={field.placeholder || field.label} required={field.required}
                      min={field.type === 'number' ? 0 : undefined} max={field.type === 'number' && field.max ? field.max : undefined} />
                  )}
                  {field.type === 'array' && (
                    <p className="font-body text-[10px] mt-1" style={{ color: 'var(--text-muted)' }}>Separate with commas</p>
                  )}
                </div>
              ))}
              <div className="flex gap-3 pt-4">
                <button type="submit" disabled={saving} className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-50">
                  {saving ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><FiCheck size={18} /> {editing ? 'Update' : 'Create'}</>}
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="btn-secondary flex-1">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={() => setDeleteConfirm(null)}>
          <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }} />
          <div className="relative glass-card p-8 max-w-sm w-full text-center" onClick={e => e.stopPropagation()}>
            <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)' }}>
              <FiTrash2 size={28} style={{ color: '#ef4444' }} />
            </div>
            <h3 className="font-heading text-2xl tracking-wider mb-2" style={{ color: 'var(--text-primary)' }}>CONFIRM DELETE</h3>
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
