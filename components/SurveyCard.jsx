import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function SurveyCard({
  site,
  client,
  priority,
  description,
  date,
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{site}</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Client:</Text>
        <Text style={styles.value}> {client}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Priority:</Text>
        <Text style={styles.value}> {priority}</Text>
      </View>

      {date ? (
        <View style={styles.row}>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.value}> {date}</Text>
        </View>
      ) : null}

      {description ? (
        <View style={styles.descContainer}>
          <Text style={styles.label}>Description:</Text>
          <Text style={styles.description} numberOfLines={2}>
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
    padding: 16,
    borderRadius: 14,

    elevation: 5,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2563EB",
    marginBottom: 12,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#555",
    width: 80,
  },

  value: {
    fontSize: 15,
    color: "#222",
    flex: 1,
  },

  descContainer: {
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingTop: 10,
  },

  description: {
    marginTop: 4,
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
});
