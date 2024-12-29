export const categoryList = [
  {
    name: 'Početna', slug: '/',
  }, {
    name: 'Vijesti', slug: '/vijesti', subcategories: [
      {
        name: 'Crna Gora', slug: '/crna-gora',
        subcategories: [
          {
            name: 'Politika', slug: '/politika',
          },
          {
            name: 'Društvo', slug: '/drustvo',
          },
          {
            name: 'Ekonomija', slug: '/ekonomija',
          },
          {
            name: 'Crna Hronika', slug: '/crna-hronika',
          },
        ],
      },
      {
        name: 'Svijet', slug: '/svijet',
      },

      {
        name: 'Region', slug: '/region',
      },
      {
        name: 'Evropa', slug: '/evropa',
      },
      {
        name: 'Planeta', slug: '/planeta',
      }],
  }, {
    name: 'Sport', slug: '/sport', subcategories: [
      {
        name: 'Fudbal', slug: '/fudbal',
      }, {
        name: 'Košarka', slug: '/kosarka',
      },
      {
        name: 'Tenis', slug: '/tenis',
      },
      {
        name: 'Rukomet', slug: '/rukomet',
      },
      {
        name: 'Ostali sportovi', slug: '/ostali-sportovi',
      },
    ],
  },
  {
    name: 'Tehnologija', slug: '/tehnologija', subcategories: [
      {
        name: 'Nauka', slug: '/nauka',
      },
      {
        name: 'Gaming', slug: '/gaming',
      },

    ],
  },
  {
    name: 'Lifestyle', slug: '/lifestyle', subcategories: [
      {
        name: 'Moda i Ljepota', slug: '/moda-i-ljepota',
      },
      {
        name: 'Zdravlje', slug: '/zdravje',
      },
      {
        name: 'Mama', slug: '/mama',
      },
      {
        name: 'Kuhinja', slug: '/kuhinja',
      },
      {
        name: 'Kuċni ljubimci', slug: '/kucni-ljubimci',
      },
      {
        name: 'Putovanja', slug: '/putovanje',
      },
      {
        name: 'Dom i Dizajn', slug: '/dom-i-dizajn',
      },
      {
        name: 'Horoskop', slug: '/horoskop',
      },
      {
        name: 'Seks', slug: '/seks',
      },
      {
        name: 'Zanimljivo', slug: '/zanimljivo',
      },
    ],
  },

  {
    name: 'Automobili', slug: '/automobili',
  },
  {
    name: 'Showbiznis', slug: '/showbiznis', subcategories: [
      {
        name: 'Film', slug: '/film',
      },
      {
        name: 'Muzika', slug: '/muzika',
      },
      {
        name: 'Kultura', slug: '/kultura',
      },
    ],
  },
  {
    name: 'Biznis', slug: '/biznis',
  },
]
