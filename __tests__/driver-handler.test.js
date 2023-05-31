// driver-handler.test.js
'use strict';

const {
  packageDeliveredToCustomer,
  packagePickedUpFromVendor,
} = require('../driver/handler');
const { eventPool, eventEmitter } = require('../eventPool');

describe('Driver Handler Tests', () => {
  let consoleSpy;
  let emitSpy;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log');
    emitSpy = jest.spyOn(eventEmitter, 'emit');
  });

  afterEach(() => {
    consoleSpy.mockRestore();
    emitSpy.mockRestore();
  });

  it('should log the successful package delivery message and emit delivered event', () => {
    const payload = {
      customer: 'John Doe',
      store: 'ACME',
      orderId: '1234',
      address: '123 Elm St',
    };

    packageDeliveredToCustomer(payload);

    expect(consoleSpy).toHaveBeenCalledWith(
      `DRIVER: Successfully delivered package #${payload.orderId}`,
    );
    expect(emitSpy).toHaveBeenCalledWith(eventPool[2], payload);
  });

  it('should log the package picked up message and emit transit event', () => {
    const payload = {
      customer: 'John Doe',
      store: 'ACME',
      orderId: '1234',
      address: '123 Elm St',
    };

    packagePickedUpFromVendor(payload);

    expect(consoleSpy).toHaveBeenCalledWith(
      `DRIVER: Package #${payload.orderId} picked up from ${payload.store}`,
    );
    expect(emitSpy).toHaveBeenCalledWith(eventPool[1], payload);
  });
});
