JBC V14 — EXTRA LARGE CENTER PHOTO + REAL SHARE LINKS

This package preserves the V14 roulette and adds a Share Wheel flow backed by Netlify Functions + Netlify Blobs. The entries, settings, center photo and background image are stored on your Netlify site. Recipients only need to open the generated URL; they do not need a Netlify account or an app install.

IMPORTANT: Do NOT use the old one-file drag-and-drop deployment for this package. Netlify Functions must be deployed with the project build/CLI or a connected Git repository. The easiest no-code path is to upload this package's files to a GitHub repository, then connect that repository to your existing Netlify site. Netlify docs: https://docs.netlify.com/deploy/create-deploys/ and https://docs.netlify.com/build/functions/get-started/

Files:
- index.html: V14 app with Share Wheel modal
- netlify/functions/wheel.mjs: API to save/read shared wheels
- netlify.toml: Netlify build/function settings
- package.json: Netlify Blobs dependency

Security note: anyone with a share link can view its entries and images and can spin a local copy. Do not share confidential lists. Links do not currently expire automatically.
