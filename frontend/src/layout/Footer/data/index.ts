import { FaDiscord, FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa';
import { ROUTES } from '@App/config';

export const NAV_DATA = [
  { label: 'Home', path: ROUTES.HOME },
  { label: 'Team', path: ROUTES.TEAM },
  { label: 'News', path: ROUTES.NEWS },
  { label: 'Contact', path: ROUTES.CONTACT },
];

export const MEDIA_DATA = [
  { label: 'Facebook', href: 'https://www.google.pl/', Icon: FaFacebook },
  { label: 'Linkedin', href: 'https://www.google.pl/', Icon: FaLinkedin },
  { label: 'GitHub', href: 'https://www.google.pl/', Icon: FaGithub },
  { label: 'Discord', href: 'https://www.google.pl/', Icon: FaDiscord },
];
