import {
  Activity,
  AlertTriangle,
  Award,
  Beaker,
  BookOpen,
  Download,
  Facebook,
  FileText,
  Globe,
  Handshake,
  HelpCircle,
  Info,
  Linkedin,
  Mail,
  MapPin,
  Package2,
  Phone,
  Shield,
  ShieldCheck,
  TrendingUp,
  Twitter,
  Users,
  Video,
  type LucideIcon,
} from 'lucide-react';

// Explicit registry of every icon name referenced from `content.ts` and component
// data. Add new icons here as they're introduced — this keeps icon resolution
// statically checkable instead of indexing into the full lucide-react namespace.
const ICONS: Record<string, LucideIcon> = {
  Activity,
  AlertTriangle,
  Award,
  Beaker,
  BookOpen,
  Download,
  Facebook,
  FileText,
  Globe,
  Handshake,
  Info,
  Linkedin,
  Mail,
  MapPin,
  Package2,
  Phone,
  Shield,
  ShieldCheck,
  TrendingUp,
  Twitter,
  Users,
  Video,
};

/**
 * Renders a Lucide icon by name. `strokeWidth` defaults to 1.75 rather than
 * Lucide's 2 — a slightly lighter line sits better next to the mark. Existing
 * call sites keep working, since the new argument has a default.
 */
export function renderIcon(
  iconName: string,
  className?: string,
  strokeWidth: number = 1.75,
): JSX.Element {
  const Icon = ICONS[iconName] ?? HelpCircle;
  return <Icon className={className} strokeWidth={strokeWidth} />;
}
