import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { View } from "../components/Themed";
import { RootState, setLastWord, setTodayWord } from "../redux";
import TextCustom from "../components/TextCustom";
import {
  getLastLearningWordIDForAccount,
  getTodayWordForEndUser,
  getWordFromID,
} from "../services/words";
import NewWordCard from "../components/NewWordCard";
import moment from "moment";

export default function NewWordScreen() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [wordSection, setwordSection] = useState(
    <View>
      <TextCustom>Loading...</TextCustom>
    </View>
  );
  const [currentDate, setCurrentDate] = useState(moment());

  useEffect(() => {
    getTodayWordForEndUser(user.id)
      .then((res) => {
        // console.log("res: ", res);
        dispatch(setTodayWord(res));
        setwordSection(<NewWordCard word={res} />);
      })
      .catch((err) => {
        console.log("Error : ", err);
        setwordSection(<TextCustom>Error : No word found</TextCustom>);
      });
    getLastLearningWordIDForAccount(user.id)
      .then(async (wordID) => {
        console.log("Last learned word ID : ", wordID);
        if (!wordID || wordID instanceof Error) {
          throw new Error("No last learned word");
        }
        const lastWord = await getWordFromID(wordID);
        if (!lastWord || lastWord instanceof Error) {
          console.error("Error getting last learning word : ", lastWord);
        } else {
          dispatch(setLastWord(lastWord));
        }
      })
      .catch((err) => {
        console.log("Error getting last learning word : ", err);
      });
    const intervalId = setInterval(() => {
      const newDate = moment();
      if (!newDate.isSame(currentDate, "day")) {
        setCurrentDate(newDate);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [currentDate]);

  return (
    <View style={styles.container}>
      {wordSection}
      <View>
        <TextCustom>
          Today is {currentDate.format("ddd, MMM D YYYY")}
        </TextCustom>
        <TextCustom>{currentDate.format()}</TextCustom>
      </View>
    </View>
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
    flexDirection: "column",
    flex: 1,
    width: "100%",
    backgroundColor: "#ff000000",
  },
  row: {
    flexDirection: "row",
    flex: 1,
  },
});
