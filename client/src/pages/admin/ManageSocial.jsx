import { useEffect, useState } from 'react';
import api from '../../utils/api';
import CrudManager from '../../components/admin/CrudManager';

const fields = [
  { key: 'platform', label: 'Platform Name', type: 'text', required: true, placeholder: 'GitHub, LinkedIn, LeetCode...' },
  { key: 'url', label: 'Profile URL', type: 'text', required: true },
  { key: 'icon', label: 'Icon ID', type: 'text', placeholder: 'FiGithub, FiLinkedin...' },
  { key: 'isActive', label: 'Active', type: 'boolean', placeholder: 'Show on portfolio', defaultValue: true },
  { key: 'displayOrder', label: 'Display Order', type: 'number' },
];

const tableColumns = [
  { key: 'platform', label: 'Platform' },
  { key: 'url', label: 'URL', render: (item) => <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-xs underline truncate block max-w-[200px]" style={{ color: 'var(--accent-red)' }}>{item.url}</a> },
  { key: 'isActive', label: 'Active', render: (item) => item.isActive ? <span className="text-green-400 text-xs font-semibold">Active</span> : <span className="text-gray-400 text-xs">Inactive</span> },
];

export default function ManageSocial() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchItems = async () => {
    try { const res = await api.get('/social/all'); if (res.data.success) setItems(res.data.data); } catch {} finally { setLoading(false); }
  };
  useEffect(() => { fetchItems(); }, []);
  return (
    <CrudManager title="SOCIAL LINKS" items={items} fields={fields} tableColumns={tableColumns} loading={loading}
      onAdd={(data) => api.post('/social', data)} onUpdate={(id, data) => api.put(`/social/${id}`, data)}
      onDelete={(id) => api.delete(`/social/${id}`)} onRefresh={fetchItems} />
  );
}
