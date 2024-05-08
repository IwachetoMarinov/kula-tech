// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

// const { createProxyMiddleware } = require("http-proxy-middleware");

// const axios = require('axios');

module.exports = function(api) {
  api.loadSource(async ({ addCollection }) => {
    // const pages = addCollection({pageType: 'homepage'})
    // const response = await axios.get(
    //   `/.netlify/functions/server/page/page`
    // );
    // pages.addNode({...response.data})
    // store.dispatch({ type: "getPage", pageType: "page" });
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
  });

  api.createPages(async ({ graphql, createPage }) => {
    const { data } = await graphql(`
      {
        allContentfulTermsPage {
          edges {
            node {
              slug,
              id
            }
          }
        }
        allContentfulAboutPage {
          edges {
            node {
              slug,
              id
            }
          }
        }
        allContentfulBusinessPage {
          edges {
            node {
              slug,
              id
            }
          }
        }
        allContentfulRealEstatePage {
          edges {
            node {
              slug,
              id
            }
          }
        }
        allContentfulContactUsPage {
          edges {
            node {
              slug,
              id
            }
          }
        }
        allContentfulCareersPage {
          edges {
            node {
              slug,
              id
            }
          }
        }
      }
    `);

    // data.allContentfulCity.edges.forEach(({ node }) => {
    //   createPage({
    //     path: `/${node.slug}`,
    //     component: "./src/templates/ContentfulCity.vue",
    //     context: {
    //       id: node.id,
    //     },
    //   });
    // });
    data.allContentfulTermsPage.edges.forEach(({ node }) => {
      createPage({
        path: `/${node.slug}`,
        component: "./src/templates/ContentfulTermsPage.vue",
        context: {
          id: node.id,
        },
      });
    });
    data.allContentfulAboutPage.edges.forEach(({ node }) => {
      createPage({
        path: `/${node.slug}`,
        component: "./src/templates/ContentfulAboutPage.vue",
        context: {
          id: node.id,
        },
      });
    });
    data.allContentfulBusinessPage.edges.forEach(({ node }) => {
      createPage({
        path: `/${node.slug}`,
        component: "./src/templates/ContentfulBusinessPage.vue",
        context: {
          id: node.id,
        },
      });
    });
    data.allContentfulRealEstatePage.edges.forEach(({ node }) => {
      createPage({
        path: `/${node.slug}`,
        component: "./src/templates/ContentfulRealEstatePage.vue",
        context: {
          id: node.id,
        },
      });
    });
    data.allContentfulContactUsPage.edges.forEach(({ node }) => {
      createPage({
        path: `/${node.slug}`,
        component: "./src/templates/ContentfulContactUsPage.vue",
        context: {
          id: node.id,
        },
      });
    });
    data.allContentfulCareersPage.edges.forEach(({ node }) => {
      createPage({
        path: `/${node.slug}`,
        component: "./src/templates/ContentfulCareersPage.vue",
        context: {
          id: node.id,
        },
      });
    });
  });

  // api.configureServer((app) => {
  //   app.use(
  //     createProxyMiddleware("/.netlify/functions", {
  //       target: "http://localhost:9000/",
  //       // pathRewrite: {
  //       //   "^/\\.netlify/functions": "",
  //       // },
  //       changeOrigin: true,
  //     })
  //   );
  // });
};
