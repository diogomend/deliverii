<template>
  <v-card>
    <v-card-title>
      <div class="heading pt-3 pl-3">Orders</div>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-card-text>
      <v-data-table
        :loading="isLoading"
        hide-default-footer
        :headers="headers"
        :items="items"
        :search="search"
      >
        <template v-slot:item.actions="props">
          <v-btn
            class="mx-2"
            fab
            dark
            small
            text
            color="blue"
            @click="viewOrder(props.item)"
          >
            <v-icon dark>mdi-information</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { formatDate } from "@/plugins/dayjs";
export default {
  name: "OrdersList",
  props: {
    restaurant: {
      required: false
    },
    userType: {
      required: false,
      default: 'manager'
    }
  },
  data() {
    return {
      isLoading: true,
      search: "",
      headers: [
        {
          sortable: true,
          text: "#ID",
          value: "id",
          align: " d-none"
        },
        {
          sortable: true,
          text: "Restaurant",
          value: "name",
          align: this.restaurant ? " d-none" : ""
        },
        {
          sortable: true,
          text: "Client",
          value: "client",
          align: !this.restaurant ? " d-none" : ""
        },
        {
          sortable: true,
          text: "Total Price",
          value: "totalPrice",
          align: "right"
        },
        {
          sortable: true,
          text: "Date",
          value: "date",
          align: "right"
        },
        {
          sortable: false,
          text: "Status",
          value: "status",
          align: "right"
        },
        {
          sortable: false,
          text: "",
          value: "actions",
          align: "right"
        }
      ],
      items: []
    };
  },
  methods: {
    ...mapActions("order", ["fetchAll"]),
    mapOrders() {
      return this.getOrders.map(order => {
        const date = formatDate(order.created);
        return {
          id: order._id,
          name: order.restaurant ? order.restaurant.name : "",
          totalPrice: `${order.totalPrice} €`,
          date,
          status: order.status,
          client: order.customer ? order.customer.name : "",
        };
      });
    },
    viewOrder(item) {
      if (this.userType === "manager") {
        return this.$router.push(`/admin/orders/${item.id}`);
      }

      return this.$router.push(`/order/${item.id}`);
      
    }
  },
  computed: {
    ...mapGetters({
      getOrders: "order/getOrders"
    }),
  },
  async mounted() {
    await this.fetchAll(this.restaurant);
    this.isLoading = false;
    this.items = this.mapOrders();
  }
};
</script>
