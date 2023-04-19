import { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { useSelector } from "react-redux";
import { View } from "../components/Themed";
import { RootState } from "../redux";
import TextCustom from "../components/TextCustom";
import { Word, getTodayWordForEndUser } from "../services/words";
import NewWordCard from "../components/NewWordCard";
import moment from "moment";

export default function NewWordScreen() {
  const user = useSelector((state: RootState) => state.user);
  const [word, setWord] = useState<Word>();
  const [currentDate, setCurrentDate] = useState(moment());

  useEffect(() => {
    getTodayWordForEndUser(user.id)
      .then((res) => {
        // console.log("res: ", res);
        setWord(res);
        // console.log("Word : ", word);
      })
      .catch((err) => {
        console.log("Error : ", err);
      });
    const intervalId = setInterval(() => {
      const newDate = moment();
      if (!newDate.isSame(currentDate, "day")) {
        setCurrentDate(newDate);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [currentDate]);

  let newWordSection;
  if (word) {
    newWordSection = <NewWordCard word={word} />;
  } else {
    newWordSection = <TextCustom>Error : No word found</TextCustom>;
  }

  return (
    <View style={styles.container}>
      {newWordSection}
      <View>
        <Text>Today is {currentDate.format("ddd, MMM D YYYY")}</Text>
        <Text>{currentDate.format()}</Text>
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
