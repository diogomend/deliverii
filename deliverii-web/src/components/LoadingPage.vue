<template>
  <v-container
    class="text-center"
    fill-height
    style="height: calc(100vh - 200px);"
  >
    <v-row align="center">
      <v-col>
        <v-progress-circular
          :size="70"
          :width="7"
          color="purple"
          indeterminate
          center
          style="width: 100%; margin: 0 auto"
        ></v-progress-circular>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "LoadingPage"
};
</script>
