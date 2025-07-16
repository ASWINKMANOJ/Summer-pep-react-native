import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    Image,
    ActivityIndicator,
    TouchableOpacity,
    StyleSheet,
    TextInput,
} from "react-native";
import { Feather } from "@expo/vector-icons"; // for search icon

export default function RecipeScreen({ navigation }) {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState("chicken"); // default search

    const fetchRecipes = async (search = "chicken") => {
        setLoading(true);
        try {
            const response = await fetch(
                `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
            );
            const json = await response.json();
            setRecipes(json.meals || []);
        } catch (error) {
            console.error("Error fetching recipes:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecipes(); // initial load with 'chicken'
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() =>
                navigation.navigate("RecipeDetails", { recipe: item })
            }
        >
            <Image source={{ uri: item.strMealThumb }} style={styles.image} />
            <View style={styles.textContainer}>
                <Text style={styles.title}>{item.strMeal}</Text>
                <Text style={styles.category}>
                    {item.strCategory} • {item.strArea}
                </Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>🍳 Recipe Search</Text>

            {/* Search Bar */}
            <View style={styles.searchBar}>
                <TextInput
                    style={styles.input}
                    placeholder="Search recipes (e.g. pasta)"
                    value={query}
                    onChangeText={setQuery}
                    onSubmitEditing={() => fetchRecipes(query)}
                />
                <TouchableOpacity onPress={() => fetchRecipes(query)}>
                    <Feather name="search" size={24} color="#333" />
                </TouchableOpacity>
            </View>

            {/* Recipe List */}
            {loading ? (
                <ActivityIndicator
                    size="large"
                    color="#f57c00"
                    style={{ marginTop: 20 }}
                />
            ) : (
                <FlatList
                    data={recipes}
                    keyExtractor={(item) => item.idMeal}
                    renderItem={renderItem}
                    ListEmptyComponent={
                        <Text
                            style={{
                                textAlign: "center",
                                marginTop: 30,
                                color: "#666",
                            }}
                        >
                            No recipes found 😞
                        </Text>
                    }
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 16,
        paddingTop: 40,
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 12,
        color: "#333",
    },
    searchBar: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f2f2f2",
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginBottom: 16,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: "#333",
    },
    card: {
        flexDirection: "row",
        backgroundColor: "#fafafa",
        borderRadius: 12,
        overflow: "hidden",
        marginBottom: 12,
        elevation: 2,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    image: {
        width: 100,
        height: 100,
    },
    textContainer: {
        flex: 1,
        padding: 10,
        justifyContent: "center",
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
        color: "#222",
    },
    category: {
        fontSize: 13,
        color: "#777",
        marginTop: 4,
    },
});
