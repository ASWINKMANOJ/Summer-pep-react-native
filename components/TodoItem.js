import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import Animated, {
    FadeIn,
    FadeOut,
    LinearTransition,
} from "react-native-reanimated";

const TodoItem = ({ todo, isCompleted, onToggle }) => {
    return (
        <Animated.View
            style={[styles.container, isCompleted && styles.completed]}
            layout={LinearTransition}
            entering={FadeIn}
            exiting={FadeOut}
        >
            <Text style={[styles.text, isCompleted && styles.strike]}>
                {todo}
            </Text>
            <Pressable onPress={onToggle} style={styles.iconWrapper}>
                {isCompleted ? (
                    <Feather name="check-square" size={24} color="#56DFCF" />
                ) : (
                    <Feather name="square" size={24} color="#333446" />
                )}
            </Pressable>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#333446",
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 16,
        marginVertical: 8,
        justifyContent: "space-between",
    },
    text: {
        fontSize: 16,
        flex: 1,
    },
    strike: {
        textDecorationLine: "line-through",
        color: "#888",
    },
    completed: {
        borderColor: "#DDFFBC",
    },
    iconWrapper: {
        marginLeft: 16,
    },
});

export default TodoItem;
