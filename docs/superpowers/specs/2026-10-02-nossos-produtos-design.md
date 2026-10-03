# Nossos Produtos — design

## Objetivo

Adicionar uma página pública chamada **Nossos Produtos** para reunir as produções sonoras da RESINFOC. A pessoa visitante deve conseguir reproduzir arquivos de áudio próprios ou escutar conteúdos do Spotify sem deixar o site. A equipe editorial deve administrar esse acervo pelo painel.

## Escopo

- Nova rota pública em `/nossos-produtos`, acessível pelo cabeçalho.
- Nova seção de conteúdo `nossos_produtos`, com conteúdo padrão no frontend e backend.
- Página visualmente alinhada à atual Mídias: selo, título, subtítulo, grade de itens, estado vazio e CTA opcional ao final.
- Cada item possui `id`, `title`, `description` e `media`.
- `media.type` aceita somente `audio` ou `spotify`.
  - `audio` recebe URL de MP3, M4A, OGG ou WAV, hospedada no site ou externa, e é exibido com o elemento HTML `<audio controls>`.
  - `spotify` recebe uma URL pública do Spotify e é exibido com o embed responsivo correspondente.
- Nova tela administrativa para editar o topo e CTA, criar, editar, reordenar e excluir produtos; o seletor de mídia fica limitado a áudio ou Spotify nessa tela.
- O upload existente continua aceitando apenas formatos sonoros já validados pelo servidor; vídeos não fazem parte da página nem do novo fluxo.

## Arquitetura e fluxo de dados

O backend passa a listar `nossos_produtos` como chave válida do conteúdo e fornece seus valores padrão quando ainda não há registro no banco. O frontend mescla essa seção com seu fallback local via `ContentContext`, assim instalações já existentes obtêm a seção nova sem migração.

No painel, `ProdutosAdmin` usa o mesmo hook de seção e lista repetível utilizados em Mídias. Cada item é salvo integralmente na seção `nossos_produtos` através do endpoint de conteúdo existente. O `MediaPicker` receberá uma opção de tipos permitidos para que este fluxo não apresente imagem ou redes de vídeo.

Na página pública, o componente de player resolve URLs de uploads como os demais componentes. Para Spotify, converte URLs comuns do serviço em URLs de embed sem alterar o identificador do recurso; URLs incompatíveis não renderizam iframe e apresentam orientação para a equipe corrigir o cadastro.

## Interface e acessibilidade

Os itens aparecem em uma grade de cartões com título e descrição antes do player. Players nativos têm rótulo acessível pelo título. Iframes do Spotify recebem `title` único e `allow` apropriado para reprodução. A grade passa a uma coluna em telas menores, usando as regras responsivas já existentes.

## Erros e estados vazios

- Sem produtos cadastrados: mensagem explícita de acervo ainda vazio.
- URL de Spotify inválida: mensagem não técnica no cartão; o restante da página permanece funcional.
- Falha de upload: o painel mantém a mensagem de erro atual do seletor e não substitui o valor salvo.

## Testes e verificação

- Testes unitários para a conversão e validação de URL do Spotify.
- Teste de renderização que confirma player de áudio, embed do Spotify e estado de URL inválida.
- Build de produção do frontend.
- Verificação da suíte disponível do projeto; caso não haja runner de testes configurado, o build será a verificação automatizada registrada.

## Fora de escopo

- Vídeo, Reels, TikTok e upload de arquivos de vídeo.
- Migração de itens existentes de Mídias.
- Métricas de reprodução ou integração com APIs do Spotify.
