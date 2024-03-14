import { useEffect, useState } from "react";
import { Alert, StyleSheet, View, useColorScheme } from "react-native";
import Spacer from "../components/Spacer";
import InputCustom from "../components/InputCustom";
import ButtonCustom from "../components/ButtonCustom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, setLastWord } from "../redux";
import TextCustom from "../components/TextCustom";
import Colors from "../constants/Colors";
import {
  Word,
  getLastLearningWordIDForAccount,
  getWordFromID,
  setWordAsGuessedRight,
} from "../services/words";

export default function WordGuessScreen() {
  const [guess, setGuess] = useState<string>("");
  const learningWord = useSelector((state: RootState) => state.lastLearnedWord);
  const user = useSelector((state: RootState) => state.user);
  const [definitionId, setDefinitionId] = useState<number>(0);
  const dispatch = useDispatch();

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

  useEffect(() => {
    setGuess("");
    setDefinitionId(0);
  }, [learningWord]);

  function handleGuess(guess: string) {
    if (guess.trim().toLowerCase() === learningWord.word.trim().toLowerCase()) {
      Alert.alert("Bravo !", "Vous avez deviné le mot correctement.");
      setWordAsGuessedRight(user.id, learningWord.id);
      getLastLearningWordIDForAccount(user.id)
        .then(async (wordID) => {
          console.log("Last learned word ID : ", wordID);
          if (wordID instanceof Error) {
            throw new Error("No last learned word");
          }
          if (wordID === null) {
            dispatch(setLastWord({} as Word));
            return;
          }
          const lastWord = await getWordFromID(wordID);
          if (lastWord instanceof Error) {
            console.error(
              "Error getting last learning word from id: ",
              lastWord
            );
          } else {
            console.log("new Last learned word : ", lastWord);
            dispatch(setLastWord(lastWord));
            console.log("new Last learned word in dispatch : ", learningWord);
            console.log(
              "longueur de l'objet learning word" +
                Object.keys(learningWord).length
            );
          }
        })
        .catch((err) => {
          console.log(
            "Error getting last learning word after commit outer catch : ",
            err
          );
        });
    } else {
      Alert.alert("Dommage !", "Vous n'avez pas deviné le mot correctement.");
    }
  }

  return (
    <>
      <View style={styles.container}>
        {Object.keys(learningWord).length === 0 ? (
          <>
            <TextCustom style={styles.title}>
              Vous n'avez plus de mots à apprendre, revenez demain :D
            </TextCustom>
          </>
        ) : (
          <>
            <TextCustom style={styles.title}>
              Devinez le dernier mot que vous avez appris ayant les définitions
              suivantes
            </TextCustom>
            <Spacer height={20} />

            <View>
              <View
                style={{
                  alignItems: "center",
                  width: "80%",
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
                        (((definitionId - 1) %
                          learningWord.definitions.length) +
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
                        (((definitionId + 1) %
                          learningWord.definitions.length) +
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
          </>
        )}
      </View>
    </>
  );
}
