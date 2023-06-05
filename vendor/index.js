'use strict';

const { eventEmitter, eventPool } = require('../eventPool');
const {
  generatePackage,
  placeOrder,
  packageDeliveredAlert,
  capsSocket,
} = require('./handler');

capsSocket.on('connect', () => {
  console.log('Connected to the server');
});

capsSocket.on('disconnect', () => {
  console.log('Disconnected from the server');
});

capsSocket.on('connect_error', err => {
  console.log('Connection error', err);
});

// handles 'delivered' events
capsSocket.on(eventPool[2], packageDeliveredAlert);

// handles 'delivered-error' events
capsSocket.on(`${eventPool[2]}-error`, payload => {
  console.log(payload);
});

capsSocket.on(`join`, payload => {
  console.log(`VENDOR JOINED ROOM`);
});

setInterval(placeOrder, 5000);
