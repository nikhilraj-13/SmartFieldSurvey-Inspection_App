import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Platform, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useSurvey } from "../../context/SurveyContext";
import MyInput from "../../components/MyInput";
import MyButton from "../../components/MyButton";

export default function CreateSurvey() {
  const router = useRouter();
  const { addSurvey } = useSurvey();
  const [siteName, setSiteName] = useState("");
  const [clientName, setClientName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");

  const submitSurvey = () => {
    if (
      siteName.trim() === "" ||
      clientName.trim() === "" ||
      description.trim() === "" ||
      priority === ""
    ) {
      Alert.alert("Error", "Please fill all fields.");
      return;
    }

    // Auto-generate today's date since it was removed from the UI
    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;

    addSurvey({
      site: siteName,
      client: clientName,
      priority,
      description,
      date: formattedDate
    });

    Alert.alert("Success", "Survey Created Successfully!");

    setSiteName("");
    setClientName("");
    setDescription("");
    setPriority("");
    
    router.push("/(tabs)/history");
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

          <Text style={styles.label}>Description *</Text>
          <MyInput
            placeholder="Enter survey description..."
            value={description}
            onChangeText={setDescription}
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
    paddingTop: 30, // Some top padding since we might not have a header or it's handled by tabs
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