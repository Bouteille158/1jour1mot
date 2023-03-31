import React from "react";
import { TextInput, StyleSheet, useColorScheme } from "react-native";
import Colors from "../constants/Colors";

interface ButtonProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  otherOptions?: any;
  width?: string | number;
}

const InputCustom = ({
  onChange,
  value,
  placeholder,
  width,
  otherOptions,
}: ButtonProps) => {
  const scheme = useColorScheme();
  const theme = scheme === "dark" ? Colors.dark : Colors.light;

  const styles = StyleSheet.create({
    input: {
      backgroundColor: theme.textInputBackgroundColor,
      height: 50,
      padding: 5,
      borderRadius: 4,
      borderColor: "#ccc",
      borderWidth: 1,
    },
  });
  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor={theme.textInputLabel}
      style={[styles.input, { width: width ? width : "100%" }]}
      value={value}
      onChangeText={onChange}
      {...otherOptions}
    />
  );
};

export default InputCustom;
