import React from "react";
import { View, Pressable, StyleSheet, Text } from "react-native";

interface SquareButtonProps {
  children: string;
  onPress: () => void;
}

const SquareButton = ({ children, onPress }: SquareButtonProps) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.squarebutton}>
        <Text style={styles.text}>{children}</Text>
      </View>
    </Pressable>
  );
};

export default SquareButton;

const styles = StyleSheet.create({
  squarebutton: {
    backgroundColor: "#33312D",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "#fff",
    borderRadius: 8,
  },
  text: {
    color: "#fff",
    padding: 8,
    width: 130,
    textAlign: "center",
    fontWeight: "bold",
  },
});
