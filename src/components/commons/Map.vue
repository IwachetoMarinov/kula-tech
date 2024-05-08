<template>
  <!-- <div>
      <h2>Vue Js Search and Add Marker</h2>
      <label>
        <gmap-autocomplete @place_changed="initMarker"></gmap-autocomplete>
        <button @click="addLocationMarker">Add</button>
      </label>
      <br/>
 
    </div> -->
  <gmap-map
    ref="mapRef"
    v-if="center"
    :zoom="13"
    :center="center"
    :options="options"
  >
    <template v-if="locationMarkers && locationMarkers.length">
      <gmap-marker
        :key="index"
        v-for="(m, index) in locationMarkers"
        :position="m.position"
        @click="onMarker(m.position)"
        :icon="m.icon"
        :label="m.label"
      ></gmap-marker>
    </template>
    <!-- <template v-if="polygons && polygons.length">
      <gmap-polygon
        v-for="(p, index) in polygons"
        :key="'polygon' + index"
        :paths="p"
        :options="polygonOptions"
        :ref="'polygon' + index"
        @mouseout="polygonMouseOut(index)"
        @mouseover="changePolygonStyle({ index, isCenter: false })"
      >
      </gmap-polygon>
    </template> -->
  </gmap-map>
</template>

<script>
import { EventBus } from "@/event-bus";

export default {
  name: "GoogleMap",
  props: {
    locationMarkers: {
      type: Array,
      require: true,
    },
    isCityPage: {
      type: Boolean,
      default: false,
    },
    firstBuilding: {
      type: Object,
      default: null,
    },
    polygons: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      options: {
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        disableDefaultUi: false,
        mapId: "6d5756c871a6d167",
        // styles: [
        //   {
        //     featureType: "all",
        //     elementType: "labels",
        //     stylers: [
        //       {
        //         visibility: "off",
        //       },
        //     ],
        //   },
        //   {
        //     featureType: "administrative",
        //     elementType: "all",
        //     stylers: [
        //       {
        //         visibility: "off",
        //       },
        //       {
        //         color: "#efebe2",
        //       },
        //     ],
        //   },
        //   {
        //     featureType: "administrative.country",
        //     elementType: "labels.text.fill",
        //     stylers: [
        //       {
        //         color: "#b91717",
        //       },
        //     ],
        //   },
        //   {
        //     featureType: "administrative.province",
        //     elementType: "labels.text.fill",
        //     stylers: [
        //       {
        //         color: "#cf1515",
        //       },
        //     ],
        //   },
        //   {
        //     featureType: "administrative.locality",
        //     elementType: "geometry.fill",
        //     stylers: [
        //       {
        //         visibility: "off",
        //       },
        //     ],
        //   },
        //   {
        //     featureType: "administrative.locality",
        //     elementType: "labels.text.fill",
        //     stylers: [
        //       {
        //         hue: "#ff0000",
        //       },
        //     ],
        //   },
        //   {
        //     featureType: "administrative.neighborhood",
        //     elementType: "geometry.fill",
        //     stylers: [
        //       {
        //         visibility: "off",
        //       },
        //     ],
        //   },
        //   {
        //     featureType: "administrative.neighborhood",
        //     elementType: "labels.text.fill",
        //     stylers: [
        //       {
        //         visibility: "off",
        //       },
        //       {
        //         color: "#722525",
        //       },
        //     ],
        //   },
        //   {
        //     featureType: "administrative.land_parcel",
        //     elementType: "labels.text.fill",
        //     stylers: [
        //       {
        //         visibility: "on",
        //       },
        //       {
        //         color: "#c10f0f",
        //       },
        //     ],
        //   },
        //   {
        //     featureType: "landscape",
        //     elementType: "all",
        //     stylers: [
        //       {
        //         color: "#efebe2",
        //       },
        //     ],
        //   },
        //   {
        //     featureType: "poi",
        //     elementType: "all",
        //     stylers: [
        //       {
        //         color: "#efebe2",
        //       },
        //     ],
        //   },
        //   {
        //     featureType: "poi.attraction",
        //     elementType: "all",
        //     stylers: [
        //       {
        //         color: "#efebe2",
        //       },
        //     ],
        //   },
        //   {
        //     featureType: "poi.business",
        //     elementType: "all",
        //     stylers: [
        //       {
        //         color: "#efebe2",
        //       },
        //     ],
        //   },
        //   {
        //     featureType: "poi.government",
        //     elementType: "all",
        //     stylers: [
        //       {
        //         color: "#dfdcd5",
        //       },
        //     ],
        //   },
        //   {
        //     featureType: "poi.medical",
        //     elementType: "all",
        //     stylers: [
        //       {
        //         color: "#dfdcd5",
        //       },
        //     ],
        //   },
        //   {
        //     featureType: "poi.park",
        //     elementType: "all",
        //     stylers: [
        //       {
        //         color: "#bad294",
        //       },
        //     ],
        //   },
        //   {
        //     featureType: "poi.place_of_worship",
        //     elementType: "all",
        //     stylers: [
        //       {
        //         color: "#efebe2",
        //       },
        //     ],
        //   },
        //   {
        //     featureType: "poi.school",
        //     elementType: "all",
        //     stylers: [
        //       {
        //         color: "#efebe2",
        //       },
        //     ],
        //   },
        //   {
        //     featureType: "poi.sports_complex",
        //     elementType: "all",
        //     stylers: [
        //       {
        //         color: "#efebe2",
        //       },
        //     ],
        //   },
        //   {
        //     featureType: "road.highway",
        //     elementType: "geometry.fill",
        //     stylers: [
        //       {
        //         color: "#ffffff",
        //       },
        //     ],
        //   },
        //   {
        //     featureType: "road.highway",
        //     elementType: "geometry.stroke",
        //     stylers: [
        //       {
        //         visibility: "off",
        //       },
        //     ],
        //   },
        //   {
        //     featureType: "road.arterial",
        //     elementType: "geometry.fill",
        //     stylers: [
        //       {
        //         color: "#000000",
        //       },
        //       {
        //         visibility: "off",
        //       },
        //     ],
        //   },
        //   {
        //     featureType: "road.arterial",
        //     elementType: "geometry.stroke",
        //     stylers: [
        //       {
        //         visibility: "off",
        //       },
        //     ],
        //   },
        //   {
        //     featureType: "road.arterial",
        //     elementType: "labels.text.fill",
        //     stylers: [
        //       {
        //         visibility: "on",
        //       },
        //     ],
        //   },
        //   {
        //     featureType: "road.local",
        //     elementType: "geometry.fill",
        //     stylers: [
        //       {
        //         color: "#fbfbfb",
        //       },
        //     ],
        //   },
        //   {
        //     featureType: "road.local",
        //     elementType: "geometry.stroke",
        //     stylers: [
        //       {
        //         visibility: "off",
        //       },
        //     ],
        //   },
        //   {
        //     featureType: "transit",
        //     elementType: "all",
        //     stylers: [
        //       {
        //         visibility: "off",
        //       },
        //     ],
        //   },
        //   {
        //     featureType: "water",
        //     elementType: "all",
        //     stylers: [
        //       {
        //         color: "#a5d7e0",
        //       },
        //     ],
        //   },
        // ],
      },
      paths: [],
      polygonOptions: {
        strokeOpacity: 0.8,
        strokeWeight: 1.6,
        strokeColor: "#a14d73",
        fillColor: "rgb(213,176,179)",
        fillOpacity: 0.2,
      },
      center: { lat: 1.39, lng: 103.81 },
      locPlaces: [],
      existingPlace: null,
    };
  },
  methods: {
    onMarker(pos) {
      // this.center = pos;
      this.$emit("changeSelectedMarker", pos);
    },
    polygonMouseOut(index) {
      this.$refs["polygon" + index][0].$polygonObject.setOptions({
        fillOpacity: 0.2,
      });
    },
    changePolygonStyle(val) {
      if (
        val.index == undefined ||
        !this.$refs["polygon" + val.index] ||
        !this.$refs["polygon" + val.index][0]
      )
        return;
      for (let j = 0; j < this.polygons.length; j++) {
        this.$refs["polygon" + j][0].$polygonObject.setOptions({
          fillOpacity: val.index == j ? 0.4 : 0.2,
        });
      }
      if (val.isCenter) {
        this.center = this.polygons[val.index][0];
        window.scroll({
          top: 0,
          behavior: "smooth",
        });
      }
    },
    // initMarker(loc) {
    //   this.existingPlace = loc;
    // },
    // addLocationMarker() {
    //   if (this.existingPlace) {
    //     const marker = {
    //       lat: this.existingPlace.geometry.location.lat(),
    //       lng: this.existingPlace.geometry.location.lng(),
    //     };
    //     this.locationMarkers.push({ position: marker });
    //     this.locPlaces.push(this.existingPlace);
    //     this.center = marker;
    //     this.existingPlace = null;
    //   }
    // },
    // locateGeoLocation: function() {
    //   navigator.geolocation.getCurrentPosition((res) => {
    //     this.center = {
    //       lat: res.coords.latitude,
    //       lng: res.coords.longitude,
    //     };
    //   });
    // },
  },
  watch: {
    // center(val) {
    // if (!this.isCityPage) return;
    // console.log("watch");
    // this.$emit("changeSelectedMarker", val);
    // },
    locationMarkers(val) {
      if (this.isCityPage) return;
      this.center = val[0].position;
    },
  },
  mounted() {
    EventBus.$on("onNeighborhood", this.changePolygonStyle);
    if (!this.isCityPage) return;
    if (!this.locationMarkers || !this.locationMarkers.length) {
      this.center = {
        lat: this.firstBuilding.buildingLocation.lat,
        lng: this.firstBuilding.buildingLocation.lon,
      };
    } else {
      this.center = this.locationMarkers[0].position;
    }
  },
};
</script>
