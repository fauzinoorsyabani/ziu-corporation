# Ziu Corporation Website

> **A premium, motion-led portfolio website for Ziu Corporation and its independent ventures.** The design system is called **Quiet Constellation**: an obsidian editorial canvas, porcelain typography, a small orbit mark, and Ziu Signal Lime used as the parent-company cue.

The live Vercel project is available at [ziu-corporation.vercel.app](https://ziu-corporation.vercel.app). The source repository is public at [fauzinoorsyabani/ziu-corporation](https://github.com/fauzinoorsyabani/ziu-corporation).

## 1. What this project contains

This is a client-first corporate portfolio site. It introduces Ziu Corporation as the parent brand, shows the seven-venture portfolio, provides a focused detail panel for each venture, presents a visual archive, and ends with a partnership-oriented call to action. It does not currently include a CMS, user authentication, payment flow, database, or form-submission backend.

| Area | Current behavior | Main source location |
|---|---|---|
| Global experience | Sticky navigation, responsive mobile menu, dark editorial layout, scroll navigation, and toast-based placeholder contact actions | `client/src/pages/Home.tsx` |
| Portfolio | Category filters, moving venture rail, selected venture detail state, and archive cards | `client/src/pages/Home.tsx` |
| Motion system | Framer Motion entrances plus CSS orbit, ticker, and hover animation | `client/src/pages/Home.tsx`, `client/src/index.css` |
| Brand identity | Segmented orbit symbol, ZIU wordmark treatment, and signal color | `client/src/components/ZiuMark.tsx`, `client/src/index.css` |
| Global styles | Theme tokens, typography, responsive breakpoints, reduced-motion support, and component-level visual rules | `client/src/index.css` |
| Deployment | Static Vite build output with Vercel fallback routing | `vercel.json`, `vite.config.ts` |

## 2. Technology stack

| Layer | Technology | Why it is used |
|---|---|---|
| UI runtime | React 19 with TypeScript | Component rendering, typed data, and client-side state. [1] [2] |
| Build tooling | Vite 7 | Fast local development server and static production build. [3] |
| Styling | Tailwind CSS 4 plus handcrafted CSS | Theme tokens and utility support sit alongside the bespoke Quiet Constellation visual system. [4] |
| Motion | Framer Motion | Initial section reveals and animated UI state transitions. [5] |
| Routing | Wouter | Lightweight client-side route handling for the main and fallback pages. [6] |
| Icons | Lucide React | Consistent SVG icons for navigation, calls to action, and interface states. [7] |
| Notifications | Sonner | Non-blocking feedback for placeholder actions such as the contact CTA. [8] |
| Hosting | Vercel and Manus | Vercel serves the Git-connected public deployment; Manus remains the managed authoring and preview environment. [9] |

## 3. Project structure

```text
ziu-corporation/
├── client/
│   ├── index.html                 # Document metadata, font loading, and analytics script
│   └── src/
│       ├── App.tsx                # Theme, router, toaster, and error boundary shell
│       ├── index.css              # Global tokens, layout, responsive rules, motion, and components
│       ├── pages/
│       │   ├── Home.tsx           # Complete landing page and venture data model
│       │   └── NotFound.tsx       # Fallback route
│       └── components/
│           ├── ZiuMark.tsx        # Parent-brand orbit mark and wordmark
│           └── ui/                # Reusable Radix/shadcn-style primitives from the template
├── server/
│   └── index.ts                   # Static output server used by the managed project runtime
├── shared/                         # Shared template types/constants
├── vite.config.ts                 # Vite root, aliases, plugins, and `dist/public` output directory
├── vercel.json                    # Vercel build/output settings and SPA fallback rewrite
├── package.json                   # Scripts and dependency manifest
└── README.md                      # This guide
```

## 4. Local development

Use a current Node.js release and `pnpm` 10. The lockfile is committed, so use the frozen lockfile command for consistent installs.

```bash
pnpm install --frozen-lockfile
pnpm dev
```

The development server uses port `3000` when available. Open the local URL printed in the terminal after `pnpm dev` starts.

| Command | Purpose |
|---|---|
| `pnpm dev` | Start the Vite development server with host access enabled. |
| `pnpm check` | Run TypeScript validation without emitting build files. |
| `pnpm build` | Generate the Vite static site in `dist/public` and bundle the runtime server. |
| `pnpm start` | Serve the already-built output through the provided Node/Express static server. |
| `pnpm preview` | Preview the Vite production bundle locally. |
| `pnpm format` | Apply the repository Prettier configuration. |

Before opening a pull request or pushing a significant change, run the following sequence:

```bash
pnpm check
pnpm build
```

## 5. Editing the content

### Venture portfolio

The `ventures` array at the top of `client/src/pages/Home.tsx` is the single source of truth for the current portfolio. Each record controls the display name, category, numbered marker, accent color, public image URL, short summary, and archive note. Add, remove, or change a venture there before adjusting the visual layout.

```ts
{
  id: "venture-slug",
  name: "Venture Name",
  descriptor: "Category / short description",
  category: "Commerce", // or "Digital" / "Food"
  number: "07",
  accent: "#D6FF1F",
  image: "https://public-cdn.example.com/venture-image.png",
  summary: "A short positioning statement.",
  note: "A concise archive or source note."
}
```

If a new category is introduced, update both the `Venture` type and the `filters` constant. The portfolio rail and archive will then inherit the new record automatically.

### Text and calls to action

The hero, corporate statements, approach section, archive introduction, and footer are all in `Home.tsx`. The site presently uses a toast for the partnership call to action because no official contact endpoint has been configured. Once a public business email, WhatsApp number, or contact form service is ready, replace `showContactToast` with the intended link or submission flow.

### Brand and visual system

Use `client/src/index.css` for color, type scale, spacing, responsive behavior, animation duration, and blur treatment. The parent visual system should continue to prioritize **obsidian**, **porcelain**, fine rules, coordinate labels, the orbit mark, and the rare `#D6FF1F` signal.

The SVG-based orbit mark is defined in `client/src/components/ZiuMark.tsx`. Replace this component with an official logo only when a final brand asset is approved; avoid embedding a large logo image directly in the page.

## 6. Images and asset policy

The venture screenshots are referenced through public CDN URLs so the same assets load on Vercel, GitHub previews, and the managed site. Do not copy large screenshots into `client/public` or `client/src/assets`; doing so can slow build and deployment workflows.

For a replacement image, upload the original to a durable public CDN or storage service, verify that the final URL is reachable without login, then update the relevant `image` value in the `ventures` array. Keep an original archival copy outside the repository if the file is large.

## 7. Deployment guide

### Vercel

The repository is linked to a Vercel project named `ziu-corporation`. Vercel is configured through `vercel.json` to install dependencies with the lockfile, run `pnpm build`, publish `dist/public`, and route unknown client paths to `index.html` for the single-page application. This follows Vite static deployment conventions. [3] [9]

| Vercel setting | Value |
|---|---|
| Repository | `fauzinoorsyabani/ziu-corporation` |
| Framework | Vite |
| Install command | `pnpm install --frozen-lockfile` |
| Build command | `pnpm build` |
| Output directory | `dist/public` |
| Public access | Vercel Authentication disabled for this project |

After a push to the `main` branch, verify the new deployment in the Vercel project dashboard. Add a custom domain from the project’s **Settings → Domains** panel, then follow the displayed DNS instructions at the domain registrar. Do not delete the project’s default Vercel domain until the custom domain has resolved successfully.

### Manus

The Manus-managed version is published from a saved checkpoint and uses the Manus project domain. Keep this option when you want the managed preview, visual editor, and checkpoint history. The Vercel deployment is useful when GitHub-driven delivery, Vercel domains, or Vercel analytics are preferred.

## 8. Accessibility and motion behavior

The site keeps keyboard-focusable buttons, semantic headings, visible focus rings, accessible image text, and a reduced-motion override. Rich motion should remain decorative: users must still be able to read and navigate all content when `prefers-reduced-motion` is enabled.

The portfolio rail may pause when a venture is hovered or focused, allowing the visitor to inspect and select a card. The small top signal tickers are intentionally continuous and use a blur/mask at their left and right edges to create a soft entrance and exit.

## 9. Operational checklist before a public launch

1. Replace provisional company descriptions with approved Ziu Corporation copy.
2. Confirm the legal business names, social URLs, contact address, and any regulated service claims for every venture.
3. Replace the placeholder partnership notification with a verified contact route.
4. Run `pnpm check` and `pnpm build`, then inspect desktop and mobile views.
5. Confirm the Vercel production URL and custom domain both return the expected page without sign-in.

## References

[1]: https://react.dev/ "React documentation"
[2]: https://www.typescriptlang.org/docs/ "TypeScript documentation"
[3]: https://vite.dev/guide/ "Vite guide"
[4]: https://tailwindcss.com/docs "Tailwind CSS documentation"
[5]: https://www.framer.com/motion/ "Framer Motion documentation"
[6]: https://github.com/molefrog/wouter "Wouter repository and documentation"
[7]: https://lucide.dev/guide/packages/lucide-react "Lucide React guide"
[8]: https://sonner.emilkowal.ski/ "Sonner documentation"
[9]: https://vercel.com/docs "Vercel documentation"
