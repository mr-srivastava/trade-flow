import * as LucideIcons from 'lucide-react';
import React from 'react'; // Ensure React is imported for JSX

function getLucideIcon(name: string): React.ElementType {
  const Icon = LucideIcons[name as keyof typeof LucideIcons];
  return (Icon as React.ElementType) || (LucideIcons.HelpCircle as React.ElementType); // fallback icon
}

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
  const Icon = getLucideIcon(iconName) ?? LucideIcons.HelpCircle;
  return <Icon className={className} strokeWidth={strokeWidth} />;
}
