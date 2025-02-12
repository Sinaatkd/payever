package com.payever.MockPayment;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.Random;

public class MockPaymentModule extends ReactContextBaseJavaModule {

    private boolean initialized = false;

    MockPaymentModule(ReactApplicationContext context) {
        super(context);
    }

    @ReactMethod
    public void initializeSDK(String apiKey, Promise promise) {
        if (apiKey == null || apiKey.isEmpty()) {
            promise.reject("SDK_INIT_ERROR", "API Key is required");
        } else {
            promise.resolve("SDK Initialized");
            initialized = true;
        }
    }

    @ReactMethod
    public void processPayment(double amount, Promise promise) {
        if (!initialized) {
            promise.reject("PAYMENT_ERROR", "SDK is not initialized");
        } else {
            boolean paymentStatus = new Random().nextBoolean(); // Simulate payment success/failure
            promise.resolve(paymentStatus);
        }

    }

    @NonNull
    @Override
    public String getName() {
        /* The native module can then be accessed in JS like this:
            const {MockPaymentModule} = ReactNative.NativeModules; */

        return "MockPaymentModule";
    }
}
