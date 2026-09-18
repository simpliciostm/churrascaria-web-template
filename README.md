# Churrascaria Web Template

Template/protótipo frontend para sites institucionais estáticos de churrascarias e restaurantes. A Churrascaria Tuvalu é utilizada temporariamente como estabelecimento de demonstração durante o desenvolvimento.

Projeto demonstrativo desenvolvido como conceito visual. Não representa o site oficial do estabelecimento.

## Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Lucide React
- ESLint
- Prettier

## Instalação

```bash
npm install
```

## Desenvolvimento

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Lint

```bash
npm run lint
```

## SEO / publicação

As informações de SEO ficam em `src/data/restaurant.ts`, no campo `seo`.

- Mantenha `seo.indexable` como `false` em demos e protótipos.
- Altere `seo.indexable` para `true` somente no site oficial.
- Configure `seo.siteUrl` quando houver domínio definitivo.
- Configure `seo.ogImage` quando houver imagem própria de compartilhamento.
- O sitemap deve ser criado apenas na publicação oficial com domínio definido.

## Deploy no Netlify

O arquivo `netlify.toml` já contém a configuração de build para o Netlify.

1. Envie o projeto para o GitHub.
2. No Netlify, escolha importar um projeto existente.
3. Selecione GitHub.
4. Selecione o repositório.
5. Use `npm run build` como build command.
6. Use `dist` como publish directory.
7. Faça o deploy.

A versão demonstrativa utiliza `noindex, nofollow`.

Para transformar em site oficial:

- configurar domínio;
- configurar `seo.siteUrl`;
- configurar `seo.ogImage`;
- alterar `seo.indexable` para `true`;
- revisar dados reais do restaurante;
- substituir fotografias demonstrativas quando necessário.

## Estrutura

```text
src/
  assets/
  components/
    layout/
    sections/
    ui/
  data/
    restaurant.ts
  styles/
    globals.css
  types/
    restaurant.ts
  App.tsx
  main.tsx
```

## Observações

As informações específicas do restaurante devem ficar concentradas em `src/data/restaurant.ts`, permitindo adaptar o projeto para outros estabelecimentos com troca de configuração, textos, imagens e identidade visual.

As fotografias configuradas atualmente são demonstrativas e ilustrativas. Elas não representam o estabelecimento usado como exemplo e devem ser substituídas por imagens autorizadas caso o template seja transformado no site oficial de um cliente.
