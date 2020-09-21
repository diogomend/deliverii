<template>
  <v-container id="dashboard" fluid tag="section">
    <v-row>
      <v-col cols="12" lg="6" mb="5">
        <restaurant-list></restaurant-list>
      </v-col>
      <v-col cols="12" lg="6">
        <orders-list></orders-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import RestaurantList from "@/components/RestaurantList";
import OrdersList from "@/components/OrdersList";
export default {
  name: "AdminHome",
  components: {
    RestaurantList,
    OrdersList
  }
};
</script>
