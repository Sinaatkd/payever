import { StyleSheet, TextInput as BaseTextInput, TextInputProps as BaseTextInputProps, TouchableOpacity, View } from "react-native"

interface TextInputProps extends BaseTextInputProps {}

const TextInput = (props: TextInputProps) => {
    return (
        <BaseTextInput {...props} style={styles.TextInput}/>
    )
}

const styles = StyleSheet.create({
    TextInput: {
        padding: 10,
        borderRadius: 7,
        borderColor: '#2196F3',
        borderBottomWidth: 1,
        width: '100%',
        backgroundColor: '#edede8',
    },
})


export default TextInput;