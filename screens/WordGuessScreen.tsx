import { useState, useEffect } from "react";
import {
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
          <View>
            <TextCustom>
              {learningWord.definitions[definitionId].definition.trim()}
            </TextCustom>
            <Spacer height={10} />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
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
                {"\u27E8"}
              </ButtonCustom>
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
                {"\u27E9"}
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
            ? "Vous avez entré : " + guess
            : "Vous n'avez pas encore entré de mot"}
        </TextCustom>
        <Spacer height={10}></Spacer>
        <ButtonCustom
          onPress={() => {
            console.log("Button pressed");
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
