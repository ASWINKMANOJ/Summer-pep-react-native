import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const GameScreen = ({ route }) => {
    const { userNumber } = route.params;
    const [low, setLow] = useState(0);
    const [high, setHigh] = useState(100);
    const [guess, setGuess] = useState(Math.floor((low + high) / 2));
    const [isCorrect, setIsCorrect] = useState(false);

    const handleLow = () => {
        const newHigh = guess;
        setHigh(newHigh);
        setGuess(Math.floor((low + newHigh) / 2));
    };

    const handleHigh = () => {
        const newLow = guess;
        setLow(newLow);
        setGuess(Math.floor((newLow + high) / 2));
    };
    const navigation = useNavigation();
    useEffect(() => {
        if (guess == userNumber) {
            setIsCorrect(true);
        }
    }, [guess, userNumber]);

    // Show alert when isCorrect becomes true
    useEffect(() => {
        if (isCorrect) {
            Alert.alert(
                "🎉 Congratulations!",
                `I guessed your number correctly! The number was ${guess}`,
                [
                    {
                        text: "Play Again",
                        onPress: () => {
                            navigation.popToTop();
                        },
                    },
                    {
                        text: "OK",
                        style: "default",
                    },
                ]
            );
        }
    }, [isCorrect, guess]);

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.title}>Current Guess : {guess}</Text>
                <View style={styles.buttonContainer}>
                    <Pressable
                        style={({ pressed }) => [
                            styles.buttonDefault,
                            styles.lower,
                            pressed && styles.pressed,
                        ]}
                        onPress={handleLow}
                        disabled={isCorrect} // Disable buttons when correct
                    >
                        <Ionicons
                            name="trending-down"
                            size={24}
                            color="white"
                        />
                        <Text>Lower</Text>
                    </Pressable>
                    <Pressable
                        style={({ pressed }) => [
                            styles.buttonDefault,
                            styles.higher,
                            pressed && styles.pressed,
                        ]}
                        onPress={handleHigh}
                        disabled={isCorrect} // Disable buttons when correct
                    >
                        <Ionicons name="trending-up" size={24} color="white" />
                        <Text>Higher</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F8F9FA", //* subtle background*
        paddingHorizontal: 20,
    },
    inputContainer: {
        width: "100%",
        maxWidth: 400,
        padding: 30,
        alignItems: "center",
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
        fontSize: 24,
        fontWeight: "700",
        marginBottom: 24,
        color: "#212529",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginTop: 20,
    },
    buttonDefault: {
        flex: 1,
        backgroundColor: "#0D6EFD",
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginHorizontal: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        elevation: 3,
    },
    pressed: {
        opacity: 0.7,
    },
    lower: {
        backgroundColor: "#f44336",
    },
    higher: {
        backgroundColor: "#4CAF50",
    },
});

export default GameScreen;
