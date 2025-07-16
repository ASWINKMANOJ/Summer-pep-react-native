import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    ActivityIndicator,
    SafeAreaView,
    RefreshControl,
    Alert,
} from "react-native";

const WeatherScreen = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [location] = useState({ lat: 30.9009, lon: 75.8573 });

    const getWeatherIcon = (code) => {
        const iconMap = {
            0: "☀️",
            1: "🌤️",
            2: "⛅",
            3: "☁️",
            45: "🌫️",
            48: "🌫️",
            51: "🌦️",
            53: "🌦️",
            55: "🌦️",
            61: "🌧️",
            63: "🌧️",
            65: "🌧️",
            71: "❄️",
            73: "❄️",
            75: "❄️",
            77: "🌨️",
            80: "🌦️",
            81: "🌦️",
            82: "🌦️",
            85: "🌨️",
            86: "🌨️",
            95: "⛈️",
            96: "⛈️",
            99: "⛈️",
        };
        return iconMap[code] || "🌤️";
    };

    const getDescription = (code) => {
        const desc = {
            0: "Clear",
            1: "Mainly clear",
            2: "Partly cloudy",
            3: "Overcast",
            45: "Fog",
            48: "Rime fog",
            51: "Light drizzle",
            53: "Moderate drizzle",
            55: "Heavy drizzle",
            61: "Slight rain",
            63: "Moderate rain",
            65: "Heavy rain",
            71: "Light snow",
            73: "Moderate snow",
            75: "Heavy snow",
            77: "Snow grains",
            80: "Rain showers",
            81: "Moderate showers",
            82: "Heavy showers",
            85: "Snow showers",
            86: "Heavy snow showers",
            95: "Thunderstorm",
            96: "Storm + hail",
            99: "Severe storm",
        };
        return desc[code] || "Unknown";
    };

    const fetchWeatherData = async () => {
        try {
            const res = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m,wind_direction_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max&timezone=auto&forecast_days=7`
            );
            const json = await res.json();
            setWeatherData(json);
        } catch (err) {
            Alert.alert("Error", "Couldn't fetch weather");
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        fetchWeatherData();
    };

    useEffect(() => {
        fetchWeatherData();
    }, []);

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-US", {
            weekday: "short",
            day: "numeric",
            month: "short",
        });
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator size="large" color="#f57c00" />
                <Text style={{ marginTop: 12, color: "#555" }}>
                    Loading weather data...
                </Text>
            </SafeAreaView>
        );
    }

    if (!weatherData) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={{ fontSize: 16, color: "#555" }}>
                    Could not load data
                </Text>
            </SafeAreaView>
        );
    }

    const { current, daily } = weatherData;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <Text style={styles.header}>📍 Ludhiana Weather</Text>

                {/* Current Weather */}
                <View style={styles.card}>
                    <Text style={styles.bigIcon}>
                        {getWeatherIcon(current.weather_code)}
                    </Text>
                    <Text style={styles.mainTemp}>
                        {Math.round(current.temperature_2m)}°C
                    </Text>
                    <Text style={styles.desc}>
                        {getDescription(current.weather_code)}
                    </Text>
                    <Text style={styles.feelsLike}>
                        Feels like {Math.round(current.apparent_temperature)}°C
                    </Text>
                </View>

                {/* Details */}
                <View style={styles.details}>
                    <View style={styles.detailItem}>
                        <Text style={styles.label}>💧 Humidity</Text>
                        <Text style={styles.value}>
                            {current.relative_humidity_2m}%
                        </Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={styles.label}>💨 Wind</Text>
                        <Text style={styles.value}>
                            {current.wind_speed_10m} km/h
                        </Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={styles.label}>🌧️ Rain</Text>
                        <Text style={styles.value}>
                            {current.precipitation} mm
                        </Text>
                    </View>
                </View>

                {/* 7-Day Forecast */}
                <Text style={styles.sectionTitle}>7-Day Forecast</Text>
                {daily.time.map((date, i) => (
                    <View key={i} style={styles.card}>
                        <Text style={styles.forecastDate}>
                            {i === 0 ? "Today" : formatDate(date)}
                        </Text>
                        <Text style={styles.desc}>
                            {getWeatherIcon(daily.weather_code[i])}{" "}
                            {getDescription(daily.weather_code[i])}
                        </Text>
                        <Text style={styles.tempRange}>
                            {Math.round(daily.temperature_2m_max[i])}° /{" "}
                            {Math.round(daily.temperature_2m_min[i])}°
                        </Text>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

export default WeatherScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 16,
        paddingTop: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 12,
        color: "#333",
    },
    card: {
        backgroundColor: "#fafafa",
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        elevation: 2,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    bigIcon: {
        fontSize: 48,
        textAlign: "center",
    },
    mainTemp: {
        fontSize: 32,
        textAlign: "center",
        fontWeight: "600",
        color: "#222",
    },
    desc: {
        fontSize: 16,
        textAlign: "center",
        color: "#555",
        marginVertical: 4,
    },
    feelsLike: {
        textAlign: "center",
        fontSize: 14,
        color: "#888",
    },
    details: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    detailItem: {
        alignItems: "center",
        flex: 1,
        marginHorizontal: 4,
        backgroundColor: "#f9f9f9",
        padding: 12,
        borderRadius: 10,
    },
    label: {
        fontSize: 13,
        color: "#777",
    },
    value: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "600",
        marginBottom: 8,
        color: "#333",
    },
    forecastDate: {
        fontSize: 16,
        fontWeight: "500",
        marginBottom: 4,
        color: "#333",
    },
    tempRange: {
        fontSize: 16,
        color: "#555",
    },
});
