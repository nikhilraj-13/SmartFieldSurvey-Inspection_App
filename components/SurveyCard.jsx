import { View, Text, StyleSheet } from "react-native";

export default function SurveyCard({
  site,
  client,
  priority,
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{site}</Text>

      <Text>Client : {client}</Text>

      <Text>Priority : {priority}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    elevation: 4,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
});