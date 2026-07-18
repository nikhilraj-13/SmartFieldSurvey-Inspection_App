import { View, Text, StyleSheet } from "react-native";

export default function Header({ title }) {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#2196F3",
    padding: 18,
    alignItems: "center",
  },

  text: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
});