import type { RestaurantConfig } from '../types/restaurant.ts';

const heroSteakVideo = new URL('../assets/restaurant/hero/hero-steak.mp4', import.meta.url).href;

export const restaurant: RestaurantConfig = {
  publication: {
    status: 'demo',
  },
  name: 'Churrascaria NOME',
  shortName: 'NOME',
  slogan: null,
  description: null,
  phone: '(14) 0000-0000',
  whatsapp: null,
  address: {
    street: '',
    number: '',
    district: '',
    city: 'Bauru',
    state: 'SP',
    postalCode: '00000-000',
    country: 'Brasil',
    googleMapsUrl: null,
    googleMapsEmbedUrl: null,
  },
  openingHours: [],
  socialLinks: {
    instagram: '@churrascaria_nome',
    facebook: null,
    tripadvisor: null,
  },
  reviewSources: [],
  externalLinks: {
    menu: null,
    reservations: null,
  },
  seo: {
    title: null,
    description:
      'Conheça a churrascaria, sua proposta, localização e informações para planejar sua visita.',
    siteUrl: null,
    ogImage: null,
    locale: 'pt_BR',
    indexable: false,
  },
  hero: {
    eyebrow: 'Churrasco e bons encontros',
    title: 'Tradição servida à mesa.',
    description: 'Carne na brasa, comida bem servida e tempo para aproveitar.',
    image: {
      // Imagem remota demonstrativa. Substituir por fotografia autorizada antes de publicação comercial.
      src: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=2200&q=82',
      alt: 'Carne sendo preparada na brasa em imagem demonstrativa de churrasco',
      width: 2200,
      height: 1400,
      isPlaceholder: true,
      sourceUrl: 'https://unsplash.com/photos/cooked-meat-on-black-metal-grill-9aOswReDKPo',
    },
    video: {
      src: heroSteakVideo,
      type: 'video/mp4',
    },
  },
  menu: {
    // Conteúdo demonstrativo do template. Substituir categorias, pratos, bebidas, imagens e preços por dados reais e autorizados durante a personalização.
    isPlaceholder: true,
    eyebrow: 'NOSSO CARDÁPIO',
    title: 'Cortes, pratos e acompanhamentos.',
    description: 'Do churrasco aos pratos da casa, veja opções e preços de forma simples.',
    categories: [
      {
        id: 'churrasco',
        label: 'CHURRASCO',
        items: [
          {
            id: 'picanha-na-brasa',
            name: 'Picanha na brasa',
            description: 'Corte servido com acompanhamentos da casa.',
            price: 79.9,
            featured: true,
            image: {
              src: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1200&q=82',
              alt: 'Carne sendo preparada na brasa em imagem demonstrativa',
              width: 900,
              height: 675,
              isPlaceholder: true,
              sourceUrl: 'https://unsplash.com/photos/cooked-meat-on-black-metal-grill-9aOswReDKPo',
            },
          },
          {
            id: 'contra-file',
            name: 'Contra-filé',
            description: 'Preparado na brasa e servido à mesa.',
            price: 64.9,
          },
          {
            id: 'linguica-artesanal',
            name: 'Linguiça artesanal',
            description: 'Receita tradicional para compartilhar.',
            price: 29.9,
          },
        ],
      },
      {
        id: 'pratos',
        label: 'PRATOS',
        items: [
          {
            id: 'prato-executivo',
            name: 'Prato executivo',
            description: 'Arroz, feijão, acompanhamento e opção de carne.',
            price: 34.9,
            featured: true,
            image: {
              src: 'https://images.unsplash.com/photo-1743630458593-286a8ae99625?auto=format&fit=crop&w=1200&q=82',
              alt: 'Prato brasileiro com arroz, feijão e acompanhamentos em imagem demonstrativa',
              width: 900,
              height: 675,
              isPlaceholder: true,
              sourceUrl:
                'https://unsplash.com/photos/a-plate-of-rice-beans-and-plantains-Ycuvvz_Px8c',
            },
          },
          {
            id: 'almoco-da-casa',
            name: 'Almoço da casa',
            description: 'Uma opção completa para o almoço.',
            price: 42.9,
          },
        ],
      },
      {
        id: 'acompanhamentos',
        label: 'ACOMPANHAMENTOS',
        items: [
          {
            id: 'farofa-da-casa',
            name: 'Farofa da casa',
            description: 'Farofa crocante para acompanhar o churrasco.',
            price: 12.9,
          },
          {
            id: 'porcao-de-mandioca',
            name: 'Porção de mandioca',
            description: 'Mandioca macia para acompanhar o churrasco.',
            price: 18.9,
            featured: true,
            image: {
              src: 'https://images.unsplash.com/photo-1709114107937-6dec855d9ab5?auto=format&fit=crop&w=1200&q=82',
              alt: 'Acompanhamentos brasileiros servidos à mesa em imagem demonstrativa',
              width: 900,
              height: 675,
              isPlaceholder: true,
              sourceUrl:
                'https://unsplash.com/photos/a-table-topped-with-plates-of-food-and-bowls-of-food-Z2YnKo17mlI',
            },
          },
        ],
      },
      {
        id: 'bebidas',
        label: 'BEBIDAS',
        items: [
          {
            id: 'agua-mineral',
            name: 'Água mineral',
            description: 'Com ou sem gás.',
            price: 5.9,
          },
          {
            id: 'refrigerante',
            name: 'Refrigerante',
            description: 'Para acompanhar a refeição.',
            price: 8.9,
          },
          {
            id: 'suco-natural',
            name: 'Suco natural',
            description: 'Sabores variados conforme disponibilidade.',
            price: 12.9,
          },
        ],
      },
    ],
    showcase: {
      eyebrow: 'DA BRASA PARA A MESA',
      title: 'Alguns dos nossos pratos.',
      description: 'Sabores que fazem parte da experiência.',
    },
  },
  about: {
    introLabel: 'A casa',
    introText: 'Tem lugar que a gente escolhe pela comida. E volta porque se sente bem.',
    eyebrow: 'A CASA',
    title: 'Um lugar feito para receber.',
    paragraphs: [
      'Boa comida, atendimento próximo e uma mesa pronta para reunir pessoas.',
      'Um espaço para almoçar, encontrar os amigos e aproveitar sem pressa.',
    ],
    image: {
      // Imagem remota demonstrativa. Substituir por fotografia autorizada antes de publicação comercial.
      src: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1400&q=82',
      alt: 'Mesa de restaurante com carne servida em imagem demonstrativa',
      width: 1400,
      height: 1050,
      isPlaceholder: true,
      sourceUrl: 'https://unsplash.com/photos/grilled-meat-on-brown-wooden-tray-rnWltIdLPd8',
      creditLabel: 'Foto demonstrativa de Kaysha no Unsplash',
      creditUrl: 'https://unsplash.com/photos/grilled-meat-on-brown-wooden-tray-rnWltIdLPd8',
    },
  },
  experience: {
    eyebrow: 'Experiência',
    title: 'Churrasco, mesa e tempo para ficar.',
    description:
      'Carne na brasa, acompanhamentos e comida bem servida para aproveitar o almoço sem pressa.',
    keywords: ['Churrasco', 'Mesa', 'Almoço'],
    highlights: [
      {
        title: 'Churrasco na brasa',
        description: 'Sabor e tradição no centro da mesa.',
        icon: 'flame',
      },
      {
        title: 'Mesa e encontro',
        description: 'Um lugar para chegar, sentar e aproveitar.',
        icon: 'users',
      },
      {
        title: 'Comida bem servida',
        description: 'Pratos e acompanhamentos para dividir.',
        icon: 'utensils',
      },
    ],
    images: [
      {
        // Imagem remota demonstrativa. Substituir por fotografia autorizada antes de publicação comercial.
        src: 'https://images.unsplash.com/photo-1767974968707-db3d448d4ef3?auto=format&fit=crop&w=1600&q=82',
        alt: 'Espetos de carne servidos à mesa em imagem demonstrativa',
        width: 1600,
        height: 1280,
        isPlaceholder: true,
        sourceUrl:
          'https://unsplash.com/photos/grilled-meat-skewers-on-a-serving-platter-z4MYbjYb5p0',
        creditLabel: 'Foto demonstrativa de tommao wang no Unsplash',
        creditUrl:
          'https://unsplash.com/photos/grilled-meat-skewers-on-a-serving-platter-z4MYbjYb5p0',
      },
      {
        // Imagem remota demonstrativa. Substituir por fotografia autorizada antes de publicação comercial.
        src: 'https://images.unsplash.com/photo-1657299170240-a1f811379b57?auto=format&fit=crop&w=1100&q=82',
        alt: 'Pessoas reunidas em uma mesa com comida em imagem demonstrativa',
        width: 1100,
        height: 825,
        isPlaceholder: true,
        sourceUrl: 'https://unsplash.com/photos/people-eating-food-at-a-table-LBl3Csr96YI',
        creditLabel: 'Foto demonstrativa de Wasa Crispbread no Unsplash',
        creditUrl: 'https://unsplash.com/photos/people-eating-food-at-a-table-LBl3Csr96YI',
      },
    ],
  },
  gallery: {
    eyebrow: 'ENTRE A BRASA E A MESA',
    title: 'Momentos que fazem parte da experiência.',
    description: 'Do preparo ao encontro, cada detalhe importa.',
    images: [
      {
        // Imagem demonstrativa genérica. Substituir por fotografia autorizada antes de publicação comercial.
        src: 'https://images.unsplash.com/photo-1621851709622-e19c9a4f0cc5?auto=format&fit=crop&w=1500&q=82',
        alt: 'Carvão aceso em churrasqueira',
        width: 1000,
        height: 675,
        isPlaceholder: true,
        sourceUrl: 'https://unsplash.com/photos/burning-charcoal-on-charcoal-grill-SHFQI_DGgAU',
        creditLabel: 'Foto demonstrativa de Adam Mills no Unsplash',
        creditUrl: 'https://unsplash.com/photos/burning-charcoal-on-charcoal-grill-SHFQI_DGgAU',
        category: 'fire',
      },
      {
        // Imagem demonstrativa genérica. Substituir por fotografia autorizada antes de publicação comercial.
        src: 'https://images.unsplash.com/photo-1558030018-d461fe79233e?auto=format&fit=crop&w=1200&q=82',
        alt: 'Pessoa cortando carne na tábua durante o preparo',
        width: 900,
        height: 675,
        isPlaceholder: true,
        sourceUrl: 'https://unsplash.com/photos/person-cutting-meat-lanootd2FcU',
        creditLabel: 'Foto demonstrativa de Emerson Vieira no Unsplash',
        creditUrl: 'https://unsplash.com/photos/person-cutting-meat-lanootd2FcU',
        category: 'food',
      },
      {
        // Imagem demonstrativa genérica. Substituir por fotografia autorizada antes de publicação comercial.
        src: 'https://images.unsplash.com/photo-1691200170948-beca4be90d59?auto=format&fit=crop&w=1200&q=82',
        alt: 'Mesa com carnes e acompanhamentos servidos para compartilhar',
        width: 900,
        height: 675,
        isPlaceholder: true,
        sourceUrl:
          'https://unsplash.com/photos/a-table-topped-with-plates-of-food-next-to-corn-on-the-cob-ppetJpKt0fE',
        creditLabel: 'Foto demonstrativa de Sheri Silver no Unsplash',
        creditUrl:
          'https://unsplash.com/photos/a-table-topped-with-plates-of-food-next-to-corn-on-the-cob-ppetJpKt0fE',
        category: 'table',
      },
      {
        // Imagem demonstrativa genérica. Substituir por fotografia autorizada antes de publicação comercial.
        src: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1500&q=82',
        alt: 'Pessoas reunidas em uma refeição compartilhada',
        width: 1000,
        height: 675,
        isPlaceholder: true,
        sourceUrl:
          'https://unsplash.com/photos/people-sitting-in-front-of-table-talking-and-eating-W3SEyZODn8U',
        creditLabel: 'Foto demonstrativa de Priscilla Du Preez no Unsplash',
        creditUrl:
          'https://unsplash.com/photos/people-sitting-in-front-of-table-talking-and-eating-W3SEyZODn8U',
        category: 'table',
      },
    ],
  },
  reviews: {
    eyebrow: 'O que dizem nossos clientes',
    title: 'Histórias que nos inspiram.',
    items: [
      {
        quote: 'Comida bem servida, atendimento próximo e aquele almoço que vale a pena repetir.',
        author: 'Cliente',
        isPlaceholder: true,
        rating: null,
        source: null,
        sourceUrl: null,
      },
      {
        quote: 'Um lugar para chegar, sentar e aproveitar sem pressa.',
        author: 'Cliente',
        isPlaceholder: true,
        rating: null,
        source: null,
        sourceUrl: null,
      },
      {
        quote: 'Churrasco, mesa cheia e aquela vontade de voltar no próximo almoço.',
        author: 'Cliente',
        isPlaceholder: true,
        rating: null,
        source: null,
        sourceUrl: null,
      },
    ],
  },
  locationSection: {
    eyebrow: 'Onde nos encontrar',
    title: 'Venha nos visitar.',
    description: 'Confira endereço, contato e horários antes de sair.',
    hoursFallback: 'Consulte os horários',
    contactFallback: 'Canais de contato em breve.',
  },
  footer: {
    category: 'Churrascaria',
    disclaimer: 'Protótipo demonstrativo • Conteúdo ilustrativo',
  },
};
