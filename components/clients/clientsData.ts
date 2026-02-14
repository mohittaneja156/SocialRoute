/**
 * Client logos / names for Social Route.
 * Replace with real client logo image URLs when available.
 */

export type Client = {
  id: string;
  name: string;
  /** Optional logo image URL; if missing, show initials */
  logo?: string;
  /** Optional link URL for the brand */
  link?: string;
};

export const CLIENTS: Client[] = [
  { id: '1', name: 'Brand 1', logo: '/1.png', link: '#' },
  { id: '2', name: 'Brand 2', logo: '/2.png', link: '#' },
  { id: '3', name: 'Brand 3', logo: '/3.png', link: '#' },
  { id: '4', name: 'Brand 4', logo: '/4.jpeg', link: '#' },
  { id: '5', name: 'Brand 5', logo: '/5.jpeg', link: '#' },
  { id: '6', name: 'Brand 6', logo: '/6.png', link: '#' },
];
