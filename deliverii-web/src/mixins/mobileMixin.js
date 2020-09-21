const mobileMixin = {
  computed: {
    isMobile() {
      if (this.$vuetify.breakpoint) {
        const breakpoint = this.$vuetify.breakpoint.name;
        return breakpoint === "xs" || breakpoint === "sm";
      }
      return false;
    }
  }
};

export default mobileMixin;
