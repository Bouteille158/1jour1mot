import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import Spacer from "../components/Spacer";
import { Text, View } from "../components/Themed";
import InputCustom from "../components/InputCustom";
import ButtonCustom from "../components/ButtonCustom";

import { useHeaderHeight } from "@react-navigation/elements";

export default function WordGuessScreen() {
  const [guess, setGuess] = useState<string>("");
  useEffect(() => {}, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      // borderWidth: 2,
      // borderColor: "#00ccff",
    },
    title: {
      // borderWidth: 2,
      // borderColor: "#275745",
      fontSize: 20,
      fontWeight: "bold",
    },
  });
  const headerHeight = useHeaderHeight();

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        // borderWidth: 2,
        // borderColor: "#ff0000ff"
      }}
      behavior={Platform.select({ android: undefined, ios: "padding" })}
      keyboardVerticalOffset={Platform.select({
        android: headerHeight + 2000,
        ios: headerHeight - 200,
      })}
    >
      {/* <ScrollView bounces={false}> */}
      <View style={styles.container}>
        <Text style={styles.title}>
          Devinez le dernier mot que vous avez appris
        </Text>
        <Spacer height={30} />
        <InputCustom
          value={guess}
          onChange={function (value: string): void {
            setGuess(value);
          }}
          placeholder="Entrez un mot"
          width={"80%"}
        ></InputCustom>
        <Text>
          {guess.length > 0
            ? "Vous avez entré : " + guess
            : "Vous n'avez pas encore entré de mot"}
        </Text>
        <Spacer height={10}></Spacer>
        <ButtonCustom
          onPress={() => {
            console.log("Button pressed");
          }}
        >
          Valider
        </ButtonCustom>
      </View>
      {/* </ScrollView> */}
    </KeyboardAvoidingView>
  );
}
