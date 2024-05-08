<template>
  <v-app>
    <header-default :isSticky="false" :header="$static.header" />
    <city-filter-header />
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
import CityFilterHeader from "../components/commons/headers/CityFilterHeader.vue";
import HeaderDefault from "../components/commons/headers/HeaderDefault.vue";
import MobileMenu from "../components/commons/MobileMenu.vue";
import PopUpMobile from "../components/commons/PopUpMobile.vue";

export default {
  name: "CityLayout",
  components: {
    FooterDefault,
    HeaderDefault,
    CityFilterHeader,
    PopUpMobile,
    MobileMenu,
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
