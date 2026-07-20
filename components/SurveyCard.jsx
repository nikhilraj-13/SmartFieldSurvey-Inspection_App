import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SurveyCard({
  id,
  site,
  client,
  priority,
  description,
  date,
  onView,
  onDelete,
}) {
  const getPriorityColors = (level) => {
    switch (level?.toLowerCase()) {
      case "high":
        return { bg: "#BA4A4A", text: "#FFFFFF" }; // Muted Red
      case "medium":
        return { bg: "#D98636", text: "#FFFFFF" }; // Muted Orange
      case "low":
        return { bg: "#4A8B6F", text: "#FFFFFF" }; // Muted Green
      default:
        return { bg: "#94A3B8", text: "#FFFFFF" }; // Gray
    }
  };

  const badgeColors = getPriorityColors(priority);

  // Format ID to SRV001, SRV002, etc. If it's already structured, use it directly, otherwise pad it.
  const formattedId = id
    ? id.startsWith("SRV")
      ? id
      : `SRV${String(id).padStart(3, "0")}`
    : null;

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{site}</Text>
        <View style={[styles.badge, { backgroundColor: badgeColors.bg }]}>
          <Text style={[styles.badgeText, { color: badgeColors.text }]}>
            {priority}
          </Text>
        </View>
      </View>

      <Text style={styles.client}>{client}</Text>
      {formattedId && <Text style={styles.idText}>{formattedId}</Text>}

      {date && (
        <View style={styles.row}>
          <Text style={styles.label}>Date: </Text>
          <Text style={styles.value}>{date}</Text>
        </View>
      )}

      {description && (
        <View style={styles.descContainer}>
          <Text style={styles.description} numberOfLines={3}>
            {description}
          </Text>
        </View>
      )}

      {onView && onDelete && (
        <View style={styles.actionsContainer}>
          <Pressable style={styles.viewBtn} onPress={onView}>
            <Ionicons name="eye-outline" size={18} color="#FFFFFF" style={styles.btnIcon} />
            <Text style={styles.btnText}>View</Text>
          </Pressable>
          
          <Pressable style={styles.deleteBtn} onPress={onDelete}>
            <Ionicons name="trash-outline" size={18} color="#FFFFFF" style={styles.btnIcon} />
            <Text style={styles.btnText}>Delete</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 18,
    borderRadius: 16,
    
    // Softer shadow
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    flex: 1,
    marginRight: 8,
  },

  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 10,
  },

  badgeText: {
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
  },

  client: {
    fontSize: 14,
    color: "#475569",
    fontWeight: "500",
  },

  idText: {
    fontSize: 12,
    color: "#94A3B8",
    marginTop: 2,
    fontWeight: "500",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },

  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#64748B",
  },

  value: {
    fontSize: 13,
    fontWeight: "500",
    color: "#334155",
  },

  descContainer: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
  },

  description: {
    fontSize: 14,
    color: "#475569",
    lineHeight: 20,
  },

  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    gap: 12,
  },

  viewBtn: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#5D4949",
    paddingVertical: 12,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  deleteBtn: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#C94A4A",
    paddingVertical: 12,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  btnIcon: {
    marginRight: 6,
  },

  btnText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
});
