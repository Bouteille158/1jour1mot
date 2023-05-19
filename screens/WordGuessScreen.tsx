import { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from "react-native";
import Spacer from "../components/Spacer";
import InputCustom from "../components/InputCustom";
import ButtonCustom from "../components/ButtonCustom";
import { useHeaderHeight } from "@react-navigation/elements";
import { useSelector } from "react-redux";
import { RootState } from "../redux";
import TextCustom from "../components/TextCustom";
import Colors from "../constants/Colors";

export default function WordGuessScreen() {
  const [guess, setGuess] = useState<string>("");
  const [showDefinitions, setShowDefinitions] = useState<boolean>(false);
  const learningWord = useSelector((state: RootState) => state.lastLearnedWord);

  const scheme = useColorScheme();
  const theme = scheme === "dark" ? Colors.dark : Colors.light;
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.background,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
    },
  });
  const headerHeight = useHeaderHeight();

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
      }}
      behavior={Platform.select({ android: undefined, ios: "padding" })}
      keyboardVerticalOffset={Platform.select({
        android: headerHeight + 2000,
        ios: headerHeight - 200,
      })}
    >
      {/* <ScrollView bounces={false}> */}
      <View style={styles.container}>
        <View>
          {showDefinitions ? (
            <View>
              {learningWord.definitions.map((definition, key) => {
                return (
                  <TextCustom key={key}>{definition.definition}</TextCustom>
                );
              })}
              <ButtonCustom
                onPress={() => {
                  setShowDefinitions(!showDefinitions);
                }}
              >
                Cacher les définitions
              </ButtonCustom>
            </View>
          ) : (
            <ButtonCustom
              onPress={() => {
                setShowDefinitions(!showDefinitions);
              }}
            >
              Afficher les définitions
            </ButtonCustom>
          )}
        </View>
        <TextCustom style={styles.title}>
          Devinez le dernier mot que vous avez appris
        </TextCustom>
        <Spacer height={30} />
        <InputCustom
          value={guess}
          onChange={function (value: string): void {
            setGuess(value);
          }}
          placeholder="Entrez un mot"
          width={"80%"}
        ></InputCustom>
        <TextCustom>
          {guess.length > 0
            ? "Vous avez entré : " + guess
            : "Vous n'avez pas encore entré de mot"}
        </TextCustom>
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
