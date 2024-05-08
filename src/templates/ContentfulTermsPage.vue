<template>
  <BuildingLayout>
    <section class="pageTerms page-top-pad over--hide">
      <terms-page :page="$page.page" />
    </section>
  </BuildingLayout>
</template>

<script>
import BuildingLayout from "../layouts/BuildingLayout.vue";
import TermsPage from "../components/terms/TermsPage.vue";

export default {
  components: { BuildingLayout, TermsPage },
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
  page: contentfulTermsPage (id: $id) {
    title,
    lastUpdated,
    content,
    linkedContent,
    seo {
      title,
      description
    }
  }
}
</page-query>