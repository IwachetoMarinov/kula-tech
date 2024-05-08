<template>
  <BuildingLayout>
    <section class="pageAbout page-top-pad over--hide">
      <about-page :page="$page.page" />
    </section>
  </BuildingLayout>
</template>

<script>
import BuildingLayout from "../layouts/BuildingLayout.vue";
import AboutPage from "../components/about/AboutPage.vue";

export default {
  components: { AboutPage, BuildingLayout },
  data() {
    return {
      page: null,
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
  page: contentfulAboutPage (id: $id) {
    title,
    bannerSection {
      title,
      content,
    },
    gallery {
      title,
      file {
        url
      }
    },
    abovePicSection {
      title,
      content,
    },
    picDesktop {
      title,
      file {
        url
      }
    },
    picMobile {
      title,
      file {
        url
      }
    },
    underPicSection {
      title,
      content,
      link {
        type,
        path,
        title
      }
    },
    seo {
      title,
      description
    }
}
}
</page-query>
