import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

interface ButtonProps {
    onPress: () => void,
    title: string,
}

const Button = (props: ButtonProps) => {
    return (
        <TouchableOpacity onPress={props.onPress} style={styles.button}>
            <Text style={styles.buttonText}>{props.title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        padding: 10,
        borderRadius: 7,
        backgroundColor: '#2196F3',
        width: '100%',
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
    }
})


export default Button;