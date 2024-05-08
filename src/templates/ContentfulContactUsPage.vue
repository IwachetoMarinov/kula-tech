<template>
  <BuildingLayout>
    <section class="pageContact page-top-pad">
      <contact-us-page :page="$page.page" />
    </section>
  </BuildingLayout>
</template>

<script>
import BuildingLayout from "../layouts/BuildingLayout.vue";
import BreadCrumb from "../components/commons/BreadCrumb.vue";
import ContactUsPage from "../components/contact-us/ContactUsPage.vue";

export default {
  components: { BreadCrumb, BuildingLayout, ContactUsPage },
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
  page: contentfulContactUsPage (id: $id) {
    title,
    bannerSection {
      title,
      content,
    },
    mainImage {
      title,
      file {
        url
      }
    },
    contactCountriesTitle,
    contactCountriesSection {
      country,
      phone,
      email,
      icon {
        title,
        file {
          url
        }
      }
    },
    contactImage {
      title,
      file {
        url
      }
    },
    contactSection {
      title,
      content
    },
    formGeneralQuestions,
    thanksContactSection {
      title,
      content,
    },
    seo {
      title,
      description
    }
  }
}
</page-query>
