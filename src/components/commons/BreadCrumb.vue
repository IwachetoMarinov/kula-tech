<template>
  <ul class="breadcrumb layout q_flex flex--start" v-if="breadcrumb">
    <template v-for="item in breadcrumb">
      <li
        class="breadcrumb-item q_flex flex--start"
        v-if="item.url"
        :key="item.txt"
      >
        <a @click="onUrl(item.url)" class="logo">
          <span class="q_title" v-if="item.url === '/'">K</span>
          <div v-else>{{ item.txt }}</div>
        </a>
        <div class="breadcrumb-sep">
          <g-image src="~/assets/image/arrow-r.svg" alt="arrow"></g-image>
        </div>
      </li>
      <li class="breadcrumb-item q_flex flex--start" v-else :key="item.txt">
        {{ item.txt }}
      </li>
    </template>
  </ul>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "BreadCrumb",
  computed: {
    ...mapGetters(["breadcrumb"]),
  },
  methods: {
    onUrl(url) {
      const query = this.$store.getters.getQuery;
      if (url.includes("/building") || url.includes("/city")) {
        this.$router.push({
          path: url,
          query,
        });
      } else {
        this.$router.push({
          path: url,
        });
      }
    },
  },
};
</script>
