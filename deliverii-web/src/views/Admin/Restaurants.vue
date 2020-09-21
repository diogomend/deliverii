<template>
  <v-container id="dashboard" fluid tag="section">
    <v-row>
      <v-col cols="12" lg="12" mb="5">
        <restaurant-list></restaurant-list>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import RestaurantList from "@/components/RestaurantList";
export default {
  components: {
    RestaurantList
  }
};
</script>
