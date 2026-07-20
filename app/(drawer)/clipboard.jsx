import React, { useState } from "react";
import { View, Text, StyleSheet, Alert, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import * as Clipboard from "expo-clipboard";

import Header from "../../components/header";
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
      <Header title="Clipboard" subtitle="Copy and paste survey information." />

      <View style={styles.content}>
        {/* Card 1: Copy Data */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Copy Data</Text>

          <Pressable 
            style={({ pressed }) => [
              styles.copyBtn,
              pressed && { opacity: 0.85 }
            ]} 
            onPress={copySurveyID}
          >
            <Ionicons name="document-text-outline" size={18} color="#FFFFFF" style={styles.btnIcon} />
            <Text style={styles.copyBtnText}>Copy Survey ID</Text>
          </Pressable>

          <Pressable 
            style={({ pressed }) => [
              styles.copyBtn,
              pressed && { opacity: 0.85 }
            ]} 
            onPress={copyContact}
          >
            <Ionicons name="call-outline" size={18} color="#FFFFFF" style={styles.btnIcon} />
            <Text style={styles.copyBtnText}>Copy Contact Number</Text>
          </Pressable>

          <Pressable 
            style={({ pressed }) => [
              styles.copyBtn,
              pressed && { opacity: 0.85 }
            ]} 
            onPress={copyLocation}
          >
            <Ionicons name="location-outline" size={18} color="#FFFFFF" style={styles.btnIcon} />
            <Text style={styles.copyBtnText}>Copy Current Location</Text>
          </Pressable>
        </View>

        {/* Card 2: Notes */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Notes</Text>

          <View style={styles.inputContainer}>
            <MyInput
              placeholder="Paste clipboard content here..."
              value={notes}
              onChangeText={setNotes}
              multiline={true}
              style={styles.notesInput}
            />
            <Ionicons 
              name="ellipse-outline" 
              size={18} 
              color="#CBD5E1" 
              style={styles.inputHelperIcon} 
            />
          </View>

          <Pressable 
            style={({ pressed }) => [
              styles.pasteBtn,
              pressed && { opacity: 0.85 }
            ]} 
            onPress={pasteClipboard}
          >
            <Ionicons name="clipboard-outline" size={18} color="#5D4949" style={styles.btnIcon} />
            <Text style={styles.pasteBtnText}>Paste Clipboard</Text>
          </Pressable>

          <Pressable 
            style={({ pressed }) => [
              styles.clearBtn,
              pressed && { opacity: 0.85 }
            ]} 
            onPress={clearNotes}
          >
            <Ionicons name="trash-outline" size={18} color="#FFFFFF" style={styles.btnIcon} />
            <Text style={styles.clearBtnText}>Clear Clipboard</Text>
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
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginVertical: 8,
    
    // Soft shadow
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 16,
  },
  copyBtn: {
    flexDirection: "row",
    backgroundColor: "#5D4949",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  copyBtnText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
  inputContainer: {
    position: "relative",
    marginBottom: 16,
  },
  notesInput: {
    backgroundColor: "#F8FAFC",
    borderColor: "#E2E8F0",
    borderWidth: 1,
    borderRadius: 12,
    paddingRight: 40,
    minHeight: 80,
  },
  inputHelperIcon: {
    position: "absolute",
    right: 12,
    top: 24,
  },
  pasteBtn: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "#5D4949",
    marginBottom: 12,
  },
  pasteBtnText: {
    color: "#5D4949",
    fontSize: 15,
    fontWeight: "600",
  },
  clearBtn: {
    flexDirection: "row",
    backgroundColor: "#C94A4A",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  clearBtnText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
  btnIcon: {
    marginRight: 8,
  },
});
