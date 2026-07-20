import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function SurveyCard({
  site,
  client,
  priority,
  description,
  date,
}) {
  const getPriorityColor = (level) => {
    switch (level?.toLowerCase()) {
      case "high":
        return "#EF4444"; // Red
      case "medium":
        return "#F59E0B"; // Amber
      case "low":
        return "#10B981"; // Green
      default:
        return "#94A3B8"; // Gray
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{site}</Text>
        <View
          style={[
            styles.badge,
            { backgroundColor: getPriorityColor(priority) + "1A" }, // 10% opacity background
          ]}
        >
          <Text
            style={[
              styles.badgeText,
              { color: getPriorityColor(priority) },
            ]}
          >
            {priority}
          </Text>
        </View>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Client</Text>
        <Text style={styles.value}>{client}</Text>
      </View>

      {date ? (
        <View style={styles.row}>
          <Text style={styles.label}>Date</Text>
          <Text style={styles.value}>{date}</Text>
        </View>
      ) : null}

      {description ? (
        <View style={styles.descContainer}>
          <Text style={styles.descLabel}>Description</Text>
          <Text style={styles.description} numberOfLines={3}>
            {description}
          </Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginVertical: 10,
    padding: 20,
    borderRadius: 16,

    // Softer shadow
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0F172A", // Dark Slate
    flex: 1,
    marginRight: 12,
  },

  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },

  badgeText: {
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#4F46E5", // Indigo (replaced blue)
    width: 70,
  },

  value: {
    fontSize: 15,
    fontWeight: "500",
    color: "#1E293B", // Darker Slate
    flex: 1,
  },

  descContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
  },

  descLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#4F46E5",
    marginBottom: 4,
  },

  description: {
    fontSize: 15,
    color: "#334155",
    lineHeight: 22,
  },
});
