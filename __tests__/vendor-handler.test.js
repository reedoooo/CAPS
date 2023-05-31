// vendor-handler.test.js
'use strict';

const {
  packageReadyForPickup,
  packageDeliveredAlert,
} = require('../vendor/handler');

describe('Vendor Handler Tests', () => {
  // Mocking console.log to test the log outputs
  let consoleSpy;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log');
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('should log the package ready for pickup message and return the package details', () => {
    const result = packageReadyForPickup();
    expect(consoleSpy).toHaveBeenCalledWith('Vendor package ready for pickup');
    expect(result).toHaveProperty('store');
    expect(result).toHaveProperty('orderId');
    expect(result).toHaveProperty('customer');
    expect(result).toHaveProperty('address');
  });

  it('should log the delivered package alert with the customer name and payload', () => {
    const payload = {
      customer: 'John Doe',
      store: 'ACME',
      orderId: '1234',
      address: '123 Elm St',
    };

    packageDeliveredAlert(payload);
    expect(consoleSpy).toHaveBeenCalledWith(
      `Thank you for your order ${payload.customer}\n`,
      payload,
    );
  });
});
