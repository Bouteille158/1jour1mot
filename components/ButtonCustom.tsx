import React from "react";
import { View, Pressable, StyleSheet, Text } from "react-native";

interface SquareButtonProps {
  children: string;
  isBold?: boolean;
  height?: number | string;
  width?: number | string;
  showBorder?: boolean;
  textColor?: string;
  onPress: () => void;
  textStyle?: any;
}

const CustomButton = ({
  children,
  onPress,
  isBold,
  height,
  width,
  showBorder,
  textColor,
  textStyle,
}: SquareButtonProps) => {
  const backgroundColor = "#494949";
  const borderColor = "#212121";

  const styles = StyleSheet.create({
    squarebutton: {
      backgroundColor: backgroundColor,
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      color: "#fff",
      width: "100%",
      height: "100%",
      borderRadius: 8,
      borderWidth: 3,
      borderColor: showBorder ? borderColor : "transparent",
    },
    text: {
      color: textColor ? textColor : "#fff",
      fontSize: 15,
      width: "100%",
      textAlign: "center",
      ...(isBold ? { fontWeight: "bold" } : {}),
      ...textStyle,
    },
    container: {
      width: width ? width : 140,
      height: height ? height : 40,
    },
  });

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.squarebutton}>
        <Text style={styles.text}>{children}</Text>
      </View>
    </Pressable>
  );
};

export default CustomButton;
