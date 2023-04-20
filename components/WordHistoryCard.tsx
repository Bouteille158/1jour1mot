// Create a new React component WordHistoryCard.tsx

import { View, StyleSheet, Text, useColorScheme } from "react-native";
import { Word } from "../services/words";
import Colors from "../constants/Colors";
import { useState } from "react";
import CustomButton from "./ButtonCustom";
import Spacer from "./Spacer";

interface WordHistoryCardProps {
  word: Word;
}

export default function WordHistoryCard(props: WordHistoryCardProps) {
  const scheme = useColorScheme();
  const theme = scheme === "dark" ? Colors.dark : Colors.light;

  const [showDefinition, setShowDefinition] = useState(false);

  function capitalizeFirtLetter(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  const styles = StyleSheet.create({
    container: {
      flexDirection: "column",
      padding: 10,
      borderRadius: 10,
      borderColor: "#a8a8a8",
      borderWidth: 2,
      flex: 1,
      width: "100%",
    },
    definition: {
      color: theme.text,
      fontSize: 20,
      flexWrap: "wrap",
    },
    mot: {
      fontSize: 30,
      color: theme.text,
    },
  });

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.mot}>
          {capitalizeFirtLetter(props.word.word.trim())}
        </Text>
        <View style={{ flex: 1 }}></View>
        <CustomButton onPress={() => setShowDefinition(!showDefinition)}>
          {showDefinition ? "Cacher définition" : "Montrer définition"}
        </CustomButton>
      </View>

      <View>
        {showDefinition ? (
          <>
            <Spacer height={10}></Spacer>
            {props.word.definitions.map((definition, index) => {
              return (
                <View key={index}>
                  <Text style={styles.definition}>
                    {JSON.stringify(index + 1)}.{" "}
                    {capitalizeFirtLetter(definition.definition.trim())}
                  </Text>
                  <Spacer height={4}></Spacer>
                </View>
              );
            })}
          </>
        ) : null}
      </View>
    </View>
  );
}
