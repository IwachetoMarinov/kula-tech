<template>
  <v-app>
    <building-filter-header :header="$static.header" />
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
import BuildingFilterHeader from "../components/commons/headers/BuildingFilterHeader.vue";
import PopUpMobile from "../components/commons/PopUpMobile.vue";
import MobileMenu from "../components/commons/MobileMenu.vue";

export default {
  components: { FooterDefault, BuildingFilterHeader, PopUpMobile, MobileMenu },
  name: "BuildingLayout",
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
