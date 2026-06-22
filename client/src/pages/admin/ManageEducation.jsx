import { useEffect, useState } from 'react';
import api from '../../utils/api';
import CrudManager from '../../components/admin/CrudManager';

const fields = [
  { key: 'institution', label: 'Institution Name', type: 'text', required: true },
  { key: 'degree', label: 'Degree', type: 'text', required: true },
  { key: 'duration', label: 'Duration', type: 'text', required: true, placeholder: '2020 – 2024' },
  { key: 'cgpa', label: 'CGPA / Grade', type: 'text', placeholder: '9.2 / 10' },
  { key: 'description', label: 'Description', type: 'textarea' },
  { key: 'displayOrder', label: 'Display Order', type: 'number' },
];

const tableColumns = [
  { key: 'institution', label: 'Institution' },
  { key: 'degree', label: 'Degree' },
  { key: 'duration', label: 'Duration' },
  { key: 'cgpa', label: 'CGPA' },
];

export default function ManageEducation() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchItems = async () => {
    try { const res = await api.get('/education'); if (res.data.success) setItems(res.data.data); } catch {} finally { setLoading(false); }
  };
  useEffect(() => { fetchItems(); }, []);
  return (
    <CrudManager title="EDUCATION" items={items} fields={fields} tableColumns={tableColumns} loading={loading}
      onAdd={(data) => api.post('/education', data)} onUpdate={(id, data) => api.put(`/education/${id}`, data)}
      onDelete={(id) => api.delete(`/education/${id}`)} onRefresh={fetchItems} />
  );
}
