/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_PAGES === 'true';
const repo = process.env.GITHUB_REPOSITORY?.split('/')[1] || '';
const repoBasePath = repo && !repo.endsWith('.github.io') ? `/${repo}` : '';
const basePath = process.env.BASE_PATH || repoBasePath;

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  ...(isGithubPages
    ? {
        basePath,
        assetPrefix: basePath ? `${basePath}/` : undefined,
      }
    : {}),
};

export default nextConfig;
