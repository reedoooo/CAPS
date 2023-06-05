'use strict';

// Import necessary packages
require('dotenv').config();
const { Server } = require('socket.io');
const PORT = process.env.PORT || 3001;

const MessageQueue = require('./MessageQueue');
const { eventEmitter, eventPool } = require('./eventPool');

// Set up server
const io = new Server(PORT);
const capsServer = io.of('/caps');

// Initialize message queues for received deliveries and pending deliveries
let receivedDeliveries = new MessageQueue();
let pendingDelivery = new MessageQueue();

// Function to log events
const logEvent = eventName => payload => {
  console.log(
    `
    EVENT: {
      event: ${eventName},
      time: ${new Date()},
      payload:`,
    payload,
  );
};

// Listen for client connections
capsServer.on('connection', socket => {
  console.log(`CLIENT CONNECTED TO CAPS SERVER \n SOCKET: `, socket.id);

  // Error handler
  socket.on('error', err => {
    console.error('Socket error', err);
  });

  // Listen for join event to join a room
  socket.on('join', payload => {
    socket.join(payload.store);
    socket.to(payload.store).emit('join', payload);
  });

  // When a pickup event is received from vendor
  socket.on(eventPool[0], payload => {
    // Check if vendor already has a pending delivery
    // If so, add the new package to the existing queue
    // If not, create a new queue for the vendor and add the package
    let pendingVendorPackages = pendingDelivery.read(payload.store);

    if (pendingVendorPackages) {
      pendingVendorPackages.save(payload.orderId, {
        event: eventPool[0],
        messageId: payload.orderId,
        clientId: payload.store,
        order: payload,
      });
    } else {
      pendingVendorPackages = new MessageQueue();
      pendingVendorPackages.save(payload.orderId, {
        event: eventPool[0],
        messageId: payload.orderId,
        clientId: payload.store,
        order: payload,
      });
      pendingDelivery.save(payload.store, pendingVendorPackages);
    }

    // Broadcast the pickup event
    socket.broadcast.emit(eventPool[0], payload);
    logEvent(eventPool[0])(payload);
  });

  // When a transit event is received from the driver
  socket.on(eventPool[1], payload => {
    let pendingDeliveries = pendingDelivery.read(payload.store);
    socket.emit(eventPool[1], pendingDeliveries);
    logEvent(eventPool[1])(payload);
  });

  // When a delivered event is received from the driver
  socket.on(eventPool[2], payload => {
    // Remove the delivered package from the pending deliveries queue
    let pendingVendorPackages = pendingDelivery.read(payload.clientId);
    pendingVendorPackages.remove(payload.messageId);

    // Add the delivered package to the received deliveries queue
    let vendorInbox = receivedDeliveries.read(payload.clientId);

    if (vendorInbox) {
      vendorInbox.save(payload.messageId, {
        event: eventPool[2],
        messageId: payload.messageId,
        clientId: payload.clientId,
        order: payload.order,
      });
    } else {
      vendorInbox = new MessageQueue();
      vendorInbox.save(payload.messageId, {
        event: eventPool[2],
        messageId: payload.messageId,
        clientId: payload.clientId,
        order: payload.order,
      });
      receivedDeliveries.save(payload.clientId, vendorInbox);
    }

    // Emit the delivered event
    socket.to(payload.clientId).emit(eventPool[2], payload);
  });

  // When a received event is received from the vendor
  socket.on(eventPool[3], payload => {
    try {
      // Check if vendor has received deliveries
      // If so, remove the delivered order from the queue
      let vendorInbox = receivedDeliveries.read(payload.clientId);
      let deliveredOrder = vendorInbox.remove(payload.messageId);

      logEvent(eventPool[3])(deliveredOrder);
    } catch (err) {
      console.log('ERROR REMOVING MESSAGE FROM VENDOR RECEIVED QUEUE');
      // Emit error event
      socket.to(payload.store).emit(`${eventPool[3]}-error`, {
        error: err,
        message: 'Vendor cannot acknowledge package delivery',
      });
    }
  });

  // A placeholder for potential future event
  socket.on(eventPool[4], payload => {});
});
