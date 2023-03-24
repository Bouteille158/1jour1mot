import React from "react";
import { View, Pressable, StyleSheet, Text } from "react-native";

interface ButtonProps {
  children: any;
  onPress: () => void;
  deleteVersion?: boolean;
}

const Button = ({ children, deleteVersion, onPress }: ButtonProps) => {
  const btnStyle = deleteVersion ? styles.buttonRed : styles.button;
  return (
    <Pressable onPress={onPress}>
      <View style={btnStyle}>
        <Text style={styles.text}>{children}</Text>
      </View>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#33312D",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "#fff",
    borderRadius: 8,
    padding: 8,
  },
  buttonRed: {
    backgroundColor: "#E53232",
    width: 120,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: 8,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    flexShrink: 1,
  },
});
