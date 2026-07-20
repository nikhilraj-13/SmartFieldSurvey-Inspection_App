import React, { useState } from "react";
import { TextInput, StyleSheet, View } from "react-native";

export default function MyInput({
  placeholder,
  value,
  onChangeText,
  keyboardType = "default",
  secureTextEntry = false,
  multiline = false,
  numberOfLines = 1,
  style
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <TextInput
      style={[
        styles.input,
        multiline && styles.multiline,
        isFocused && styles.inputFocused,
        style
      ]}
      placeholder={placeholder}
      placeholderTextColor="#94A3B8" // Lighter slate
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      multiline={multiline}
      numberOfLines={numberOfLines}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#F8FAFC", // Very light gray background
    borderWidth: 1.5,
    borderColor: "#E2E8F0", // Soft border
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#0F172A",
    marginVertical: 8,
  },
  inputFocused: {
    backgroundColor: "#FFFFFF",
    borderColor: "#4F46E5", // Indigo border on focus
    // Subtle shadow on focus
    elevation: 2,
    shadowColor: "#4F46E5",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  multiline: {
    minHeight: 120,
    textAlignVertical: "top",
    paddingTop: 16, // Ensure top padding is respected on multiline
  },
});
