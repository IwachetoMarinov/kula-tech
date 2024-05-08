<template>
  <div class="head-filter head-filter--room flex flex--start">
    <v-select
      v-if="roomTypes && isSelect"
      v-model="roomTypesSelected"
      :attach="attach"
      :items="roomTypes"
      :menu-props="{ top: false, offsetY: true, contentClass: 'v-menu-room-types' }"
      @change="updateRoomType"
      placeholder="Room types"
      multiple
      solo
    ></v-select>
    <div v-if="roomTypes && !isSelect">
      <div class="tx--18 mb--15">Room types</div>
      <div class="q_flex flex--start">
        <div
          class="mobile-room-type"
          :class="room.active ? 'active' : ''"
          v-for="(room, index) in roomTypesActive"
          :key="index"
          @click="updateRoomTypeMobile(index)"
        >
          {{ room.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RoomTypesFilter",
  props: {
    isBtn: {
      type: Boolean,
      default: false,
    },
    isSelect: {
      type: Boolean,
      default: true,
    },
    isClear: {
      type: Boolean,
      default: false,
    },
    attach: {
      type: String,
    },
  },
  data() {
    return {
      roomTypesSelected: null,
      roomTypesActive: null,
    };
  },
  computed: {
    roomTypes() {
      return this.$store.getters.roomTypes;
    },
  },
  methods: {
    async updateRoomType() {
      await this.$store.dispatch("setFilterBy", {
        isBtn: this.isBtn,
        setFilterBy: {
          type: "roomTypesSelected",
          value: this.roomTypesSelected,
        },
      });
      if (!this.isBtn) {
        const query = this.$store.getters.getQueryString;
        history.pushState({}, null, `${this.$route.path}?${query}`);
      }
    },
    updateRoomTypeMobile(i) {
      this.roomTypesActive[i].active = !this.roomTypesActive[i].active;
      this.roomTypesSelected = [];
      this.roomTypesActive.forEach((room) => {
        if (room.active) this.roomTypesSelected.push(room.name);
      });
      this.$emit("onRoomTypesSelected", this.roomTypesSelected);
      // this.$store.dispatch("setFilterBy", {
      //   isBtn: this.isBtn,
      //   setFilterBy: {
      //     type: "roomTypesSelected",
      //     value: this.roomTypesSelected,
      //   },
      // });
    },
  },
  watch: {
    "$store.getters.filterBy.roomTypesSelected"(val) {
      this.roomTypesSelected = val;
      this.roomTypesActive = this.$store.getters.roomTypes.map((room) => {
        let active = false;
        if (val && val.length) {
          const find = val.find((r) => r.trim() === room.trim());
          if (find) active = true;
        }
        return { name: room, active };
      });
    },
    isClear(val) {
      if (!val) return;
      this.roomTypesActive = this.$store.getters.roomTypes.map((room) => {
        let active = false;
        return { name: room, active };
      });
    },
  },
  mounted() {
    if (this.$route.query && this.$route.query.room_types) {
      this.roomTypesSelected = JSON.parse(
        decodeURIComponent(this.$route.query.room_types)
      );
      this.$store.dispatch("setFilterBy", {
        isBtn: true,
        setFilterBy: {
          type: "roomTypesSelected",
          value: this.roomTypesSelected,
        },
        isInit: true
      });
    } else {
      this.roomTypesSelected = [];
    }
    // this.roomTypesSelected = this.$store.getters.filterBy.roomTypesSelected;
    this.roomTypesActive = this.$store.getters.roomTypes.map((room) => {
      let active = false;
      if (this.roomTypesSelected && this.roomTypesSelected.length) {
        const find = this.roomTypesSelected.find(
          (r) => r.trim() === room.trim()
        );
        if (find) active = true;
      }
      return { name: room, active };
    });
  },
};
</script>
