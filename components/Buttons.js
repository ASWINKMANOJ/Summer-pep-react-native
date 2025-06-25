import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // or any icon set you're using

const ResetButton = ({ icon = "refresh", text = "Reset", onPress }) => {
    return (
        <Pressable
            style={({ pressed }) => [
                styles.buttonDefault,
                styles.resetButton,
                pressed && styles.pressed,
            ]}
            onPress={onPress}
        >
            <View style={styles.content}>
                <MaterialIcons name={icon} size={20} color="#fff" />
                <Text style={styles.text}>{text}</Text>
            </View>
        </Pressable>
    );
};

const SubmitButton = ({ icon = "check", text = "Submit", onPress }) => {
    return (
        <Pressable
            style={({ pressed }) => [
                styles.buttonDefault,
                styles.submitButton,
                pressed && styles.pressed,
            ]}
            onPress={onPress}
        >
            <View style={styles.content}>
                <MaterialIcons name={icon} size={20} color="#fff" />
                <Text style={styles.text}>{text}</Text>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    buttonDefault: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        margin: 8,
        elevation: 4,
    },
    resetButton: {
        backgroundColor: "#f44336", // red
    },
    submitButton: {
        backgroundColor: "#4CAF50", // green
    },
    text: {
        color: "#fff",
        fontSize: 16,
        marginLeft: 8,
    },
    content: {
        flexDirection: "row",
        alignItems: "center",
    },
    pressed: {
        opacity: 0.7,
    },
});

export { ResetButton, SubmitButton };
