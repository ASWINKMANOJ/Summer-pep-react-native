import { createStackNavigator } from "@react-navigation/stack";
import GuessScreen from "../screen/guessthenumber/GuessScreen";
import GameScreen from "../screen/guessthenumber/GameScreen";

export default function StackRouter() {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Guessing game"
                component={GuessScreen}
                options={{
                    headerTitleAlign: "center",
                    title: "Guess",
                }}
            />
            <Stack.Screen
                name="Game"
                component={GameScreen}
                options={{
                    title: "Guess",
                    headerTitleAlign: "center",
                }}
            />
        </Stack.Navigator>
    );
}
