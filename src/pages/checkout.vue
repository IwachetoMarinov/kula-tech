<template>
  <!-- <v-app> -->
  <!-- <v-app style="z-index: -1"> -->
  <v-app>
    <header-default :header="$static.header" />
    <div class="mews-close" @click="onMewsClose"></div>

    <mobile-menu :header="$static.header" :footer="$static.footer" />
  </v-app>
  <!-- </v-app> -->
</template>

<script>
import HeaderDefault from "../components/commons/headers/HeaderDefault.vue";
import MobileMenu from "../components/commons/MobileMenu.vue";

export default {
  components: { HeaderDefault, MobileMenu },
  name: "checkout",
  mounted() {
    if (!this.$route.query) this.$router.push("/404");
    if (typeof Mews == "undefined") {
      let mewsScript = document.createElement("script");
      mewsScript.setAttribute(
        "src",
        "https://api.mews.com/distributor/distributor.min.js"
      );
      document.body.appendChild(mewsScript);
      setTimeout(() => {
        this.createMews();
      }, 1100);
    } else {
      this.createMews();
    }
  },
  methods: {
    onMewsClose() {
      this.$router.go(-2);
      document.body.style.overflow = null;
      document.body.style.margin = null;
      document.body.style.padding = null;
      document.documentElement.style.overflow = null;
      document.documentElement.style.margin = null;
      document.documentElement.style.padding = null;
      const elementsFound = document.querySelectorAll(".mews-distributor");
      elementsFound.forEach((element) => {
        element.remove();
      });
    },
    createMews() {
      let {
        adultCount,
        apMewsId,
        bMewsId,
        childCount,
        code,
        currency,
        end,
        start,
      } = this.$route.query;

      if (code === "null") code = null;
      const [startYears, startMonths, startDays] = start.split("-");
      const [endYears, endMonths, endDays] = end.split("-");
      Mews.Distributor(
        {
          configurationIds: [bMewsId],
          // openElements: ".distributor-open",
        },
        function(distributor) {
          distributor.setStartDate(
            new Date(startYears, startMonths - 1, startDays)
          );
          distributor.setEndDate(new Date(endYears, endMonths - 1, endDays));
          distributor.setRooms(apMewsId);
          distributor.showRates(apMewsId);
          distributor.setAdultCount(parseInt(adultCount));
          distributor.setChildCount(parseInt(childCount));
          distributor.setCurrencyCode(currency);
          if (code) {
            distributor.setVoucherCode(code);
          }
          distributor.open();
          window.distributorClose = distributor.close();
        },
        { dataBaseUrl: process.env.GRIDSOME_MEWS_HOST }
      );
      setTimeout(() => {
        const element = document.querySelector(".mews-distributor");
        const isMobile = window.matchMedia("only screen and (max-width: 800px)")
          .matches;
        element.style.opacity = 1;
        if (isMobile) {
          element.style.top = "68px";
          element.style.setProperty("height", "calc(100% - 68px)");
        } else {
          element.style.top = "86px";
          element.style.setProperty("height", "calc(100% - 86px)");
        }
      }, 1000);
    },
  },
  beforeDestroy() {
    const elementsFound = document.querySelectorAll(".mews-distributor");
    elementsFound.forEach((element) => {
      element.remove();
    });
    document.body.style.overflow = null;
    document.body.style.margin = null;
    document.body.style.padding = null;
    document.documentElement.style.overflow = null;
    document.documentElement.style.margin = null;
    document.documentElement.style.padding = null;
  },
  metaInfo() {
    const pathUrl = `${this.$store.getters.baseDomain}${this.$route.path}`;
    return {
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

<style>
.mews-close {
  /* background-color: red; */
  z-index: 8;
  position: fixed;
  right: 0;
  width: 80px;
  height: 72px;
}
@media only screen and (min-width: 800px) {
  .mews-close {
    top: 86px;
  }
}
@media only screen and (max-width: 800px) {
  .mews-close {
    top: 68px;
  }
}
</style>

<static-query>
query Header {
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
