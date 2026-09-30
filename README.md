# Churrascaria Web Template

Template/protótipo frontend para sites institucionais estáticos de churrascarias e restaurantes. A Churrascaria Tuvalu é utilizada temporariamente como estabelecimento de demonstração durante o desenvolvimento.

Projeto demonstrativo desenvolvido como conceito visual. Não representa o site oficial do estabelecimento.

## Conteúdo demonstrativo

O cardápio definido em `src/data/restaurant.ts` usa categorias, pratos, fotografias e preços demonstrativos para fins de template. Durante a personalização do site, substitua esses itens por informações reais, atualizadas e autorizadas do restaurante.

Os preços do cardápio devem permanecer como números no `RestaurantConfig`; a interface é responsável por formatá-los em BRL.

## Personalizando para uma nova churrascaria

Na maioria dos casos, a personalização deve acontecer em `src/data/restaurant.ts`. Componentes React não precisam ser alterados para trocar nome, cidade, contatos, endereço, cardápio, preços, textos, imagens e SEO. O template base deve permanecer limpo; para uma nova churrascaria, crie uma cópia, branch ou repositório de cliente antes de substituir os dados.

Checklist curto:

1. Atualize identidade: `name`, `shortName`, categoria e textos institucionais.
2. Atualize contatos: telefone, WhatsApp, Instagram e outros links disponíveis.
3. Atualize endereço: rua, número, bairro, cidade, estado, CEP, país e Google Maps quando houver.
4. Preencha horários em `openingHours`; use strings como `Fechado` ou `11h–14h30 / 18h–23h` quando necessário.
5. Revise categorias, itens, preços, descrições, ordem e itens `featured` do cardápio.
6. Substitua imagens demonstrativas por fotos autorizadas, ajustando `src`, `alt`, `width`, `height`, `isPlaceholder` e `sourceUrl` quando aplicável.
7. Substitua reviews placeholders por depoimentos reais ou deixe `reviews.items` vazio para ocultar a seção.
8. Configure SEO: `title`, `description`, `siteUrl`, `ogImage`, `locale` e `indexable`.
9. Mantenha `publication.status: 'demo'` e `seo.indexable: false` para demo; use `production` e `true` somente no site oficial.
10. Execute `npm run build` para validar a versão final.
11. Faça deploy apenas depois de revisar conteúdo real e permissões de uso.

Arquivos normalmente alterados:

- `src/data/restaurant.ts`
- arquivos locais de imagem, caso a personalização deixe de usar URLs remotas

Não é esperado alterar componentes React para criar uma nova demonstração.

## Validação antes da publicação

O projeto separa ambiente técnico de estágio comercial. `NODE_ENV` não define se o site é template, demo ou produção; isso fica em `publication.status` dentro de `src/data/restaurant.ts`.

Durante template ou demo:

```bash
npm run publication:status
npm run validate:content
npm run build
```

`validate:content` imprime avisos sobre placeholders, dados incompletos e SEO pendente, mas só falha quando encontra erro estrutural. Isso permite continuar gerando demos com `noindex`.

Mesmo se `seo.indexable` for ativado por engano em `template` ou `demo`, o HTML gerado continua com `noindex, nofollow`. A validação acusa o erro, e o SEO efetivo só permite indexação quando `publication.status === 'production'` e `seo.indexable === true`.

Antes do site oficial:

1. Substitua placeholders.
2. Confirme dados, contatos, endereço, cardápio, preços, horários e imagens.
3. Defina `publication.status: 'production'`.
4. Defina `seo.indexable: true`.
5. Configure `seo.siteUrl` com URL pública HTTPS.
6. Configure `seo.ogImage` com URL pública absoluta quando houver imagem de compartilhamento.
7. Execute `npm run validate:production`.
8. Execute `npm run build:production`.

`validate:production` exige `publication.status: 'production'` e falha se uma demo for tratada como site oficial. `build:production` executa a validação oficial antes do build.

Se houver dúvida sobre conteúdo oficial durante a publicação, mantenha `publication.status: 'demo'` ou volte `seo.indexable` para `false` até a revisão final. Não há autofix de produção: essa mudança deve ser consciente.

## Assets e imagens

As fotos específicas do restaurante devem ficar em `src/assets/restaurant/`, separadas por uso:

```text
src/assets/restaurant/
  hero/
  menu/
  about/
  experience/
  gallery/
  brand/
  seo/
```

Para imagens usadas no React, prefira `src/assets` em vez de `public`: o Vite resolve imports, aplica hash no build e deixa a dependência explícita no código. Use `public` apenas quando precisar servir um arquivo estático por caminho fixo. As imagens atuais continuam remotas e demonstrativas.

Exemplo de troca futura, sem alterar componentes:

```ts
import heroImage from '../assets/restaurant/hero/hero-main.webp';

image: {
  src: heroImage,
  alt: 'Costela sendo servida sobre tábua de madeira',
  width: 2200,
  height: 1400,
  isPlaceholder: false,
  sourceUrl: null,
}
```

`src` aceita tanto URL remota quanto asset local importado pelo Vite, porque ambos chegam aos componentes como string utilizável em `<img src={...}>`. Preserve `width` e `height` para evitar CLS. Use `isPlaceholder: true` para imagens demonstrativas/Unsplash e `isPlaceholder: false` para fotos oficiais autorizadas. Em fotos demonstrativas externas, preserve `sourceUrl`; em fotos oficiais locais, `sourceUrl` pode ser `null`.

Convenção sugerida de nomes:

- `hero/hero-main.webp`
- `menu/menu-picanha.webp`
- `menu/menu-prato-executivo.webp`
- `menu/menu-mandioca.webp`
- `about/about-main.webp`
- `experience/experience-grill.webp`
- `gallery/gallery-01.webp`, `gallery/gallery-02.webp`, `gallery/gallery-03.webp`, `gallery/gallery-04.webp`
- `seo/og-cover.jpg`
- `brand/logo.webp`, `brand/simbolo.webp`, `brand/assinatura.webp`, quando houver marca oficial

Formato preferencial para fotografias: WebP. JPEG/JPG e PNG são aceitáveis quando necessário; prefira PNG apenas quando transparência ou outra necessidade técnica justificar. Não há conversão automática neste projeto.

Tamanhos de arquivo são orientação, não regra de build:

- Hero: idealmente até 400-600 KB.
- Imagens de seção: idealmente até 250-400 KB.
- Thumbnails/pratos: idealmente até 150-300 KB.
- OG: adequado para compartilhamento, sem sacrificar qualidade.

Dimensões aproximadas alinhadas ao layout atual:

- Hero: horizontal ampla, próxima de `2200x1400`, com margem visual nas bordas para crops desktop/mobile.
- MenuShowcase: `900x675`, proporção 4:3.
- About: `1400x1050`, proporção 4:3.
- Experience: a configuração atual usa imagens entre 5:4 e 4:3, embora a seção congelada não renderize essas fotos no layout atual.
- Gallery: proporção 4:3; use algo próximo de `900x675` ou `1000x675`.
- OG: `1200x630`.

Orientações por seção:

- Hero: use boa resolução, assunto principal longe das bordas, espaço visual para texto, bom comportamento com overlay escuro e crop desktop/mobile. Fotos horizontais muito fechadas tendem a ficar ruins no mobile.
- MenuShowcase: use foto do item servido, preferencialmente prato pronto, boa iluminação, comida centralizada e enquadramento consistente. Evite grelha quando o item representa prato pronto, logos de terceiros, marcas d'água e prints de Instagram.
- About: pode usar preparo, serviço, corte, ambiente ou pessoa trabalhando, desde que o material seja autorizado.
- Experience: pode usar brasa, churrasqueira, espetos ou preparo, respeitando a composição já prevista na configuração.
- Gallery: busque variedade, por exemplo fogo/preparo, cozinha/corte, comida/mesa e ambiente/pessoas. Evite quatro imagens praticamente iguais.

A pasta `brand/` fica preparada para logo, símbolo e assinatura oficiais. Enquanto não houver logo oficial, Header e Footer continuam usando a marca tipográfica atual. Não implemente suporte visual a logo sem uma decisão de design.

A pasta `seo/` fica preparada para a futura imagem Open Graph. Para produção, `seo.ogImage` deve resultar em URL pública absoluta acessível por crawlers; uma imagem local importada no React não é automaticamente adequada para `og:image`. Preserve `seo.ogImage` como URL absoluta quando houver domínio e asset público definidos.

Escreva `alt` descrevendo a imagem, sem keywords artificiais. Evite textos genéricos como “foto” ou “imagem 1”.

Antes de publicar comercialmente, confirme que as fotos pertencem ao restaurante ou têm autorização/licença de uso. Evite copiar fotos de concorrentes, imagens aleatórias do Google, marcas d'água e conteúdo de terceiros sem permissão.

## Criando uma nova demo

Estado do template base:

- imagens demonstrativas permitidas;
- placeholders permitidos;
- `publication.status: 'template'` ou `'demo'`;
- `seo.indexable: false`;
- usado como ponto de partida, sem virar permanentemente um cliente.

Checklist Nova Demo:

- [ ] criar cópia/branch a partir do template;
- [ ] preencher identidade;
- [ ] preencher contatos;
- [ ] preencher endereço;
- [ ] preencher horários confirmados;
- [ ] preencher cardápio;
- [ ] adicionar fotos disponíveis;
- [ ] marcar placeholders corretamente;
- [ ] revisar alt texts;
- [ ] revisar reviews;
- [ ] manter `publication.status: 'demo'`;
- [ ] manter `seo.indexable: false`;
- [ ] executar `npm run publication:status`;
- [ ] executar `npm run validate:content`;
- [ ] executar `npm run build`;
- [ ] revisar desktop/mobile;
- [ ] fazer deploy da demo no Netlify com build command `npm run build`.

## Transformando demo em site oficial

Antes de transformar uma demo em site oficial:

- [ ] substituir fotos demonstrativas;
- [ ] confirmar autorização das imagens;
- [ ] remover/revisar reviews placeholders;
- [ ] confirmar preços;
- [ ] confirmar horários;
- [ ] confirmar endereço;
- [ ] confirmar telefone;
- [ ] confirmar redes sociais;
- [ ] configurar Maps;
- [ ] configurar `seo.siteUrl`;
- [ ] configurar `seo.ogImage`;
- [ ] revisar JSON-LD;
- [ ] mudar `publication.status` para `production`;
- [ ] mudar `seo.indexable` para `true`;
- [ ] executar `npm run publication:status`;
- [ ] executar `npm run validate:production`;
- [ ] executar `npm run build:production`;
- [ ] revisar `dist`, incluindo robots meta, `robots.txt` e `sitemap.xml`;
- [ ] configurar Netlify com build command `npm run build:production`;
- [ ] configurar domínio oficial;
- [ ] fazer deploy de produção.

Demo de cliente pode ainda conter placeholders e deve permanecer `noindex`. Site oficial exige conteúdo confirmado, imagens autorizadas, placeholders removidos e indexação somente depois da revisão final.

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
- O sitemap é gerado apenas quando o site está em `production`, indexável e com `siteUrl` HTTPS público.

`robots.txt` e meta robots têm funções diferentes. Para demos, a proteção principal contra indexação é `<meta name="robots" content="noindex, nofollow">`; `robots.txt` com `Disallow: /` é apenas uma proteção complementar contra crawling.

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

Para demo no Netlify:

- Build command: `npm run build`
- Publish directory: `dist`

Para site oficial no Netlify:

- Build command recomendado: `npm run build:production`
- Publish directory: `dist`

O comando do template base permanece `npm run build` enquanto o projeto estiver sendo usado para demos. Quando uma instância virar site oficial, troque o comando do projeto publicado para `npm run build:production`.

Para transformar em site oficial:

- configurar domínio;
- configurar `seo.siteUrl`;
- configurar `seo.ogImage`;
- alterar `publication.status` para `production`;
- alterar `seo.indexable` para `true`;
- executar `npm run validate:production`;
- revisar dados reais do restaurante;
- substituir fotografias demonstrativas quando necessário.

## Estrutura

```text
src/
  assets/
    restaurant/
      hero/
      menu/
      about/
      experience/
      gallery/
      brand/
      seo/
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
