import { useTheme } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, useColorScheme } from "react-native";
import Colors from "../constants/Colors";

interface CustomTextProps {
  children: string;
  isBold?: boolean;
  size?: number;
  color?: string;
  padding?: number;
  margin?: number;
}

export default function TextCustom(props: CustomTextProps) {
  const { children, ...rest } = props;
  const scheme = useColorScheme();
  const theme = scheme === "dark" ? Colors.dark : Colors.light;

  const styles = StyleSheet.create({
    text: {
      color: theme.text,
      fontSize: props.size ? props.size : 16,
      fontWeight: props.isBold ? "bold" : "normal",
      padding: props.padding ? props.padding : 0,
      margin: props.margin ? props.margin : 2,
    },
  });

  return (
    <Text style={styles.text} {...rest}>
      {children}
    </Text>
  );
}
