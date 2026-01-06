/**
 * Mock Data for Testing
 * Temporary mock data until backend is ready
 */

import { Project } from '@/types';
import { getFutureDate } from './helpers';

export const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    _id: '1',
    image: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800&h=600&fit=crop',
    name: 'Ocean Cleanup Initiative',
    description: 'Plastic pollution is now omnipresent in the ocean, but causes the most harm in coastal waters and during its journey towards the open ocean. This project aims to remove millions of tons of plastic from our oceans.',
    fullDescription: 'Plastic pollution is now omnipresent in the ocean, but causes the most harm in coastal waters and during its journey towards the open ocean. This project aims to remove millions of tons of plastic from our oceans.\n\nOur comprehensive approach includes:\n\n1. Deploying advanced cleanup systems in high-pollution areas\n2. Partnering with local communities for beach cleanup initiatives\n3. Developing innovative recycling programs\n4. Educating the public about plastic waste reduction\n\nTogether, we can make a significant impact on ocean health and marine life preservation.',
    category: 'Environmental',
    raisedAmount: 10189,
    raised: 10189,
    targetAmount: 40000,
    target: 40000,
    endDate: getFutureDate(27),
    investorsCount: 7958,
    backersCount: 7958,
    backersAvatars: [
      'https://i.pravatar.cc/150?img=1',
      'https://i.pravatar.cc/150?img=2',
      'https://i.pravatar.cc/150?img=3',
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800&h=600&fit=crop', alt: 'Ocean cleanup' },
    ],
    subheadings: [
      {
        title: 'Our Mission',
        content: 'We are committed to cleaning up our oceans and protecting marine life for future generations. Through innovative technology and community engagement, we aim to remove millions of tons of plastic waste from our waters.',
      },
      {
        title: 'How It Works',
        content: 'Our cleanup systems use advanced filtration technology to capture plastic waste while allowing marine life to pass through safely. The collected plastic is then processed and recycled into new products.',
      },
    ],
  },
  {
    id: '2',
    _id: '2',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop',
    name: 'Renewable Energy Expansion',
    description: 'Plastic pollution is now omnipresent in the ocean, but causes the most harm in coastal waters and during its journey towards the open ocean. We are expanding wind energy infrastructure to reduce carbon emissions.',
    fullDescription: 'Plastic pollution is now omnipresent in the ocean, but causes the most harm in coastal waters and during its journey towards the open ocean. We are expanding wind energy infrastructure to reduce carbon emissions.\n\nOur renewable energy expansion project focuses on:\n\n1. Installing new wind turbines in strategic locations\n2. Upgrading existing infrastructure for better efficiency\n3. Creating jobs in the renewable energy sector\n4. Reducing our carbon footprint significantly\n\nThis initiative will help us transition to a more sustainable energy future.',
    category: 'Environmental',
    raisedAmount: 80189,
    raised: 80189,
    targetAmount: 320000,
    target: 320000,
    endDate: getFutureDate(27),
    investorsCount: 5420,
    backersCount: 5420,
    backersAvatars: [
      'https://i.pravatar.cc/150?img=4',
      'https://i.pravatar.cc/150?img=5',
      'https://i.pravatar.cc/150?img=6',
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop', alt: 'Wind turbines' },
    ],
    subheadings: [
      {
        title: 'Energy Revolution',
        content: 'We are at the forefront of the renewable energy revolution, expanding our wind energy infrastructure to create a cleaner, more sustainable future.',
      },
    ],
  },
  {
    id: '3',
    _id: '3',
    image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&h=600&fit=crop',
    name: 'Sustainable Agriculture Program',
    description: 'Plastic pollution is now omnipresent in the ocean, but causes the most harm in coastal waters and during its journey towards the open ocean. Supporting farmers in transitioning to sustainable practices.',
    fullDescription: 'Plastic pollution is now omnipresent in the ocean, but causes the most harm in coastal waters and during its journey towards the open ocean. Supporting farmers in transitioning to sustainable practices.\n\nOur sustainable agriculture program includes:\n\n1. Training farmers in organic farming techniques\n2. Providing access to sustainable farming equipment\n3. Establishing local markets for organic produce\n4. Supporting soil health and biodiversity\n\nJoin us in creating a more sustainable food system.',
    category: 'Environmental',
    raisedAmount: 207189,
    raised: 207189,
    targetAmount: 800000,
    target: 800000,
    endDate: getFutureDate(27),
    investorsCount: 3200,
    backersCount: 3200,
    backersAvatars: [
      'https://i.pravatar.cc/150?img=7',
      'https://i.pravatar.cc/150?img=8',
      'https://i.pravatar.cc/150?img=9',
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&h=600&fit=crop', alt: 'Sustainable farming' },
    ],
    subheadings: [
      {
        title: 'Supporting Farmers',
        content: 'We work directly with farmers to help them transition to sustainable farming practices that benefit both the environment and their livelihoods.',
      },
    ],
  },
];

// Shared background image for hero sections
export const HERO_BACKGROUND_IMAGE = 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=600&fit=crop';
