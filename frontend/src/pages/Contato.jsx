import { useState } from 'react';
import { useContent } from '../content/ContentContext';
import { api } from '../api';

const ASSUNTOS = ['Sugestão de pauta', 'Quero participar', 'Parceria', 'Outro'];

export default function Contato() {
  const { content } = useContent();
  const c = content.contato || {};
  const [form, setForm] = useState({ nome: '', email: '', assunto: ASSUNTOS[0], mensagem: '' });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);

  function setField(key) {
    return (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    setError('');
    try {
      await api.sendContactMessage(form);
      setSent(true);
    } catch (err) {
      setError('Não foi possível enviar sua mensagem agora. Tente novamente em instantes.');
    } finally {
      setSending(false);
    }
  }

  return (
    <div>
      <section className="container" style={{ padding: '36px 32px 24px' }}>
        <div style={{ display: 'inline-block', fontWeight: 800, fontSize: 13, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--brand-ink)', background: 'var(--surface-muted)', padding: '8px 16px', borderRadius: 999, marginBottom: 20 }}>
          {c.badge}
        </div>
        <h1 style={{ font: '800 44px var(--font-display)', margin: '0 0 16px' }}>{c.title}</h1>
        <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--ink)', maxWidth: 640, margin: 0 }}>{c.subtitle}</p>
      </section>

      <section className="container grid-2" style={{ padding: '24px 32px 96px', display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 40 }}>
        <div style={{ minWidth: 0, background: 'var(--surface)', border: '1.5px solid color-mix(in srgb, var(--brand-ink) 16%, transparent)', borderRadius: 22, padding: 'clamp(20px, 4vw, 40px)' }}>
          {sent ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 14, padding: '30px 0' }}>
              <div style={{ width: 52, height: 52, borderRadius: '50%', color: 'var(--brand-ink)', background: 'var(--surface-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>✓</div>
              <h3 style={{ font: '700 22px var(--font-display)', margin: 0 }}>Mensagem enviada!</h3>
              <p style={{ fontSize: 15, color: 'var(--ink)', margin: 0 }}>Obrigado pelo contato — vamos responder em breve.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {error && <div className="alert alert-error">{error}</div>}
              <div className="field-row grid-2" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 18 }}>
                <label style={{ display: 'flex', flexDirection: 'column', gap: 8, fontWeight: 700, fontSize: 13.5, color: 'var(--ink)' }}>
                  Nome
                  <input required type="text" value={form.nome} onChange={setField('nome')} style={inputStyle} />
                </label>
                <label style={{ display: 'flex', flexDirection: 'column', gap: 8, fontWeight: 700, fontSize: 13.5, color: 'var(--ink)' }}>
                  E-mail
                  <input required type="email" value={form.email} onChange={setField('email')} style={inputStyle} />
                </label>
              </div>
              <label style={{ display: 'flex', flexDirection: 'column', gap: 8, fontWeight: 700, fontSize: 13.5, color: 'var(--ink)' }}>
                Assunto
                <select value={form.assunto} onChange={setField('assunto')} style={inputStyle}>
                  {ASSUNTOS.map((a) => (
                    <option key={a}>{a}</option>
                  ))}
                </select>
              </label>
              <label style={{ display: 'flex', flexDirection: 'column', gap: 8, fontWeight: 700, fontSize: 13.5, color: 'var(--ink)' }}>
                Mensagem
                <textarea required rows={5} value={form.mensagem} onChange={setField('mensagem')} style={{ ...inputStyle, resize: 'vertical' }} />
              </label>
              <button
                type="submit"
                disabled={sending}
                style={{ alignSelf: 'flex-start', font: '700 16px var(--font-display)', color: 'var(--surface)', background: 'var(--brand-ink)', padding: '14px 28px', borderRadius: 999, border: 'none', cursor: 'pointer' }}
              >
                {sending ? 'Enviando…' : 'Enviar mensagem'}
              </button>
            </form>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ background: 'var(--brand-ink)', borderRadius: 20, padding: 32, color: 'var(--surface)' }}>
            <h3 style={{ font: '700 19px var(--font-display)', margin: '0 0 14px' }}>Onde estamos</h3>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--surface)', margin: 0, whiteSpace: 'pre-line' }}>{c.address}</p>
          </div>
          <div style={{ background: 'var(--surface)', border: '1.5px solid color-mix(in srgb, var(--brand-ink) 16%, transparent)', borderRadius: 20, padding: 32 }}>
            <h3 style={{ font: '700 19px var(--font-display)', margin: '0 0 14px' }}>Contato direto</h3>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: 'var(--ink)', overflowWrap: 'anywhere', margin: 0 }}>
              {c.email}
              <br />
              {c.instagram}
            </p>
          </div>
          {Array.isArray(c.projects) && c.projects.length > 0 && (
            <div style={{ background: 'var(--surface)', border: '1.5px solid color-mix(in srgb, var(--brand-ink) 16%, transparent)', borderRadius: 20, padding: 32 }}>
              <h3 style={{ font: '700 19px var(--font-display)', margin: '0 0 14px' }}>Outros projetos</h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 10, margin: 0, padding: 0, listStyle: 'none' }}>
                {c.projects.map((p, i) =>
                  p.url ? (
                    <li key={i}>
                      <a href={p.url} target="_blank" rel="noreferrer" style={{ fontSize: 15, fontWeight: 700, color: 'var(--brand-ink)', textDecoration: 'none' }}>
                        {p.name} ↗
                      </a>
                    </li>
                  ) : (
                    <li key={i} style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)' }}>
                      {p.name}
                    </li>
                  )
                )}
              </ul>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  minWidth: 0,
  color: 'var(--ink)',
  background: 'var(--surface)',
  fontSize: 15,
  padding: '13px 14px',
  borderRadius: 10,
  border: '1.5px solid color-mix(in srgb, var(--brand-ink) 30%, transparent)',
  fontFamily: 'var(--font-body)',
};
