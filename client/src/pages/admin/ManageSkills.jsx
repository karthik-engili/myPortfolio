import { useEffect, useState } from 'react';
import api from '../../utils/api';
import CrudManager from '../../components/admin/CrudManager';

const fields = [
  { key: 'name', label: 'Skill Name', type: 'text', required: true },
  { key: 'category', label: 'Category', type: 'select', required: true, options: ['Frontend', 'Backend', 'Database', 'Programming Languages', 'Cloud', 'Tools', 'DevOps', 'Tools & Others'] },
  { key: 'icon', label: 'Icon Identifier', type: 'text', placeholder: 'SiReact, SiNodedotjs, etc.' },
  { key: 'proficiency', label: 'Proficiency (%)', type: 'number', required: true, max: 100 },
  { key: 'displayOrder', label: 'Display Order', type: 'number' },
];

const tableColumns = [
  { key: 'name', label: 'Skill' },
  { key: 'category', label: 'Category', render: (item) => <span className="tag">{item.category}</span> },
  { key: 'icon', label: 'Icon' },
  { key: 'proficiency', label: 'Level', render: (item) => (
    <div className="flex items-center gap-2">
      <div className="w-24 h-2 rounded-full overflow-hidden" style={{ background: 'var(--border-color)' }}>
        <div className="h-full rounded-full" style={{ width: `${item.proficiency}%`, background: 'linear-gradient(90deg, var(--accent-red), var(--accent-blue))' }} />
      </div>
      <span className="font-code text-xs" style={{ color: 'var(--accent-red)' }}>{item.proficiency}%</span>
    </div>
  )},
];

export default function ManageSkills() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    try { const res = await api.get('/skills/all'); if (res.data.success) setItems(res.data.data); } catch {} finally { setLoading(false); }
  };

  useEffect(() => { fetchItems(); }, []);

  return (
    <CrudManager title="SKILLS" items={items} fields={fields} tableColumns={tableColumns} loading={loading}
      onAdd={(data) => api.post('/skills', data)} onUpdate={(id, data) => api.put(`/skills/${id}`, data)}
      onDelete={(id) => api.delete(`/skills/${id}`)} onRefresh={fetchItems} />
  );
}
