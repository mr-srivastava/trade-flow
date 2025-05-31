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
  TrendingUp
} from 'lucide-react';
import React from 'react'; // Ensure React is imported for JSX

// Icon mapping for better performance and type safety
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
  TrendingUp
} as const;

type IconName = keyof typeof iconMap;

function getLucideIcon(name: string): React.ElementType {
  const Icon = iconMap[name as IconName];
  return Icon || HelpCircle; // fallback icon
}

export function renderIcon(iconName: string, className?: string): JSX.Element {
  const Icon = getLucideIcon(iconName);
  return <Icon className={className} />;
}
