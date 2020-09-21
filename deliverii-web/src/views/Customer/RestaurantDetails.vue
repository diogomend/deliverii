<template>
  <v-container id="dashboard" fluid tag="section">
    <loading-page v-if="isLoading"></loading-page>
    <div v-else-if="!restaurant">
      <error-page />
    </div>
    <v-row v-else>
      <v-col cols="12" xs="12" lg="8">
        <v-card>
          <v-card-title>Meals</v-card-title>
          <v-card-text>
            <template v-if="!meals.length">
              No meals available for this restaurant
            </template>
            <div v-for="(meal, i) in meals" :key="i" class="mt-5 mb-5">
              <meal
                :id="meal._id"
                :name="meal.name"
                :description="meal.description"
                :price="meal.price"
                :quantity="meal.quantity"
                @changeQuantity="changeQuantity"
              />
            </div>
            <template v-if="hasQuantity">
              <v-btn
                @click="placeOrder"
                :disabled="processingOrder"
                block
                color="primary"
              >
                Place order {{ totalPrice }}€</v-btn
              >
            </template>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" xs="0" lg="4" class="hidden-md-and-down">
        <restaurant-card
          :id="restaurant._id"
          :name="restaurant.name"
          :image="restaurant.image"
          :foodType="restaurant.foodType"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import LoadingPage from "@/components/LoadingPage";
import ErrorPage from "@/components/ErrorPage";
import RestaurantCard from "@/components/RestaurantCard";
import Meal from "@/components/Meal";
export default {
  name: "RestaurantDetails",
  components: {
    LoadingPage,
    ErrorPage,
    RestaurantCard,
    Meal
  },
  props: {
    id: {
      required: true
    }
  },
  data() {
    return {
      restaurant: null,
      meals: [],
      processingOrder: false
    };
  },
  methods: {
    ...mapActions("restaurant", ["fetchRestaurantInfo"]),
    ...mapActions("meal", ["fetchMeals"]),
    ...mapActions("appState", ["toggleLoading"]),
    ...mapActions("order", ["addCart"]),
    mapMeals(mealsResult) {
      return mealsResult.map(meal => {
        return { ...meal, quantity: 0 };
      });
    },
    changeQuantity({ id, qty }) {
      for (let i in this.meals) {
        if (this.meals[i]._id == id) {
          this.meals[i].quantity = qty;
        }
      }
    },
    placeOrder() {
      const meals = this.meals.filter(meal => meal.quantity > 0);
      this.addCart({ cart: meals, restaurantID: this.id });
      return this.$router.push("/orders/confirm");
    }
  },
  computed: {
    ...mapGetters({
      isLoading: "appState/getLoadingSession",
      allRestaurants: "restaurant/getRestaurants"
    }),
    hasQuantity() {
      return this.meals.some(meal => meal.quantity > 0);
    },
    totalPrice() {
      return parseFloat(
        this.meals.reduce(
          (accum, meal) => accum + meal.quantity * meal.price,
          0
        )
      ).toFixed(2);
    }
  },
  async mounted() {
    this.toggleLoading(true);
    this.restaurant = await this.fetchRestaurantInfo(this.id);
    const mealsResult = await this.fetchMeals(this.id);
    this.meals = this.mapMeals(mealsResult);
    this.toggleLoading(false);
  }
};
</script>

<style lang="scss" scoped>
/deep/ a.v-card--link {
  margin-top: 0 !important;
}
</style>
