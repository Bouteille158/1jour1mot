import React from "react";
import { TextInput, StyleSheet } from "react-native";

interface ButtonProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  otherOptions?: any;
  width?: string | number;
}

const Input = ({
  onChange,
  value,
  placeholder,
  width,
  otherOptions,
}: ButtonProps) => {
  return (
    <TextInput
      placeholder={placeholder}
      style={[styles.input, { width: width ? width : "100%" }]}
      value={value}
      onChangeText={onChange}
      {...otherOptions}
    />
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#fff",
    height: 50,
    padding: 5,
    borderRadius: 4,
  },
});
