<template>
  <v-container id="dashboard" fluid tag="section">
    <loading-page v-if="isLoading"></loading-page>
    <div v-else-if="!order">
      <error-page />
    </div>
    <v-row v-else>
      <v-col xs="12" sm="6">
        <v-card>
          <v-card-title>Order Details</v-card-title>
          <order-info
            :orderID="order._id"
            :address="order.address"
            :status="order.status"
            :created="order.created"
            :history="order.historyStatus"
            @statusChanged="statusChanged"
          ></order-info>
        </v-card>
      </v-col>
      <v-col xs="12" sm="6">
        <v-card>
          <v-card-title>Meals</v-card-title>
          <order-meals :cart="meals"></order-meals>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import OrderMeals from "@/components/OrderMeals";
import OrderInfo from "@/components/OrderInfo";
import LoadingPage from "@/components/LoadingPage";
import ErrorPage from "@/components/ErrorPage";
export default {
  name: "OrderConfirm",
  components: {
    LoadingPage,
    OrderMeals,
    ErrorPage,
    OrderInfo
  },
  props: {
    id: {
      required: true
    }
  },
  data() {
    return {
      restaurant: null,
      meals: [],
      processingOrder: false,
      order: false
    };
  },
  methods: {
    ...mapActions("appState", ["toggleLoading"]),
    ...mapActions("order", ["fetchOrder"]),
    async statusChanged() {
      await this.getOrder();
    },
    async getOrder() {
        this.toggleLoading(true);
        const ret = await this.fetchOrder(this.id);
        if (ret) {
            this.order = ret;
            this.meals = this.order.meals.map(mealObj => {
                return { quantity: mealObj.quantity, ...mealObj.meal };
            });
        }
        this.toggleLoading(false);
    }
  },
  computed: {
    ...mapGetters({
      isLoading: "appState/getLoadingSession"
    })
  },
  async mounted() {
    await this.getOrder();
  }
};
</script>

<style lang="scss" scoped>
/deep/ a.v-card--link {
  margin-top: 0 !important;
}
</style>
