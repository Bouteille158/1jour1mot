import { StyleSheet, useColorScheme, View } from "react-native";
import React from "react";
import TextCustom from "./TextCustom";
import { Feather } from "@expo/vector-icons";
import Spacer from "./Spacer";
import Colors from "../constants/Colors";

export default function WelcomeHeader() {
  const scheme = useColorScheme();
  const theme = scheme === "dark" ? Colors.dark : Colors.light;

  console.log(theme);

  return (
    <View style={styles.container}>
      <Feather name="book-open" size={120} color={theme.text} />
      <TextCustom isBold size={24}>
        1 Jour 1 Mot
      </TextCustom>
      <Spacer height={10} />
      <TextCustom size={18}>
        Apprenez de nouveaux mots en une minute par jour
      </TextCustom>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
  },
});
