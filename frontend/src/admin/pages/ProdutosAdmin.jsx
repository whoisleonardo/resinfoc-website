import { useSection } from '../hooks/useSection';
import { TextAreaField, TextField, SaveBar } from '../components/Fields';
import MediaPicker from '../components/MediaPicker';
import RepeatList from '../components/RepeatList';

function newId() { return `p_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`; }

export default function ProdutosAdmin() {
  const { data, setData, loading, saving, saved, error, save } = useSection('nossos_produtos');
  if (loading || !data) return <div className="empty-state">Carregando…</div>;

  return <div><div className="admin-header"><h1>Nossos Produtos</h1><p>Cadastre áudios próprios e conteúdos incorporados do Spotify.</p></div><div className="admin-card">
    <h2 style={{ marginTop: 0 }}>Topo da página</h2>
    <div className="field-row"><TextField label="Selo" value={data.badge || ''} onChange={(badge) => setData({ ...data, badge })} /><TextField label="Título" value={data.title || ''} onChange={(title) => setData({ ...data, title })} /></div>
    <TextAreaField label="Subtítulo" rows={2} value={data.subtitle || ''} onChange={(subtitle) => setData({ ...data, subtitle })} />
    <h2>Chamada do fim da página</h2><TextField label="Título da chamada (deixe vazio para esconder)" value={data.ctaTitle || ''} onChange={(ctaTitle) => setData({ ...data, ctaTitle })} />
    <div className="field-row"><TextField label="Texto da chamada" value={data.ctaText || ''} onChange={(ctaText) => setData({ ...data, ctaText })} /><TextField label="Texto do botão" value={data.ctaButtonLabel || ''} onChange={(ctaButtonLabel) => setData({ ...data, ctaButtonLabel })} /></div>
    <h2>Produtos sonoros</h2><RepeatList items={data.items || []} onChange={(items) => setData({ ...data, items })} itemLabel={(item, i) => item.title || `Produto ${i + 1}`} addLabel="Adicionar produto" newItem={() => ({ id: newId(), title: '', description: '', media: { type: 'audio', url: '' } })} renderItem={(item, i, update) => <><TextField label="Título" value={item.title || ''} onChange={(title) => update({ title })} /><TextAreaField label="Descrição (opcional)" rows={2} value={item.description || ''} onChange={(description) => update({ description })} /><MediaPicker label="Áudio ou Spotify" media={item.media} onChange={(media) => update({ media })} allowedTypes={['audio', 'spotify']} /></>} />
    <SaveBar saving={saving} saved={saved} error={error} onSave={() => save(data)} />
  </div></div>;
}
