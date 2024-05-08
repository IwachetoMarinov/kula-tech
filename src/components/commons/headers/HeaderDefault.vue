<template>
  <header id="headerSticky" :class="$route.path === '/' ? 'head-home' : ''">
    <div class="flex layout layout-100">
      <g-link to="/" class="logo">
        <g-image
          src="~/assets/image/logo.svg"
          :immediate="true"
          alt="Kula"
        ></g-image>
      </g-link>
      <div class="flex">
        <!-- <a class="glob img-b relative" href="">
          <g-image
            src="~/assets/image/glob.svg"
            :immediate="true"
            alt="glob"
          ></g-image> -->
        <!-- <div
            id="google_translate_element"
            class="google_translate_element"
          ></div> -->
        <!-- </a> -->

        <custom-link
          v-if="header"
          :link="header.outsideLink"
          :customClass="'head-bus no_mobile link-border'"
        />

        <v-menu v-if="header" class="no_mobile" open-on-hover bottom offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" class="menu_bt bt-reset no_mobile">
              <span class="menu_bt_a">
                <span class="menu_bt_in"
                  ><span class="menu_bt_sep"></span
                ></span>
              </span>
            </v-btn>
          </template>

          <v-list class="menu-list">
            <v-list-item v-for="(menuLink, i) in header.menu" :key="i"
              ><custom-link :link="menuLink"
            /></v-list-item>
          </v-list>
        </v-menu>

        <v-btn @click="onDrawer" class="menu_bt bt-reset mobile_only">
          <span class="menu_bt_a">
            <span class="menu_bt_in"><span class="menu_bt_sep"></span></span>
          </span>
        </v-btn>
      </div>
    </div>
  </header>
</template>

<script>
import { stickyHeader } from "../../../utilities/stickyHeader.js";
import CustomLink from "../../commons/CustomLink.vue";
import gsap from "gsap";

export default {
  name: "HeaderDefault",
  components: { CustomLink },
  props: {
    isSticky: {
      type: Boolean,
      default: true,
    },
    header: {
      type: Object,
      require: true,
    },
  },
  methods: {
    scrollAnimation() {
      let windowWidth = window.outerWidth;
      if (windowWidth > 800) {
        let tl = gsap.timeline({ delay: 0.5 });
        tl.from(".logo", {
          y: -40,
          opacity: 0,
          duration: 1.5,
          ease: "power4",
        })
          .from(
            ".glob",
            {
              y: -40,
              opacity: 0,
              duration: 1.5,
              ease: "power4",
            },
            0.2
          )
          .from(
            ".head-bus",
            {
              y: -40,
              opacity: 0,
              duration: 1.5,
              ease: "power4",
            },
            0.3
          )
          .from(
            ".menu_bt_a",
            {
              y: -40,
              opacity: 0,
              duration: 1.5,
              ease: "power4",
            },
            0.4
          )
          .from(
            ".hp-hero",
            {
              scale: 1.05,
              //opacity: 0,
              duration: 1.8,
              ease: "power4",
            },
            "-=2"
          )
          .from(
            ".hp-search-hold",
            {
              y: 20,
              opacity: 0,
              duration: 1.5,
              ease: "power4",
            },
            "-=1.8"
          );
      }
    },
    onDrawer() {
      this.$store.commit("setIsDrawer", true);
    },
  },
  mounted() {
    if (this.isSticky) window.addEventListener("scroll", stickyHeader);
    this.scrollAnimation();
  },
  beforeDestroy() {
    if (this.isSticky) window.removeEventListener("scroll", stickyHeader);
  },
};
</script>
