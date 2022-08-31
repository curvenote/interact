// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withEsbuildOverride } = require('remix-esbuild-override');

withEsbuildOverride((option, { isServer, isDev }) => {
  // update the option
  option.external = [
    '!!file-loader?name=pypi/[name].[ext]&context=.!../pypi/all.json',
    '!!file-loader?name=pypi/[name].[ext]&context=.!../pypi/ipykernel-6.9.2-py3-none-any.whl',
    '!!file-loader?name=pypi/[name].[ext]&context=.!../pypi/piplite-0.1.0b12-py3-none-any.whl',
    '!!file-loader?name=pypi/[name].[ext]&context=.!../pypi/pyolite-0.1.0b12-py3-none-any.whl',
    '!!file-loader?name=pypi/[name].[ext]&context=.!../pypi/widgetsnbextension-3.6.0-py3-none-any.whl',
    ...(option.external || []),
  ];

  return option;
});

/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  serverBuildTarget: 'vercel',
  // When running locally in development mode, we use the built in remix
  // server. This does not understand the vercel lambda module format,
  // so we default back to the standard build output.
  server: process.env.NODE_ENV === 'development' ? undefined : './server.js',
  ignoredRouteFiles: ['**/.*'],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "api/index.js",
  // publicPath: "/build/",
  external: ['!!file-loader?name=pypi/[name].[ext]&context=.!../pypi/all.json'],
};
