import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";

import * as Clipboard from "expo-clipboard";

import Header from "../../components/header";
import MyButton from "../../components/MyButton";
import MyInput from "../../components/MyInput";

export default function ClipboardScreen() {
  const [notes, setNotes] = useState("");

  const surveyId = "SUR001";
  const contactNumber = "9876543210";
  const currentLocation = "23.2156, 72.6364";

  const copySurveyID = async () => {
    await Clipboard.setStringAsync(surveyId);
    Alert.alert("Success", "Survey ID copied.");
  };

  const copyContact = async () => {
    await Clipboard.setStringAsync(contactNumber);
    Alert.alert("Success", "Contact Number copied.");
  };

  const copyLocation = async () => {
    await Clipboard.setStringAsync(currentLocation);
    Alert.alert("Success", "Location copied.");
  };

  const pasteClipboard = async () => {
    const text = await Clipboard.getStringAsync();
    setNotes(text);
  };

  const clearNotes = () => {
    setNotes("");
  };

  return (
    <View style={styles.container}>
      <Header title="Clipboard" />

      <View style={styles.card}>
        <Text style={styles.heading}>Clipboard Operations</Text>

        <MyButton title="Copy Survey ID" onPress={copySurveyID} />

        <MyButton title="Copy Contact Number" onPress={copyContact} />

        <MyButton title="Copy Current Location" onPress={copyLocation} />

        <MyButton title="Paste Notes" onPress={pasteClipboard} />

        <Text style={styles.label}>Notes</Text>

        <MyInput
          placeholder="Clipboard data will appear here..."
          value={notes}
          onChangeText={setNotes}
        />

        <MyButton title="Clear Notes" onPress={clearNotes} />
      </View>
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

  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 5,
  },
});
