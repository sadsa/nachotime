/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  cacheDirectory: "./node_modules/.cache/remix",
  serverDependenciesToBundle: [
    /^@adobe\/react-spectrum/,
    /^@react-spectrum/,
    /^@spectrum-icons/,
    /^@swc\/helpers/,
  ],
  future: {
    v2_errorBoundary: true,
    v2_meta: true,
    v2_normalizeFormMethod: true,
    v2_routeConvention: true,
    unstable_vanillaExtract: { cache: true },
    unstable_cssSideEffectImports: true,
  },
  ignoredRouteFiles: [
    "**/.*",
    "**/*.css",
    "**/*.css.ts",
    "**/*.test.{js,jsx,ts,tsx}",
  ],
};
