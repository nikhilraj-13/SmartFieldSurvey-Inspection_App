import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSurvey } from "../../context/SurveyContext";

export default function Profile() {
  const { surveys } = useSurvey();

  // Dynamic User Data
  const [userData] = useState({
    name: "Nikhil Raj",
    course: "B.Tech Computer Science",
    enrollment: "SUK20206954",
    university: "Swaminarayan University",
    email: "nikhilraj@gmail.com",
    phone: "+91 9227151847",
    avatarUrl: "https://ui-avatars.com/api/?name=Nikhil+Raj&background=4F46E5&color=fff&size=200", 
  });

  // Calculate dynamic stats from survey context
  const totalSurveys = surveys.length;
  // Let's just mock today's as a subset, or calculate if date matches today.
  // We'll just use simple derivations for the demo
  const todaySurveys = surveys.filter(s => s.priority.toLowerCase() === 'high').length; 
  const pendingSurveys = surveys.filter(s => s.priority.toLowerCase() !== 'high').length;

  const DetailRow = ({ icon, label, value }) => (
    <View style={styles.detailRow}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={22} color="#475569" />
      </View>
      <View style={styles.detailTextContainer}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{value}</Text>
      </View>
    </View>
  );

  const StatBox = ({ value, label }) => (
    <View style={styles.statBox}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Header section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <Text style={styles.headerSubtitle}>Student Information</Text>
      </View>

      {/* Profile Card */}
      <View style={styles.card}>
        <Image source={{ uri: userData.avatarUrl }} style={styles.avatar} />
        <Text style={styles.name}>{userData.name}</Text>
        <Text style={styles.course}>{userData.course}</Text>
      </View>

      {/* Details Card */}
      <View style={styles.card}>
        <DetailRow icon="card-outline" label="Enrollment" value={userData.enrollment} />
        <DetailRow icon="school-outline" label="University" value={userData.university} />
        <DetailRow icon="mail-outline" label="Email" value={userData.email} />
        <DetailRow icon="call-outline" label="Phone" value={userData.phone} />
      </View>

      {/* Statistics Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Survey Statistics</Text>
        <View style={styles.statsContainer}>
          <StatBox value={todaySurveys} label="Today's" />
          <StatBox value={totalSurveys} label="Completed" />
          <StatBox value={pendingSurveys} label="Pending" />
        </View>
      </View>

      {/* About Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>About</Text>
        <Text style={styles.aboutText}>
          Smart Field Survey & Inspection App developed using React Native and Expo APIs as part of the Mobile Application Development Mini Project.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  scrollContent: {
    padding: 20,
    paddingTop: 60, // extra padding for status bar area
    paddingBottom: 40,
  },
  header: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#0F172A",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#64748B",
    fontWeight: "500",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    
    // Soft shadow
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 16,
    borderWidth: 3,
    borderColor: "#E2E8F0",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0F172A",
    textAlign: "center",
    marginBottom: 4,
  },
  course: {
    fontSize: 15,
    color: "#64748B",
    textAlign: "center",
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  detailTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  detailLabel: {
    fontSize: 13,
    color: "#94A3B8",
    fontWeight: "600",
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 16,
    color: "#1E293B",
    fontWeight: "700",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0F172A",
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statBox: {
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4F46E5",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: "#64748B",
    fontWeight: "500",
  },
  aboutText: {
    fontSize: 15,
    color: "#475569",
    lineHeight: 24,
  },
});