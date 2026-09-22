import { useContent } from '../content/ContentContext';
import { displayColor } from '../content/displayColor';
import MediaBlock from '../components/MediaBlock';

export default function Atualizacoes() {
  const { content } = useContent();
  const a = content.atualizacoes || {};
  const items = a.items || [];

  return (
    <div>
      <section className="container" style={{ padding: '36px 32px 24px' }}>
        <div style={{ display: 'inline-block', fontWeight: 800, fontSize: 13, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--brand-ink)', background: 'var(--surface-muted)', padding: '8px 16px', borderRadius: 999, marginBottom: 20 }}>
          {a.badge}
        </div>
        <h1 style={{ font: '800 44px var(--font-display)', margin: '0 0 16px' }}>{a.title}</h1>
        <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--ink)', maxWidth: 640, margin: 0 }}>{a.subtitle}</p>
      </section>

      <section className="container" style={{ padding: '24px 32px 60px' }}>
        <MediaBlock media={a.coverImage} alt="Registro do RESINFOC" radius={22} style={{ height: 340 }} placeholderLabel="[ registro do RESINFOC ]" />
      </section>

      <section style={{ maxWidth: 900, margin: '0 auto', padding: '0 32px 100px' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {items.length === 0 && <div className="empty-state">Nenhuma atualização publicada ainda.</div>}
          {items.map((u, i) => (
            <div key={i} className="grid-2" style={{ display: 'grid', gridTemplateColumns: '110px minmax(0, 1fr)', gap: 24, padding: '28px 0', borderBottom: '1.5px solid color-mix(in srgb, var(--brand-ink) 16%, transparent)' }}>
              <div style={{ fontWeight: 800, fontSize: 13.5, color: displayColor(u.color) }}>{u.date}</div>
              <div>
                <h3 style={{ font: '700 20px var(--font-display)', margin: '0 0 8px' }}>{u.title}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--ink)', margin: 0 }}>{u.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
