import { useEffect, useState } from 'react';
import api from '../../utils/api';
import CrudManager from '../../components/admin/CrudManager';

const fields = [
  { key: 'title', label: 'Achievement Title', type: 'text', required: true },
  { key: 'description', label: 'Description', type: 'textarea' },
  { key: 'category', label: 'Category', type: 'select', options: ['award', 'certification', 'contribution', 'hackathon', 'competition', 'ranking', 'other'] },
  { key: 'date', label: 'Date', type: 'text', placeholder: '2024' },
  { key: 'icon', label: 'Icon (emoji)', type: 'text', placeholder: '🏆' },
  { key: 'supportingLink', label: 'Supporting Link', type: 'text' },
  { key: 'displayOrder', label: 'Display Order', type: 'number' },
];

const tableColumns = [
  { key: 'icon', label: '', render: (item) => <span className="text-2xl">{item.icon}</span> },
  { key: 'title', label: 'Title' },
  { key: 'category', label: 'Category', render: (item) => <span className="tag">{item.category}</span> },
  { key: 'date', label: 'Date' },
];

export default function ManageAchievements() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchItems = async () => {
    try { const res = await api.get('/achievements'); if (res.data.success) setItems(res.data.data); } catch {} finally { setLoading(false); }
  };
  useEffect(() => { fetchItems(); }, []);
  return (
    <CrudManager title="ACHIEVEMENTS" items={items} fields={fields} tableColumns={tableColumns} loading={loading}
      onAdd={(data) => api.post('/achievements', data)} onUpdate={(id, data) => api.put(`/achievements/${id}`, data)}
      onDelete={(id) => api.delete(`/achievements/${id}`)} onRefresh={fetchItems} />
  );
}
