<template>
  <v-container>
    <loading-page v-if="isLoading"></loading-page>
    <error-page v-else-if="errorState"></error-page>
    <template v-else>
      <v-row>
        <v-col cols="12" lg="6" mb="5">
          <v-card>
            <v-card-title>
              <div class="heading pt-3 pl-3">Order Info</div>
            </v-card-title>
            <v-card-text>
            <order-info
                :orderID="orderID"
                :address="order.address"
                :status="order.status"
                :created="order.created"
                :history="order.historyStatus"
                @statusChanged="statusChanged"
              ></order-info>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" lg="6" mb="5">
           <v-card>
             <v-card-title>
              <div class="heading pt-3 pl-3">Meals</div>
            </v-card-title>
            <v-card-text>
              <order-meals :cart="meals"></order-meals>
            </v-card-text>
           </v-card>
           <v-card class="mt-10">
            <v-card-title>
              <div class="heading pt-3 pl-3">Customer Info</div>
            </v-card-title>
            <v-card-text class="ml-2">
              <table class="info-table">
                <tr>
                  <td class="first-col">Name:</td>
                  <td>{{ customer.name }}</td>
                </tr>
                <tr>
                  <td class="first-col">Email:</td>
                  <td>{{ customer.email }}</td>
                </tr>
              </table>
              <v-spacer></v-spacer>

              <v-fab-transition>
              <v-btn
                v-if="!isBlacklisted"
                color="error"
                dark
              
                @click="openModal = true"
              >
                Blacklist Customer
              </v-btn>
              <v-btn color="error" bottom disabled
                >Customer blacklisted</v-btn
              >
            </v-fab-transition>
            </v-card-text>
           </v-card>
        </v-col>
      </v-row>
    </template>
    <confirm-dialog
      :open="openModal"
      @close="openModal = false"
      @confirm="confirmBlacklist"
    >
      <div slot="title">Wish to blacklist customer?</div>
      <div slot="description">
        This action could not be reversed and customer won't be able to place
        any more orders for this restaurant
      </div>
    </confirm-dialog>
  </v-container>
</template>

<script>
import { formatDate } from "@/plugins/dayjs";
import { GET_NEXT_STATE } from "@/config/config";
import { mapActions } from "vuex";
import ErrorPage from "@/components/ErrorPage";
import LoadingPage from "@/components/LoadingPage";
import ConfirmDialog from "@/components/helpers/ConfirmDialog";
import OrderInfo from "@/components/OrderInfo";
import OrderMeals from "@/components/OrderMeals";

export default {
  name: "AdminOrder",
  components: {
    ErrorPage,
    LoadingPage,
    ConfirmDialog,
    OrderInfo,
    OrderMeals
  },
  props: {
    orderID: {
      type: String,
      required: true
    }
  },
  data: () => ({
    isLoading: true,
    order: false,
    processing: false,
    address: {},
    date: null,
    status: null,
    historyStatus: [],
    totalPrice: 0,
    meals: [],
    restaurant: null,
    customer: null,
    openModal: false
  }),
  computed: {
    errorState() {
      return !this.isLoading && !this.order;
    },
    isBlacklisted() {
      return this.restaurant.blacklists.some(
        blacklist => blacklist._id == this.customer._id
      );
    },
    nextState() {
      return GET_NEXT_STATE(this.status);
    }
  },
  methods: {
    ...mapActions("order", ["fetchOrder", "updateStatus"]),
    ...mapActions("restaurant", ["addBlacklist"]),
    async confirmBlacklist() {
      await this.addBlacklist({
        restaurantID: this.restaurant._id,
        customerID: this.customer._id
      });
      await this.getOrderInfo();
      this.openModal = false;
    },
    async updateOrderState() {
      const { status } = this.nextState;
      await this.updateStatus({ orderID: this.orderID, status: status });
      await this.getOrderInfo();
    },
    async statusChanged() {
      return await this.getOrderInfo();
    },
    async getOrderInfo() {
      const order = await this.fetchOrder(this.orderID);
      if (order) {
        this.order = order;
        this.address = order.address;
        this.date = formatDate(order.created);
        this.customer = order.customer;
        this.meals = this.order.meals.map(mealObj => {
            return { quantity: mealObj.quantity, ...mealObj.meal };
        });
        this.restaurant = order.restaurant;
        this.status = order.status;
        this.historyStatus = order.historyStatus.map(historyStatus => {
          return {
            status: historyStatus.status,
            date: formatDate(historyStatus.date)
          };
        });
      }
    }
  },
  async mounted() {
    await this.getOrderInfo();
    this.isLoading = false;
  }
};
</script>

<style lang="scss" scoped>
.info-table {
  width: 100%;
  td {
    vertical-align: top;
    padding: 10px 0;
    p {
      margin-bottom: 0;
    }
  }
  .first-col {
    font-weight: bold;
    max-width: 100px;
  }
}
</style>
