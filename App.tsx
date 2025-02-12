import { useState } from 'react';
import { SafeAreaView, NativeModule, NativeModules, Button, Alert, ToastAndroid, TextInput, Text } from 'react-native';

interface PaymentModuleType {
    initializeSDK: (apiKey: string) => Promise<string>;
    processPayment: (amount: number) => Promise<boolean>;
}

const { MockPaymentModule } = NativeModules as { MockPaymentModule: PaymentModuleType };
const App = () => {
    const [APIKey, setAPIKey] = useState<string>('');
    const [amount, setAmount] = useState<number>(0);
    const [paymentResult, setPaymentResult] = useState<string>('');


    const handleInitialSDKPress = async () => {
        try {
            await MockPaymentModule.initializeSDK(APIKey);
            ToastAndroid.show("api key initialized", ToastAndroid.LONG);
        } catch (error) { // if api key input is empty we go here
            Alert.alert('error', error.message);
        }
    }

    const handleAPIKeyChange = (value: string) => {
        setAPIKey(value);
    }

    const handleAmountChange = (value: string) => {
        setAmount(Number.parseInt(value));
    }

    const handlePaymentProcessPress = async () => {
        try {
            const result = await MockPaymentModule.processPayment(amount); // return: false or true
            setPaymentResult(result ? 'Payment Successful' : 'Payment Failed');
        } catch (error) { // if api key not initialized we go here
            Alert.alert('error', error.message);
        }
    }

    return (
        <SafeAreaView>
            <Text>{paymentResult}</Text>
            <Button onPress={handleInitialSDKPress} title='SDK' />
            <Button onPress={handlePaymentProcessPress} title='process' />
            <TextInput placeholder='api key' onChangeText={handleAPIKeyChange} value={APIKey} />
            <TextInput placeholder='amount' onChangeText={handleAmountChange} keyboardType={'numeric'} value={amount.toString()} />
        </SafeAreaView>
    );
}

export default App;
