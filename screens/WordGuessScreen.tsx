import { useState, useEffect } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from "react-native";
import Spacer from "../components/Spacer";
import InputCustom from "../components/InputCustom";
import ButtonCustom from "../components/ButtonCustom";
// import { useHeaderHeight } from "@react-navigation/elements";
import { useSelector } from "react-redux";
import { RootState } from "../redux";
import TextCustom from "../components/TextCustom";
import Colors from "../constants/Colors";

export default function WordGuessScreen() {
  const [guess, setGuess] = useState<string>("");
  const [showDefinitions, setShowDefinitions] = useState<boolean>(false);
  const learningWord = useSelector((state: RootState) => state.lastLearnedWord);
  const [definitionId, setDefinitionId] = useState<number>(0);

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
      fontWeight: "500",
      textAlign: "center",
      width: "80%",
    },
  });
  // const headerHeight = useHeaderHeight();

  // create a function that show an alert if the word is correct
  function handleGuess(guess: string) {
    if (guess.trim().toLowerCase() === learningWord.word.trim().toLowerCase()) {
      Alert.alert("Bravo !", "Vous avez deviné le mot correctement.");
    } else {
      Alert.alert("Dommage !", "Vous n'avez pas deviné le mot correctement.");
    }
  }

  return (
    <>
      {/* <KeyboardAvoidingView
      style={{
        flex: 1,
      }}
      behavior={Platform.select({ android: undefined, ios: "padding" })}
      keyboardVerticalOffset={Platform.select({
        android: headerHeight + 2000,
        ios: headerHeight - 200,
      })}
    > */}
      {/* <ScrollView bounces={false}> */}
      <View style={styles.container}>
        <TextCustom style={styles.title}>
          Devinez le dernier mot que vous avez appris ayant les définitions
          suivantes
        </TextCustom>
        <Spacer height={20} />

        <View>
          <View
            style={{
              alignItems: "center",
            }}
          >
            <TextCustom>
              {learningWord.definitions[definitionId].definition.trim()}
            </TextCustom>
            <Spacer height={10} />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: 180,
              }}
            >
              <ButtonCustom
                onPress={() => {
                  setDefinitionId(
                    (((definitionId - 1) % learningWord.definitions.length) +
                      learningWord.definitions.length) %
                      learningWord.definitions.length
                  );
                }}
                width={50}
                isBold
              >
                {"<"}
              </ButtonCustom>
              <Spacer width={10} />
              <TextCustom
                style={{
                  flex: 1,
                  textAlign: "center",
                }}
              >
                {definitionId + 1} / {learningWord.definitions.length}
              </TextCustom>
              <Spacer width={10} />
              <ButtonCustom
                onPress={() => {
                  setDefinitionId(
                    (((definitionId + 1) % learningWord.definitions.length) +
                      learningWord.definitions.length) %
                      learningWord.definitions.length
                  );
                }}
                width={50}
                isBold
              >
                {">"}
              </ButtonCustom>
            </View>
          </View>
        </View>

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
            ? "Vous avez entré : " + guess.trim()
            : "Vous n'avez pas encore entré de mot"}
        </TextCustom>
        <Spacer height={10}></Spacer>
        <ButtonCustom
          onPress={() => {
            handleGuess(guess);
          }}
          isBold
        >
          Valider
        </ButtonCustom>
      </View>
      {/* </ScrollView> */}
      {/* </KeyboardAvoidingView> */}
    </>
  );
}
