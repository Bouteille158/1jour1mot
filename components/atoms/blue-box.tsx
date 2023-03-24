import React from "react";
import { View, StyleSheet } from "react-native";

interface BlueBoxProps {
  children: any;
}

const BlueBox = ({ children }: BlueBoxProps) => {
  return <View style={styles.bluebox}>{children}</View>;
};

export default BlueBox;

const styles = StyleSheet.create({
  bluebox: {
    backgroundColor: "#489BAD",
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
});
