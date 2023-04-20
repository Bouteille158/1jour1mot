import { StyleSheet, ScrollView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import {
  Word,
  getLearningWordListForAccount,
  getWordHistory,
} from "../services/words";
import { RootState } from "../redux";
import { useEffect, useState } from "react";
import WordHistoryCard from "../components/WordHistoryCard";

export default function WordHistoryScreen() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [wordList, setWordList] = useState<Word[]>([]);

  const scheme = useColorScheme();
  const theme = scheme === "dark" ? Colors.dark : Colors.light;

  async function getWordHistoryFromService(wordIDList: string[]) {
    const wordList = await getWordHistory(wordIDList);
    if (wordList instanceof Error || wordList === null) {
      console.log(wordList);
      alert("Error while getting word list in history screen");
      throw new Error("Error while getting word list in history screen");
    }
    console.log("Word list : " + wordList);
    console.log("Word list type : " + typeof wordList);
    setWordList(wordList);
  }

  useEffect(() => {
    getLearningWordListForAccount(user.id).then((wordIDList) => {
      if (wordIDList instanceof Error) {
        console.log(wordIDList);
        alert("Error while getting word id list in history screen");
        throw new Error("Error while getting word id list in history screen");
      }
      console.log("Word ID list : " + wordIDList);
      getWordHistoryFromService(wordIDList);
    });
  }, []);

  return (
    <ScrollView style={{ backgroundColor: theme.background }}>
      <View style={styles.container}>
        {wordList.map((word, key) => {
          return <WordHistoryCard key={key} word={word} />;
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 30,
    width: "100%",
    textAlign: "center",
    fontWeight: "bold",
    fontStyle: "italic",
    backgroundColor: "#ff000000",
  },
  list: {
    backgroundColor: "#ff000000",
    flexDirection: "column",
    flex: 1,
    width: "100%",
  },
});
