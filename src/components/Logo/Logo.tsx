import React from 'react';

/**
 * The Syntaraa mark, inline so it never flashes and can be recoloured per
 * variant. The path data is identical to every build in `public/brand/` —
 * never redraw it.
 *
 * Rules enforced here, straight from the brand kit:
 *  - Clear space around the tile is a quarter of the tile height.
 *  - Minimum on-screen size is 20px; below 24px the stroke drops to 18 so the
 *    counters stay open.
 *  - Corner radius is a constant 13.33% of the tile (rx 16 of the 120 viewBox),
 *    so it scales with the tile and is never restyled.
 */

/** The one true path. Copy exactly. */
const MARK_PATH = 'M88 30 H42 V60 H78 V90 H32';

export type LogoVariant = 'default' | 'reversed' | 'ink' | 'open';

type LogoProps = {
  variant?: LogoVariant;
  /** Tile height in px. Clamped to the 20px brand minimum. */
  size?: number;
  showWordmark?: boolean;
  className?: string;
};

/** tile fill (null = no tile), stroke colour, wordmark colour */
const VARIANTS: Record<LogoVariant, { tile: string | null; stroke: string; word: string }> = {
  default: { tile: '#5B2BD9', stroke: '#FFFFFF', word: 'text-ink' },
  reversed: { tile: '#FFFFFF', stroke: '#5B2BD9', word: 'text-white' },
  ink: { tile: '#140C29', stroke: '#FFFFFF', word: 'text-white' },
  open: { tile: null, stroke: '#5B2BD9', word: 'text-ink' },
};

export default function Logo({
  variant = 'default',
  size = 32,
  showWordmark = true,
  className,
}: LogoProps) {
  const tileSize = Math.max(20, size); // brand minimum
  const { tile, stroke, word } = VARIANTS[variant];

  // Ink spread closes the counters at small sizes, so lighten the stroke.
  const strokeWidth = tileSize < 24 ? 18 : 22;

  return (
    <span
      className={['inline-flex items-center', className].filter(Boolean).join(' ')}
      // Clear space equals a quarter of the tile height.
      style={{ padding: tileSize / 4, gap: tileSize / 4 }}
    >
      <svg
        width={tileSize}
        height={tileSize}
        viewBox="0 0 120 120"
        // role="img" is the correct ARIA pattern for a decorative inline SVG mark, not a raster <img>.
        // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role
        role="img"
        aria-label="Syntaraa"
        style={{ display: 'block', flexShrink: 0 }}
      >
        {tile && <rect x="2" y="2" width="116" height="116" rx="16" fill={tile} />}
        <path
          d={MARK_PATH}
          fill="none"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinejoin="bevel"
        />
      </svg>

      {showWordmark && (
        // The SVG already carries the accessible name, so the visible wordmark
        // is hidden from assistive tech to avoid announcing "Syntaraa" twice.
        <span
          aria-hidden="true"
          className={`font-heading font-bold tracking-[-0.02em] leading-none ${word}`}
          style={{ fontSize: tileSize * 0.72 }}
        >
          Syntaraa
        </span>
      )}
    </span>
  );
}
