import { View, Text, StyleSheet, ScrollView, Image } from "react-native";

export default function RecipeDetailScreen({ route }) {
    const { recipe } = route.params;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={{ uri: recipe.strMealThumb }} style={styles.image} />
            <Text style={styles.title}>{recipe.strMeal}</Text>
            <Text style={styles.subtitle}>
                {recipe.strCategory} • {recipe.strArea}
            </Text>
            <Text style={styles.sectionTitle}>Instructions</Text>
            <Text style={styles.instructions}>{recipe.strInstructions}</Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: "#fff",
    },
    image: {
        width: "100%",
        height: 200,
        borderRadius: 12,
        marginBottom: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 8,
        color: "#333",
    },
    subtitle: {
        fontSize: 16,
        color: "#666",
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 16,
        marginBottom: 8,
        color: "#444",
    },
    instructions: {
        fontSize: 15,
        lineHeight: 22,
        color: "#555",
    },
});
