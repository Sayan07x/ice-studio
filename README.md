# Ice Studio

A lightweight, responsive website for Ice Studio, a small web studio working with cafes, businesses, independent professionals, and people building something of their own.

## Develop

- Install Node.js 22+ and pnpm 10.
- Run `pnpm install`.
- Run `pnpm dev` and open the local URL printed by Vite (with the `/ice-studio/` path).
- Run `pnpm run build` to type-check and create the static site in `dist/`.

## Publish

GitHub Actions builds and publishes this repository to GitHub Pages on every push to `main`. The Vite base path is configured for this repository.

## Inquiry form

The form validates a project brief and opens a pre-filled email draft addressed to Ice Studio. A visitor must review and send that draft in their own email app; no message is delivered automatically.
