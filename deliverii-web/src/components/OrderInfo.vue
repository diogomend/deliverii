<template>
  <v-card-text>
    <div class="mb-5">
      <div class="heading">Date</div>
      <div class="description">{{ getFormattedDate(created) }}</div>
    </div>
    <div class="mb-5">
      <div class="heading">Delivery Address</div>
      <div class="description">
            <p>{{ address.addr1 }}</p>
            <p>{{ address.addr2 }}</p>
            <p>{{ address.postCode }}, {{ address.city }}</p>
      </div>
    </div>
    <div class="mb-5">
      <div class="heading">Status</div>
      <div class="description">
        <v-btn disabled outlined>{{ status }}</v-btn>
        <template v-if="nextState">
          <v-btn
            :disabled="!isNextStateEnabled"
            color="primary"
            class="ml-5"
            @click="updateToNextStatus"
          >
            {{ nextState.status }}
          </v-btn>
        </template>
      </div>
    </div>
    <div class="mb-5">
      <div class="heading">History</div>
      <div class="description">
          <div v-for="(historySt, i) in history" :key="i">
              {{ getFormattedDate(historySt.date) }}: {{historySt.status}}
          </div>
      </div>
    </div>
    <div v-if="canCancel" class="mt-10">
        <v-btn color="error" bottom right @click="updateOrderState('Canceled')">
            Cancel
        </v-btn>
    </div>
  </v-card-text>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { formatDate } from "@/plugins/dayjs";
import { GET_NEXT_STATE } from "@/config/config";
export default {
  props: {
    orderID: {
      required: true
    },
    address: {
      required: true
    },
    status: {
      required: true
    },
    history: {
      required: true
    },
    created: {
      required: true
    },
    customer: {
      required: false
    }
  },
  methods: {
    ...mapActions("order", ["updateStatus"]),
    getFormattedDate(date) {
      return formatDate(date);
    },
    async updateToNextStatus() {
        const { status } = this.nextState;
        await this.updateOrderState(status);
    },
    async updateOrderState(status) {
      const ret = await this.updateStatus({
        orderID: this.orderID,
        status: status
      });
      if (ret) {
        this.$emit("statusChanged", status);
      }
    }
  },
  computed: {
    ...mapGetters({
      user: "auth/getUser"
    }),
    nextState() {
      return GET_NEXT_STATE(this.status);
    },
    canCancel() {
        return !this.user.isManager && this.status == "Placed";
    },
    isNextStateEnabled() {
      const nextState = this.nextState;

      return (
        (nextState.user === "user" && !this.user.isManager) ||
        (nextState.user === "manager" && this.user.isManager)
      );
    }
  }
};
</script>
<style scoped>
.heading {
  font-size: 16px;
  font-weight: bold;
}

.v-application p {
      margin-bottom: 0;
}
</style>
