<template>
  <v-container id="dashboard" fluid tag="section">
    <loading-page v-if="isLoading"></loading-page>
    <v-row>
      <v-col xs="12" sm="6">
        <v-card>
          <v-card-title>Delivery</v-card-title>
          <v-card-subtitle
            >To finish the order, please fill in your address
            information</v-card-subtitle
          >
          <address-form @confirm="confirmOrder"></address-form>
        </v-card>
      </v-col>
      <v-col xs="12" sm="6">
        <v-card>
          <v-card-title>Order</v-card-title>
          <order-meals :cart="cartObj.cart"></order-meals>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AddressForm from "@/components/AddressForm";
import OrderMeals from "@/components/OrderMeals";
import LoadingPage from "@/components/LoadingPage";
export default {
  name: "OrderConfirm",
  components: {
    LoadingPage,
    AddressForm,
    OrderMeals
  },
  data() {
    return {
      restaurant: null,
      meals: [],
      processingOrder: false
    };
  },
  methods: {
    ...mapActions("appState", ["toggleLoading"]),
    ...mapActions("order", ["loadCart", "makeOrder"]),
    async confirmOrder() {
      const orderID = await this.makeOrder();
      if (orderID) {
        return this.$router.push(`/order/${orderID}`);
      }
    }
  },
  computed: {
    ...mapGetters({
      isLoading: "appState/getLoadingSession",
      cartObj: "order/getCart"
    }),
    hasCart() {
      return this.cartObj && this.cartObj.cart;
    }
  },
  async mounted() {
    this.toggleLoading(true);
    if (!this.hasCart) {
      await this.loadCart();

      //Still no cart, redirect
      if (!this.hasCart) {
        return this.$router.push("/");
      }
    }

    this.toggleLoading(false);
  }
};
</script>

<style lang="scss" scoped>
/deep/ a.v-card--link {
  margin-top: 0 !important;
}
</style>
