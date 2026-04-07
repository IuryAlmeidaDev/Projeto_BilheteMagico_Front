const isGitHubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig = {
  output: 'export',
  outputFileTracingRoot: __dirname,
  basePath: isGitHubPages ? '/Projeto_BilheteMagico_Front' : '',
  assetPrefix: isGitHubPages ? '/Projeto_BilheteMagico_Front/' : ''
};

module.exports = nextConfig;
