import {
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableWithoutFeedback,
    Platform,
    Keyboard,
} from "react-native";
import { ResetButton, SubmitButton } from "../../components/Buttons";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

export default function GuessScreen() {
    const navigation = useNavigation();
    const [number, setNumber] = useState("");
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardAvoidingContainer}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.title}>Enter A Number</Text>
                        <TextInput
                            keyboardType="number-pad"
                            style={styles.input}
                            value={number}
                            onChangeText={setNumber}
                            placeholder="0"
                            placeholderTextColor="#999"
                            maxLength={2}
                            autoFocus={true}
                        />
                        <View style={styles.buttonContainer}>
                            <ResetButton
                                style={styles.button}
                                onPress={() => setNumber("")}
                            />
                            <SubmitButton
                                style={styles.button}
                                onPress={() =>
                                    number &&
                                    navigation.navigate("Game", {
                                        userNumber: number,
                                    })
                                }
                            />
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    keyboardAvoidingContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F8F9FA",
        paddingHorizontal: 20,
    },
    inputContainer: {
        width: "100%",
        maxWidth: 400,
        padding: 30,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: "600",
        marginBottom: 30,
        color: "#333",
    },
    input: {
        width: 100,
        height: 60,
        borderWidth: 2,
        borderColor: "#DEE2E6",
        borderRadius: 12,
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 24,
        fontWeight: "bold",
        fontFamily: Platform.OS === "android" ? "monospace" : "Courier",
        color: "#212529",
        backgroundColor: "#F8F9FA",
        marginBottom: 40,
    },
    buttonContainer: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        paddingHorizontal: 20,
    },
    button: {
        flex: 1,
        maxWidth: "45%",
    },
});
