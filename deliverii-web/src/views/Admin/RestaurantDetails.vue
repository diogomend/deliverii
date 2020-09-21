<template>
  <v-container id="dashboard" fluid tag="section">
    <error-page v-if="errorState"></error-page>
    <template v-else>
      <v-row>
        <v-col cols="12" lg="6" mb="5">
          <meals-list :id="id"></meals-list>
        </v-col>
        <v-col cols="12" lg="6" mb="5">
          <orders-list :restaurant="id"></orders-list>
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import ErrorPage from "@/components/ErrorPage";
import MealsList from "@/components/MealsList";
import OrdersList from "@/components/OrdersList";
export default {
  components: {
    ErrorPage,
    MealsList,
    OrdersList
  },
  props: ["id"],
  data() {
    return {
      restaurant: false,
      isLoading: true
    };
  },
  methods: {
    ...mapActions("restaurant", ["fetchRestaurantInfo"])
  },
  computed: {
    errorState() {
      return !this.isLoading && !this.restaurant;
    }
  },
  async mounted() {
    const restaurant = await this.fetchRestaurantInfo(this.id);
    if (restaurant) {
      this.restaurant = restaurant;
    }
    this.isLoading = false;
  }
};
</script>
