import { Link } from 'react-router-dom';
import { useContent } from '../content/ContentContext';
import MediaBlock from '../components/MediaBlock';

export default function Fotos() {
  const { content } = useContent();
  const section = content.fotos || {};
  const fotos = section.items || [];

  return (
    <div>
      <section className="container" style={{ padding: '36px 32px 40px' }}>
        <div style={{ display: 'inline-block', fontWeight: 800, fontSize: 13, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--brand-ink)', background: 'var(--surface-muted)', padding: '8px 16px', borderRadius: 999, marginBottom: 20 }}>
          {section.badge || 'Registros'}
        </div>
        <h1 style={{ font: '800 44px var(--font-display)', margin: '0 0 16px' }}>{section.title}</h1>
        <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--ink)', maxWidth: 640, margin: 0 }}>
          {section.subtitle}
        </p>
      </section>

      <section className="container" style={{ padding: '8px 32px 72px' }}>
        {fotos.length === 0 ? (
          <div className="empty-state">Nenhum registro cadastrado ainda.</div>
        ) : (
          <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, alignItems: 'start' }}>
            {fotos.map((f, i) => (
              <div key={f.id || i}>
                <MediaBlock media={f} alt={f.label} radius={16} style={{ height: 240 }} placeholderLabel={f.label} />
                {f.label && <div style={{ fontSize: 13, color: 'var(--ink)', marginTop: 8 }}>{f.label}</div>}
              </div>
            ))}
          </div>
        )}
      </section>

      {section.ctaTitle && (
        <section className="container" style={{ margin: '0 auto 96px', padding: '0 32px' }}>
          <div className="grid-2" style={{ background: 'var(--brand-ink)', borderRadius: 24, padding: 'clamp(24px, 5vw, 48px)', display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 32, alignItems: 'center' }}>
            <div>
              <h2 style={{ font: '800 27px var(--font-display)', color: 'var(--surface)', margin: '0 0 12px' }}>{section.ctaTitle}</h2>
              <p style={{ fontSize: 15.5, lineHeight: 1.6, color: 'var(--surface)', margin: 0 }}>{section.ctaText}</p>
            </div>
            <Link to="/contato" style={{ justifySelf: 'end', maxWidth: '100%', textAlign: 'center', font: '700 16px var(--font-display)', color: 'var(--ink)', background: 'var(--brand-coral)', padding: '15px 28px', borderRadius: 999, textDecoration: 'none' }}>
              {section.ctaButtonLabel || 'Enviar registro'}
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
