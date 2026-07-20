import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

export default function MyButton({ title, onPress, disabled = false, style }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#5D4949", // Match logout button dark brown/slate
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 16, // Pill-like shape
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
    // Softer Android shadow
    elevation: 3,
    // Softer iOS shadow
    shadowColor: "#5D4949",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.97 }], // Slightly softer scale down
  },
  disabled: {
    backgroundColor: "#A5B4FC", // Light Indigo (unchanged)
    shadowOpacity: 0,
    elevation: 0,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
