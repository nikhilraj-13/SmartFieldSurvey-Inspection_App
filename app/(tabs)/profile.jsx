import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  TextInput,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSurvey } from "../../context/SurveyContext";
import Header from "../../components/header";

export default function Profile() {
  const { surveys, profile, updateProfile } = useSurvey();
  const [isEditing, setIsEditing] = useState(false);

  // Local edit state
  const [draft, setDraft] = useState({ ...profile });

  const totalSurveys = surveys.length;
  const todaySurveys = surveys.filter((s) => s.priority.toLowerCase() === "high").length;
  const pendingSurveys = surveys.filter((s) => s.priority.toLowerCase() !== "high").length;

  const handleSave = () => {
    if (!draft.firstName.trim() || !draft.fullName.trim()) {
      Alert.alert("Validation", "Name fields cannot be empty.");
      return;
    }
    updateProfile(draft);
    setIsEditing(false);
    Alert.alert("Success", "Profile updated successfully!");
  };

  const handleCancel = () => {
    setDraft({ ...profile });
    setIsEditing(false);
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

  const EditField = ({ icon, label, field, placeholder, multiline }) => (
    <View style={styles.editFieldRow}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={20} color="#5D4949" />
      </View>
      <View style={styles.detailTextContainer}>
        <Text style={styles.detailLabel}>{label}</Text>
        <TextInput
          style={[styles.editInput, multiline && styles.editInputMulti]}
          value={draft[field]}
          onChangeText={(val) => setDraft((prev) => ({ ...prev, [field]: val }))}
          placeholder={placeholder}
          placeholderTextColor="#94A3B8"
          multiline={multiline}
        />
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
      <Header title="Profile" subtitle="Student Information" />

      {/* Profile Card */}
      <View style={styles.card}>
        <Image
          source={{ uri: isEditing ? draft.avatarUrl : profile.avatarUrl }}
          style={styles.avatar}
          defaultSource={{ uri: "https://ui-avatars.com/api/?name=User&background=5D4949&color=fff&size=200" }}
        />

        {isEditing ? (
          <>
            <Text style={styles.editAvatarHint}>Profile Image URL</Text>
            <TextInput
              style={[styles.editInput, styles.editInputCenter]}
              value={draft.avatarUrl}
              onChangeText={(val) => setDraft((prev) => ({ ...prev, avatarUrl: val }))}
              placeholder="Paste image URL here..."
              placeholderTextColor="#94A3B8"
            />
            <TextInput
              style={[styles.editInput, styles.editInputCenter, { marginTop: 8 }]}
              value={draft.firstName}
              onChangeText={(val) => setDraft((prev) => ({ ...prev, firstName: val }))}
              placeholder="First Name (shown on Dashboard)"
              placeholderTextColor="#94A3B8"
            />
            <TextInput
              style={[styles.editInput, styles.editInputCenter, { marginTop: 8 }]}
              value={draft.fullName}
              onChangeText={(val) => setDraft((prev) => ({ ...prev, fullName: val }))}
              placeholder="Full Name"
              placeholderTextColor="#94A3B8"
            />
          </>
        ) : (
          <>
            <Text style={styles.name}>{profile.fullName}</Text>
            <Text style={styles.course}>{profile.semester} • {profile.university}</Text>
          </>
        )}

        {/* Edit / Save / Cancel buttons */}
        {isEditing ? (
          <View style={styles.editActions}>
            <Pressable style={styles.saveBtn} onPress={handleSave}>
              <Ionicons name="checkmark" size={18} color="#fff" />
              <Text style={styles.saveBtnText}>Save Changes</Text>
            </Pressable>
            <Pressable style={styles.cancelBtn} onPress={handleCancel}>
              <Ionicons name="close" size={18} color="#5D4949" />
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </Pressable>
          </View>
        ) : (
          <Pressable style={styles.editBtn} onPress={() => { setDraft({ ...profile }); setIsEditing(true); }}>
            <Ionicons name="create-outline" size={18} color="#fff" />
            <Text style={styles.editBtnText}>Edit Profile</Text>
          </Pressable>
        )}
      </View>

      {/* Details Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Personal Details</Text>
        {isEditing ? (
          <>
            <EditField icon="card-outline" label="Enrollment Number" field="enrollment" placeholder="Enrollment number" />
            <EditField icon="school-outline" label="Semester / Course" field="semester" placeholder="e.g. Semester 2" />
            <EditField icon="business-outline" label="University" field="university" placeholder="University name" />
            <EditField icon="mail-outline" label="Email" field="email" placeholder="Email address" />
            <EditField icon="call-outline" label="Phone" field="phone" placeholder="Phone number" />
          </>
        ) : (
          <>
            <DetailRow icon="card-outline" label="Enrollment" value={profile.enrollment} />
            <DetailRow icon="school-outline" label="Semester" value={profile.semester} />
            <DetailRow icon="business-outline" label="University" value={profile.university} />
            <DetailRow icon="mail-outline" label="Email" value={profile.email} />
            <DetailRow icon="call-outline" label="Phone" value={profile.phone} />
          </>
        )}
      </View>

      {/* Statistics Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Survey Statistics</Text>
        <View style={styles.statsContainer}>
          <StatBox value={todaySurveys} label="High Priority" />
          <StatBox value={totalSurveys} label="Completed" />
          <StatBox value={pendingSurveys} label="Pending" />
        </View>
      </View>

      {/* About Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>About</Text>
        <Text style={styles.aboutText}>
          Smart Field Survey & Inspection App developed using React Native and Expo APIs as part of
          the Mobile Application Development Mini Project.
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
    paddingTop: 8,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
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
    marginBottom: 12,
    borderWidth: 3,
    borderColor: "#5D4949",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0F172A",
    textAlign: "center",
    marginBottom: 4,
  },
  course: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    marginBottom: 16,
  },
  editAvatarHint: {
    fontSize: 13,
    color: "#94A3B8",
    textAlign: "center",
    fontWeight: "600",
    marginBottom: 6,
  },
  editActions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 16,
    justifyContent: "center",
  },
  editBtn: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#5D4949",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    gap: 6,
    marginTop: 16,
  },
  editBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
  saveBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#5D4949",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    gap: 6,
    flex: 1,
    justifyContent: "center",
  },
  saveBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
  cancelBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#5D4949",
    gap: 6,
    justifyContent: "center",
  },
  cancelBtnText: {
    color: "#5D4949",
    fontWeight: "700",
    fontSize: 14,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  editFieldRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 14,
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
  editInput: {
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 15,
    color: "#1E293B",
    backgroundColor: "#F8FAFC",
  },
  editInputMulti: {
    height: 80,
    textAlignVertical: "top",
  },
  editInputCenter: {
    textAlign: "center",
    borderColor: "#E2E8F0",
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
    color: "#5D4949",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: "#64748B",
    fontWeight: "500",
    textAlign: "center",
  },
  aboutText: {
    fontSize: 15,
    color: "#475569",
    lineHeight: 24,
  },
});