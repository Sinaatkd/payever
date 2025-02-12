import { useState } from 'react';
import { SafeAreaView, NativeModule, NativeModules, Alert, ToastAndroid, Text, StyleSheet, View } from 'react-native';
import { Button, TextInput } from './components';

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
        <SafeAreaView style={styles.container}>
            <Text>{paymentResult}</Text>
            <View style={styles.fullWidth}>
                <TextInput placeholder='api key' onChangeText={handleAPIKeyChange} value={APIKey} />
                <Button onPress={handleInitialSDKPress} title='SDK' />
            </View>
            <View style={styles.fullWidth}>
                <TextInput placeholder='amount' onChangeText={handleAmountChange} keyboardType={'numeric'} value={amount > 0 ? amount.toString() : ''} />
                <Button onPress={handlePaymentProcessPress} title='process' />
            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        padding: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        height: '100%',
        width: '100%'
    },
    button: {
        width: 200,
    },
    fullWidth: {
        width: '100%',
        gap: 3
    }
})

export default App;
