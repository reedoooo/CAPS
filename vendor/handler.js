'use strict';
// Ensures the code will be executed in "strict mode", which helps catch common JavaScript pitfalls

const { eventEmitter, eventPool } = require('../eventPool');
// Imports eventEmitter and eventPool from the eventPool module

const Chance = require('chance');
// Imports the Chance library, which generates random data

const chance = new Chance();
// Creates a new instance of Chance to generate random data

const packageReadyForPickup = () => {
  console.log('Vendor package ready for pickup');
  // Logs a message indicating a package is ready for pickup

  return {
    store: chance.company(),
    // Creates a random company name for the store
    orderId: chance.guid(),
    // Creates a random Globally Unique Identifier (GUID) for the order ID
    customer: chance.name(),
    // Creates a random name for the customer
    address: chance.address(),
    // Creates a random address for the customer
  };
};
// Declares a function packageReadyForPickup which prepares a package for pickup

const packageDeliveredAlert = (payload) => {
  console.log(`Thank you for your order ${payload.customer}\n`, payload);
  // Logs a message thanking the customer for their order, and prints out the payload
};

// packageReadyForPickup(chance.company());
// A commented out call to packageReadyForPickup, which you may uncomment for testing

module.exports = {
  packageReadyForPickup,
  packageDeliveredAlert,
};
// Exports the functions packageReadyForPickup and packageDeliveredAlert for use in other modules
