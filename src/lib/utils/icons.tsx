import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ShieldCheckIcon,
  FlaskIcon,
  ActivityIcon,
  ShieldIcon,
  GlobeIcon,
  MedalIcon,
  UsersIcon,
  BookOpenIcon,
  FileTextIcon,
  VideoIcon,
  DownloadSimpleIcon,
  QuestionIcon,
  LinkedinLogoIcon,
  TwitterLogoIcon,
  FacebookLogoIcon,
  CaretRightIcon,
  ListIcon,
  XIcon,
  PaperPlaneRightIcon,
  HandshakeIcon,
  TrendUpIcon,
} from '@phosphor-icons/react/ssr';
import React from 'react';

/**
 * Icon mapping for better performance and type safety
 * Maps string names to Phosphor React icon components
 */
const iconMap = {
  Mail: EnvelopeIcon,
  Phone: PhoneIcon,
  MapPin: MapPinIcon,
  ShieldCheck: ShieldCheckIcon,
  Beaker: FlaskIcon,
  Activity: ActivityIcon,
  Shield: ShieldIcon,
  Globe: GlobeIcon,
  Award: MedalIcon,
  Users: UsersIcon,
  BookOpen: BookOpenIcon,
  FileText: FileTextIcon,
  Video: VideoIcon,
  Download: DownloadSimpleIcon,
  HelpCircle: QuestionIcon,
  Linkedin: LinkedinLogoIcon,
  Twitter: TwitterLogoIcon,
  Facebook: FacebookLogoIcon,
  ChevronRight: CaretRightIcon,
  Menu: ListIcon,
  X: XIcon,
  Send: PaperPlaneRightIcon,
  Handshake: HandshakeIcon,
  TrendingUp: TrendUpIcon,
} as const;

type IconName = keyof typeof iconMap;

/**
 * Get a Phosphor icon component by name
 * Returns QuestionIcon as fallback if icon not found
 */
function getPhosphorIcon(name: string): React.ElementType {
  const Icon = iconMap[name as IconName];
  return Icon || QuestionIcon;
}

/**
 * Render a Phosphor icon by name with optional className
 * @param iconName - Name of the icon to render
 * @param className - Optional CSS classes to apply
 * @returns JSX element of the icon
 */
export function renderIcon(
  iconName: string,
  className?: string
): React.ReactElement {
  const Icon = getPhosphorIcon(iconName);
  return <Icon className={className} />;
}
