import { createStackNavigator } from "@react-navigation/stack";
import RecipeScreen from "../screen/Recipe";
import RecipeDetailScreen from "../screen/RecipeDetails";
const Stack = createStackNavigator();

export default function RecipeRouter() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="RecipeApp"
                component={RecipeScreen}
                options={{ title: "Recipe App" }}
            />
            <Stack.Screen
                name="RecipeDetails"
                component={RecipeDetailScreen}
                options={{ title: "Recipe Details" }}
            />
        </Stack.Navigator>
    );
}
