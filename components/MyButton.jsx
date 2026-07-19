import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

export default function MyButton({ title, onPress, disabled = false }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#2563EB",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,

    // Android shadow
    elevation: 4,

    // iOS shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },

  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },

  disabled: {
    backgroundColor: "#93C5FD",
  },

  text: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
