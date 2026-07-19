import React from "react";
import { TextInput, StyleSheet } from "react-native";

export default function MyInput({
  placeholder,
  value,
  onChangeText,
  keyboardType = "default",
  secureTextEntry = false,
  multiline = false,
  numberOfLines = 1,
}) {
  return (
    <TextInput
      style={[
        styles.input,
        multiline && styles.multiline,
      ]}
      placeholder={placeholder}
      placeholderTextColor="#9CA3AF"
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      multiline={multiline}
      numberOfLines={numberOfLines}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 14,
    fontSize: 16,
    color: "#111827",
    marginVertical: 8,

    // Android shadow
    elevation: 2,

    // iOS shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },

  multiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
});
