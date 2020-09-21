<template>
  <v-container class="text-center" fill-height :style="height">
    <v-row align="center">
      <v-col>
        <slot name="title">
          <h1 class="display-2 primary--text">Whoops, 404</h1>
        </slot>
        <slot name="content">
          <p>The page you were looking for does not exist</p>
        </slot>
        <slot name="footer">
          <v-btn to="/" color="primary" outlined>
            Get me out of here!
          </v-btn>
        </slot>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ErrorPage",
  props: {
    height: {
      required: false,
      default: "height: calc(100vh - 200px);"
    }
  }
};
</script>
