<template>
  <v-card-text>
    <div v-for="(meal, i) in cart" :key="i" class="mt-5 mb-5">
      <meal
        :id="meal._id"
        :name="meal.name"
        :description="meal.description"
        :price="meal.price"
        :quantity="meal.quantity"
        readOnly="true"
      />
    </div>
    <div class="text-right">
      <v-card-subtitle> TOTAL: {{ orderTotal }}€</v-card-subtitle>
    </div>
  </v-card-text>
</template>
<script>
import Meal from "./Meal";
export default {
  name: "OrderMeals",
  components: {
    Meal
  },
  props: {
    cart: {
      required: true
    }
  },
  computed: {
    orderTotal() {
      if (this.cart && this.cart.length) {
        return parseFloat(
          this.cart.reduce(
            (accum, meal) => accum + meal.quantity * meal.price,
            0
          )
        ).toFixed(2);
      }

      return 0;
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/.v-card__subtitle {
  color: #ff9800 !important;
  font-weight: bold;
}
</style>
