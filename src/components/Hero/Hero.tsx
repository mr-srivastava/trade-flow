import React, { ReactNode } from "react";
import MapBackground from "./MapBackground";
import CenteredContent from "./CenteredContent";

interface HeroProps {
  title: string;
  ctaButtons: ReactNode;
}

export default function Hero({ title, ctaButtons }: HeroProps) {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <MapBackground />
      <CenteredContent title={title} ctaButtons={ctaButtons} />
    </section>
  );
}
