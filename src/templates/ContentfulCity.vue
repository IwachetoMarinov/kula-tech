<template>
  <CityLayout>
    <section :key="pageKey" class="page-wrap page-city">
      <city-page :page="$page.city" />
    </section>
  </CityLayout>
</template>

<script>
import CityLayout from "../layouts/CityLayout.vue";
import CityPage from "../components/city/CityPage.vue";

export default {
  components: { CityLayout, CityPage },
  data() {
    return {
      breadcrumb: null,
      pageKey: true,
    };
  },
  async mounted() {
    this.breadcrumb = [
      { url: "/", txt: null },
      { url: "", txt: this.$page.city.name },
    ];
    this.$store.commit("setBreadcrumb", this.breadcrumb);
    this.$store.commit("initFilterBy");
    this.$store.commit("setRoomTypes", {
      buildings: this.$page.city.buildings,
    });
    await this.$store.commit("setCurrency", this.$page.city.currency);
    await this.$store.dispatch("setFilterBy", {
      isBtn: true,
      setFilterBy: {
        type: "selectedBuilding",
        value: null,
      },
      isInit: true,
    });
    await this.$store.dispatch("setFilterBy", {
      isBtn: false,
      setFilterBy: {
        type: "buildingCode",
        value: null,
      },
      isInit: true,
    });
  },
  watch: {
    async "$route.params.slug"(val) {
      await this.$store.dispatch("getAvailability");
      this.pageKey = !this.pageKey;
    },
  },
  metaInfo() {
    if (!this.$page.city) return;
    const pathUrl = `${this.$store.getters.baseDomain}${this.$route.path}`;
    return {
      title: this.$page.city.seo.title,
      meta: [{ name: "description", content: this.$page.city.seo.description }],
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

<page-query>
query City ($path: String!) {
  city: contentfulCity (path: $path) {
    name,
    slug,
    mewsId,
    description {
      initialDescription,
      expendedDescription
    },
    image {
      title,
      file {
        url
      }
    },
    currency {
      currencyType,
      currencySymbol
    },
    neighborhoods {
      name,
      slug,
      oneLineDescription,
      gallery {
        title,
        file {
          url
        }
      },
      features {
        title,
        content,
        image {
          title,
          file {
            url,
          }
        },
      },
      polygon {
        points {
          lat,
          lng
        }
      }
    },
    buildings {
      name,
      slug,
      mewsId,
      rateVoucher,
      gallery {
        title,
        file {
          url
        }
      },
      address {
        street,
        neighborhood {
          name,
          oneLineDescription
        },
      },
      buildingLocation {
        lat,
        lon,
      },
      buildingAmenities,
      apartments {
        name,
        mewsId,
        minPrice
      },
      tag {
        title,
        icon {
          title,
          file {
            url
          }
        }
      }
    },
    stayMorePayLess {
      title,
      content,
      discountPerNight {
        percentageDiscount,
        numberOfNights
      }
    },
    cancellationPolicy {
      title,
      content,
      image {
        title,
        file {
          url
        }
      }
    },
    minimumStay {
      title,
      content,
      image {
        title,
        file {
          url
        }
      }
    },
    seo {
      title,
      description
    }
  }
}
</page-query>
