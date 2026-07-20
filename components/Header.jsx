import { View, Text, StyleSheet, Platform } from "react-native";

export default function Header({ title }) {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#FFFFFF",
    paddingTop: Platform.OS === 'ios' ? 50 : 20, // Add top padding for status bar if not handled by SafeAreaView
    paddingBottom: 15,
    paddingHorizontal: 20,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
    
    // Subtle shadow for modern look
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },

  text: {
    color: "#0F172A", // Dark Slate
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});