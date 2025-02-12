import { NativeModules } from 'react-native';

// Mock the native module
jest.mock('react-native', () => ({
  NativeModules: {
    PaymentModule: {
      initializeSDK: jest.fn(() => Promise.resolve("SDK Initialized")),
      processPayment: jest.fn((amount: number) => 
        Promise.resolve(amount > 0 ? true : false)
      ),
    },
  },
}));

const { PaymentModule } = NativeModules;

describe("PaymentModule Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("initializeSDK should return success message", async () => {
    const result = await PaymentModule.initializeSDK("test-api-key");
    expect(result).toBe("SDK Initialized");
    expect(PaymentModule.initializeSDK).toHaveBeenCalledWith("test-api-key");
  });

  test("processPayment should return true for valid amount", async () => {
    const result = await PaymentModule.processPayment(100);
    expect(result).toBe(true);
    expect(PaymentModule.processPayment).toHaveBeenCalledWith(100);
  });

  test("processPayment should return false for invalid amount", async () => {
    const result = await PaymentModule.processPayment(0);
    expect(result).toBe(false);
    expect(PaymentModule.processPayment).toHaveBeenCalledWith(0);
  });
});
