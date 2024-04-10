const { defineConfig } = require("cypress");
const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");
const {
  preprocessor,
} = require("@badeball/cypress-cucumber-preprocessor/browserify");

async function setupNodeEvents(on, config) {
  await addCucumberPreprocessorPlugin(on, config);

  on("file:preprocessor", preprocessor(config));

  return config;
}

module.exports = defineConfig({
  viewportWidth: 1280,
  viewportHeight: 720,
  env: {
    url: "https://demo.nopcommerce.com/",
  },
  e2e: {
    video: true,
    setupNodeEvents,
    specPattern: "cypress/integration/BDD/*.feature",
  },
  fixturesFolder: "cypress/fixtures",
  supportFileExtensions: [".json"],
});
