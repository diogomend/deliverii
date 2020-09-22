<template>
  <div class="d-flex">
    <div class="flex-grow-1">
      <div class="heading">{{ name }}</div>
      <div class="description">{{ description }}</div>
      <div v-if="!readOnly" class="mt-2">{{ price }}€</div>
    </div>
    <div class="d-flex" v-if="!readOnly">
      <v-btn small icon @click="decreaseQty" class="decrease">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <div class="quantity mx-3">{{ quantity }}</div>
      <v-btn small icon @click="increaseQty" class="increase">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </div>
    <div v-else>{{ quantity }}x {{ price }}€</div>
  </div>
</template>
<script>
export default {
  props: {
    id: {
      required: true
    },
    name: {
      required: true
    },
    description: {
      required: false
    },
    price: {
      required: false
    },
    quantity: {
      required: false,
      default: 0
    },
    readOnly: {
      required: false,
      default: false
    }
  },
  methods: {
    increaseQty() {
      this.$emit("changeQuantity", { id: this.id, qty: this.quantity + 1 });
    },
    decreaseQty() {
      this.$emit("changeQuantity", {
        id: this.id,
        qty: this.quantity > 0 ? this.quantity - 1 : 0
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.heading {
  font-size: 16px;
  font-weight: bold;
}

span.v-chip {
  margin: 5px 0 !important;
}
</style>
