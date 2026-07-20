import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Platform, Pressable } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import * as Location from "expo-location";
import { useSurvey } from "../../context/SurveyContext";
import MyInput from "../../components/MyInput";
import MyButton from "../../components/MyButton";
import Header from "../../components/header";

export default function CreateSurvey() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  const [siteName, setSiteName] = useState("");
  const [clientName, setClientName] = useState("");
  const [contact, setContact] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState("");
  const [priority, setPriority] = useState("");

  useEffect(() => {
    if (params.isEditing === "true") {
      if (params.siteName) setSiteName(params.siteName);
      if (params.clientName) setClientName(params.clientName);
      if (params.contact) setContact(params.contact);
      if (params.location) setLocation(params.location);
      if (params.description) setDescription(params.description);
      if (params.notes) setNotes(params.notes);
      if (params.priority) setPriority(params.priority);
    } else {
      // Clear form for new surveys
      setSiteName("");
      setClientName("");
      setContact("");
      setDescription("");
      setNotes("");
      setPriority("");
      setLocation("");

      // Fetch location automatically in the background
      const getGPS = async () => {
        try {
          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status === "granted") {
            const loc = await Location.getCurrentPositionAsync({});
            setLocation(`${loc.coords.latitude.toFixed(6)}, ${loc.coords.longitude.toFixed(6)}`);
          }
        } catch (e) {
          // Keep location empty or set fallback
        }
      };
      getGPS();
    }
  }, [params]);

  const submitSurvey = () => {
    if (
      siteName.trim() === "" ||
      clientName.trim() === "" ||
      priority === "" ||
      contact.trim() === "" ||
      description.trim() === "" ||
      notes.trim() === ""
    ) {
      Alert.alert("Error", "Please fill all fields marked with *");
      return;
    }

    router.push({
      pathname: "/(drawer)/preview",
      params: {
        siteName,
        clientName,
        priority,
        contact,
        location: location || "22.3039, 70.8022", // Use coordinates or default
        description,
        notes
      }
    });
  };

  const PriorityButton = ({ title, isSelected, onPress }) => (
    <Pressable
      onPress={onPress}
      style={[styles.priorityBtn, isSelected && styles.priorityBtnActive]}
    >
      <Text style={[styles.priorityText, isSelected && styles.priorityTextActive]}>
        {title}
      </Text>
    </Pressable>
  );

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Header title="New Survey" subtitle="Fill in the inspection details" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* First Card: Inputs */}
        <View style={styles.card}>
          <Text style={styles.label}>Site Name *</Text>
          <MyInput
            placeholder="Enter site name"
            value={siteName}
            onChangeText={setSiteName}
          />

          <Text style={styles.label}>Client Name *</Text>
          <MyInput
            placeholder="Enter client name"
            value={clientName}
            onChangeText={setClientName}
          />

          <Text style={styles.label}>Contact Number *</Text>
          <MyInput
            placeholder="Enter contact number"
            value={contact}
            onChangeText={setContact}
            keyboardType="phone-pad"
          />

          <Text style={styles.label}>Description *</Text>
          <MyInput
            placeholder="Enter survey description..."
            value={description}
            onChangeText={setDescription}
            multiline={true}
          />

          <Text style={styles.label}>Notes *</Text>
          <MyInput
            placeholder="Enter inspection notes..."
            value={notes}
            onChangeText={setNotes}
            multiline={true}
          />
        </View>

        {/* Second Card: Priority */}
        <View style={styles.card}>
          <Text style={styles.label}>Priority *</Text>
          <View style={styles.priorityContainer}>
            <PriorityButton title="High" isSelected={priority === "High"} onPress={() => setPriority("High")} />
            <PriorityButton title="Medium" isSelected={priority === "Medium"} onPress={() => setPriority("Medium")} />
            <PriorityButton title="Low" isSelected={priority === "Low"} onPress={() => setPriority("Low")} />
          </View>
        </View>

        {/* Submit Button */}
        <MyButton
          title="Create Survey"
          onPress={submitSurvey}
          style={styles.submitBtn}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  scrollContent: {
    padding: 16,
    paddingTop: 16,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    
    // Soft shadow
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: "700",
    color: "#334155", // Darker text for labels like mockup
    marginTop: 10,
    marginBottom: 4,
    marginLeft: 4,
  },
  priorityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    gap: 10,
  },
  priorityBtn: {
    flex: 1,
    backgroundColor: "#F1F5F9", // Light gray background
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  priorityBtnActive: {
    backgroundColor: "#E2E8F0", // Slightly darker gray for selected
    borderWidth: 1,
    borderColor: "#CBD5E1",
  },
  priorityText: {
    color: "#475569",
    fontWeight: "600",
    fontSize: 15,
  },
  priorityTextActive: {
    color: "#0F172A",
    fontWeight: "700",
  },
  submitBtn: {
    backgroundColor: "#5D4949", // Dark brown/slate matching mockup
    marginHorizontal: 8,
    borderRadius: 16,
    paddingVertical: 16,
    marginTop: 10,
    
    elevation: 3,
    shadowColor: "#5D4949",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
});