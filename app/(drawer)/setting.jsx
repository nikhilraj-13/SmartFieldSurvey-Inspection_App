import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Settings() {
  const SettingRow = ({ icon, title, isLink, rightText, hideBorder }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.row, hideBorder && styles.rowNoBorder]}
      disabled={!isLink}
    >
      <View style={styles.rowLeft}>
        <Ionicons name={icon} size={22} color="#64748B" style={styles.rowIcon} />
        <Text style={styles.rowTitle}>{title}</Text>
      </View>
      {isLink ? (
        <Ionicons name="chevron-forward-outline" size={20} color="#CBD5E1" />
      ) : (
        <Text style={styles.rightText}>{rightText}</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
        <Text style={styles.headerSubtitle}>Manage your application preferences.</Text>
      </View>

      {/* General Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>General</Text>
        <SettingRow icon="information-circle-outline" title="About App" isLink />
        <SettingRow icon="help-circle-outline" title="Help & Support" isLink />
        <SettingRow icon="shield-checkmark-outline" title="Privacy Policy" isLink hideBorder />
      </View>

      {/* Application Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Application</Text>
        <SettingRow icon="phone-portrait-outline" title="Version" rightText="1.0.0" />
        <SettingRow icon="code-slash-outline" title="Developer" rightText="React Native Project" hideBorder />
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} activeOpacity={0.8}>
        <Ionicons name="log-out-outline" size={20} color="#FFFFFF" style={styles.logoutIcon} />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
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
    paddingTop: 40,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#0F172A",
    marginBottom: 6,
  },
  headerSubtitle: {
    fontSize: 15,
    color: "#64748B",
    fontWeight: "500",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 20,
    
    // Soft shadow
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#334155",
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  rowNoBorder: {
    borderBottomWidth: 0,
    paddingBottom: 4,
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowIcon: {
    marginRight: 14,
  },
  rowTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1E293B",
  },
  rightText: {
    fontSize: 14,
    color: "#94A3B8",
    fontWeight: "500",
  },
  logoutButton: {
    backgroundColor: "#5D4949", // Match the screenshot's dark brown/slate
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 16,
    marginTop: 10,
    
    elevation: 2,
    shadowColor: "#5D4949",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  logoutIcon: {
    marginRight: 10,
  },
  logoutText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});