/**
 * Client logos / names for Social Route.
 * Replace with real client logo image URLs when available.
 */

export type Client = {
  id: string;
  name: string;
  /** Optional logo image URL; if missing, show initials */
  logo?: string;
};

export const CLIENTS: Client[] = [
  { id: '1', name: 'Brand Co' },
  { id: '2', name: 'TechStart' },
  { id: '3', name: 'Retail Plus' },
  { id: '4', name: 'HealthFirst' },
  { id: '5', name: 'EduFlow' },
  { id: '6', name: 'FinanceHub' },
  { id: '7', name: 'Foodie' },
  { id: '8', name: 'TravelNext' },
];
