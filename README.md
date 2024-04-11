# Cypress Mini-Project

## Overview

This mini-project aims to automate 6 scenarios using the Cypress framework. It follows the Page Object Model structure for organizing the code and utilizes asserts for verifications. Waits methods are used to avoid implicit waits, and screenshot capture on failure is configured for better debugging.


## Installation

1. Clone the repository:
   git clone <repository-url>

2. Install dependencies:

   npm install

3. To run the tests, install Cypress and then execute:
   
   npm install cypress --save-dev.

   npx cypress open

   Then select the E2E method to run .feature files.

4. To run tests from terminal and generate screnshoots/videos by data updated execute on terminal this:

   npx cypress run --spec cypress/integration/BDD/\*.feature

## Configuration

Screenshot capture on failure is configured by default. Screenshots are saved in the cypress/screenshots directory.
For optional report generation, you can configure Mocha reporter in the cypress.json file.

## Additional Features

Custom Cypress commands are added in the support/commands.js file.

