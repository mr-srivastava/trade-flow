"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function ReadMore({ content }: { content: string }) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded(!expanded);

  return (
    <div>
      <p
        className={cn(
          "text-neutral-400 whitespace-pre-line leading-relaxed",
          expanded ? "" : "line-clamp-3"
        )}
      >
        {content}
      </p>

      <button
        onClick={toggleExpanded}
        className="italic text-sm hover:underline"
      >
        {expanded ? "Read less" : "Read more"}
      </button>
    </div>
  );
}
