<template>
  <BuildingLayout>
    <section class="page-wrap page-building">
      <building-page :page="$page.building" />
    </section>
  </BuildingLayout>
</template>

<script>
import BuildingLayout from "../layouts/BuildingLayout.vue";
import BuildingPage from "../components/building/BuildingPage.vue";

export default {
  components: {
    BuildingPage,
    BuildingLayout,
  },
  data() {
    return {
      breadcrumb: null,
    };
  },
  computed: {
    cities() {
      return this.$page.cities.edges.map((city) => {
        return {
          mewsId: city.node.mewsId,
          slug: city.node.slug,
          buildings: city.node.buildings,
          name: city.node.name,
          currency: city.node.currency,
        };
      });
    },
  },
  async mounted() {
    console.log("building", this.$page.building);
    const city = this.cities.find(
      (city) => city.name === this.$page.building.address.city
    );
    this.breadcrumb = [{ url: "/", txt: null }];
    if (city)
      this.breadcrumb.push({ url: "/city/" + city.slug, txt: city.name });
    this.breadcrumb.push({
      url: "",
      txt: this.$page.building.name,
    });

    this.$store.commit("setBreadcrumb", this.breadcrumb);
    await this.$store.commit("initFilterBy");
    this.$store.commit("setRoomTypes", { buildings: [this.$page.building] });
    if (city) {
      await this.$store.dispatch("setFilterBy", {
        isBtn: true,
        setFilterBy: {
          type: "citySelected",
          value: {
            mewsId: city.mewsId,
            slug: city.slug,
            buildings: city.buildings,
          },
        },
      });
      this.$store.commit("setCurrency", city.currency);
    }
  },
  async created() {
    await this.$store.dispatch("setFilterBy", {
      isBtn: true,
      setFilterBy: {
        type: "selectedBuilding",
        value: this.$page.building.mewsId,
      },
      isInit: true,
    });
    await this.$store.dispatch("setFilterBy", {
      isBtn: false,
      setFilterBy: {
        type: "buildingCode",
        value: this.$page.building.rateVoucher,
      },
      isInit: true,
    });
  },
  metaInfo() {
    if (!this.$page.building) return;
    const pathUrl = `${this.$store.getters.baseDomain}${this.$route.path}`;
    return {
      title: this.$page.building.seo.title,
      meta: [
        { name: "description", content: this.$page.building.seo.description },
      ],
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
query Building ($path: String!) {
  building: contentfulBuilding (path: $path) {
    name,
    slug,
    mewsId,
    rateVoucher,
    gallery {
      title,
      file {
        url,
      }
    },
    description {
      initialDescription,
      expendedDescription
    },
    buildingLocation {
      lat,
      lon,
    },
    transportation {
      title,
      description,
      icon {
        title,
        file {
          url
        }
      },
    },
    address {
      city,
      street,
      neighborhood {
        name,
        slug,
        fullDescription,
        gallery {
          title,
          file {
            url,
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
          }
        }
    }
    },
    amenitiesEnabled {
      title,
      category,
      icon {
        title,
        file {
          url
        }
      }
    },
    amenitiesDisabled {
      title,
      category,
      icon {
        title,
        file {
          url
        }
      }
    },
    disableAmenitiesCount,
    standardAmenityCategory {
      title,
      standardAmenity {
        title,
        available,
        image {
          title,
          file {
            url
          }
        }
      }
    },
    buildingPolicies {
      title,
      buildingPolicies {
        title,
        description,
        policy {
          title,
          image {
            title,
            file {
              url,
            }
          }
        }
      }
    },
    apartments {
      name,
      mewsId,
      minPrice,
      gallery {
        title,
        file {
          url,
        }
      },
      maxGuests,
      numberBathrooms,
      numberBedrooms,
      apartmentSize,
      sleepingArrangements {
        number, 
        sleepingArrangement {
          title,
          icon {
            title,
            file {
              url,
            }
          }
        }
      },
      amenities,
    }
    highDemand,
    morePlacesSortBy,
    stayMorePayLess {
      title,
      content,
      discountPerNight {
        percentageDiscount,
        numberOfNights
      }
    },
    actionBanner {
      title,
      content,
      image {
        title,
        file {
          url
        }
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
    }
    seo {
      title,
      description
    }
  }
  cities: allContentfulCity {
    edges {
      node {
        title,
        mewsId,
        slug,
        name,
        buildings {
          mewsId
        }, 
        currency {
          currencyType,
          currencySymbol
        },
      }
    }
  }
}
</page-query>
