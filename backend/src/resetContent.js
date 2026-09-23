if (!process.argv.includes('--confirm')) {
  console.error('Este comando sobrescreve todas as secoes de conteudo com o padrao RESINFOC.');
  console.error('Para confirmar, execute: npm run reset-content -- --confirm');
  process.exit(1);
}

require('dotenv').config();
const db = require('./db');
const { defaultContent } = require('./defaultContent');

const upsert = db.prepare(
  `INSERT INTO content_sections (section_key, data, updated_at, updated_by)
   VALUES (@key, @data, datetime('now'), 'reset-resinfoc')
   ON CONFLICT(section_key) DO UPDATE SET
     data = excluded.data,
     updated_at = excluded.updated_at,
     updated_by = excluded.updated_by`
);

const reset = db.transaction((entries) => {
  for (const [key, value] of entries) {
    upsert.run({ key, data: JSON.stringify(value) });
  }
});

reset(Object.entries(defaultContent));
console.log(`${Object.keys(defaultContent).length} secoes atualizadas com o conteudo padrao RESINFOC.`);
