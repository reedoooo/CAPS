'use strict';

// Importing eventEmitter and eventPool from '../eventPool' module
const { eventEmitter, eventPool } = require('../eventPool');

// Function to handle the event when a package is delivered to the customer
const packageDeliveredToCustomer = (payload) => {
  // Logging a success message with the orderId of the delivered package
  console.log(`DRIVER: Successfully delivered package #${payload.orderId}`);

  // Emitting an event with the payload to notify other modules about the package delivery
  eventEmitter.emit(eventPool[2], payload);
};

// Function to handle the event when a package is picked up from the vendor
const packagePickedUpFromVendor = (payload) => {
  // Logging a message with the orderId and store from where the package was picked up
  console.log(
    `DRIVER: Package #${payload.orderId} picked up from ${payload.store}`,
  );

  // Emitting an event with the payload to notify other modules about the package pickup
  eventEmitter.emit(eventPool[1], payload);
};

// Exporting the two functions as properties of an object
module.exports = {
  packageDeliveredToCustomer,
  packagePickedUpFromVendor,
};
