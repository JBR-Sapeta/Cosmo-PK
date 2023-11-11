import { FaDiscord, FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa';
import { ROUTER_PATH } from '@Router/constant';

export const NAV_DATA = [
  { label: 'Home', path: ROUTER_PATH.HOME },
  { label: 'Team', path: ROUTER_PATH.TEAM },
  { label: 'News', path: ROUTER_PATH.NEWS },
  { label: 'Contact', path: ROUTER_PATH.CONTACT },
];

export const MEDIA_DATA = [
  { label: 'Facebook', href: 'https://www.google.pl/', Icon: FaFacebook },
  { label: 'Linkedin', href: 'https://www.google.pl/', Icon: FaLinkedin },
  { label: 'GitHub', href: 'https://www.google.pl/', Icon: FaGithub },
  { label: 'Discord', href: 'https://www.google.pl/', Icon: FaDiscord },
];
