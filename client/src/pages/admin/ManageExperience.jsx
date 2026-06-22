import { useEffect, useState } from 'react';
import api from '../../utils/api';
import CrudManager from '../../components/admin/CrudManager';

const fields = [
  { key: 'company', label: 'Company Name', type: 'text', required: true },
  { key: 'role', label: 'Role', type: 'text', required: true },
  { key: 'duration', label: 'Duration', type: 'text', required: true, placeholder: 'Jan 2024 – Present' },
  { key: 'description', label: 'Description', type: 'textarea' },
  { key: 'technologies', label: 'Technologies Used', type: 'array', placeholder: 'React, Node.js' },
  { key: 'companyLogo', label: 'Company Logo URL', type: 'text' },
  { key: 'displayOrder', label: 'Display Order', type: 'number' },
];

const tableColumns = [
  { key: 'company', label: 'Company' },
  { key: 'role', label: 'Role' },
  { key: 'duration', label: 'Duration' },
  { key: 'technologies', label: 'Tech', render: (item) => item.technologies?.slice(0, 3).join(', ') || '—' },
];

export default function ManageExperience() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchItems = async () => {
    try { const res = await api.get('/experience'); if (res.data.success) setItems(res.data.data); } catch {} finally { setLoading(false); }
  };
  useEffect(() => { fetchItems(); }, []);
  return (
    <CrudManager title="EXPERIENCE" items={items} fields={fields} tableColumns={tableColumns} loading={loading}
      onAdd={(data) => api.post('/experience', data)} onUpdate={(id, data) => api.put(`/experience/${id}`, data)}
      onDelete={(id) => api.delete(`/experience/${id}`)} onRefresh={fetchItems} />
  );
}
