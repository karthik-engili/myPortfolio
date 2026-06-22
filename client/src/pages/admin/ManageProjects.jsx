import { useEffect, useState } from 'react';
import api from '../../utils/api';
import CrudManager from '../../components/admin/CrudManager';

const fields = [
  { key: 'title', label: 'Project Title', type: 'text', required: true },
  { key: 'description', label: 'Description', type: 'textarea', required: true },
  { key: 'techStack', label: 'Technologies', type: 'array', placeholder: 'React, Node.js, MongoDB' },
  { key: 'category', label: 'Category', type: 'select', required: true, options: ['Frontend', 'Backend', 'Full-Stack', 'Mobile', 'DevOps', 'Other'] },
  { key: 'githubUrl', label: 'GitHub URL', type: 'text', placeholder: 'https://github.com/...' },
  { key: 'liveUrl', label: 'Live Demo URL', type: 'text', placeholder: 'https://...' },
  { key: 'image', label: 'Image URL', type: 'text', placeholder: 'https://...' },
  { key: 'featured', label: 'Featured', type: 'boolean', placeholder: 'Mark as featured' },
  { key: 'status', label: 'Status', type: 'select', options: ['published', 'draft', 'archived'], defaultValue: 'published' },
  { key: 'displayOrder', label: 'Display Order', type: 'number' },
];

const tableColumns = [
  { key: 'title', label: 'Title' },
  { key: 'category', label: 'Category', render: (item) => <span className="tag">{item.category}</span> },
  { key: 'techStack', label: 'Tech', render: (item) => item.techStack?.slice(0, 3).join(', ') || '—' },
  { key: 'featured', label: 'Featured' },
  { key: 'status', label: 'Status', render: (item) => <span className={`text-xs font-semibold px-2 py-1 rounded-full ${item.status === 'published' ? 'text-green-400' : item.status === 'draft' ? 'text-yellow-400' : 'text-gray-400'}`} style={{ background: item.status === 'published' ? 'rgba(16,185,129,0.1)' : item.status === 'draft' ? 'rgba(245,158,11,0.1)' : 'rgba(107,114,128,0.1)' }}>{item.status}</span> },
  { key: 'createdAt', label: 'Created', render: (item) => new Date(item.createdAt).toLocaleDateString() },
];

export default function ManageProjects() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    try { const res = await api.get('/projects'); if (res.data.success) setItems(res.data.data); } catch {} finally { setLoading(false); }
  };

  useEffect(() => { fetchItems(); }, []);

  return (
    <CrudManager title="PROJECTS" items={items} fields={fields} tableColumns={tableColumns} loading={loading}
      onAdd={(data) => api.post('/projects', data)} onUpdate={(id, data) => api.put(`/projects/${id}`, data)}
      onDelete={(id) => api.delete(`/projects/${id}`)} onRefresh={fetchItems} />
  );
}
