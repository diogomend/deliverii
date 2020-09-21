<template>
  <v-navigation-drawer
    id="core-navigation-drawer"
    v-model="showDrawer"
    :expand-on-hover="expandOnHover"
    :right="$vuetify.rtl"
    mobile-break-point="960"
    app
    width="260"
    v-bind="$attrs"
  >
    <v-divider class="mb-1" />

    <v-list dense nav>
      <v-list-item-group active-class="text--accent-4">
        <v-list-item v-for="(page, index) in items" :key="index" :to="page.to">
          <v-list-item-icon>
            <v-icon>{{ page.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ page.title }}</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <v-divider class="mb-2" />
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import MobileMixin from "@/mixins/mobileMixin";
import { ADMIN_DRAWER, USER_DRAWER } from "@/config/config";
export default {
  name: "DashboardCoreDrawer",

  props: {
    expandOnHover: {
      type: Boolean,
      default: false
    }
  },
  mixins: [MobileMixin],

  /*data: () => ({
    items: [
      {
        icon: "mdi-home",
        title: "Home",
        to: "/admin/"
      },
      {
        icon: "mdi-store",
        title: "Restaurants",
        to: "/admin/restaurants"
      },
      {
        icon: "mdi-food-variant",
        title: "Orders",
        to: "/admin/orders"
      },
    ]
  }),*/

  computed: {
    ...mapGetters({
      drawer: "appState/drawer",
      user: "auth/getUser"
    }),
    computedItems() {
      return this.items.map(this.mapItem);
    },
    items() {
      if (this.user.isManager) {
        return ADMIN_DRAWER;
      }

      return USER_DRAWER;
    },
    profile() {
      return {
        avatar: true,
        title: "avatar"
      };
    },
    showDrawer: {
      get() {
        return !this.isMobile || this.drawer;
      },
      set(value) {
        this.toggleDrawer(value);
      }
    }
  },

  methods: {
    mapItem(item) {
      return {
        ...item,
        children: item.children ? item.children.map(this.mapItem) : undefined,
        title: item.title
      };
    },
    ...mapActions("appState", ["toggleDrawer"])
  }
};
</script>

<style lang="sass">
@import '~vuetify/src/styles/tools/_rtl.sass'

#core-navigation-drawer
  .v-list-group__header.v-list-item--active:before
    opacity: .24

  .v-list-item
    &__icon--text,
    &__icon:first-child
      justify-content: center
      text-align: center
      width: 20px

      +ltr()
        margin-right: 24px
        margin-left: 12px !important

      +rtl()
        margin-left: 24px
        margin-right: 12px !important

  .v-list--dense
    .v-list-item
      &__icon--text,
      &__icon:first-child
        margin-top: 10px

  .v-list-group--sub-group
    .v-list-item
      +ltr()
        padding-left: 8px

      +rtl()
        padding-right: 8px

    .v-list-group__header
      +ltr()
        padding-right: 0

      +rtl()
        padding-right: 0

      .v-list-item__icon--text
        margin-top: 19px
        order: 0

      .v-list-group__header__prepend-icon
        order: 2

        +ltr()
          margin-right: 8px

        +rtl()
          margin-left: 8px
</style>
