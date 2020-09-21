<template>
  <v-card>
    <v-card-title>
        <div class="heading pt-3 pl-3">Restaurants</div>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-card-text>
      <v-data-table
        :loading="isLoading"
        hide-default-footer
        :headers="headers"
        :items="items"
        :search="search"
      >
        <template v-slot:item.actions="props">
          <v-btn
            class="mx-2"
            fab
            dark
            small
            text
            color="blue"
            @click="viewRestaurantInfo(props.item)"
          >
            <v-icon dark>mdi-information</v-icon>
          </v-btn>
          <v-btn
            class="mx-2"
            fab
            dark
            small
            text
            color="orange"
            @click="editRestaurantInfo(props.item)"
          >
            <v-icon dark>mdi-lead-pencil</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card-text>
    <v-fab-transition absolute>
      <v-btn
        color="orange"
        dark
        absolute
        bottom
        right
        fab
        :to="createRestaurantURL()"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "RestaurantsList",
  data() {
    return {
      isLoading: true,
      search: "",
      headers: [
        {
          sortable: true,
          text: "#ID",
          value: "id",
          align: " d-none"
        },
        {
          sortable: true,
          text: "Restaurant",
          value: "name"
        },
        {
          sortable: false,
          text: "Description",
          value: "description"
        },
        {
          sortable: true,
          text: "Food Type",
          value: "foodType",
          align: "left"
        },
        {
          sortable: true,
          text: "",
          value: "actions",
          align: "center"
        }
      ],
      items: []
    };
  },
  methods: {
    ...mapActions("restaurant", ["fetchAll"]),
    mapRestaurants() {
      return this.getRestaurants.map(restaurant => {
        return {
          id: restaurant._id,
          name: restaurant.name,
          description: restaurant.description,
          foodType: restaurant.foodType
        };
      });
    },
    viewRestaurantInfo(value) {
      this.$router.push(`/admin/restaurants/${value.id}`);
    },
    editRestaurantInfo(value) {
      this.$router.push(`/admin/restaurants/${value.id}/edit`);
    },
    createRestaurantURL() {
      return `/admin/restaurants/create`;
    }
  },
  computed: {
    ...mapGetters({
      getRestaurants: "restaurant/getRestaurants"
    })
  },
  async mounted() {
    await this.fetchAll();
    this.isLoading = false;
    this.items = this.mapRestaurants();
  }
};
</script>
