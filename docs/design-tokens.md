# Design Tokens

This document describes the design token system used across the TradeFlow (Syntara) frontend. Tokens are defined in `src/app/globals.css` and exposed via Tailwind in `tailwind.config.ts`.

## Semantic tokens (use these for UI)

| Role | CSS variable | Usage |
|------|--------------|--------|
| **Background** | `--background` | Page/surface background |
| **Foreground** | `--foreground` | Primary text; use `text-foreground` instead of `text-white` / `text-black` |
| **Card** | `--card`, `--card-foreground` | Cards, panels, modals |
| **Primary** | `--primary`, `--primary-foreground` | Main CTAs, buttons, links |
| **Secondary** | `--secondary`, `--secondary-foreground` | Secondary actions, muted surfaces |
| **Muted** | `--muted`, `--muted-foreground` | De-emphasized text and backgrounds; use `text-muted-foreground` for secondary text |
| **Accent** | `--accent`, `--accent-foreground` | Links, secondary actions (distinct hue from primary) |
| **Destructive** | `--destructive`, `--destructive-foreground` | Errors, delete actions |
| **Warning** | `--warning`, `--warning-foreground`, `--warning-muted`, `--warning-border` | Hazard badges, caution states |
| **Success** | `--success`, `--success-foreground` | Form success, success toasts |
| **Info** | `--info`, `--info-foreground` | Informational messages |
| **Border** | `--border` | Borders, dividers |
| **Input** | `--input` | Input borders |
| **Ring** | `--ring` | Focus rings |

## Syntara tokens (surfaces and brand)

Use for layout and brand-specific surfaces. In light theme these resolve to light values; in dark theme to dark values.

| Token | Usage |
|-------|--------|
| `--syntara-dark`, `--syntara-darker` | Section backgrounds, footers, nav; use `bg-syntara-dark` / `bg-syntara-darker` with `dark:` prefix when you need dark-only surfaces (e.g. `bg-card dark:bg-syntara-darker`) |
| `--syntara-primary` (alias of primary) | Brand blue; buttons, logo hover |
| `syntara-light` (Tailwind: `text-syntara-light`) | Muted text on dark sections; maps to `--muted-foreground` in light theme |

## Theme behavior

- **Dark theme**: Default. `html` has `class="dark"`. Variables are set in `:root` in `globals.css`.
- **Light theme**: `html` has `class="light"`. Overrides are in `.light` in `globals.css`.
- Theme is controlled by `next-themes` and the theme toggle in the navbar; preference is persisted (e.g. localStorage).

## Text and hierarchy

- Prefer **semantic tokens** for text:
  - Primary text: `text-foreground`
  - Secondary text: `text-muted-foreground` or `text-syntara-light` where appropriate
- Avoid hardcoded `text-white` or `text-black` so that both themes and future tokens stay consistent.

## Accessibility and contrast

- **Warning**: `--warning-foreground` is darkened for WCAG AA contrast on `--warning` (e.g. hazard badges).
- **Focus**: Focus rings use `--ring` (primary). Ensure `ring-offset-*` uses a visible background (e.g. `ring-offset-background` or `dark:ring-offset-syntara-darker`).
- **Verification**: Run body text, muted text, primary buttons, warning/success badges, and focus rings through a contrast checker (e.g. [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)) in both light and dark themes to confirm WCAG AA (or AAA where required).
