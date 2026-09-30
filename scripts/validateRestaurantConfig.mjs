import { createLogger, createServer } from 'vite';

const mode = process.argv.includes('--production') ? 'production' : 'content';
const statusOnly = process.argv.includes('--status');
const root = process.cwd();
const viteLogger = createLogger('error');
const validationLogger = {
  ...viteLogger,
  error(message, options) {
    if (String(message).includes('WebSocket server error')) {
      return;
    }

    viteLogger.error(message, options);
  },
};
const server = await createServer({
  root,
  configFile: false,
  logLevel: 'error',
  customLogger: validationLogger,
  appType: 'custom',
  server: {
    middlewareMode: true,
    hmr: false,
  },
});

try {
  const [{ restaurant }, validator, seo] = await Promise.all([
    server.ssrLoadModule('/src/data/restaurant.ts'),
    server.ssrLoadModule('/src/lib/validateRestaurantConfig.ts'),
    server.ssrLoadModule('/src/lib/seo.ts'),
  ]);
  const result = validator.validateRestaurantConfig(restaurant, { mode });

  if (statusOnly) {
    const metadata = seo.buildSeoMetadata(restaurant);
    const countIssues = (code) => result.issues.filter((issue) => issue.code === code).length;
    const siteUrl = restaurant.seo.siteUrl?.trim() || 'not configured';
    const menuConfirmed = restaurant.menu.isPlaceholder ? 'no' : 'yes';

    console.log('Publication status');
    console.log(`Publication status: ${restaurant.publication.status}`);
    console.log(`SEO indexable setting: ${restaurant.seo.indexable ? 'true' : 'false'}`);
    console.log(`Effective indexable: ${metadata.robots === 'index, follow' ? 'true' : 'false'}`);
    console.log(`Robots meta: ${metadata.robots}`);
    console.log(`Site URL: ${siteUrl}`);
    console.log(`Placeholder images: ${countIssues('PLACEHOLDER_IMAGE')}`);
    console.log(`Placeholder reviews: ${countIssues('PLACEHOLDER_REVIEW')}`);
    console.log(`Menu confirmed: ${menuConfirmed}`);
    console.log(`Validation: ${result.errors.length} errors, ${result.warnings.length} warnings`);
  } else {
    console.log(validator.formatValidationReport(result));
  }

  process.exitCode = result.errors.length > 0 ? 1 : 0;
} catch (error) {
  console.error('Restaurant config validation failed to run.');
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
} finally {
  await server.close();
}
