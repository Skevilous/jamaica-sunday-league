# Project Instructions

This repo is the live Jamaica Sunday League static site.

When updating league data:
- Edit the hardcoded data in `script.js`.
- If the visible data changes, bump the cache version on the script tag in `index.html`, for example `script.js?v=YYYYMMDD-weekN`.
- Run a local render/data check to confirm the latest week, standings, results, and scorers are correct.
- Commit the change with a clear `data:` or `fix:` message.
- Push to both live branches:
  - `git push origin master`
  - `git push origin master:gh-pages`
- Verify the `gh-pages` branch contains the updated data.

Do not stop after editing locally. The user expects every league update to be pushed live unless they explicitly say not to.
