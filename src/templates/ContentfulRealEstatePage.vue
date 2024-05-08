<template>
  <BuildingLayout>
    <section class="pageReal page-top-pad over--hide">
      <real-estate-page :page="$page.page" />
    </section>
  </BuildingLayout>
</template>

<script>
import BuildingLayout from "../layouts/BuildingLayout.vue";
import RealEstatePage from "../components/real-estate/RealEstatePage.vue";

export default {
  name: "real-estate",
  components: { BuildingLayout, RealEstatePage },
  data() {
    return {
      breadcrumb: [{ url: "/", txt: null }, { url: null, txt: "" }],
    };
  },
  mounted() {
    this.breadcrumb[1].txt = this.$page.page.title;
    this.$store.commit("setBreadcrumb", this.breadcrumb);
    this.$store.commit("setIsCheckout", false);
    this.$store.commit("clearFilterBy");
  },
  metaInfo() {
    if (!this.$page.page) return;
    const pathUrl = `${this.$store.getters.baseDomain}${this.$route.path}`;
    return {
      title: this.$page.page.seo.title,
      meta: [
        {
          name: "description",
          content: this.$page.page.seo.description,
        },
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

<page-query>
query Page ($id: ID!) {
  page: contentfulRealEstatePage (id: $id) {
    title,
    bannerSection {
        title,
        content,
        link {
            title,
            path,
            type
        }
    },
    mainImage{
        title,
        file {
            url
        }
    },
    featureSectionTitle,
    featureSection {
        title,
        content
    },
    kulaInNumbers {
        title,
        content,
        number {
            numberTitle,
            title,
            shortDescription
        }
    }
    pdfBanner {
        title,
        content,
        icon {
            title, 
            file {
                url
            }
        },
        buttonText,
        pdfFile {
            file {
                url
            }
        },
        image {
            title,
            file {
                url
            }
        },
        mobileImage {
            title,
            file {
                url
            }
        }
    },
    bottomBanner {
        title,
        content,
        link {
            title,
            path,
            type
        }
    },
    seo {
        title,
      description
    }
  }
}
</page-query>
