<template>
  <BuildingLayout>
    <section class="pageCareer page-top-pad over--hide">
      <careers-page :page="$page.page" />
    </section>
  </BuildingLayout>
</template>

<script>
import BuildingLayout from "../layouts/BuildingLayout.vue";
import CareersPage from "../components/careers/CareersPage.vue";

export default {
  components: { BuildingLayout, CareersPage },
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
      meta: [{ name: "description", content: this.$page.page.seo.description }],
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
  page: contentfulCareersPage (id: $id) {
    title,
    bannerSection {
      title,
      content
    },
    description,
    gallery {
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
    positionSectionTitle,
    positions {
      title,
      location,
      description,
      tags,
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
