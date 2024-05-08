<template>
  <Layout>
    <home-page :page="$page.homePage" />
  </Layout>
</template>

<script>
import HomePage from "~/components/homepage/HomePage.vue";

export default {
  components: {
    HomePage,
  },
  async mounted() {
    this.$store.commit("setIsCheckout", false);
    this.$store.commit("setBreadcrumb", null);
    this.$store.commit("clearFilterBy");
    // this.$store.commit("initFilterBy");
  },
  metaInfo() {
    if (!this.$page.homePage) return;
    const pathUrl = `${this.$store.getters.baseDomain}${this.$route.path}`;
    return {
      title: this.$page.homePage.seo.title,
      meta: [
        { name: "description", content: this.$page.homePage.seo.description },
      ],
      link: [
        {
          rel: "canonical",
          content: pathUrl,
        },
      ],
    };
  },
};
</script>

<!-- Coming soon cities query commented -->



<page-query>
query HomePage {
  homePage: contentfulHomePage (id: "yqvIaVTPFaIRAdX8kOXzF") {
    mainImage {
      title,
      file {
        url,
      }
    },
    mainImageMobile {
      title,
      file {
        url,
      }
    },
    heroOverlayText {
      titleBeforeAnimation,
      animationWord {
        text,
        color
      },
    },
    mobileTitle,
    citySectionTitle,
    cities {
      name,
      slug,
      image {
        title,
        file {
          url,
        }
      },
      neighborhoods {
        name
      },
      backgroundColor
    },
    citiesComingSoon {
      name,
      image {
        title,
        file {
          url
        }
      },
      backgroundColor
    }
    heroSection {
      titleBeforeAnimation,
      animationWord {
        text,
        color
      },
      titleAfterAnimation,
      content
    },
    standardSection {
      title,
      content,
      image {
        title,
        file {
          url
        }
      },
      amenity {
        title,
        available,
        image {
          title,
          file {
            url,
          }
        }
      }
    },
    aboutSectionTitle,
    aboutSection {
      title,
      content,
      image {
        title,
        file {
          url
        } 
      }
    },
    featureSection {
      title,
      content,
      image {
        title,
        file {
          url
        }
      },
      link {
        title,
        path,
        type
      }
    },
    reviewSection {
      title,
      content
    },
    reviewFeatures {
      title,
      content
    },
    businessSection {
      title,
      content,
      image {
        title,
        file {
          url
        }
      },
      link {
        title,
        path,
        type
      }
    },
    featureSectionMobileImage {
      title,
      file {
        url
      }
    },
    seo {
      title,
      description
    }
  }
}
</page-query>
