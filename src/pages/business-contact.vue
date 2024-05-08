<template>
  <BuildingLayout>
    <section class="pageBusiness page-top-pad">
      <BusinessContact
        v-if="$page.businessContact"
        :page="$page.businessContact"
      />
    </section>
  </BuildingLayout>
</template>

<script>
import BuildingLayout from "../layouts/BuildingLayout.vue";
import BusinessContact from "../components/business/BusinessContact.vue";

export default {
  name: "business-contact",
  components: { BuildingLayout, BusinessContact },
  data() {
    return {
      breadcrumb: [{ url: "/", txt: null }, { url: null, txt: "" }],
    };
  },
  mounted() {
    this.breadcrumb[1].txt = this.$page.businessContact.businessContactSeo.title;
    this.$store.commit("setBreadcrumb", this.breadcrumb);
    this.$store.commit("clearFilterBy");
  },
  metaInfo() {
    if (!this.$page.businessContact) return;
    const pathUrl = `${this.$store.getters.baseDomain}${this.$route.path}`;
    return {
      title: this.$page.businessContact.businessContactSeo.title,
      meta: [
        {
          name: "description",
          content: this.$page.businessContact.businessContactSeo.description,
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
query BusinessContact {
  businessContact: contentfulBusinessPage (id: "4cIam3GrKNaGUC14X1vzAt") {
    contactSection {
        title,
        content
    },
    thanksContactSection {
        title,
        content,
        link {
             title,
            path,
            type
        }
    },
    contactSectionImage {
        title,
        file {
            url
        }
    }
    businessContactSeo {
        title,
        description
    }
  }
}
</page-query>
