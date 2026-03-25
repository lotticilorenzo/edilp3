import type { Metadata } from 'next'
import type { Immobile, Realizzazione } from '@/types'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://edilp3.it'

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Edil P.3 Srl — Costruttori a Parma dal 1985',
    template: '%s | Edil P.3 — Costruttori a Parma',
  },
  description:
    'Impresa edile di Collecchio con 40 anni di esperienza. Costruiamo e vendiamo direttamente residenze in classe A, bioedilizia e antisismica a Parma e provincia.',
  keywords: [
    'costruttore case Parma',
    'vendita diretta case Parma',
    'nuove costruzioni Parma',
    'impresa edile Collecchio',
    'appartamenti nuovi Parma',
    'bioedilizia Parma',
    'classe A case Parma',
    'antisismica Parma',
    'Edil P.3',
    'case nuove Parma Mia',
    'case nuove Eurosia',
    'case nuove Vicofertile',
  ],
  authors: [{ name: 'Edil P.3 Srl' }],
  creator: 'Edil P.3 Srl',
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: siteUrl,
    siteName: 'Edil P.3 Srl',
    title: 'Edil P.3 Srl — Costruttori a Parma dal 1985',
    description:
      'Costruiamo e vendiamo direttamente residenze di qualità a Parma e provincia. Bioedilizia, Classe A, antisismica.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Edil P.3 Srl — Costruttori a Parma',
    description: 'Residenze di qualità a Parma. Vendita diretta, Classe A, Bioedilizia.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export function buildMetadata(overrides: Partial<Metadata> & { canonical?: string }): Metadata {
  const { canonical, ...rest } = overrides
  return {
    ...defaultMetadata,
    ...rest,
    ...(canonical && {
      alternates: { canonical: `${siteUrl}${canonical}` },
    }),
  }
}

/* ── JSON-LD generators ── */

export function localBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'HomeAndConstructionBusiness'],
    name: 'Edil P.3 Srl',
    description:
      'Impresa edile fondata nel 1985 a Collecchio (PR). Costruzione e vendita diretta di residenze in classe A, bioedilizia e antisismica.',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    image: `${siteUrl}/og-image.jpg`,
    telephone: ['+390521831434', '+393396499106'],
    email: 'info@caseaparmaedilp3.it',
    priceRange: '€€€',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Via del Giardinetto 6/L',
      addressLocality: 'Collecchio',
      postalCode: '43044',
      addressRegion: 'PR',
      addressCountry: 'IT',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 44.7465,
      longitude: 10.2129,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:30',
        closes: '12:30',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '14:00',
        closes: '18:00',
      },
    ],
    areaServed: [
      { '@type': 'City', name: 'Parma' },
      { '@type': 'City', name: 'Collecchio' },
      {
        '@type': 'Neighborhood',
        name: 'Parma Mia',
        containedInPlace: { '@type': 'City', name: 'Parma' },
      },
      {
        '@type': 'Neighborhood',
        name: 'Eurosia',
        containedInPlace: { '@type': 'City', name: 'Parma' },
      },
      {
        '@type': 'Neighborhood',
        name: 'Vicofertile',
        containedInPlace: { '@type': 'City', name: 'Parma' },
      },
      {
        '@type': 'Neighborhood',
        name: 'Corcagnano',
        containedInPlace: { '@type': 'City', name: 'Parma' },
      },
      {
        '@type': 'Neighborhood',
        name: 'Via Schubert',
        containedInPlace: { '@type': 'City', name: 'Parma' },
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '6',
      bestRating: '5',
    },
    foundingDate: '1985',
    vatID: 'IT02136610348',
    sameAs: [
      'https://www.google.com/maps/place/Edil+P.3+Srl',
    ],
  }
}

export function immobileJsonLd(immobile: Immobile) {
  const type = immobile.tipologia === 'villa' || immobile.tipologia === 'bifamiliare'
    ? 'House'
    : immobile.tipologia === 'attico'
    ? 'Apartment'
    : 'Apartment'

  return {
    '@context': 'https://schema.org',
    '@type': type,
    name: immobile.titolo,
    description: immobile.descrizione,
    url: `${siteUrl}/immobili/${immobile.slug}`,
    image: immobile.images[0] ?? `${siteUrl}/og-image.jpg`,
    floorSize: {
      '@type': 'QuantitativeValue',
      value: immobile.metratura,
      unitCode: 'MTK',
    },
    numberOfRooms: immobile.camere,
    numberOfBathroomsTotal: immobile.bagni,
    ...(immobile.piano !== undefined && { floorLevel: immobile.piano }),
    ...(immobile.indirizzo && {
      address: {
        '@type': 'PostalAddress',
        streetAddress: immobile.indirizzo,
        addressLocality: 'Parma',
        addressRegion: 'PR',
        addressCountry: 'IT',
      },
    }),
    ...(immobile.prezzo
      ? {
          offers: {
            '@type': 'Offer',
            price: immobile.prezzo,
            priceCurrency: 'EUR',
            availability:
              immobile.stato === 'disponibile'
                ? 'https://schema.org/InStock'
                : immobile.stato === 'in-costruzione'
                ? 'https://schema.org/PreOrder'
                : 'https://schema.org/SoldOut',
            seller: { '@type': 'Organization', name: 'Edil P.3 Srl' },
          },
        }
      : {}),
  }
}

export function immobiliItemListJsonLd(
  items: Pick<Immobile, 'slug' | 'titolo' | 'descrizione' | 'images'>[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Abitazioni disponibili — Edil P.3',
    description: 'Residenze nuove in vendita a Parma e Collecchio. Classe A, bioedilizia, antisismica.',
    url: `${siteUrl}/immobili`,
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${siteUrl}/immobili/${item.slug}`,
      name: item.titolo,
    })),
  }
}

export function realizzazioniItemListJsonLd(
  items: Pick<Realizzazione, 'slug' | 'nome' | 'descrizione' | 'copertina'>[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Realizzazioni Edil P.3 — Portfolio progetti',
    description: 'Oltre 100 abitazioni consegnate a Parma e provincia dal 1985.',
    url: `${siteUrl}/realizzazioni`,
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${siteUrl}/realizzazioni/${item.slug}`,
      name: item.nome,
      image: item.copertina,
    })),
  }
}

export function breadcrumbJsonLd(
  items: { name: string; href?: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      ...(item.href && { item: `${siteUrl}${item.href}` }),
    })),
  }
}
