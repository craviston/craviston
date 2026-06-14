# Craviston Cloud Kitchen - Developer Context & Architecture

Welcome to the Craviston project. This document provides a complete guide to the codebase structure, individual file responsibilities, tech stack, and configurations to facilitate rapid onboarding and development.

---

## 🏗️ Technical Stack & Architecture

Craviston is a modern, high-performance web app for a cloud kitchen specializing in waffles and sandwiches.

*   **Frontend Framework**: [Next.js 15.5.9](https://nextjs.org/) (App Router layout, configured for static HTML export)
*   **Rendering & Language**: [React 19](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/)
*   **Styling & Design System**: [Tailwind CSS 3.4](https://tailwindcss.com/) with standard CSS variables defining a custom theme (Burnt Orange, Peach Cream background, Deep Mocha text)
*   **AI Integration**: [Google Genkit v1.28](https://firebase.google.com/docs/genkit) powered by `googleai/gemini-2.5-flash` for personalized food recommendations
*   **UI Components**: [Shadcn UI](https://ui.shadcn.com/) (Radix primitives, Lucide Icons, and Framer-friendly styling)
*   **Hosting Target**: Firebase App Hosting (configured via `apphosting.yaml`)

---

## 📂 Codebase File & Folder Structure

Below is the directory breakdown with a summary of what each file is doing.

### 📁 Root Configuration Files
These files govern the compilation, compilation options, styles, and environments of the project.

*   [`package.json`](file:///d:/Avinash/Cloud%20Kitchen/Website/Craviston%203/package.json): Defines app metadata, Node dependencies, and operational scripts:
    *   `npm run dev`: Starts the Next.js dev server on port `9002` with Turbopack.
    *   `npm run genkit:dev`: Starts Genkit's AI developer playground.
    *   `npm run build`: Generates the static production build.
*   [`next.config.ts`](file:///d:/Avinash/Cloud%20Kitchen/Website/Craviston%203/next.config.ts): Next.js configuration. It enforces static export (`output: 'export'`), bypasses linting/typechecking during rapid deployment builds, disables image optimization (needed for static output), and permits external image fetching from `picsum.photos`, `placehold.co`, and `unsplash.com`.
*   [`tailwind.config.ts`](file:///d:/Avinash/Cloud%20Kitchen/Website/Craviston%203/tailwind.config.ts): Tailors the Tailwind CSS system. Customizes fonts (`Bebas Neue` for high-impact headlines and `Nunito` for clean body text) and theme colors (mapping HSL color tokens to theme classes, and introducing a custom red color for Zomato buttons).
*   [`apphosting.yaml`](file:///d:/Avinash/Cloud%20Kitchen/Website/Craviston%203/apphosting.yaml): Firebase App Hosting backend configuration limit specifications (`maxInstances: 1`).
*   [`components.json`](file:///d:/Avinash/Cloud%20Kitchen/Website/Craviston%203/components.json): Configuration settings for Shadcn UI components initialization.
*   [`.env`](file:///d:/Avinash/Cloud%20Kitchen/Website/Craviston%203/.env): Local environment file holding credentials like `GOOGLE_GENAI_API_KEY` for accessing Gemini APIs.
*   [`.vscode/tasks.json`](file:///d:/Avinash/Cloud%20Kitchen/Website/Craviston%203/.vscode/tasks.json): Visual Studio Code integration that allows launching the built-in browser referencing the port `9002` local address.

---

### 📁 Application Code (`src/`)

All source code is nested within the `src` directory.

#### 🧠 Genkit AI Pipeline (`src/ai/`)
Sets up local flow runtimes and connects the UI with Gemini-powered logic.

*   [`src/ai/genkit.ts`](file:///d:/Avinash/Cloud%20Kitchen/Website/Craviston%203/src/ai/genkit.ts): Instantiates the Genkit instance using the Google AI plugin and configures the default model to `googleai/gemini-2.5-flash`.
*   [`src/ai/dev.ts`](file:///d:/Avinash/Cloud%20Kitchen/Website/Craviston%203/src/ai/dev.ts): Dev file loading environment variables and registering the crave-match flow locally.
*   [`src/ai/flows/crave-match.ts`](file:///d:/Avinash/Cloud%20Kitchen/Website/Craviston%203/src/ai/flows/crave-match.ts): Define the schemas and Genkit flow for the **CraveMatch AI** tool.
    *   **Input Schema**: Mood (string) and Flavor Preferences (string).
    *   **Output Schema**: Recommended Item (Name, type Waffle), reasoning, and suggested beverage pairing.
    *   **System Prompt**: Evaluates user mood and menu items (Creamy Milk Chocolate, Dark Chocolate Loaded, Honey Butter Delight, Oreo Crunch Blast, etc.) to determine the best suggestion.

#### 🌐 Next.js App Shell (`src/app/`)
*   [`src/app/layout.tsx`](file:///d:/Avinash/Cloud%20Kitchen/Website/Craviston%203/src/app/layout.tsx): Top-level layout. Prefetches Google Fonts (Bebas Neue, Pacifico, Nunito) and wraps children with global styling parameters. Defines initial page metadata.
*   [`src/app/page.tsx`](file:///d:/Avinash/Cloud%20Kitchen/Website/Craviston%203/src/app/page.tsx): Main homepage. Loads scroll reveal triggers and structures sections sequentially (Navigation ➔ Hero ➔ Ticker ➔ Menu ➔ About ➔ Why Us ➔ Order CTA ➔ Footer).
*   [`src/app/globals.css`](file:///d:/Avinash/Cloud%20Kitchen/Website/Craviston%203/src/app/globals.css): Sets base tailwind rules, global HSL color themes (light/dark mode colors), scroll-reveal transitions, moving ticker keyframes, and full-bleed brand watermark utility classes.

#### 🧩 Custom React Components (`src/components/`)
*   [`src/components/Navigation.tsx`](file:///d:/Avinash/Cloud%20Kitchen/Website/Craviston%203/src/components/Navigation.tsx): Sticky navigation bar. Adapts styles and background on scroll. Houses page anchors, mobile sheet drawer trigger, and a primary CTA linking to the Zomato store page.
*   [`src/components/Logo.tsx`](file:///d:/Avinash/Cloud%20Kitchen/Website/Craviston%203/src/components/Logo.tsx): Renders the brand logo (`public/logo.png`). Implements an intelligent CSS brightness/invert filter to guarantee high contrast visibility against both light cream and dark brown backgrounds on scroll.
*   [`src/components/Hero.tsx`](file:///d:/Avinash/Cloud%20Kitchen/Website/Craviston%203/src/components/Hero.tsx): Entry banner with high-impact typography (`CRAVE. SATISFY. REPEAT.`), direct order CTAs, and trust badges showing rating stars and average delivery speed.
*   [`src/components/Ticker.tsx`](file:///d:/Avinash/Cloud%20Kitchen/Website/Craviston%203/src/components/Ticker.tsx): Full-bleed animated horizontal sliding bar displaying brand messages.
*   [`src/components/Menu.tsx`](file:///d:/Avinash/Cloud%20Kitchen/Website/Craviston%203/src/components/Menu.tsx): Fully filterable menu showcasing Waffles. Tracks active category filters dynamically and updates rendering accordingly.
*   [`src/components/CraveMatchAI.tsx`](file:///d:/Avinash/Cloud%20Kitchen/Website/Craviston%203/src/components/CraveMatchAI.tsx): Custom user interaction window for the CraveMatch AI helper. Collects text inputs (mood and flavor preference), runs the server action wrapper for the Genkit flow, shows beautiful custom loading/spinning indicators, and renders structured recommendations.
*   [`src/components/About.tsx`](file:///d:/Avinash/Cloud%20Kitchen/Website/Craviston%203/src/components/About.tsx): Brand section emphasizing Craviston's cloud-kitchen nature (made-to-order, delivery focus, rich ingredients).
*   [`src/components/WhyUs.tsx`](file:///d:/Avinash/Cloud%20Kitchen/Website/Craviston%203/src/components/WhyUs.tsx): Features grid describing delivery quality, packaging, freshness, and high customer review scores.
*   [`src/components/OrderCTA.tsx`](file:///d:/Avinash/Cloud%20Kitchen/Website/Craviston%203/src/components/OrderCTA.tsx): Large conversion section with bold header design and primary Zomato action buttons.
*   [`src/components/Footer.tsx`](file:///d:/Avinash/Cloud%20Kitchen/Website/Craviston%203/src/components/Footer.tsx): Ending block containing links, Instagram/Facebook social media icons, copyright stamps, and Zomato storefront redirects.
*   📁 [`src/components/ui/`](file:///d:/Avinash/Cloud%20Kitchen/Website/Craviston%203/src/components/ui): Reusable shadcn UI structural components generated via CLI:
    *   Buttons, Inputs, Cards, Sheets, Badges, Tabs, Sliders, Accordions, Dialogs, Dropdowns, Forms, Toast alerts, charts, etc.

#### 🪝 Custom Hooks (`src/hooks/`)
*   [`src/hooks/use-reveal.tsx`](file:///d:/Avinash/Cloud%20Kitchen/Website/Craviston%203/src/hooks/use-reveal.tsx): Uses `IntersectionObserver` coupled with `MutationObserver` (to account for elements swapping during menu sorting) to animate items as they scroll into the viewport.
*   [`src/hooks/use-mobile.tsx`](file:///d:/Avinash/Cloud%20Kitchen/Website/Craviston%203/src/hooks/use-mobile.tsx): Detects viewport transitions and updates state to determine if device-specific layout adjustments are needed.
*   [`src/hooks/use-toast.ts`](file:///d:/Avinash/Cloud%20Kitchen/Website/Craviston%203/src/hooks/use-toast.ts): Handles displaying simple on-screen overlay messages.

#### 📦 Shared Library Utilities (`src/lib/`)
*   [`src/lib/placeholder-images.ts` & `.json`](file:///d:/Avinash/Cloud%20Kitchen/Website/Craviston%203/src/lib/placeholder-images.json): Provides metadata descriptions and file paths for the waffles menu.
*   [`src/lib/utils.ts`](file:///d:/Avinash/Cloud%20Kitchen/Website/Craviston%203/src/lib/utils.ts): Contains the `cn` helper (combining `clsx` and `tailwind-merge` class concatenations).

---

### 📁 Design Documentation (`docs/`)
*   [`docs/blueprint.md`](file:///d:/Avinash/Cloud%20Kitchen/Website/Craviston%203/docs/blueprint.md): Houses guidelines on branding style definitions (Color hex keys: Peach Cream `#F8E9D4`, Deep Mocha `#432E27`, Burnt Orange `#D44D25`, Zomato signature red `#E23744`), visual style guidelines (watermarks, typography rules), and target specs.

---

## 🚀 Key Workflows

### AI Flavor Recommendation Flow (CraveMatch AI)
1. User enters text describing their vibe/mood (e.g. `Gloomy`) and flavor desires (e.g. `Rich and sweet`) into inputs in [`CraveMatchAI.tsx`](file:///d:/Avinash/Cloud%20Kitchen/Website/Craviston%203/src/components/CraveMatchAI.tsx).
2. The click action triggers the asynchronous server action wrapper `craveMatch` imported from [`src/ai/flows/crave-match.ts`](file:///d:/Avinash/Cloud%20Kitchen/Website/Craviston%203/src/ai/flows/crave-match.ts).
3. The flow invokes the Genkit runtime, which executes `craveMatchPrompt` with `googleai/gemini-2.5-flash` model mapping the input schema variables.
4. Gemini returns the structured JSON output conforming to the predefined schemas.
5. The UI renders the result showing the item recommendation details, pairing tip, and a conversion button pointing to the store's Zomato portal.

### Visual Scroll Animation Flow
1. Static components add the class `.reveal-on-scroll` to elements they want to slide in when viewed.
2. The [`useReveal`](file:///d:/Avinash/Cloud%20Kitchen/Website/Craviston%203/src/hooks/use-reveal.tsx) hook binds an `IntersectionObserver` checking when those items cross the threshold of visibility.
3. If an item crosses the viewport threshold, the class `.active` is appended, causing it to smoothly slide up and fade in using styles defined in [`globals.css`](file:///d:/Avinash/Cloud%20Kitchen/Website/Craviston%203/src/app/globals.css).
4. Dynamically rendered elements (like menu options updating as tabs change) are tracked by a secondary `MutationObserver` inside the hook to ensure they are observed properly.
