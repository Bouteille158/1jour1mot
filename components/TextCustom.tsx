import { useTheme } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, useColorScheme } from "react-native";
import Colors from "../constants/Colors";

interface CustomTextProps {
  style?: any;
  children: string | string[] | any;
  isBold?: boolean;
  size?: number;
  color?: string;
  padding?: number;
  margin?: number;
}

export default function TextCustom(props: CustomTextProps) {
  const { children, style, ...rest } = props;
  const scheme = useColorScheme();
  const theme = scheme === "dark" ? Colors.dark : Colors.light;

  const styles = StyleSheet.create({
    text: {
      color: theme.text,
      fontSize: props.size ? props.size : 16,
      fontWeight: props.isBold ? "bold" : "normal",
      padding: props.padding ? props.padding : 0,
      margin: props.margin ? props.margin : 2,
      ...style,
    },
  });

  return (
    <Text style={styles.text} {...rest}>
      {children}
    </Text>
  );
}
