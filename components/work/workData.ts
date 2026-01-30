/**
 * Our Work – project data for digital marketing & web dev agency.
 * Replace image URLs with your real project screenshots/case studies.
 */

export type ProjectCategory = 'Branding' | 'Web Development' | 'Social Media' | 'Content' | 'SEO' | 'E-commerce';

export type Project = {
  id: string;
  title: string;
  category: ProjectCategory;
  image: string;
  imageAlt: string;
  /** Optional link to case study or live site */
  link?: string;
};

/** Professional placeholder imagery – replace with your project assets */
export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Brand Identity & Digital Presence',
    category: 'Branding',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
    imageAlt: 'Brand identity and digital presence project',
    link: '#work',
  },
  {
    id: '2',
    title: 'E-commerce Platform Launch',
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    imageAlt: 'E-commerce platform and analytics dashboard',
    link: '#work',
  },
  {
    id: '3',
    title: 'Social Campaign & Community Growth',
    category: 'Social Media',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80',
    imageAlt: 'Social media campaign and community growth',
    link: '#work',
  },
  {
    id: '4',
    title: 'Content Strategy & Video Production',
    category: 'Content',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80',
    imageAlt: 'Content strategy and video production',
    link: '#work',
  },
  {
    id: '5',
    title: 'Organic Growth & SEO Overhaul',
    category: 'SEO',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    imageAlt: 'SEO and organic growth analytics',
    link: '#work',
  },
  {
    id: '6',
    title: 'Startup Website & Marketing Suite',
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80',
    imageAlt: 'Startup website and marketing suite',
    link: '#work',
  },
];
