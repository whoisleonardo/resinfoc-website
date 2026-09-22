# RESINFOC - rebranding do front-end

## Objetivo

Transformar o front-end clonado do REJORC em um portal do RESINFOC (Rede Sonora de Informação e Ciência), mantendo inalterados o backend, o painel administrativo e os formatos de conteúdo já consumidos pela aplicação.

## Decisões confirmadas

- Direção: portal sonoro-editorial, com páginas existentes e uma home curada.
- Marca: azul-petróleo como cor principal e coral como cor de destaque, a partir do logo fornecido.
- Spotify: `https://open.spotify.com/show/03hof1vNtNXhtwey0UPZYp?si=DovdvEyUQXaGKAewF9ROww&utm_source=copy-link`.
- Jornal Comunicação: `https://jornalcomunicacao.ufpr.br/tag/jornal-comunicacao/`.
- Não será necessário mockup em navegador nesta etapa.

## Estrutura pública

O site continuará com rotas independentes para Início, Sobre, Matérias, Mídias, Atualizações e Contato. Os nomes, chamadas e elementos visuais serão adaptados para o RESINFOC. A página inicial será a vitrine editorial e reunirá, nesta ordem:

1. Hero de apresentação da rede, com a marca e chamada principal.
2. Bloco que explica o RESINFOC e sua atuação em informação e ciência.
3. Destaque "No ar" para o programa no Spotify.
4. Matérias em destaque e chamada externa para o Jornal Comunicação.
5. Projeto em andamento e suas atualizações.
6. Galeria de fotos e registros de ações realizadas.
7. Chamada final para contato.

## Linguagem visual

- Base azul-petróleo profunda, com coral para CTAs, tags e detalhes de ênfase.
- Fundos claros neutros para leitura, cartões editoriais e áreas de conteúdo.
- Tipografia de títulos com personalidade editorial e corpo de alta legibilidade.
- O ícone de microfone da marca entra como elemento decorativo sutil em seções ligadas a áudio e chamadas, sem reduzir a prioridade de fotos e conteúdo.
- O design mantém contraste, foco de teclado e comportamento responsivo já estabelecidos no projeto.

## Dados e integrações

Nenhuma rota de API, modelo ou interface do painel será alterada. As seções já existentes continuam consumindo `home_hero`, `materias`, `fotos`, `current_project`, `atualizacoes`, `contato`, `site` e `footer` pelo `ContentContext`.

Os valores padrão e os rótulos do front-end serão atualizados para o RESINFOC. O bloco de Spotify e o CTA do Jornal Comunicação usarão URLs externas seguras (`target="_blank"` com `rel="noreferrer"`) e continuarão funcionais mesmo que a API esteja indisponível, por meio do conteúdo de fallback.

## Arquivos previstos

- `frontend/src/styles/theme.css`: tokens, fontes e ajustes responsivos da marca.
- `frontend/src/content/defaultContent.js`: conteúdo padrão e links do RESINFOC.
- `frontend/src/pages/Home.jsx`: composição da nova home e destaques Spotify/Jornal Comunicação.
- `frontend/src/pages/Sobre.jsx`, `Materias.jsx`, `Fotos.jsx`, `Atualizacoes.jsx`, `Contato.jsx`: texto e acabamento visual alinhados à marca.
- `frontend/src/components/Header.jsx` e `Footer.jsx`: navegação, marca e links atualizados.
- Ativo otimizado do logo, derivado do PDF fornecido, incluído no front-end.

## Tratamento de falhas

- Sem itens cadastrados, cada área mantém seus estados vazios atuais.
- Sem imagem cadastrada, `MediaBlock` mantém o placeholder acessível.
- Links externos terão rótulo claro para não depender da disponibilidade dos sites de destino.

## Verificação

- Build de produção do front-end sem erros.
- Revisão das rotas públicas em tela larga e mobile.
- Conferência de navegação, contraste e foco visível.
- Verificação de que matérias, fotos e atualizações ainda usam as mesmas respostas da API.
