/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  config.env.customer_email = process.env.CL_CUSTOMER_EMAIL
  config.env.customer_password = process.env.CL_CUSTOMER_PASSWORD
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  return config
}
