import DefaultLayout from "~/layouts/Default.vue";
import Vuex from "vuex";
import store from "~/store";

import * as VueGoogleMaps from "vue2-google-maps";
import Vuelidate from "vuelidate";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import "@mdi/font/css/materialdesignicons.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import "~/assets/style/index.scss";

gsap.registerPlugin(ScrollTrigger);

export default function(Vue, { router, head, isClient, appOptions }) {

  // head.script.push({
  //   src: 'https://apps.elfsight.com/p/platform.js',
  //   body: true,
  //   defer:true
  // })
  // head.script.push({
  //   src: 'https://cmp.osano.com/Azz82PT7DDeYx9RZ/e03cb128-d9c0-484e-a59b-b788bc35166a/osano.js',
  // })
  // head.script.push({
  //   src: 'https://api.mews.com/distributor/distributor.min.js',
  //   body: true
  // })
  // head.script.push({
  //   src: `https://s7.addthis.com/js/300/addthis_widget.js#pubid=ra-629361cea9b49aa8"`,
  //   body: true
  // })

  Vue.use(Vuex);
  appOptions.store = store;

  Vue.use(Vuelidate);

  Vue.use(Vuetify);
  appOptions.vuetify = new Vuetify();

  Vue.use(VueGoogleMaps, {
    load: {
      key: process.env.GRIDSOME_MAP_KEY,
      libraries: "places",
      // map_ids: "6d5756c871a6d167"
    },
  });

  Vue.mixin({
    created: function() {
      this.gsap = gsap;
    },
  });

  Vue.component("Layout", DefaultLayout);

  router.afterEach(() => {
    store.commit("setIsDrawer", false);
  });
}
