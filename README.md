# PatternFly playground

A React playground for exploring, comparing, and reviewing PatternFly 6 components and interactions. Each experiment has its own page and proposal versions, with direct links that can be shared for review.

Experiments are prototypes used to discuss UX and implementation feasibility. A working demo does not indicate product approval or production readiness.

- [Review an experiment](#review-an-experiment)
- [Run locally](#run-locally)
- [Project structure](#project-structure)
- [Create an experiment](#create-an-experiment)
- [Work with PatternFly](#work-with-patternfly)
- [Versions and shared links](#versions-and-shared-links)
- [Validate changes](#validate-changes)
- [Publish to GitHub Pages](#publish-to-github-pages)
- [Troubleshooting](#troubleshooting)

## Review an experiment

Open the full link supplied for the experiment. No local installation is needed to view a published demo. The page identifies the experiment and proposal version; **All experiments** returns to the catalog.

When providing feedback, include the full URL and the steps or state involved. A version link identifies the proposal code. It does not automatically restore your input, selection, or other session state; an experiment must explicitly implement URL parameters if that behavior is needed.

The expected published URL format is:

```text
https://carrozzo-lc.github.io/patternfly-playground/#/experiments/<slug>/<version>
```

These URLs become available after deployment and registration of the corresponding experiments. An empty catalog means no experiments have been registered yet.

## Run locally

### Requirements

- Node.js **24** (recorded in [`.nvmrc`](.nvmrc)).
- npm **11**.

If you use nvm, run `nvm use` in the repository. Otherwise, install the required Node version using your preferred method. Check the environment with `node --version` and `npm --version`.

### First setup

```sh
git clone https://github.com/carrozzo-lc/patternfly-playground.git
cd patternfly-playground
npm ci
npm run dev
```

If the repository is already cloned, start from its folder. Open:

**<http://127.0.0.1:5173/patternfly-playground/>**

### Daily use

Run `npm run dev` from the repository. Keep that terminal open while working; Vite updates the page as you save source files. Press **Ctrl+C** in that terminal to stop the server.

Run `npm ci` again after pulling changes to `package.json` or `package-lock.json`. It installs the versions recorded in the lockfile. Dependencies are pinned and [`.npmrc`](.npmrc) makes newly saved dependency versions exact.

## Project structure

```text
src/
  app/
    AppLayout.tsx              # Shared PF6 masthead, navigation, and page layout
    ExperimentPage.tsx         # Demo title, version, loading and error handling
    experiments.ts             # Experiment registry and URL helper
    routes.tsx                 # Routes generated from the registry
    pages/                     # Catalog, About, and not-found pages
  main.tsx                     # React entry point, HashRouter, global PF6 styles
  styles.css                   # Application-level sizing

tests/                         # Playwright browser checks
.github/workflows/pages.yml    # Validation and GitHub Pages deployment
```

Each experiment adds its own directory. For example:

```text
src/experiments/
  example-pattern/
    v1/
      Experiment.tsx
      demo-data.ts
      components/
        ExampleControl.tsx
        ExampleControl.module.css
    v2/
      Experiment.tsx
      ...
```

Create only the files a demo needs. `Experiment.tsx` composes the demo and connects its state and data. The experiment's own controls live in `components/`; they use the official PF6 components installed in `node_modules/`. Experiment-specific data and styles stay with that proposal version.

Keep unrelated experiments independent. Extract shared code when there is a concrete reuse need, taking care that changes to shared code also affect earlier proposals.

## Create an experiment

### 1. Add the entry component

Create `src/experiments/example-pattern/v1/Experiment.tsx` with a default export. A minimal example is:

```tsx
import { useState } from 'react'
import { Button } from '@patternfly/react-core'

export default function Experiment() {
  const [count, setCount] = useState(0)

  return (
    <Button onClick={() => setCount((value) => value + 1)}>
      Clicks: {count}
    </Button>
  )
}
```

The shared experiment page already provides the main heading, description, and version. Add the actual demo content inside this component. Move controls into the version's `components/` folder as the example grows.

### 2. Register it

Add an entry to the `experiments` array in [`src/app/experiments.ts`](src/app/experiments.ts). For the first entry, replace the empty array:

```ts
export const experiments: readonly ExperimentDefinition[] = [
  {
    slug: 'example-pattern',
    title: 'Example pattern',
    description: 'The interaction being explored.',
    versions: [
      {
        id: 'v1',
        load: () => import('../experiments/example-pattern/v1/Experiment'),
      },
    ],
  },
]
```

Use unique lowercase slugs and version IDs without spaces or slashes. The registry supplies both the home catalog and routes; **no separate route edit is needed**. The component is loaded when its page is opened.

### 3. Open and check it

With the dev server running, open:

```text
http://127.0.0.1:5173/patternfly-playground/#/experiments/example-pattern/v1
```

Check the direct link, refresh, and catalog entry as well as the interaction itself. Use generic content and fictional data. Public repository files and demos must not contain proprietary assets, product data, or private reference links.

## Work with PatternFly

PatternFly is installed once for the application. All experiments share the pinned PF6 version in [`package.json`](package.json) and [`package-lock.json`](package-lock.json). The About page displays the configured PF6 and React versions.

[`src/main.tsx`](src/main.tsx) imports the official base styles once:

```ts
import '@patternfly/react-core/dist/styles/base.css'
```

Component styles are brought in by the React package. Avoid adding the standalone PatternFly HTML/CSS stylesheet on top of this setup, which can duplicate styles. See the [official installation and styling guidance](https://www.patternfly.org/get-started/develop/).

Use this order when developing a proposal:

1. **Start with the official component.** Confirm its standard behavior and the APIs available in the installed PF6 release.
2. **Configure supported props.** Use documented variants, labels, selected values, disabled states, and callbacks before adding styling or replacement behavior.
3. **Compose components when needed.** A local component can combine PF6 controls and coordinate their state. Keep their semantics and keyboard behavior intact.
4. **Add scoped styling where justified.** Use a CSS Module passed through `className`. Prefer documented component CSS variables and PF6 design tokens for spacing, color, typography, and other styling decisions.
5. **Check the result.** Verify focus visibility, keyboard operation, accessible names, relevant states, and responsive behavior after a customization.

Do not modify files inside `node_modules/`; an installation would replace those changes. Keep application-wide CSS small and put experiment styling beside its component. Avoid broad global overrides such as changing every `.pf-v6-c-button`. CSS Modules scope local class names, but explicitly global selectors still require care.

Document meaningful customizations near the component: the requirement, the PF6 components or variables involved, and any dependency on internal markup. Distinguish standard PF6 behavior from local composition and styling in review notes.

## Versions and shared links

Proposal versions (`v1`, `v2`) describe iterations of an experiment. They are separate from the installed PatternFly version.

- Iterate within a version while it is being developed.
- Keep shared review versions stable. Put a substantially different proposal in a new version folder and add another entry to the experiment's `versions` array.
- Preserve old entries and version IDs so previous links remain available. Keep the rationale for small corrections to a shared version in the commit or PR description.
- Alternatives within one proposal can live in the same version. A direct link to a specific alternative needs explicit URL-state support in that experiment.

Separate folders preserve proposal code, but do not freeze shared dependencies. Updating PF6, the app shell, or shared components can affect earlier demos. Review those updates deliberately and check the affected experiments before publishing. The current project has one PF6 application.

## Validate changes

Install the browser required by the tests once after initial setup, and again if a Playwright upgrade requires a new browser revision:

```sh
npx playwright install chromium
```

Run all checks with:

```sh
npm run check
```

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server on port 5173. |
| `npm run typecheck` | Check application, configuration, and test TypeScript. |
| `npm run lint` | Run the configured lint checks. |
| `npm run build` | Check TypeScript and produce the static site in `dist/`. |
| `npm run preview` | Serve the existing production build on port 4173. |
| `npm run test:e2e` | Run browser checks against the production build. |
| `npm run test:e2e:ui` | Open the interactive browser test runner. |
| `npm run check` | Run lint, build, then browser checks. |

Build first when running browser tests or preview independently:

```sh
npm run build
npm run preview
```

Open **<http://127.0.0.1:4173/patternfly-playground/>**. This checks the compiled site rather than the development server.

The existing tests cover the playground foundation in desktop and mobile Chromium: PF6 styling and the configured font family, hash navigation, direct links, reload, browser history, keyboard focus, unavailable routes, and horizontal overflow. They do not validate future experiment-specific behavior automatically. Add focused tests under `tests/` as interactions are introduced, and manually inspect relevant states and layouts.

## Publish to GitHub Pages

The workflow is configured in [`.github/workflows/pages.yml`](.github/workflows/pages.yml). Configuring the workflow locally does not publish the site.

For initial repository setup, select **Settings → Pages → Build and deployment → Source: GitHub Actions**. This public repository can use GitHub Pages on GitHub Free.

The workflow:

1. Installs locked dependencies with `npm ci`.
2. Runs lint, the TypeScript/build checks, and browser tests.
3. Uploads only the generated `dist/` directory and deploys it when the checks pass.

Pull requests targeting `master` run validation. Pushes to `master` validate and deploy; manual workflow runs can also deploy. Treat a push to `master` as a publication step once Pages is enabled. One deployment updates the entire catalog and all registered experiments.

After deployment, open the published direct link in a fresh tab and reload it before sharing it for review.

The Vite base is `/patternfly-playground/`, configured in [`vite.config.ts`](vite.config.ts). `HashRouter` manages the portion after `#`, allowing direct experiment links on static hosting without server rewrites. If the repository name or hosting path changes, update the Vite base, test URLs, and documentation together.

## Troubleshooting

| Symptom | What to check |
| --- | --- |
| `Port 5173 is already in use` | Another dev server is running. Use its existing page, or stop it with Ctrl+C in its terminal before starting a new one. Ports are intentionally fixed. |
| Preview shows an earlier change | Run `npm run build` again; preview serves `dist/` and does not rebuild source files. |
| A browser test says its executable is missing | Run `npx playwright install chromium`. |
| An experiment link shows “Page not found” | Check the slug, version ID, registry entry, and whether that revision has been deployed. Keep the `#/experiments/...` portion of the link. |
| An experiment fails to load | Check its default export, dynamic import path, and browser error output. Reload after a new deployment if an older page references an outdated chunk. |
| Source looks updated but the public site does not | Check the GitHub Actions run and confirm deployment succeeded. Local changes are not published until committed, pushed, and deployed. |

## References

- [PatternFly development and styling](https://www.patternfly.org/get-started/develop/)
- [PatternFly components](https://www.patternfly.org/components/overview/)
- [React Router HashRouter](https://reactrouter.com/api/declarative-routers/HashRouter)
- [Vite deployment to GitHub Pages](https://vite.dev/guide/static-deploy.html#github-pages)
- [Playwright test runner](https://playwright.dev/docs/intro)
- [GitHub Pages documentation](https://docs.github.com/en/pages)
