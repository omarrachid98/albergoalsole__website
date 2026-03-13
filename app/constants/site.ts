/**
 * Centralized site constants.
 * Single source of truth for brand data, contact info, and URLs.
 * Import from here instead of hardcoding values across components.
 */

export const SITE = {
  name: 'Albergo Al Sole',
  url: 'https://www.alsolelusiana.it',
  email: 'info@alsolelusiana.it',
  phone: '0424 406004',
  phoneFull: '+390424406004',
  address: {
    street: 'Via VII Comuni 2',
    locality: 'Lusiana Conco',
    region: 'VI',
    postalCode: '36046',
    country: 'IT',
    full: 'Via VII Comuni 2, Lusiana Conco (VI)',
  },
  geo: {
    latitude: 45.7833,
    longitude: 11.5667,
  },
  mapsUrl: 'https://maps.google.com/?q=Albergo+Al+Sole+Lusiana+Conco+VI',
  since: 1985,
  priceRange: '€€',
  starRating: 3,
  heroImage: '/images/home/alsole__home.jpg',
  ogImage: 'https://www.alsolelusiana.it/images/home/alsole__home.jpg',
} as const;
