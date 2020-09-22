<template>
  <div class="text-center">
    <v-dialog v-model="dialogModal" width="500">
      <v-card>
        <v-card-title>
          <slot name="title" />
        </v-card-title>

        <v-card-text>
          <slot name="description" />
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer />
          <v-btn color="white" class="cancel-btn" @click="dialogModal = false">
            Cancel
          </v-btn>
          <v-btn color="error" :disabled="processing" @click="confirmDialog()">
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "ConfirmDialog",
  props: {
    open: {
      required: true,
      type: Boolean
    }
  },
  data() {
    return {
      processing: false
    };
  },
  computed: {
    dialogModal: {
      get() {
        return this.open;
      },
      set() {
        return this.$emit("close", true);
      }
    }
  },
  methods: {
    confirmDialog() {
      this.processing = true;
      return this.$emit("confirm", true);
    }
  }
};
</script>

<style scoped>
.v-card__title {
  background: #ff1744;
  color: white;
}

.v-card__text {
  font-size: 16px;
  margin-top: 15px;
}
</style>
