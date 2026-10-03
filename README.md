# MBA Lab ,  Ahmad Tavasolinia

An independent intellectual laboratory exploring business, strategy, finance, technology,
and leadership. Built with Next.js, TypeScript, and Tailwind CSS. Content lives in plain
Markdown files, so new essays and MBA Lab entries can be added without touching any code.

---

## 1. What's inside

```
mba-lab/
├── content/              ← Your writing lives here, as Markdown files
│   ├── lab/              ← MBA Lab entries
│   ├── essays/           ← Essays
│   └── sources/          ← Courses & sources
├── src/
│   ├── app/              ← Pages (Next.js App Router)
│   ├── components/       ← Reusable UI pieces
│   └── lib/              ← Content-loading logic, topic list
├── .github/workflows/    ← Auto-deploy to GitHub Pages
└── public/               ← Static files (add cv.pdf here if you want a downloadable CV)
```

Five sample MBA Lab entries, three sample essays, and four sample sources are already
included so you can see the design with real content. Edit or delete them freely.

---

## 2. Launching the website on GitHub Pages (step by step)

You don't need to know how to code to do this. Just follow the steps in order.

### Step 1 ,  Create a GitHub account and a new repository
1. Go to [github.com](https://github.com) and sign in (or create a free account).
2. Click the **+** icon top-right → **New repository**.
3. Name it anything you like, for example `mba-lab`.
   - If you want your site at `yourusername.github.io` (no extra path), name the
     repository exactly `yourusername.github.io`.
   - Otherwise, any name works and your site will appear at
     `yourusername.github.io/mba-lab` (or whatever you named it).
4. Leave it **Public**. Don't add a README, .gitignore, or license (this project already
   has them). Click **Create repository**.

### Step 2 ,  Upload this project to your new repository
The simplest way, with no command line required:
1. On your new (empty) repository page, click **uploading an existing file**.
2. Drag the entire contents of this project folder into the upload box.
   (Everything inside `mba-lab/` ,  not the outer folder itself.)
3. Scroll down and click **Commit changes**.

If you're comfortable with the command line instead, from inside this folder:
```bash
git init
git add .
git commit -m "Initial commit: MBA Lab website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git push -u origin main
```

### Step 3 ,  Turn on GitHub Pages with GitHub Actions
1. In your repository, click **Settings** (top menu).
2. In the left sidebar, click **Pages**.
3. Under **Build and deployment → Source**, choose **GitHub Actions**.
4. That's it ,  you don't need to configure anything else here.

### Step 4 ,  Let it build
1. Click the **Actions** tab at the top of your repository.
2. You should see a workflow called **Deploy MBA Lab to GitHub Pages** running
   (it starts automatically after you push/upload your files).
3. Wait for it to finish ,  it takes 1–3 minutes. A green checkmark means success.
4. Go back to **Settings → Pages**. Your live URL will be shown at the top of the page,
   for example:
   - `https://yourusername.github.io` (if you named the repo `yourusername.github.io`)
   - `https://yourusername.github.io/mba-lab` (for any other repo name)

Your website is now live. Any time you push new changes, it will automatically rebuild
and redeploy within a couple of minutes.

---

## 3. Adding new content (no coding required)

### Add a new MBA Lab entry
Create a new file in `content/lab/`, named like `your-entry-title.md`, following this
pattern (copy an existing file in that folder as a starting template):

```md
---
title: "Your Title Here"
date: "2026-08-01"
code: "MBA·TOPIC·01"
phase: "Phase 03 ,  Strategy and Competition"
topics: ["strategy"]
summary: "One or two sentences summarizing the entry."
centralQuestion: "The one big question this entry explores."
keyIdeas:
  - "First key idea."
  - "Second key idea."
connections:
  - "slug-of-another-lab-entry"
openQuestions:
  - "Something you're still unsure about."
finalPerspective: "Your current conclusion."
sources: ["slug-of-a-source-file"]
---
Write the full entry here in normal Markdown, with `## Headings` for sections like
Context, Key Ideas, My Synthesis, Connections, Questions I Still Have, and Final
Perspective.
```

### Add a new essay
Same idea, in `content/essays/`:

```md
---
title: "Your Essay Title"
date: "2026-08-01"
topics: ["business-philosophy"]
summary: "One or two sentences."
---
Write the essay here in Markdown.
```

### Add a new course or source
Same idea, in `content/sources/`:

```md
---
institution: "University or Platform Name"
course: "Course Title"
instructor: "Instructor Name (optional)"
subject: "strategy"
why: "Why you studied it."
outputs:
  - "slug-of-a-lab-entry-it-inspired"
---
```

Available topic slugs: `strategy`, `finance`, `economics`, `entrepreneurship`,
`leadership`, `organizational-behavior`, `innovation`, `artificial-intelligence`,
`technology`, `business-philosophy`.

After adding or editing files, upload/commit/push the changes the same way as Step 2 , 
the site rebuilds automatically.

---

## 4. Running it on your own computer (optional)

Only needed if you want to preview changes before publishing, or want to customize the
design/code yourself.

```bash
npm install
npm run dev
```

Then open `http://localhost:3000` in your browser.

To generate the same static files GitHub Pages will use:
```bash
npm run build
```
The output goes to the `out/` folder.

---

## 5. Personalizing the site

A few things worth updating before you share the site widely:
- **`src/app/contact/page.tsx`** ,  replace the placeholder email and social links.
- **`src/app/cv/page.tsx`** ,  replace the placeholder education/experience entries.
- **`public/cv.pdf`** ,  add a real PDF here if you want the "Download PDF" button on
  the CV page to work (or remove that button).
- **`src/app/layout.tsx` and `src/app/sitemap.ts` / `src/app/robots.ts`** ,  replace
  `https://example.com` with your real domain once you have one.
- **`src/app/icon.svg`** ,  replace with your own monogram or logo if you'd like.

---

## 6. Tech stack

- [Next.js](https://nextjs.org/) 14 (App Router, static export)
- TypeScript
- Tailwind CSS
- Markdown content via `gray-matter` + `remark`
- Deployed automatically via GitHub Actions → GitHub Pages
