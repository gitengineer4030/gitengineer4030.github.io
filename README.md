# Abdul Waheed — Software Engineer Portfolio

A responsive, single-page portfolio built with HTML, CSS and vanilla JavaScript. No build step, no frameworks and no paid services. It works as a static site on GitHub Pages.

## Files

```
├── index.html              Page content (all sections)
├── styles.css              Styling and responsive layout
├── script.js               Mobile menu, scroll animations, contact form
├── assets/
│   ├── profile.png         Profile photo (from the original CV)
│   └── favicon.svg         Site icon
├── Abdul_Waheed_CV.pdf     Original CV (used by every Download CV button)
├── .nojekyll               Tells GitHub Pages to serve files as they are
└── README.md
```

## Run locally

Double-click `index.html`, or start a local server from this folder:

```bash
python -m http.server 8000
```

Then open http://localhost:8000.

## Deploy on GitHub Pages (free)

1. Create a public repository. Use `gitengineer4030.github.io` for a root site, or any name such as `abdul-waheed-portfolio` for a project site. Do not overwrite a repository that already contains a live site.
2. Upload every file and folder in this project to the repository root.
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then click **Save**.
5. Wait about a minute. The live link appears at the top of the Pages settings.

## Updating the site later

| To change | Edit |
|---|---|
| Text, projects, experience, skills, education | `index.html` (each section has a comment-like `id`: `about`, `experience`, `projects`, `skills`, `education`, `contact`) |
| Colours, fonts, spacing | `styles.css` |
| Contact email, phone, WhatsApp | `index.html` contact section, and `CONTACT_EMAIL` at the top of `script.js` |
| CV | Replace `Abdul_Waheed_CV.pdf` with a new file **using the same name** |
| Profile photo | Replace `assets/profile.png` (portrait, about 251 × 323 px or larger) |

Commit and push the changes. GitHub Pages republishes automatically within a few minutes.

## Notes

- The contact form has no server. "Send via Gmail" opens a new Gmail compose window in the browser, and "Open in Email App" opens the device's default mail app. No fake "sent" message is shown.
- Google Fonts (DM Sans and Manrope) load from the internet. If a visitor is offline, the page falls back to the system font.
- To get rich link previews on social media, add an absolute `og:image` URL to `index.html` after the site is live.
