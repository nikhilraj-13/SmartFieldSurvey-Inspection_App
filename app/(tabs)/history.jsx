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
    let details = `Site:\n${item.site}\n\nClient:\n${item.client}\n\nPriority:\n${item.priority}\n\nDate:\n${item.date || "N/A"}`;
    if (item.contact) details += `\n\nContact:\n${item.contact}`;
    if (item.location) details += `\n\nLocation:\n${item.location}`;
    details += `\n\nDescription:\n${item.description || "N/A"}`;
    if (item.notes) details += `\n\nNotes:\n${item.notes}`;

    Alert.alert("Survey Details", details);
  };

  const filteredData = surveys.filter((item) => {
    const searchMatch = item.site.toLowerCase().includes(search.toLowerCase());
    const priorityMatch = filter === "All" || item.priority?.toLowerCase() === filter.toLowerCase();
    return searchMatch && priorityMatch;
  });

  return (
    <View style={styles.container}>
      <Header title="Survey History" subtitle="View previous surveys." />
      
      <View style={styles.controlsContainer}>
        <MyInput
          placeholder="Search survey..."
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />

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
            <SurveyCard
              id={item.id}
              site={item.site}
              client={item.client}
              priority={item.priority}
              description={item.description}
              date={item.date}
              onView={() => viewDetails(item)}
              onDelete={() => handleDelete(item.id)}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  controlsContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    backgroundColor: "#F8FAFC",
  },
  searchInput: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderColor: "#EADEC9",
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  chipsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    marginBottom: 4,
  },
  chip: {
    backgroundColor: "#F4EFEA",
    paddingVertical: 10,
    borderRadius: 12,
    flex: 1,
    marginHorizontal: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  chipActive: {
    backgroundColor: "#5D4949",
  },
  chipText: {
    color: "#5D4949",
    fontWeight: "700",
    fontSize: 14,
  },
  chipTextActive: {
    color: "#FFFFFF",
  },
  listContent: {
    paddingBottom: 20,
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