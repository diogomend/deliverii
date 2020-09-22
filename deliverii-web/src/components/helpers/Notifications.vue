<template>
  <div v-if="alerts.length" class="alert-container">
    <transition-group name="expand" tag="div">
      <div v-for="(alert, i) in alerts" :key="i" class="box-container">
        <toast-message
          :message="alert.message"
          :type="alert.type"
        ></toast-message>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ToastMessage from "@/components/helpers/ToastMessage";
export default {
  name: "Notification",
  components: {
    ToastMessage
  },
  computed: {
    ...mapGetters({
      alerts: "appState/getAlerts"
    })
  },
  methods: {
    ...mapActions("alert", ["removeAlert"]),
    getColor(alert) {
      if (alert.type === "error") {
        return "red";
      }

      return "green";
    }
  }
};
</script>
