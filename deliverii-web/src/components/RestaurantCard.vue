<template>
  <v-card
    class="mx-auto mt-5"
    max-width="450"
    :to="{ name: 'Restaurant Details Customer', params: { id } }"
  >
    <v-card-title color="orange">{{ name }}</v-card-title>

    <v-card-text class="text--primary">
      <v-layout row wrap class="text-left">
        <v-flex class="align-self-center ml-5">
          <div class="top-bands-attended">
            {{ foodType }}
          </div>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: "RestaurantCard",
  props: {
    id: {
      required: true
    },
    name: {
      required: true
    },
    foodType: {
      required: true
    },
    image: {
      required: false,
      default: ""
    }
  }
};
</script>

<style lang="scss" scoped>
.v-card__title {
  height: 100px;
  align-items: start;
}
.v-image {
  background-color: #fff3e6;
}
</style>
