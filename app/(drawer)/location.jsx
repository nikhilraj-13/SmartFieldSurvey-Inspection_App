import React, { useState } from "react";
import { View, Text, StyleSheet, Alert, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import * as Location from "expo-location";
import * as Clipboard from "expo-clipboard";

import Header from "../../components/header";

export default function LocationScreen() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [accuracy, setAccuracy] = useState("");

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Permission Denied", "Location permission is required.");
      return;
    }
    let location = await Location.getCurrentPositionAsync({});

    setLatitude(location.coords.latitude.toString());
    setLongitude(location.coords.longitude.toString());
    setAccuracy(location.coords.accuracy.toFixed(2));
  };

  const copyLocation = async () => {
    if (!latitude || !longitude) {
      Alert.alert("Error", "No location data to copy. Please refresh first.");
      return;
    }
    const locationText = `Latitude: ${latitude}, Longitude: ${longitude}`;
    await Clipboard.setStringAsync(locationText);
    Alert.alert("Success", "Location copied to clipboard.");
  };

  const CoordinateCard = ({ iconName, label, value }) => (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        <Ionicons name={iconName} size={26} color="#5D4949" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.cardLabel}>{label}</Text>
        <Text style={styles.cardValue}>{value || "Not Available"}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header 
        title="Current Location" 
        subtitle="View and manage your current GPS coordinates." 
      />

      <View style={styles.content}>
        <CoordinateCard 
          iconName="location" 
          label="Latitude" 
          value={latitude} 
        />
        <CoordinateCard 
          iconName="navigate" 
          label="Longitude" 
          value={longitude} 
        />
        <CoordinateCard 
          iconName="radio" 
          label="Accuracy" 
          value={accuracy ? `${accuracy} m` : ""} 
        />

        <View style={styles.buttonContainer}>
          <Pressable 
            style={({ pressed }) => [
              styles.primaryBtn,
              pressed && { opacity: 0.85 }
            ]} 
            onPress={getLocation}
          >
            <Ionicons name="refresh" size={18} color="#FFFFFF" style={styles.btnIcon} />
            <Text style={styles.primaryBtnText}>Refresh Location</Text>
          </Pressable>

          <Pressable 
            style={({ pressed }) => [
              styles.secondaryBtn,
              pressed && { opacity: 0.85 }
            ]} 
            onPress={copyLocation}
          >
            <Ionicons name="copy-outline" size={18} color="#5D4949" style={styles.btnIcon} />
            <Text style={styles.secondaryBtnText}>Copy Current Location</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    marginVertical: 6,
    alignItems: "center",
    
    // Soft shadow
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F4EFEA",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  cardLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#64748B",
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
  },
  buttonContainer: {
    marginTop: 20,
    gap: 12,
  },
  primaryBtn: {
    flexDirection: "row",
    backgroundColor: "#5D4949",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    
    elevation: 2,
    shadowColor: "#5D4949",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  primaryBtnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  secondaryBtn: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "#EADEC9",
  },
  secondaryBtnText: {
    color: "#5D4949",
    fontSize: 16,
    fontWeight: "700",
  },
  btnIcon: {
    marginRight: 8,
  },
});