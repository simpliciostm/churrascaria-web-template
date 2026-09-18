import type { RestaurantConfig } from '../types/restaurant.ts';

export const restaurant: RestaurantConfig = {
  name: 'Churrascaria Tuvalu',
  shortName: 'TUVALU',
  slogan: null,
  description: null,
  phone: '(14) 3203-1328',
  whatsapp: null,
  address: {
    street: 'Rua Christiano Pagani',
    number: '2-64',
    district: 'Vila Engler',
    city: 'Bauru',
    state: 'SP',
    postalCode: '17047-144',
    country: 'Brasil',
    googleMapsUrl: null,
  },
  openingHours: [],
  socialLinks: {
    instagram: '@churrascaria_tuvalu',
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
    eyebrow: 'Churrascaria',
    title: 'Tradição servida à mesa.',
    description: 'Churrasco, comida bem servida e bons momentos em Bauru.',
    image: {
      // Imagem remota demonstrativa. Substituir por fotografia autorizada antes de publicação comercial.
      src: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=2200&q=82',
      alt: 'Carne sendo preparada na brasa em imagem demonstrativa de churrasco',
      isDemo: true,
    },
  },
  menu: {
    // Conteúdo demonstrativo do template. Substituir categorias, pratos, bebidas, imagens e preços por dados reais e autorizados durante a personalização.
    eyebrow: 'DO FOGO À MESA',
    title: 'Nosso cardápio',
    description:
      'Uma seleção demonstrativa para apresentar pratos, acompanhamentos e outras opções da casa.',
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
            description: 'Porção demonstrativa preparada na churrasqueira.',
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
              isPlaceholder: true,
              sourceUrl:
                'https://unsplash.com/photos/a-plate-of-rice-beans-and-plantains-Ycuvvz_Px8c',
            },
          },
          {
            id: 'almoco-da-casa',
            name: 'Almoço da casa',
            description: 'Opção demonstrativa para apresentar uma refeição completa.',
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
            description: 'Acompanhamento demonstrativo servido para compartilhar.',
            price: 18.9,
            featured: true,
            image: {
              src: 'https://images.unsplash.com/photo-1621851709622-e19c9a4f0cc5?auto=format&fit=crop&w=1200&q=82',
              alt: 'Churrasqueira acesa em imagem demonstrativa para cardápio',
              isPlaceholder: true,
              sourceUrl:
                'https://unsplash.com/photos/burning-charcoal-on-charcoal-grill-SHFQI_DGgAU',
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
            description: 'Opção demonstrativa para acompanhar a refeição.',
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
      eyebrow: 'ALGUNS DOS NOSSOS PRATOS',
      title: 'Da brasa para a mesa.',
      description: 'Uma seleção visual demonstrativa para apresentar sabores e pratos da casa.',
    },
  },
  about: {
    introLabel: 'A casa',
    introText: 'Tem lugar que a gente escolhe pela comida. E volta porque se sente bem.',
    eyebrow: 'A CASA',
    title: 'Um lugar feito para receber.',
    paragraphs: [
      'Churrasco, comida bem servida e aquele almoço que pede mais alguns minutos à mesa.',
      'Um espaço para reunir a família, encontrar os amigos e aproveitar sem pressa.',
    ],
    image: {
      // Imagem remota demonstrativa. Substituir por fotografia autorizada antes de publicação comercial.
      src: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1400&q=82',
      alt: 'Mesa de restaurante com carne servida em imagem demonstrativa',
      isPlaceholder: true,
      creditLabel: 'Foto demonstrativa de Kaysha no Unsplash',
      creditUrl: 'https://unsplash.com/photos/grilled-meat-on-brown-wooden-tray-rnWltIdLPd8',
    },
  },
  experience: {
    eyebrow: 'À mesa',
    title: 'Churrasco é comida feita para dividir a mesa.',
    description:
      'Carne na brasa, acompanhamentos e comida bem servida para aproveitar o almoço sem pressa.',
    keywords: ['Churrasco', 'Mesa', 'Almoço'],
    images: [
      {
        // Imagem remota demonstrativa. Substituir por fotografia autorizada antes de publicação comercial.
        src: 'https://images.unsplash.com/photo-1767974968707-db3d448d4ef3?auto=format&fit=crop&w=1600&q=82',
        alt: 'Espetos de carne servidos à mesa em imagem demonstrativa',
        isPlaceholder: true,
        creditLabel: 'Foto demonstrativa de tommao wang no Unsplash',
        creditUrl:
          'https://unsplash.com/photos/grilled-meat-skewers-on-a-serving-platter-z4MYbjYb5p0',
      },
      {
        // Imagem remota demonstrativa. Substituir por fotografia autorizada antes de publicação comercial.
        src: 'https://images.unsplash.com/photo-1657299170240-a1f811379b57?auto=format&fit=crop&w=1100&q=82',
        alt: 'Pessoas reunidas em uma mesa com comida em imagem demonstrativa',
        isPlaceholder: true,
        creditLabel: 'Foto demonstrativa de Wasa Crispbread no Unsplash',
        creditUrl: 'https://unsplash.com/photos/people-eating-food-at-a-table-LBl3Csr96YI',
      },
    ],
  },
  gallery: {
    eyebrow: 'POR AQUI',
    title: 'Entre a brasa e a mesa.',
    description: 'Fogo, preparo e momentos que fazem parte da experiência.',
    images: [
      {
        // Imagem demonstrativa genérica. Substituir por fotografia autorizada antes de publicação comercial.
        src: 'https://images.unsplash.com/photo-1621851709622-e19c9a4f0cc5?auto=format&fit=crop&w=1500&q=82',
        alt: 'Carvão aceso em churrasqueira',
        isPlaceholder: true,
        creditLabel: 'Foto demonstrativa de Adam Mills no Unsplash',
        creditUrl: 'https://unsplash.com/photos/burning-charcoal-on-charcoal-grill-SHFQI_DGgAU',
        category: 'fire',
      },
      {
        // Imagem demonstrativa genérica. Substituir por fotografia autorizada antes de publicação comercial.
        src: 'https://images.unsplash.com/photo-1743630458593-286a8ae99625?auto=format&fit=crop&w=1200&q=82',
        alt: 'Prato com arroz, feijão e acompanhamentos servido à mesa',
        isPlaceholder: true,
        creditLabel: 'Foto demonstrativa de Jonathan Caliguire no Unsplash',
        creditUrl: 'https://unsplash.com/photos/a-plate-of-rice-beans-and-plantains-Ycuvvz_Px8c',
        category: 'food',
      },
      {
        // Imagem demonstrativa genérica. Substituir por fotografia autorizada antes de publicação comercial.
        src: 'https://images.unsplash.com/photo-1757961047505-13d5d2a3a911?auto=format&fit=crop&w=1200&q=82',
        alt: 'Espetos assando em uma churrasqueira',
        isPlaceholder: true,
        creditLabel: 'Foto demonstrativa de Madeline Liu no Unsplash',
        creditUrl:
          'https://unsplash.com/photos/chicken-skewers-cooking-on-a-barbecue-grill-RDPDoNJmYko',
        category: 'grill',
      },
      {
        // Imagem demonstrativa genérica. Substituir por fotografia autorizada antes de publicação comercial.
        src: 'https://images.unsplash.com/photo-1657299170240-a1f811379b57?auto=format&fit=crop&w=1500&q=82',
        alt: 'Pessoas compartilhando comida em uma mesa',
        isPlaceholder: true,
        creditLabel: 'Foto demonstrativa de Wasa Crispbread no Unsplash',
        creditUrl: 'https://unsplash.com/photos/people-eating-food-at-a-table-LBl3Csr96YI',
        category: 'table',
      },
    ],
  },
  reviews: {
    eyebrow: 'Quem vem, conta',
    title: 'Bom mesmo é quando dá vontade de voltar.',
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
    eyebrow: 'Venha conhecer',
    title: 'A mesa está esperando.',
    description: 'Confira o endereço, os horários e escolha o melhor caminho para chegar.',
    hoursFallback: 'Consulte os horários do restaurante.',
    contactFallback: 'Canais de contato em breve.',
  },
  footer: {
    category: 'Churrascaria',
    disclaimer: 'Protótipo demonstrativo • Conteúdo ilustrativo',
  },
};
