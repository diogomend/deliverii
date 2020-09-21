<template>
  <v-container id="dashboard" fluid tag="section">
    <v-row>
      <v-col cols="12" lg="12" mb="5">
        <orders-list></orders-list>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import OrdersList from "@/components/OrdersList";
export default {
  components: {
    OrdersList
  }
};
</script>
