import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import TodoList from "./screen/TodoList";
import { SafeAreaView } from "react-native-safe-area-context";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
    return (
        <SafeAreaView style={styles.container}>
            <GestureHandlerRootView>
                <TodoList />
            </GestureHandlerRootView>
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
