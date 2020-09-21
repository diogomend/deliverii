<template>
  <v-card>
    <v-card-title>
      <div class="heading pt-3 pl-3">Meals</div>
    </v-card-title>
    <v-card-text>
      <v-data-table
        :loading="isLoading"
        hide-default-footer
        :headers="headers"
        :items="items"
        @click:row="handleClick"
      />
    </v-card-text>
    <v-fab-transition absolute>
      <v-btn
        color="orange"
        dark
        absolute
        bottom
        right
        fab
        :to="createMealUrl()"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "MealsList",
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isLoading: true,
      headers: [
        {
          sortable: true,
          text: "#ID",
          value: "id",
          align: " d-none"
        },
        {
          sortable: true,
          text: "Meal",
          value: "name"
        },
        {
          sortable: false,
          text: "Description",
          value: "description",
          align: "right"
        },
        {
          sortable: true,
          text: "Price",
          value: "price",
          align: "right"
        }
      ],
      items: []
    };
  },
  methods: {
    ...mapActions("meal", ["fetchMeals"]),
    mapMeals(meals) {
      return meals.map(meal => {
        return {
          id: meal._id,
          name: meal.name,
          description: meal.description,
          price: meal.price
        };
      });
    },
    createMealUrl() {
      return `/admin/restaurants/${this.id}/meal/create`;
    },
    handleClick(value) {
      this.$router.push(`/admin/restaurants/${this.id}/meals/${value.id}`);
    }
  },
  async mounted() {
    const meals = await this.fetchMeals(this.id);
    this.isLoading = false;
    this.items = this.mapMeals(meals);
  }
};
</script>
