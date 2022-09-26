import { flattenDeep } from 'lodash';

export const mapStagingCatToProdCat = (cat: string) => {
  switch (cat) {
    case 'automobiles_accessories':
      return 'automobile';
    case 'baby_kids':
      return 'baby_kids';
    case 'cash_prepaid_card':
      return 'cash_cards';
    case 'electronics':
      return 'electronics';
    case 'food_restaurant':
      return 'restaurants_foods_and_drinks';
    case 'software':
      return 'software_and_licensing';
    case 'travel_entertainment':
      return 'travel_and_tourism';
    case 'charity_donations':
      return 'insurance';
    case 'experiences':
      return 'music_movies_and_entertainment';
    case 'gaming':
      return 'experiences_test';
    case 'gold_jewelry':
      return 'jewelry_lifestyle';
    case 'grocery':
      return 'grocery_and_retail';
    case 'fashion_lifestyle':
      return 'apparel_fashion_accessories';
    case 'home_living':
      return 'home_living';
    case 'in_house_benefits':
      return 'in_house_benefits';
    case 'merchandise':
      return 'ecommerce';
    default:
      return 'all';
  }
};

export const countries = (iso: string) => {
  return (
    [
      {
        filterValue: 'Afghanistan',
        isoCode: 'AF',
        filterValueCode: 'afghanistan',
      },
      {
        filterValue: 'Andorra',
        isoCode: 'AD',
        filterValueCode: 'andorra',
      },
      {
        filterValue: 'Argentina',
        isoCode: 'AR',
        filterValueCode: 'argentina',
      },
      {
        filterValue: 'Armenia',
        isoCode: 'AM',
        filterValueCode: 'armenia',
      },
      {
        filterValue: 'Australia',
        isoCode: 'AU',
        filterValueCode: 'australia',
      },
      {
        filterValue: 'Austria',
        isoCode: 'AT',
        filterValueCode: 'austria',
      },
      {
        filterValue: 'Azerbaijan',
        isoCode: 'AZ',
        filterValueCode: 'azerbaijan',
      },
      {
        filterValue: 'Bahrain',
        isoCode: 'BH',
        filterValueCode: 'bahrain',
      },
      {
        filterValue: 'Baltics',
        isoCode: '',
        filterValueCode: 'baltics',
      },
      {
        filterValue: 'Bangladesh',
        isoCode: 'BD',
        filterValueCode: 'bangladesh',
      },
      {
        filterValue: 'Belgium',
        isoCode: 'BE',
        filterValueCode: 'belgium',
      },
      {
        filterValue: 'Bhutan',
        isoCode: 'BT',
        filterValueCode: 'bhutan',
      },
      {
        filterValue: 'Bolivia',
        isoCode: 'BO',
        filterValueCode: 'bolivia',
      },
      {
        filterValue: 'Brazil',
        isoCode: 'BR',
        filterValueCode: 'brazil',
      },
      {
        filterValue: 'Brunei Darussalam',
        isoCode: 'BN',
        filterValueCode: 'brunei_darussalam',
      },
      {
        filterValue: 'Bulgaria',
        isoCode: 'BG',
        filterValueCode: 'bulgaria',
      },
      {
        filterValue: 'Cambodia',
        isoCode: 'KH',
        filterValueCode: 'cambodia',
      },
      {
        filterValue: 'Canada',
        isoCode: 'CA',
        filterValueCode: 'canada',
      },
      {
        filterValue: 'Canary Islands',
        isoCode: 'IC',
        filterValueCode: 'canary_islands',
      },
      {
        filterValue: 'Chile',
        isoCode: 'CL',
        filterValueCode: 'chile',
      },
      {
        filterValue: 'China',
        isoCode: 'CN',
        filterValueCode: 'china',
      },
      {
        filterValue: 'Colombia',
        isoCode: 'CO',
        filterValueCode: 'colombia',
      },
      {
        filterValue: 'Colombia',
        isoCode: 'CO',
        filterValueCode: 'columbia',
      },
      {
        filterValue: 'Cook Islands',
        isoCode: 'CK',
        filterValueCode: 'cook_islands',
      },
      {
        filterValue: 'Costa Rica',
        isoCode: 'CR',
        filterValueCode: 'costa_rica',
      },
      {
        filterValue: 'Croatia',
        isoCode: 'HR',
        filterValueCode: 'croatia',
      },
      {
        filterValue: 'Cyprus',
        isoCode: 'CY',
        filterValueCode: 'cyprus',
      },
      {
        filterValue: 'Czech Republic',
        isoCode: 'CZ',
        filterValueCode: 'czech_republic',
      },
      {
        filterValue: 'Denmark',
        isoCode: 'DK',
        filterValueCode: 'denmark',
      },
      {
        filterValue: 'Dominican Republic',
        isoCode: 'DO',
        filterValueCode: 'dominican_republic',
      },
      {
        filterValue: 'Ecuador',
        isoCode: 'EC',
        filterValueCode: 'ecuador',
      },
      {
        filterValue: 'Egypt',
        isoCode: 'EG',
        filterValueCode: 'egypt',
      },
      {
        filterValue: 'Estonia',
        isoCode: 'EE',
        filterValueCode: 'estonia',
      },
      {
        filterValue: 'Europe',
        isoCode: '',
        filterValueCode: 'europe',
      },
      {
        filterValue: 'Federated States of Micronesia',
        isoCode: '',
        filterValueCode: 'federated_states_of_micronesia',
      },
      {
        filterValue: 'Fiji',
        isoCode: 'FJ',
        filterValueCode: 'fiji',
      },
      {
        filterValue: 'Finland',
        isoCode: 'FI',
        filterValueCode: 'finland',
      },
      {
        filterValue: 'France',
        isoCode: 'FR',
        filterValueCode: 'france',
      },
      {
        filterValue: 'Georgia',
        isoCode: 'GE',
        filterValueCode: 'georgia',
      },
      {
        filterValue: 'Germany',
        isoCode: 'DE',
        filterValueCode: 'germany',
      },
      {
        filterValue: 'Greece',
        isoCode: 'GR',
        filterValueCode: 'greece',
      },
      {
        filterValue: 'Guatemala',
        isoCode: 'GT',
        filterValueCode: 'guatemala',
      },
      {
        filterValue: 'Hong Kong',
        isoCode: 'HK',
        filterValueCode: 'hong_kong',
      },
      {
        filterValue: 'Hungary',
        isoCode: 'HU',
        filterValueCode: 'hungary',
      },
      {
        filterValue: 'Iceland',
        isoCode: 'IS',
        filterValueCode: 'iceland',
      },
      {
        filterValue: 'India',
        isoCode: 'IN',
        filterValueCode: 'india',
      },
      {
        filterValue: 'Indonesia',
        isoCode: 'ID',
        filterValueCode: 'indonesia',
      },
      {
        filterValue: 'Ireland',
        isoCode: 'IE',
        filterValueCode: 'ireland',
      },
      {
        filterValue: 'Israel',
        isoCode: 'IL',
        filterValueCode: 'israel',
      },
      {
        filterValue: 'Italy',
        isoCode: 'IT',
        filterValueCode: 'italy',
      },
      {
        filterValue: 'Jamaica',
        isoCode: 'JM',
        filterValueCode: 'jamaica',
      },
      {
        filterValue: 'Japan',
        isoCode: 'JP',
        filterValueCode: 'japan',
      },
      {
        filterValue: 'Jordan',
        isoCode: 'JO',
        filterValueCode: 'jordan',
      },
      {
        filterValue: 'Kazakhstan',
        isoCode: 'KZ',
        filterValueCode: 'kazakhstan',
      },
      {
        filterValue: 'Kenya',
        isoCode: 'KE',
        filterValueCode: 'kenya',
      },
      {
        filterValue: 'Kiribati',
        isoCode: 'KI',
        filterValueCode: 'kiribati',
      },
      {
        filterValue: 'Korea',
        isoCode: '',
        filterValueCode: 'korea',
      },
      {
        filterValue: 'Kuwait',
        isoCode: 'KW',
        filterValueCode: 'kuwait',
      },
      {
        filterValue: 'Kyrgyz Republic',
        isoCode: '',
        filterValueCode: 'kyrgyz_republic',
      },
      {
        filterValue: 'Lao Peoples Democratic Republic',
        isoCode: '',
        filterValueCode: 'lao_peoples_democratic_republic',
      },
      {
        filterValue: 'Latvia',
        isoCode: 'LV',
        filterValueCode: 'latvia',
      },
      {
        filterValue: 'Lebanon',
        isoCode: 'LB',
        filterValueCode: 'lebanon',
      },
      {
        filterValue: 'Liechtenstein',
        isoCode: 'LI',
        filterValueCode: 'liechtenstein',
      },
      {
        filterValue: 'Lithuania',
        isoCode: 'LT',
        filterValueCode: 'lithuania',
      },
      {
        filterValue: 'Luxembourg',
        isoCode: 'LU',
        filterValueCode: 'luxembourg',
      },
      {
        filterValue: 'Luxenbure',
        isoCode: '',
        filterValueCode: 'luxenbure',
      },
      {
        filterValue: 'Malaysia',
        isoCode: 'MY',
        filterValueCode: 'malaysia',
      },
      {
        filterValue: 'Maldives',
        isoCode: 'MV',
        filterValueCode: 'maldives',
      },
      {
        filterValue: 'Malta',
        isoCode: 'MT',
        filterValueCode: 'malta',
      },
      {
        filterValue: 'Manila',
        isoCode: '',
        filterValueCode: 'manila',
      },
      {
        filterValue: 'Marshall Islands',
        isoCode: 'MH',
        filterValueCode: 'marshall_islands',
      },
      {
        filterValue: 'Mauritius',
        isoCode: 'MU',
        filterValueCode: 'mauritius',
      },
      {
        filterValue: 'Mexico',
        isoCode: 'MX',
        filterValueCode: 'mexico',
      },
      {
        filterValue: 'Middle East',
        isoCode: '',
        filterValueCode: 'middle_east',
      },
      {
        filterValue: 'Monaco',
        isoCode: 'MC',
        filterValueCode: 'monaco',
      },
      {
        filterValue: 'Mongolia',
        isoCode: 'MN',
        filterValueCode: 'mongolia',
      },
      {
        filterValue: 'Morocco',
        isoCode: 'MA',
        filterValueCode: 'morocco',
      },
      {
        filterValue: 'Myanmar',
        isoCode: 'MM',
        filterValueCode: 'myanmar',
      },
      {
        filterValue: 'Nauru',
        isoCode: 'NR',
        filterValueCode: 'nauru',
      },
      {
        filterValue: 'Nepal',
        isoCode: 'NP',
        filterValueCode: 'nepal',
      },
      {
        filterValue: 'Netherlands',
        isoCode: 'NL',
        filterValueCode: 'netherlands',
      },
      {
        filterValue: 'New Zealand',
        isoCode: 'NZ',
        filterValueCode: 'new_zealand',
      },
      {
        filterValue: 'Nigeria',
        isoCode: 'NG',
        filterValueCode: 'nigeria',
      },
      {
        filterValue: 'Niue',
        isoCode: 'NU',
        filterValueCode: 'niue',
      },
      {
        filterValue: 'Norway',
        isoCode: 'NO',
        filterValueCode: 'norway',
      },
      {
        filterValue: 'Oman',
        isoCode: 'OM',
        filterValueCode: 'oman',
      },
      {
        filterValue: 'Pakistan',
        isoCode: 'PK',
        filterValueCode: 'pakistan',
      },
      {
        filterValue: 'Palau',
        isoCode: 'PW',
        filterValueCode: 'palau',
      },
      {
        filterValue: 'Papua New Guinea',
        isoCode: 'PG',
        filterValueCode: 'papua_new_guinea',
      },
      {
        filterValue: 'Peru',
        isoCode: 'PE',
        filterValueCode: 'peru',
      },
      {
        filterValue: 'Peru South America',
        isoCode: '',
        filterValueCode: 'peru_south_america',
      },
      {
        filterValue: 'Philippines',
        isoCode: 'PH',
        filterValueCode: 'philippines',
      },
      {
        filterValue: 'Poland',
        isoCode: 'PL',
        filterValueCode: 'poland',
      },
      {
        filterValue: 'Portugal',
        isoCode: 'PT',
        filterValueCode: 'portugal',
      },
      {
        filterValue: 'Qatar',
        isoCode: 'QA',
        filterValueCode: 'qatar',
      },
      {
        filterValue: 'Rest of World',
        isoCode: '',
        filterValueCode: 'rest_of_world',
      },
      {
        filterValue: 'Romania',
        isoCode: 'RO',
        filterValueCode: 'romania',
      },
      {
        filterValue: 'Russia',
        isoCode: 'RU',
        filterValueCode: 'russia',
      },
      {
        filterValue: 'Samoa',
        isoCode: 'WS',
        filterValueCode: 'samoa',
      },
      {
        filterValue: 'San Marino',
        isoCode: 'SM',
        filterValueCode: 'san_marino',
      },
      {
        filterValue: 'Saudi Arabia',
        isoCode: 'SA',
        filterValueCode: 'saudi_arabia',
      },
      {
        filterValue: 'Serbia',
        isoCode: 'RS',
        filterValueCode: 'serbia',
      },
      {
        filterValue: 'Singapore',
        isoCode: 'SG',
        filterValueCode: 'singapore',
      },
      {
        filterValue: 'Slovakia',
        isoCode: 'SK',
        filterValueCode: 'slovakia',
      },
      {
        filterValue: 'Slovenia',
        isoCode: 'SI',
        filterValueCode: 'slovenia',
      },
      {
        filterValue: 'Solomon Islands',
        isoCode: 'SB',
        filterValueCode: 'solomon_islands',
      },
      {
        filterValue: 'South Africa',
        isoCode: 'ZA',
        filterValueCode: 'south_africa',
      },
      {
        filterValue: 'South Korea',
        isoCode: 'KR',
        filterValueCode: 'south_korea',
      },
      {
        filterValue: 'Spain',
        isoCode: 'ES',
        filterValueCode: 'spain',
      },
      {
        filterValue: 'Sri lanka',
        isoCode: 'LK',
        filterValueCode: 'sri_lanka',
      },
      {
        filterValue: 'Sweden',
        isoCode: 'SE',
        filterValueCode: 'sweden',
      },
      {
        filterValue: 'Switzerland',
        isoCode: 'CH',
        filterValueCode: 'switzerland',
      },
      {
        filterValue: 'Taipei',
        isoCode: '',
        filterValueCode: 'taipei',
      },
      {
        filterValue: 'Taiwan',
        isoCode: 'TW',
        filterValueCode: 'taiwan',
      },
      {
        filterValue: 'Tajikistan',
        isoCode: 'TJ',
        filterValueCode: 'tajikistan',
      },
      {
        filterValue: 'Thailand',
        isoCode: 'TH',
        filterValueCode: 'thailand',
      },
      {
        filterValue: 'Timor',
        isoCode: '',
        filterValueCode: 'timor',
      },
      {
        filterValue: 'Tonga',
        isoCode: 'TO',
        filterValueCode: 'tonga',
      },
      {
        filterValue: 'Turkey',
        isoCode: 'TR',
        filterValueCode: 'turkey',
      },
      {
        filterValue: 'Turkmenistan',
        isoCode: 'TM',
        filterValueCode: 'turkmenistan',
      },
      {
        filterValue: 'Tuvalu',
        isoCode: 'TV',
        filterValueCode: 'tuvalu',
      },
      {
        filterValue: 'UAE',
        isoCode: 'AE',
        filterValueCode: 'uae',
      },
      {
        filterValue: 'UK',
        isoCode: 'GB',
        filterValueCode: 'uk',
      },
      {
        filterValue: 'Ukraine',
        isoCode: 'UA',
        filterValueCode: 'ukraine',
      },
      {
        filterValue: 'Uruguay',
        isoCode: 'UY',
        filterValueCode: 'uruguay',
      },
      {
        filterValue: 'USA',
        isoCode: 'US',
        filterValueCode: 'usa',
      },
      {
        filterValue: 'Uzbekistan',
        isoCode: 'UZ',
        filterValueCode: 'uzbekistan',
      },
      {
        filterValue: 'Vanuatu',
        isoCode: 'VU',
        filterValueCode: 'vanuatu',
      },
      {
        filterValue: 'Vatican City',
        isoCode: 'VA',
        filterValueCode: 'vatican_city',
      },
      {
        filterValue: 'Vietnam',
        isoCode: 'VN',
        filterValueCode: 'vietnam',
      },
    ].find(({ isoCode }) => isoCode.toLowerCase() === iso.toLowerCase())
      ?.filterValueCode || 'usa'
  );
};

export const mapBrandSlugToProductName = (slug: string) => {
  const cleanedSlug = slug.replaceAll('-', ' ');

  switch (cleanedSlug) {
    case 'peets coffee tea':
      return 'Peets Coffee & Tea';
    case 'bjs restaurant':
      return "BJ's Restaurants";
    default:
      return cleanedSlug;
  }
};

export const normalizeItems = (items: Record<string, any>[]) => {
  const normalizedItems = items.map((item) =>
    item.valueDenominations.split(',').map((amount: string) => ({
      amount: +amount,
      originalPrice: +amount,
      price: {
        amount: +amount,
        currency: item.currencyCode,
      },
      slug: `${item.name
        .toLowerCase()
        .replaceAll('& ', '')
        .replaceAll(' ', '-')
        .replaceAll('.', '')
        .replaceAll("'", '')}-${item.countryCode.toLowerCase()}-${
        item.productId
      }-${amount}`,
      discountRate: item.discount,
      customerDiscountRate: item.discount,
      sortOrder: 0,
      name: item.name,
      ie: true,
      id: item.productId,
      termsAndConditionsInstructions: item.termsAndConditionsInstructions,
      redemptionInstructions: item.redemptionInstructions,
      expiry: item.expiryAndValidity,
      imageUrls: {
        medium: item.imageUrl,
        small: item.imageUrl,
        large: item.imageUrl,
      },
    })),
  );

  return flattenDeep(normalizedItems);
};
