<template>
  <v-app-bar id="app-bar" absolute app color="transparent" flat height="75">
    <v-btn
      class="mr-3"
      elevation="1"
      fab
      small
      @click="toggleDrawer(!drawer)"
      v-if="isMobile && isLoggedIn"
    >
      <v-icon v-if="value">
        mdi-view-quilt
      </v-icon>

      <v-icon v-else>
        mdi-dots-vertical
      </v-icon>
    </v-btn>

    <v-toolbar-title
      class="hidden-sm-and-down font-weight-light"
      v-text="$route.name"
    />

    <v-spacer />

    <v-btn v-if="isLoggedIn" @click="doLogout">
      <v-icon class="mr-5">mdi-account</v-icon>
      Logout
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import MobileMixin from "@/mixins/mobileMixin";
export default {
  name: "AppBar",
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  mixins: [MobileMixin],

  computed: {
    ...mapGetters({
      drawer: "appState/drawer",
      isLoggedIn: "auth/isLoggedIn"
    })
  },

  methods: {
    ...mapActions("appState", ["toggleDrawer"]),
    ...mapActions("auth", ["logout"]),
    doLogout() {
      this.logout();
      this.$router.push("/login");
    }
  }
};
</script>
