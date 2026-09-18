# Churrascaria Web Template

Template/protótipo frontend para sites institucionais estáticos de churrascarias e restaurantes. A Churrascaria Tuvalu é utilizada temporariamente como estabelecimento de demonstração durante o desenvolvimento.

Projeto demonstrativo desenvolvido como conceito visual. Não representa o site oficial do estabelecimento.

## Conteúdo demonstrativo

O cardápio definido em `src/data/restaurant.ts` usa categorias, pratos, fotografias e preços demonstrativos para fins de template. Durante a personalização do site, substitua esses itens por informações reais, atualizadas e autorizadas do restaurante.

Os preços do cardápio devem permanecer como números no `RestaurantConfig`; a interface é responsável por formatá-los em BRL.

## Personalizando para uma nova churrascaria

Na maioria dos casos, a personalização deve acontecer em `src/data/restaurant.ts`. Componentes React não precisam ser alterados para trocar nome, cidade, contatos, endereço, cardápio, preços, textos, imagens e SEO.

Checklist curto:

1. Atualize identidade: `name`, `shortName`, categoria e textos institucionais.
2. Atualize contatos: telefone, WhatsApp, Instagram e outros links disponíveis.
3. Atualize endereço: rua, número, bairro, cidade, estado, CEP, país e Google Maps quando houver.
4. Preencha horários em `openingHours`; use strings como `Fechado` ou `11h–14h30 / 18h–23h` quando necessário.
5. Revise categorias, itens, preços, descrições, ordem e itens `featured` do cardápio.
6. Substitua imagens demonstrativas por fotos autorizadas, ajustando `src`, `alt`, `width`, `height`, `isPlaceholder` e `sourceUrl` quando aplicável.
7. Substitua reviews placeholders por depoimentos reais ou deixe `reviews.items` vazio para ocultar a seção.
8. Configure SEO: `title`, `description`, `siteUrl`, `ogImage`, `locale` e `indexable`.
9. Mantenha `seo.indexable: false` para demo; use `true` somente no site oficial.
10. Execute `npm run build` para validar a versão final.
11. Faça deploy apenas depois de revisar conteúdo real e permissões de uso.

Arquivos normalmente alterados:

- `src/data/restaurant.ts`
- arquivos locais de imagem, caso a personalização deixe de usar URLs remotas

Não é esperado alterar componentes React para criar uma nova demonstração.

## Checklist de publicação

Antes de transformar uma demo em site oficial:

- substituir conteúdo demonstrativo;
- confirmar preços;
- confirmar horários;
- confirmar telefone;
- confirmar endereço;
- confirmar redes sociais;
- adicionar Google Maps quando disponível;
- substituir reviews placeholders;
- substituir fotos demonstrativas por imagens autorizadas;
- configurar `seo.siteUrl`;
- configurar `seo.ogImage`;
- mudar `seo.indexable` para `true`;
- revisar Schema.org gerado;
- executar build final.

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
