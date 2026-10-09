# Oleksii Chahinian — Portfolio

Personal portfolio of a full-stack developer specializing in PHP. The website presents web and mobile projects, technical skills, professional experience, and contact information.

The interface is available in French and English. Code, file names, and technical documentation are written in English.

## Features

- Home page with featured projects and a downloadable CV.
- Project list with category filters and individual project pages.
- Screenshot gallery with an enlarged preview dialog.
- Stack and profile page with skills and professional experience.
- Contact form powered by Formspree, plus direct email and social links.
- Light and dark themes, with a saved preference and an initial system theme.
- French and English translations, with a saved language preference.
- Route-based page titles and descriptions, a custom 404 page, and a custom SVG favicon.

Project screenshots, years, and external links are still being completed.

## Tech stack

- Vue 3 and JavaScript
- Vite
- Vue Router
- Vue I18n
- Sass / SCSS
- Lucide icons and local SVG technology logos
- Fontsource fonts: IBM Plex Sans, JetBrains Mono, and Space Grotesk
- Formspree
- ESLint, Oxlint, and Prettier

## Requirements

- Node.js `22.18.0` or later within the `22.x` series, or Node.js `24.12.0` or later, as specified in `package.json`.
- npm

Run the following commands from the project root, where `package.json` is located.

## Local setup

Install the dependencies using the committed lockfile:

```sh
npm ci
```

For a new setup, copy `.env.example` to `.env.local` in the project root. In PowerShell:

```powershell
Copy-Item .env.example .env.local
```

If `.env.local` already exists, keep it and update the value there. Set the following variable to enable contact form submissions:

```dotenv
VITE_FORMSPREE_FORM_ID=your_form_id
```

Replace `your_form_id` with the form ID from the Formspree dashboard. Use only the ID, not the full endpoint URL or an email address. The application constructs the endpoint as `https://formspree.io/f/<form_id>`.

Start the development server:

```sh
npm run dev
```

Open the local URL printed in the terminal. Restart the development server after changing `.env.local`.

The website can run without a form ID, but the contact form cannot send messages. Direct email links remain available. The recipient address for form submissions is configured in Formspree; direct email and social links are configured in `src/data/contact.js`.

`.env.local` is ignored by Git. Variables prefixed with `VITE_` are included in the browser bundle, so they must contain public configuration only. See [Vite environment variables](https://vite.dev/guide/env-and-mode.html).

## Commands

| Command           | Purpose                                              |
| ----------------- | ---------------------------------------------------- |
| `npm run dev`     | Start the development server.                        |
| `npm run build`   | Build the production website into`dist/`.            |
| `npm run preview` | Preview the production build locally after building. |
| `npm run lint`    | Run Oxlint and ESLint with automatic fixes.          |
| `npm run format`  | Format files in`src/` with Prettier.                 |

The lint and format commands can modify source files. Review their changes before committing.

## Project structure

```text
public/                 Static files: CV, favicon, social preview, screenshots
src/
  assets/               Imported icons and other assets
  components/           Reusable interface components
  composables/          Shared Vue logic: theme, projects, page metadata
  data/                 Project, skills, profile, and contact data
  i18n/
    locales/            French and English translations
  router/               Routes and navigation behavior
  services/             Contact form validation and submission
  styles/               Global styles and theme variables
  views/                Page components
  App.vue               Application layout
  main.js               Application initialization
index.html              HTML entry point and default metadata
vite.config.js          Vite configuration and the @ alias for src/
```

## Updating content

| Content                                                       | Location                                                  |
| ------------------------------------------------------------- | --------------------------------------------------------- |
| Projects, technologies, years, demo/source links, screenshots | `src/data/projects.js`                                    |
| Skill groups                                                  | `src/data/skills.js`                                      |
| Profile facts and experience entries                          | `src/data/profile.js`                                     |
| Email and social links                                        | `src/data/contact.js`                                     |
| User-facing text                                              | `src/i18n/locales/fr.json` and `src/i18n/locales/en.json` |
| Downloadable CV                                               | `public/cv_oleksii_chahinian.pdf`                         |
| Browser icon                                                  | `public/favicon.svg`                                      |
| Social preview image                                          | `public/og_image.png`                                     |

Project text is resolved through translation keys. Update both locale files when adding or changing translated content.

To add project screenshots, place the images under `public/images/` and add entries to the project's `screenshots` array. Each entry uses `src`, `alt`, and an optional `caption`. Set `src` to a path relative to `public/`, such as `images/projects/ecommerce/overview.png`. Keep years and demo/source links as `null` when they are unavailable.

## Deployment

The production output is a static single-page application. Typical hosting settings are:

| Setting                    | Value                    |
| -------------------------- | ------------------------ |
| Build command              | `npm run build`          |
| Output directory           | `dist`                   |
| Build environment variable | `VITE_FORMSPREE_FORM_ID` |

Configure the form ID in the hosting provider's build environment before building. Changing it requires a new build. Local `.env.local` settings are not automatically transferred to the hosting provider.

The router uses HTML5 history mode. Configure the host to serve `index.html` for application routes such as `/projects`, `/skills`, and `/contact`, while serving existing static files normally. This is needed for direct visits and page refreshes. See [Vue Router history mode](https://router.vuejs.org/guide/essentials/history-mode.html).

If hosting under a subdirectory, configure Vite's `base` option and check asset paths. `npm run preview` is for local verification, not a production server. See [Vite static deployment](https://vite.dev/guide/static-deploy.html).

After obtaining the public site URL:

1. Add `og:url` and an absolute HTTPS `og:image` URL in `index.html`. The current Open Graph metadata is prepared but does not yet include these URLs.
2. Confirm that `og_image.png` and the CV are publicly accessible.
3. Test direct visits and refreshes on application routes and check the 404 page.
4. Verify language switching, themes, keyboard navigation, and mobile layouts.
5. Send a contact form test and confirm delivery through Formspree.
6. Check the shared-link preview on the services where the portfolio will be shared.
