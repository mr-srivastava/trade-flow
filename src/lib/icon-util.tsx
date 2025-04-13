import * as LucideIcons from 'lucide-react';
import React from 'react'; // Ensure React is imported for JSX

function getLucideIcon(name: string): React.ElementType {
  const Icon = LucideIcons[name as keyof typeof LucideIcons];
  return (Icon as React.ElementType) || (LucideIcons.HelpCircle as React.ElementType); // fallback icon
}

export function renderIcon(iconName: string, className?: string): JSX.Element {
  const Icon = getLucideIcon(iconName) ?? LucideIcons.HelpCircle;
  return <Icon className={className} />;
}
