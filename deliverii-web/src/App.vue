<template>
  <v-app style="background: rgb(238, 238, 238);">
    <notifications></notifications>
    <app-bar></app-bar>
    <dashboard-core-drawer v-if="isLoggedIn"></dashboard-core-drawer>
    <v-content class="mt-5">
      <router-view />
    </v-content>
  </v-app>
</template>
<script>
import AppBar from "@/components/core/AppBar";
import DashboardCoreDrawer from "@/components/core/Drawer";
import { mapGetters, mapActions } from "vuex";
import Notifications from "@/components/helpers/Notifications";
export default {
  components: {
    AppBar,
    DashboardCoreDrawer,
    Notifications
  },
  data: () => {
    return {};
  },
  methods: {
    ...mapActions("appState", ["toggleLoading"]),
    ...mapActions("auth", ["loadSession"])
  },
  computed: {
    ...mapGetters({
      isLoading: "appState/getLoadingSession",
      isLoggedIn: "auth/isLoggedIn"
    })
  },
  beforeMount() {
    //this.toggleLoading(true);
    this.loadSession();
    //this.toggleLoading(true);
  }
};
</script>

<style>
body {
  background: #cccccc;
}
</style>
