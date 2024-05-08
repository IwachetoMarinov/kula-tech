// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
//   .BundleAnalyzerPlugin;

module.exports = {
  siteName: "Kula",
  titleTemplate: (title) => '',
  siteUrl: "https://staykula.com",
  chainWebpack: async (config, { isProd, isClient }) => {
    if (isProd && isClient) {
      config.optimization.splitChunks({
        chunks: "initial",
        maxInitialRequests: Infinity,
        cacheGroups: {
          vueVendor: {
            test: /[\\/]node_modules[\\/](vue|vuex|vue-router)[\\/]/,
            name: "vue-vendors",
          },
          gridsome: {
            test: /[\\/]node_modules[\\/](gridsome|vue-meta)[\\/]/,
            name: "gridsome-vendors",
          },
          polyfill: {
            test: /[\\/]node_modules[\\/]core-js[\\/]/,
            name: "core-js",
          },
          axios: {
            test: /[\\/]node_modules[\\/]axios[\\/]/,
            name: "axios",
          },
        },
      });
      // config
      //   .plugin("BundleAnalyzerPlugin")
      //   .use(BundleAnalyzerPlugin, [{ analyzerMode: "static" }]);
    }
  },
  plugins: [
    {
      use: "@gridsome/plugin-sitemap",
      // options: {
      //   id: 'UA-XXXXXXXXX-X'
      // }
    },
    {
      use: "gridsome-plugin-gtm",
      options: {
        id: "GTM-N793NGJ",
        enabled: true,
        debug: true,
      },
    },
    {
      use: "@gridsome/source-contentful",
      options: {
        space: process.env.GRIDSOME_CONTENTFUL_SPACE_ID,
        accessToken: process.env.GRIDSOME_CONTENTFUL_DELIVERY_ACCESS_TOKEN,
        host: "cdn.contentful.com",
        environment: "master",
        typeName: "Contentful",
      },
    },
    // {
    //   use: "@gridsome/source-contentful",
    //   options: {
    //     space: process.env.GRIDSOME_CONTENTFUL_SPACE_ID,
    //     accessToken: process.env.GRIDSOME_CONTENTFUL_PREVIEW_ACCESS_TOKEN,
    //     host: "preview.contentful.com",
    //     environment: "master",
    //     typeName: "ContentfulPreview",
    //   },
    // },
  ],
  templates: {
    ContentfulBuilding: "/building/:slug",
    ContentfulCity: "/city/:slug",
    // ContentfulTermsPage: "/policy/:slug",
    // ContentfulContactUsPage: "/contact/:slug",
    // ContentfulAboutPage: "/about/:slug",
    // ContentfulCareersPage: "/careers/:slug",
    // ContentfulRealEstatePage: "/page/:slug",
    // ContentfulBusinessPage: "/business/:slug",
  },
};
