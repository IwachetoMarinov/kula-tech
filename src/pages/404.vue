<template>
  <BuildingLayout>
    <section class="pageError page-top-pad over--hide" v-if="$page">
      <div class="layout q_center z--1">
        <h1 class="q_title title--big mb--42">{{ $page.errorPage.title }}</h1>
        <div class="max--850 marge-auto sec--pad--btm">
          <div
            class="text tx--24 mb--42"
            v-html="toHtml($page.errorPage.content)"
          ></div>
          <custom-link
            class="bt-primary bt--big bt--min-w bg--blue-d"
            :link="$page.errorPage.button"
          />
        </div>
      </div>
      <div class="faces">
        <div class="no_mobile">
          <g-image src="~/assets/image/faces.jpg" alt="" />
        </div>
        <div class="mobile_only">
          <g-image src="~/assets/image/faces-m.jpg" alt="" />
        </div>
      </div>
    </section>
  </BuildingLayout>
</template>

<script>
import BuildingLayout from "../layouts/BuildingLayout.vue";
import CustomLink from "../components/commons/CustomLink";
import gsap from "gsap";

export default {
  components: { BuildingLayout, CustomLink },
  mounted: function() {
    this.scrollAnimation();
  },
  methods: {
    scrollAnimation() {
      gsap.fromTo(
        ".faces",
        {
          y: 0,
        },
        {
          scrollTrigger: {
            trigger: ".faces",
            start: "20px 80%",
            scrub: 2,
            toggleActions: "restart pause reverse pause",
          },
          y: -200,
          duration: 0.5,
        }
      );
    },
    toHtml(doc) {
      return this.$store.getters.toHtml(doc);
    },
  },
  mounted() {
    this.$store.commit("setBreadcrumb", null);
  },
};
</script>

<page-query>
query ErrorPage {
  errorPage: contentful404Page(id: "AOSrSYP4zA6YBILQGnciC") { 
    title,
    content,
  	button {
      title,
      path,
      type
    }
  }
}
</page-query>
