import { useRef, useState } from 'react';
import { api, API_URL } from '../../api';

function resolveUrl(url) {
  if (!url) return '';
  return url.startsWith('http') ? url : `${API_URL}${url}`;
}

export default function PdfPicker({ label, url, onChange }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileRef = useRef(null);

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const res = await api.uploadImage(file);
      onChange(res.url);
    } catch (err) {
      setError(err.message || 'Falha ao enviar o PDF.');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  }

  return (
    <div className="field">
      <label>{label}</label>
      <input type="url" placeholder="https://..." value={url || ''} onChange={(e) => onChange(e.target.value)} style={{ marginBottom: 8 }} />
      <input type="file" accept="application/pdf,.pdf" ref={fileRef} onChange={handleFile} />
      {url && (
        <a href={resolveUrl(url)} target="_blank" rel="noreferrer" style={{ fontSize: 13, marginTop: 6, display: 'inline-block' }}>
          Ver arquivo atual ↗
        </a>
      )}
      {uploading && <div style={{ fontSize: 13, color: '#21181499', marginTop: 6 }}>Enviando arquivo…</div>}
      {error && <div style={{ fontSize: 13, color: '#C0392B', marginTop: 6 }}>{error}</div>}
    </div>
  );
}
