import { Pressable, Text, StyleSheet } from "react-native";

export default function MyButton({ title, onPress }) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
  },

  text: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});