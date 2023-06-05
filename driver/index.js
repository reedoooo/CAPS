'use strict';

const { eventEmitter, eventPool } = require('../eventPool');
const {
  packageDeliveredToCustomer,
  pickupPackage,
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

// receives pickup event from the server
capsSocket.on(eventPool[0], payload => {
  if (!payload || !payload.orderId || !payload.store) {
    console.error('Invalid payload for pickup event:', payload);
    return;
  }
  // emits transit event to the server
  pickupPackage(payload);
});

// receives transit event from the server, receives all pending delivery messages
capsSocket.on(eventPool[1], payload => {
  console.log('DRIVER RECEIVED TRANSIT EMIT FROM HUB');

  // emits a delivery event for each pendingDelivery received (i.e. 'delivers' each package)
  packageDeliveredToCustomer(payload);
});

capsSocket.on('join', payload => {
  console.log('DRIVER JOINED ROOM');
});
