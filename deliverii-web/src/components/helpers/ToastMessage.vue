<template>
  <div>
    <v-snackbar
      v-model="show"
      :color="getColor()"
      right
      top
      @click.native="show = false"
    >
      {{ message }}
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: "NotificationCard",
  props: {
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      show: true
    };
  },
  methods: {
    getColor() {
      if (this.type === "error") {
        return "red";
      }

      return "green";
    }
  }
};
</script>
