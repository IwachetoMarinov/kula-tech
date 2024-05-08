<template>
  <footer
    v-if="footer"
    class="footer"
    :class="{'footer-black bg--dark': $route.path === '/', 'bg--bege': $route.path !== '/', 'building-footer': $route.path.includes('building') }"
  >
    <div class="footer-bread q_flex" v-if="breadcrumb">
      <bread-crumb />
    </div>
    <div class="footer-top layout flex flex--top m-block">
      <g-link to="/" class="logo no_mobile">
        <g-image
          class="hp-reg"
          :immediate="true"
          src="~/assets/image/logo.svg"
          alt="Kula"
        ></g-image>
        <g-image
          class="hp-white"
          :immediate="true"
          src="~/assets/image/logo-white.svg"
          alt="Kula"
        ></g-image>
      </g-link>

      <div class="ft_links q_flex flex--top is--fit m-block m-100">
        <div
          class="ft-col m-100"
          v-for="(category, index) in footer.categories"
          :key="index"
        >
          <div class="ft-col-title tx--font-light">{{ category.title }}</div>
          <div class="q_flex flex--top">
            <div
              class="col--50 m-100"
              v-for="rowIdx in Math.ceil(category.link.length / 4)"
              :key="rowIdx"
            >
              <div
                class="ft-link"
                v-for="(link, index) in category.link.slice(
                  4 * (rowIdx - 1),
                  4 * rowIdx
                )"
                :key="index"
              >
                <custom-link :link="link" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-bottom layout flex flex--reverse m-block m-center">
      <div class="ft-right q_flex m-block">
       <!-- <div class="ft-glob"> -->
          <!-- <a class="glob q_flex flex--center relative" href=""> -->
            <!-- <g-image class="hp-reg relative" src="~/assets/image/glob.svg" alt="" /> -->
            <!-- <g-image
              class="hp-white"
              src="~/assets/image/glob-white.svg"
              alt=""
            />
            English -->
            <!-- <g-image
              class="hp-white"
              src="~/assets/image/glob-white.svg"
              alt=""
            ></g-image> -->
            <!-- <div
              id="google_translate_element2"
              class="google_translate_element"
            ></div> -->
          <!-- </a> -->
         <!-- </div> -->
        <div class="ft-right-terms q_flex flex--center">
          <div v-for="(link, index) in footer.bottomLinks" :key="index">
            <custom-link :link="link" />
          </div>
        </div>
      </div>
      <div class="ft-rights">
        2022 Kula. All rights reserved.
      </div>
    </div>
  </footer>
</template>

<script>
import CustomLink from "../CustomLink.vue";
import BreadCrumb from "../../../components/commons/BreadCrumb.vue";
import { mapState } from "vuex";

export default {
  name: "FooterDefault",
  components: { CustomLink, BreadCrumb },
  props: {
    footer: {
      type: Object,
      require: true,
    },
  },
  computed: {
    ...mapState({
      breadcrumb: (state) => state.optionsStore.breadcrumb,
    }),
  },
  methods: {
    toHtml(doc) {
      return this.$store.getters.toHtml(doc);
    },
  },
};
</script>
