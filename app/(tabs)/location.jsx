import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";

import * as Location from "expo-location";
import * as Clipboard from "expo-clipboard";

import Header from "../components/Header";
import MyButton from "../components/MyButton";

export default function LocationScreen() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [accuracy, setAccuracy] = useState("");

  // Get Current Location
  const getLocation = async () => {
    // Request Permission
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Permission Denied", "Location permission is required.");
      return;
    }

    // Get Current Position
    let location = await Location.getCurrentPositionAsync({});

    setLatitude(location.coords.latitude.toString());
    setLongitude(location.coords.longitude.toString());
    setAccuracy(location.coords.accuracy.toString());
  };

  // Copy Location
  const copyLocation = async () => {
    const locationText = `Latitude: ${latitude}, Longitude: ${longitude}`;

    await Clipboard.setStringAsync(locationText);

    Alert.alert("Success", "Location copied to clipboard.");
  };

  return (
    <View style={styles.container}>
      <Header title="Location" />

      <View style={styles.card}>
        <Text style={styles.title}>Current Location</Text>

        <Text style={styles.text}>
          Latitude:
        </Text>
        <Text>{latitude || "Not Available"}</Text>

        <Text style={styles.text}>
          Longitude:
        </Text>
        <Text>{longitude || "Not Available"}</Text>

        <Text style={styles.text}>
          Accuracy:
        </Text>
        <Text>
          {accuracy ? `${accuracy} meters` : "Not Available"}
        </Text>
      </View>

      <MyButton
        title="Get Location"
        onPress={getLocation}
      />

      <MyButton
        title="Refresh Location"
        onPress={getLocation}
      />

      <MyButton
        title="Copy Location"
        onPress={copyLocation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
  },

  card: {
    backgroundColor: "#fff",
    margin: 20,
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },

  text: {
    fontWeight: "bold",
    marginTop: 10,
  },
});