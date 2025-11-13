import {
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Beaker,
  Activity,
  Shield,
  Globe,
  Award,
  Users,
  BookOpen,
  FileText,
  Video,
  Download,
  HelpCircle,
  Linkedin,
  Twitter,
  Facebook,
  ChevronRight,
  Menu,
  X,
  Send,
  Handshake,
  TrendingUp,
} from 'lucide-react';
import React from 'react';

/**
 * Icon mapping for better performance and type safety
 * Maps string names to Lucide React icon components
 */
const iconMap = {
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Beaker,
  Activity,
  Shield,
  Globe,
  Award,
  Users,
  BookOpen,
  FileText,
  Video,
  Download,
  HelpCircle,
  Linkedin,
  Twitter,
  Facebook,
  ChevronRight,
  Menu,
  X,
  Send,
  Handshake,
  TrendingUp,
} as const;

type IconName = keyof typeof iconMap;

/**
 * Get a Lucide icon component by name
 * Returns HelpCircle as fallback if icon not found
 */
function getLucideIcon(name: string): React.ElementType {
  const Icon = iconMap[name as IconName];
  return Icon || HelpCircle;
}

/**
 * Render a Lucide icon by name with optional className
 * @param iconName - Name of the icon to render
 * @param className - Optional CSS classes to apply
 * @returns JSX element of the icon
 */
export function renderIcon(iconName: string, className?: string): JSX.Element {
  const Icon = getLucideIcon(iconName);
  return <Icon className={className} />;
}
