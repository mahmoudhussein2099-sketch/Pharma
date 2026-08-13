---
name: awon-design
description: Design system rules and tokens for the Awon Pharmacy (صيدلية عون) web app. Use when creating, editing, or reviewing any UI — components, buttons, forms, cards, admin dashboard pages, colors, spacing, dark mode, RTL, or when a UI decision needs the brand system. Load before writing or changing UI code in this project.
---

# Awon Pharmacy — Design System

This skill enforces the visual identity and component conventions of the Awon
Pharmacy web app. **Every new or edited UI must follow these rules.** The Next.js
app lives in `client/`; all commands run from `client/`.

## 1. Core principle

Never hard-code brand colors or radii in components. Always reference the
semantic Tailwind classes that map to CSS variables defined in
`client/src/index.css`:

- Light theme on `:root`, dark theme on the `.dark` selector.
- Tailwind maps these via `client/tailwind.config.js`
  (darkMode `'class'`, semantic color keys → `var(--...)`).

## 2. Color tokens (semantic, not raw)

Use ONLY these semantic utilities:

| Token | Light | Dark | Use for |
| --- | --- | --- | --- |
| `bg-background` / `text-foreground` | `#f8fafc` / `#0f172a` | `#0b1120` / `#e2e8f0` | Page & body |
| `bg-card` / `text-card-foreground` | `#ffffff` / `#0f172a` | `#0f172a` / `#e2e8f0` | Cards, panels, sidebars |
| `bg-popover` / `text-popover-foreground` | `#ffffff` / `#0f172a` | `#0f172a` / `#e2e8f0` | Menus, dropdowns, dialogs |
| `bg-primary` / `text-primary-foreground` | `#0d9488` / `#ffffff` | `#14b8a6` / `#042f2e` | CTAs, active states |
| `bg-secondary` | `#f1f5f9` | `#1e293b` | Subtle surfaces |
| `bg-muted` / `text-muted-foreground` | `#f1f5f9` / `#64748b` | `#1e293b` / `#94a3b8` | Placeholder text, disabled |
| `bg-accent` / `text-accent-foreground` | `#ccfbf1` / `#115e59` | `#134e4a` / `#5eead4` | Hover, selected row |
| `border-border` / `border-input` | `#e2e8f0` | `#1e293b` | Outlines, inputs |
| `ring-ring` | `#14b8a6` | `#2dd4bf` | Focus rings |
| `bg-destructive` / `text-destructive` | `#dc2626` | `#f87171` | Danger, logout, errors |
| `bg-success` / `text-success` | `#16a34a` | `#4ade80` | Confirmations, stock-in |
| `bg-warning` / `text-warning` | `#f59e0b` | `#fbbf24` | Alerts, low stock |

For badges, use the `Badge` component variants (`success`, `warning`,
`destructive`, `accent`) instead of ad-hoc color classes.

## 3. Typography

- Font family: `--font-sans` → `Inter` (set in tokens; `font-sans` in Tailwind).
- Type scale: `text-xs` (12), `text-sm` (14) default for body/forms,
  `text-base`/`text-lg` headings in cards, `text-2xl`+ for page titles.
- Prefer `font-medium`/`font-semibold` over `font-bold` except brand/section titles.
- Line heights: `leading-tight` for headings, `leading-relaxed` for paragraphs.

## 4. Radii, borders, spacing

- Radius token: `0.75rem`. Use `rounded-lg` (cards/buttons), `rounded-md`
  (inputs), `rounded-full` (avatars/pills), `rounded-sm` (menu items).
- Buttons/inputs height: `h-10` (40px) standard; `h-8` icon buttons; `h-12` hero CTAs.
- Spacing: 8px grid → `gap-3`/`gap-4` between fields, `p-6`/`p-4` card padding,
  `px-6`/`px-8` page gutters, `space-y-1.5` stacked form labels.

## 5. Direction & dark mode

- App is bilingual: `LanguageContext` sets `document.documentElement.dir`
  (`rtl` for Arabic, `ltr` for English) and toggles `body.rtl`.
- **Layouts must use logical properties** (`ms-*`, `me-*`, `start-*`, `end-*`,
  `text-start`) so they flip correctly. Never hard-code `left-*`/`right-*`/`ml-*`/`mr-*`
  for structural placement.
- Dark mode: `ThemeContext` toggles the `dark` class on `<html>`.
  Always provide readable styles in both modes via semantic tokens (no fixed text colors).

## 6. Component library (always reuse these)

Located in `client/src/components/ui/` — shadcn-style, all consuming the tokens:

`Button` (variants: default/destructive/outline/secondary/ghost/link/success/warning;
sizes: default/sm/lg/icon; supports `asChild`), `Card` + subcomponents, `Badge`,
`Input`, `Textarea`, `Label`, `Select`, `DropdownMenu`, `Dialog`, `Tabs`, `Avatar`,
`Separator`, `Tooltip`, `ScrollArea`, `Table`, `Skeleton`.

- Import path: `../../components/ui/<name>` and helper `import { cn } from '../../lib/utils'`.
- Icons: `lucide-react` (already a dependency). Semi-design (`@douyinfe/semi-ui`) is
  available but use it ONLY inside admin/dashboard screens when a rich component
  (Tree, DatePicker, Descriptions) is genuinely needed — keep the storefront on shadcn.
- Admin pages: use `client/src/components/layout/DashboardLayout.js`
  (props: `nav`, `pathname`, `title`, `subtitle`, `user`, `onLogout`, `children`).

## 7. Hard rules for every UI change

1. Use semantic classes; no hex/rgb colors inline except brand-only gradients.
2. Interactive elements need `focus-visible:ring-2 ring-ring` focus styles.
3. Add `aria-label`/`aria-*` for icon-only controls; `sr-only` for decorative text.
4. Every interactive element must be keyboard-reachable (`asChild` + real `<button>`/`<Link>`).
5. Mobile-first responsive; test at 375px, 768px, 1280px. Use `lg:`/`md:` breakpoints.
6. Respect `prefers-reduced-motion` (already handled globally in `index.css`).
7. Run `npm.cmd run build` after changes and visually verify key pages
   (Home, products, dashboard) with Playwright MCP screenshots.

## 8. Verification workflow

- Build: `npm.cmd run build` from `client/` (Next.js; lint is ignored during build).
- Visual review: with the Playwright MCP server running (`opencode.json` configures
  `npx -y @playwright/mcp@latest`), take screenshots at the breakpoints above in
  both light/dark and RTL/LTR modes and compare against the token table.
