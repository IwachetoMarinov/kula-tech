<template>
  <v-app>
    <header-default :header="$static.header" />
    <transition tag="div" name="fade" appear>
      <slot />
    </transition>
    <pop-up-mobile />
    <mobile-menu :header="$static.header" :footer="$static.footer" />
    <footer-default :footer="$static.footer" />
  </v-app>
</template>

<script>
import FooterDefault from "../components/commons/footers/FooterDefault.vue";
import HeaderDefault from "../components/commons/headers/HeaderDefault.vue";
import MobileMenu from "../components/commons/MobileMenu.vue";
import PopUpMobile from "../components/commons/PopUpMobile.vue";

export default {
  name: "HomePageLayout",
  components: { FooterDefault, HeaderDefault, PopUpMobile, MobileMenu },
  data() {
    return {
      isFilterHeader: false,
    };
  },
  methods: {
    handleScroll() {
      if (window.pageYOffset > 600) this.isFilterHeader = true;
      else this.isFilterHeader = false;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<static-query>
query Footer {
  footer: contentfulFooter (id: "6bVOkpnb7PMkgRIBosiHed") {
    title,
    categories {
      title,
      link {
        title,
        path,
        type
      }
    },
    bottomLinks {
      title,
      path,
      type
    }
  }
  header: contentfulHeader (id: "7z6eEBK9Pj0R5B75mj7rgG") {
    outsideLink {
      title,
      path,
      type
    },
    menu {
      title,
      path,
      type
    }
  }
}
</static-query>
