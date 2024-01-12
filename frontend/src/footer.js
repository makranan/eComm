import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { BASE_URL } from './constants';

export const footerLinks = [
  {
    title: 'Links',
    links: [
      {
        id: 'footer-link-1',
        name: 'Content',
        link: '#',
      },
      {
        id: 'footer-link-2',
        name: 'How it Works',
        link: '#',
      },
      {
        id: 'footer-link-3',
        name: 'Create',
        link: '#',
      },
      {
        id: 'footer-link-4',
        name: 'Explore',
        link: '#',
      },
      {
        id: 'footer-link-5',
        name: 'Terms & Services',
        link: '#',
      },
    ],
  },
  {
    title: 'Community',
    links: [
      {
        id: 'footer-link-6',
        name: 'Help Center',
        link: '#',
      },
      {
        id: 'footer-link-7',
        name: 'Partners',
        link: '#',
      },
      {
        id: 'footer-link-8',
        name: 'Suggestions',
        link: '#',
      },
      {
        id: 'footer-link-9',
        name: 'Blog',
        link: '#',
      },
      {
        id: 'footer-link-10',
        name: 'Newsletters',
        link: '#',
      },
    ],
  },
  {
    title: 'Partner',
    links: [
      {
        id: 'footer-link-11',
        name: 'Our Partner',
        link: '#',
      },
      {
        id: 'footer-link-12',
        name: 'Become a Partner',
        link: '#',
      },
    ],
  },
];

export const socialMedia = [
  {
    id: 'social-media-1',
    icon: <FaInstagram />,
    link: 'https://www.instagram.com/',
  },
  {
    id: 'social-media-2',
    icon: <FaFacebook />,
    link: 'https://www.facebook.com/',
  },
  {
    id: 'social-media-3',
    icon: <FaTwitter />,
    link: 'https://www.twitter.com/',
  },
  {
    id: 'social-media-4',
    icon: <FaLinkedin />,
    link: 'https://www.linkedin.com/',
  },
];

export const developer = [
  {
    id: 'developer-1',
    name: 'Maciej Krasowski',
    link: 'https://maciejkrasowski.pl/',
  },
];
