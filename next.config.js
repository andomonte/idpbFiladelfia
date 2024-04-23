/* module.exports = {
  env: {
    MYSQL_HOST: 'mysql669.umbler.com',
    MYSQL_PORT: '41890',
    MYSQL_DATABASE: 'db_idpb',
    MYSQL_USER: 'idpbsystem',
    MYSQL_PASSWORD: 'idpbMM981341',
  },
};
 */
// next.config.js

const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');
const withPWA = require('next-pwa');

const nextConfig = {
  images: {
    domains: [
      'localhost',
      'idpbamazonas.s3.amazonaws.com',
      'approomservice.com.br',
      'idpbfiladelfia.com.br',
    ],
  },
};
module.exports = withPlugins([
  withImages,
  nextConfig,
  {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) =>
      // Important: return the modified config
      config,

    /*     webpack: (config, { isServer }) => {
      if (!isServer) {
        // set 'fs' to an empty module on the client to prevent this error on build --> Error: Can't resolve 'fs'
        config.node = {
          fs: 'empty',
        };
      }

      return config;
    },
 */ eslint: {
      // Warning: This allows production builds to successfully complete even if
      // your project has ESLint errors.
      ignoreDuringBuilds: true,
    },
    i18n: {
      // These are all the locales you want to support in
      // your application
      locales: ['pt-BR'],
      // This is the default locale you want to be used when visiting
      // a non-locale prefixed path e.g. `/hello`
      defaultLocale: 'pt-BR',
      // This is a list of locale domains and the default locale they
      // should handle (these are only required when setting up domain routing)
      // Note: subdomains must be included in the domain value to be matched e.g. "fr.example.com".
    },
    //    webpack5:,

    env: {
      MYSQL_HOST: 'database-idpb.cc5jji3rn9c0.us-east-1.rds.amazonaws.com',
      MYSQL_PORT: '3306',
      MYSQL_DATABASE: 'db_idpb',
      MYSQL_USER: 'andomonte',
      MYSQL_PASSWORD: 'leaLMS981341',
    },
  },

  withPWA,
  {
    pwa: {
      disable: process.env.NODE_ENV === 'development',
      dest: 'public',
      register: true,
      skipWaiting: true,
      sw: '/sw.js',
      buildExcludes: [/ middleware-manifest.json $ /],
    },
  },

  // your other plugins here
]);
