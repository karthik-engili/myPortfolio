import { useEffect, useState } from 'react';
import api from '../../utils/api';
import CrudManager from '../../components/admin/CrudManager';

const fields = [
  { key: 'name', label: 'Certificate Name', type: 'text', required: true },
  { key: 'organization', label: 'Organization', type: 'text', required: true },
  { key: 'issueDate', label: 'Issue Date', type: 'text', required: true, placeholder: 'Jan 2024' },
  { key: 'credentialUrl', label: 'Credential URL', type: 'text' },
  { key: 'image', label: 'Certificate Image URL', type: 'text' },
  { key: 'displayOrder', label: 'Display Order', type: 'number' },
];

const tableColumns = [
  { key: 'name', label: 'Certificate' },
  { key: 'organization', label: 'Organization' },
  { key: 'issueDate', label: 'Issued' },
  { key: 'credentialUrl', label: 'URL', render: (item) => item.credentialUrl ? <a href={item.credentialUrl} target="_blank" rel="noopener noreferrer" className="text-xs underline" style={{ color: 'var(--accent-red)' }}>View</a> : '—' },
];

export default function ManageCertifications() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchItems = async () => {
    try { const res = await api.get('/certifications'); if (res.data.success) setItems(res.data.data); } catch {} finally { setLoading(false); }
  };
  useEffect(() => { fetchItems(); }, []);
  return (
    <CrudManager title="CERTIFICATIONS" items={items} fields={fields} tableColumns={tableColumns} loading={loading}
      onAdd={(data) => api.post('/certifications', data)} onUpdate={(id, data) => api.put(`/certifications/${id}`, data)}
      onDelete={(id) => api.delete(`/certifications/${id}`)} onRefresh={fetchItems} />
  );
}
