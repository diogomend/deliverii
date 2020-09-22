module.exports = {
  setupFilesAfterEnv: ["<rootDir>/tests/unit/setup.js"],
  preset: "@vue/cli-plugin-unit-jest",
  collectCoverage: true,
  collectCoverageFrom: [
    "src/*.vue",
    "src/components/**/*",
    "src/store/**",
    "src/service/*"
  ],
  transform: {
    'vee-validate/dist/rules': 'babel-jest',
  },
  transformIgnorePatterns: [
    '<roodDir>/node_modules/(?!vee-validate/dist/rules)',
  ],
};
