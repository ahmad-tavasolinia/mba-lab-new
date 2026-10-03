/** @type {import('next').NextConfig} */

// When deploying to a GitHub Project Pages site (username.github.io/REPO_NAME),
// GitHub serves the site from a sub-path. Set NEXT_PUBLIC_BASE_PATH via the
// deploy workflow (see .github/workflows/deploy.yml) to that "/REPO_NAME".
// If you deploy to a User/Org Pages site (username.github.io), leave it empty.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig = {
  output: 'export',
  basePath,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
