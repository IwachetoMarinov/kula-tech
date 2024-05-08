<template>
  <BuildingLayout>
    <section class="pageBusiness page-top-pad over--hide">
      <business-page :page="$page.page" />
    </section>
  </BuildingLayout>
</template>

<script>
import BuildingLayout from "../layouts/BuildingLayout.vue";
import BusinessPage from "../components/business/BusinessPage.vue";

export default {
  components: { BusinessPage, BuildingLayout },
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
  page: contentfulBusinessPage (id: $id) {
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
    mainImage {
      title,
      file {
        url
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
    bottomBanner {
      title,
      content,
      link {
        title,
        path,
        type
      }
    },
    companiesTestimonials {
      title,
      testimonials {
        content,
        author,
        authorRole
      }
    }
    seo {
      title,
      description
    }
  }
}
</page-query>
