<template>
  <v-dialog
    v-model="isDrawer"
    fullscreen
    mode="out-in"
    duration="2000"
    transition
    name="fade"
    class="mobileMenu"
  >
    <div class="mm-menu-head q_flex">
      <div @click="onToggleDrawer">
        <g-link to="/" class="logo">
          <g-image src="~/assets/image/logo.svg" alt="Kula"></g-image>
        </g-link>
      </div>
      <a
        class="pop-close ic-pointer q_flex flex--center"
        @click="onToggleDrawer"
        ><g-image src="~/assets/image/close.svg" alt="close"></g-image
      ></a>
    </div>
    <div class="mm-menu-big q_flex flex--column is--fit">
      <!-- <div>
        <g-link to="/" class="mm-menu-big-link q_title">
          Home page
        </g-link>
      </div> -->
      <template v-if="header && header.menu">
        <div
          @click="onToggleDrawer"
          v-for="(menuLink, i) in header.menu"
          :key="i + menuLink.title"
        >
          <custom-link :link="menuLink" class="mm-menu-big-link q_title" />
          <!-- <custom-link
            v-if="header && header.outsideLink && i === 2"
            :link="header.outsideLink"
            class="mm-menu-big-link q_title"
          /> -->
        </div>
      </template>
      <div v-if="header && header.outsideLink" @click="onToggleDrawer">
        <g-link :to="header.outsideLink.path" class="mm-menu-big-link q_title">
          {{ header.outsideLink.title }}
        </g-link>
      </div>
    </div>
    <div class="mm-menu-small q_flex flex--center">
      <template v-if="footer && footer.bottomLinks">
        <div
          @click="onToggleDrawer"
          v-for="(link, index) in footer.bottomLinks"
          :key="index + link.title"
        >
          <custom-link :link="link" class="mm-menu-small-link tx--font-light" />
        </div>
      </template>
    </div>
  </v-dialog>
</template>

<script>
import CustomLink from "../commons/CustomLink.vue";
import gsap from "gsap";

export default {
  name: "MobileMenu",
  props: {
    header: {
      type: Object,
      require: true,
    },
    footer: {
      type: Object,
      require: true,
    },
  },
  components: {
    CustomLink,
  },
  computed: {
    isDrawer: {
      get() {
        return this.$store.getters.isDrawer;
      },
      set(value) {
        this.$store.commit("setIsDrawer", value);
      },
    },
  },
  updated: function() {
    if (this.isDrawer == true) {
      this.scrollAnimation();
    }
  },
  methods: {
    scrollAnimation() {
      gsap.fromTo(
        ".mm-menu-big-link",
        {
          opacity: 0,
          y: 30,
        },
        {
          scrollTrigger: {
            trigger: ".v-dialog--fullscreen",
            toggleClass: ".v-dialog--active",
            //markers: true,
            //start: "20px 130%",
            //end: "100% 130%",
            //scrub: 2,
            toggleActions: "restart none none reset",
          },
          opacity: 1,
          y: 0,
          duration: 0.3,
          stagger: 0.12,
        }
      );
    },
    onToggleDrawer() {
      this.$store.commit("setIsDrawer", false);
    },
  },
};
</script>
