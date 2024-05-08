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
  components: { FooterDefault, HeaderDefault, PopUpMobile, MobileMenu },
  name: "Default",
};
</script>

<style>
/*.fade-leave-active  .fade-leave-to*/
.fade-enter-active {
  transition: opacity 5s ease;
}

.open-enter {
  transform: scaleX(0);
}

.fade-enter-from {
  opacity: 0;
}
</style>

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
