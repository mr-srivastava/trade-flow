"use client";
import FeatureCard from "../feature-card";

interface FeatureProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export function Feature({
  title = "Author Card",
  description = "Card with Author: Firstname Lastname, complete name and time to read - most suitable for blogs.",
  icon,
}: FeatureProps) {
  return (
    <FeatureCard
      className="relative z-20 h-full w-full"
      title={title}
      description={description}
      icon={icon}
    />
  );
}
