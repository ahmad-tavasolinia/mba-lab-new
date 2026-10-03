# MBA Lab redesign ,  GitHub upload

## Background image
The new homepage background is already included in this package.

Upload this exact file to:

`public/hero-mba-lab.png`

The code references it as:

`/hero-mba-lab.png`

Do not put the image in `src/`, and do not rename it unless you also change the URL in `src/app/globals.css`.

## GitHub upload and deployment

1. Extract this ZIP on your computer.
2. If using GitHub's web uploader, upload and commit the extracted files in two separate batches: first all files outside `content/` and `public/`, then the files inside `content/` and `public/`.
3. Make sure `public/hero-mba-lab.png` exists in the repository.
4. Commit the changes and let GitHub Actions run the existing `.github/workflows/deploy.yml` workflow.

The build removes the obsolete `src/app/fa/[[...path]]/page.tsx` route before Next.js starts if that old file remains from an earlier upload. This prevents it from conflicting with the current Persian home page.

GitHub's normal file-upload interface does not turn an uploaded ZIP into a repository tree. Extract the archive first, then upload the extracted files.
