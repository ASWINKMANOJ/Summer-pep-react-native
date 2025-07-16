import React from "react";
import { View, Platform } from "react-native";
import { useLinkBuilder, useTheme } from "@react-navigation/native";
import { Text, PlatformPressable } from "@react-navigation/elements";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StackRouter from "./StackRouter";
import WeatherScreen from "../screen/Weather";
import { MaterialCommunityIcons, Ionicons, Feather } from "@expo/vector-icons"; // or from 'react-native-vector-icons'
import RecipeScreen from "../screen/Recipe";
import RecipeRouter from "./RecipeRouter";

const Tab = createBottomTabNavigator();

function MyTabBar({ state, descriptors, navigation }) {
    const { colors } = useTheme();
    const { buildHref } = useLinkBuilder();

    return (
        <View
            style={{
                flexDirection: "row",
                backgroundColor: colors.card,
                borderTopColor: colors.border,
                borderTopWidth: 1,
                paddingBottom: Platform.OS === "ios" ? 20 : 10,
                paddingTop: 10,
                justifyContent: "space-around",
                alignItems: "center",
                elevation: 10,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 5,
            }}
        >
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                        ? options.title
                        : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: "tabPress",
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: "tabLongPress",
                        target: route.key,
                    });
                };

                let IconComponent;
                let iconName;

                switch (route.name) {
                    case "GuessApp":
                        IconComponent = Ionicons;
                        iconName = "game-controller-outline";
                        break;
                    case "Weather":
                        IconComponent = Feather;
                        iconName = "cloud-rain";
                        break;
                    case "Recipe":
                        IconComponent = MaterialCommunityIcons;
                        iconName = "food-apple-outline";
                        break;
                    default:
                        IconComponent = FontAwesome5;
                        iconName = "question-circle";
                }

                return (
                    <PlatformPressable
                        key={route.key}
                        href={buildHref(route.name, route.params)}
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarButtonTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center",
                            paddingVertical: 6,
                        }}
                    >
                        <IconComponent
                            name={iconName}
                            size={24}
                            color={isFocused ? colors.primary : colors.text}
                        />
                        <Text
                            style={{
                                fontSize: 12,
                                color: isFocused ? colors.primary : colors.text,
                                marginTop: 4,
                            }}
                        >
                            {label}
                        </Text>
                    </PlatformPressable>
                );
            })}
        </View>
    );
}

export default function MyTabs() {
    return (
        <Tab.Navigator
            screenOptions={{ headerShown: false }}
            tabBar={(props) => <MyTabBar {...props} />}
        >
            <Tab.Screen
                name="GuessApp"
                component={StackRouter}
                options={{ title: "Guess" }}
            />
            <Tab.Screen name="Weather" component={WeatherScreen} />
            <Tab.Screen name="Recipe" component={RecipeRouter} />
        </Tab.Navigator>
    );
}
