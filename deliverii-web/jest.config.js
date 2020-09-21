module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  collectCoverage: true,
  collectCoverageFrom: [
    "src/*.vue",
    "src/components/**/*",
    "src/store/**",
    "src/service/*"
  ]
};
