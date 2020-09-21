<template>
  <v-container id="dashboard" fluid tag="section">
    <loading-page v-if="isLoading"></loading-page>
    <template v-else>
      <div v-if="!allRestaurants || !allRestaurants.length">
        <error-page :height="containerHeight">
          <h1 slot="title" class="display-2 primary--text">
            No restaurants available
          </h1>
          <p slot="content">
            No Deliverii restaurants are available at the moment
          </p>
          <p slot="footer"></p>
        </error-page>
      </div>
      <template v-else>
        <v-row class="filter-list">
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="filterName"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-select
              :items="items"
              label="Food Type"
              v-model="filterType"
            ></v-select>
          </v-col>
        </v-row>
        <div v-if="!restaurants.length">
          <error-page :height="containerHeight">
            <h1 slot="title" class="display-2 primary--text">No restaurants</h1>
            <p slot="content">No Restaurants matching your criteria</p>
            <v-btn slot="footer" color="orange" outlined @click="resetFilters"
              >Reset filters</v-btn
            >
          </error-page>
        </div>
        <v-row v-else>
          <v-col
            cols="12"
            lg="3"
            sm="6"
            mb="5"
            v-for="(restaurant, i) in restaurants"
            :key="i"
          >
            <restaurant-card
              :id="restaurant._id"
              :name="restaurant.name"
              :foodType="restaurant.foodType"
            />
          </v-col>
        </v-row>
      </template>
    </template>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import LoadingPage from "@/components/LoadingPage";
import RestaurantCard from "@/components/RestaurantCard";
import ErrorPage from "@/components/ErrorPage";
import { FOOD_TYPES } from "@/config/config";

export default {
  components: {
    LoadingPage,
    RestaurantCard,
    ErrorPage
  },
  data() {
    return {
      filterName: "",
      filterType: "All",
      items: ["All", ...FOOD_TYPES],
      containerHeight: "height: 50vh"
    };
  },
  methods: {
    ...mapActions("restaurant", ["fetchAll"]),
    ...mapActions("appState", ["toggleLoading"]),
    resetFilters() {
      this.filterName = "";
      this.filterType = "All";
    }
  },
  computed: {
    ...mapGetters({
      isLoading: "appState/getLoadingSession",
      allRestaurants: "restaurant/getRestaurants"
    }),
    restaurants() {
      return this.allRestaurants.filter(restaurant => {
        if (
          this.filterType !== "All" &&
          restaurant.foodType !== this.filterType
        ) {
          return false;
        }

        if (
          this.filterName !== "" &&
          !restaurant.name.toLowerCase().includes(this.filterName.toLowerCase())
        ) {
          return false;
        }

        return true;
      });
    }
  },
  async mounted() {
    this.toggleLoading(true);
    await this.fetchAll();
    this.toggleLoading(false);
  }
};
</script>

<style scoped>
.filter-list {
  background-color: rgba(255, 255, 255, 0.3);
  color: rgb(255, 152, 0);
}
</style>
