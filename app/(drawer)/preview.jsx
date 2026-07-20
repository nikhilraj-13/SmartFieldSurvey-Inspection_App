import React from "react";
import { View, Text, StyleSheet, ScrollView, Image, Pressable, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useSurvey } from "../../context/SurveyContext";
import Header from "../../components/header";

export default function SurveyPreviewScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { addSurvey } = useSurvey();

  // If no params are passed, fall back to mockup placeholders.
  const siteName = params.siteName || "ABC Manufacturing Plant";
  const clientName = params.clientName || "Reliance Industries";
  const priority = params.priority || "High";
  const contact = params.contact || "+91 9876543210";
  const location = params.location || "22.3039, 70.8022";
  const description = params.description || "Routine inspection of machinery and workplace safety.";
  const notes = params.notes || "Inspection completed successfully. No major issues found.";
  const imageUrl = "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80";

  const handleEdit = () => {
    router.push({
      pathname: "/(tabs)/createSurvey",
      params: {
        siteName,
        clientName,
        priority,
        contact,
        location,
        description,
        notes,
        isEditing: "true"
      }
    });
  };

  const handleSubmit = () => {
    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;

    addSurvey({
      site: siteName,
      client: clientName,
      priority,
      description,
      date: formattedDate,
      contact,
      location,
      notes
    });

    Alert.alert("Success", "Survey Submitted & Saved to History!");
    router.push("/(tabs)/history");
  };

  const DetailRow = ({ icon, label, value }) => (
    <View style={styles.detailRow}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={22} color="#5D4949" />
      </View>
      <View style={styles.detailTextContainer}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{value}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header 
        title="Survey Preview" 
        subtitle="Review the survey before submission." 
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Preview Image */}
        <Image 
          source={{ uri: imageUrl }} 
          style={styles.previewImage} 
        />

        {/* Card 1: Details */}
        <View style={styles.card}>
          <DetailRow icon="business-outline" label="Site Name" value={siteName} />
          <DetailRow icon="person-outline" label="Client" value={clientName} />
          <DetailRow icon="flag-outline" label="Priority" value={priority} />
          <DetailRow icon="call-outline" label="Contact" value={contact} />
          <DetailRow icon="location-outline" label="Location" value={location} />
        </View>

        {/* Card 2: Description */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Description</Text>
          <Text style={styles.cardText}>{description}</Text>
        </View>

        {/* Card 3: Notes */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Notes</Text>
          <Text style={styles.cardText}>{notes}</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <Pressable 
            style={({ pressed }) => [
              styles.secondaryBtn,
              pressed && { opacity: 0.85 }
            ]} 
            onPress={handleEdit}
          >
            <Ionicons name="create-outline" size={18} color="#5D4949" style={styles.btnIcon} />
            <Text style={styles.secondaryBtnText}>Edit Survey</Text>
          </Pressable>

          <Pressable 
            style={({ pressed }) => [
              styles.primaryBtn,
              pressed && { opacity: 0.85 }
            ]} 
            onPress={handleSubmit}
          >
            <Ionicons name="checkmark-circle-outline" size={18} color="#FFFFFF" style={styles.btnIcon} />
            <Text style={styles.primaryBtnText}>Submit Survey</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 40,
  },
  previewImage: {
    width: "100%",
    height: 220,
    borderRadius: 24,
    marginBottom: 16,
    backgroundColor: "#E2E8F0",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginVertical: 6,
    
    // Soft shadow
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F4EFEA",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  detailTextContainer: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#94A3B8",
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: "#475569",
    lineHeight: 20,
    fontWeight: "500",
  },
  buttonContainer: {
    marginTop: 16,
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
    borderColor: "#5D4949",
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
