import React, { useState } from "react";
import { useSurvey } from "../../context/SurveyContext";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  Pressable,
} from "react-native";

import Header from "../../components/header";
import SurveyCard from "../../components/SurveyCard";
import MyButton from "../../components/MyButton";
import MyInput from "../../components/MyInput";

// Helper component for filter chips
const FilterChip = ({ title, isActive, onPress }) => (
  <Pressable
    onPress={onPress}
    style={[styles.chip, isActive && styles.chipActive]}
  >
    <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
      {title}
    </Text>
  </Pressable>
);

export default function HistoryScreen() {
  const { surveys, deleteSurvey } = useSurvey();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const handleDelete = (id) => {
    Alert.alert(
      "Delete Survey",
      "Are you sure you want to delete this survey?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => deleteSurvey(id) },
      ]
    );
  };

  const viewDetails = (item) => {
    Alert.alert(
      "Survey Details",
      `Site:\n${item.site}\n\nClient:\n${item.client}\n\nPriority:\n${item.priority}\n\nDate:\n${item.date || "N/A"}\n\nDescription:\n${item.description || "N/A"}`
    );
  };

  const filteredData = surveys.filter((item) => {
    const searchMatch = item.site.toLowerCase().includes(search.toLowerCase());
    const priorityMatch = filter === "All" || item.priority?.toLowerCase() === filter.toLowerCase();
    return searchMatch && priorityMatch;
  });

  return (
    <View style={styles.container}>
      <Header title="Survey History" />
      
      <View style={styles.controlsContainer}>
        <MyInput
          placeholder="Search by Site Name..."
          value={search}
          onChangeText={setSearch}
        />

        <Text style={styles.filterTitle}>Filter by Priority</Text>
        <View style={styles.chipsContainer}>
          <FilterChip title="All" isActive={filter === "All"} onPress={() => setFilter("All")} />
          <FilterChip title="High" isActive={filter === "High"} onPress={() => setFilter("High")} />
          <FilterChip title="Medium" isActive={filter === "Medium"} onPress={() => setFilter("Medium")} />
          <FilterChip title="Low" isActive={filter === "Low"} onPress={() => setFilter("Low")} />
        </View>
      </View>

      {filteredData.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No Surveys Found</Text>
          <Text style={styles.emptySubtext}>Try adjusting your filters or create a new one.</Text>
        </View>
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.cardWrapper}>
              <SurveyCard
                site={item.site}
                client={item.client}
                priority={item.priority}
                description={item.description}
                date={item.date}
              />
              <View style={styles.cardActions}>
                <MyButton
                  title="View Details"
                  onPress={() => viewDetails(item)}
                  style={styles.actionBtn}
                />
                <MyButton
                  title="Delete"
                  onPress={() => handleDelete(item.id)}
                  style={[styles.actionBtn, styles.deleteBtn]}
                />
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC", // Match new background color
  },
  controlsContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    marginBottom: 8,
  },
  filterTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#64748B",
    marginTop: 12,
    marginBottom: 8,
  },
  chipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8, // Requires React Native 0.71+, safe to use generally or use margins
    marginBottom: 8,
  },
  chip: {
    backgroundColor: "#F1F5F9",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginRight: 8, // Fallback for gap
    marginBottom: 8,
  },
  chipActive: {
    backgroundColor: "#4F46E5",
    borderColor: "#4F46E5",
  },
  chipText: {
    color: "#475569",
    fontWeight: "600",
    fontSize: 14,
  },
  chipTextActive: {
    color: "#FFFFFF",
  },
  listContent: {
    paddingBottom: 20,
  },
  cardWrapper: {
    marginBottom: 16,
  },
  cardActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: -4,
  },
  actionBtn: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 12,
  },
  deleteBtn: {
    backgroundColor: "#EF4444", // Red for delete
    shadowColor: "#EF4444",
  },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#334155",
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 15,
    color: "#64748B",
    textAlign: "center",
  },
});