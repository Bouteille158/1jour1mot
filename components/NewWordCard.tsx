// Create a new React component NewWordCard.tsx

import { View, StyleSheet, Text, useColorScheme } from "react-native";
import { Word } from "../services/words";
import Colors from "../constants/Colors";

interface NewWordCardProps {
  word: Word;
}

export default function NewWordCard(props: NewWordCardProps) {
  const scheme = useColorScheme();
  const theme = scheme === "dark" ? Colors.dark : Colors.light;

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
      <Text style={styles.mot}>
        {capitalizeFirtLetter(props.word.word.trim())}
      </Text>
      {props.word.definitions.map((definition, index) => {
        return (
          <Text key={index} style={styles.definition}>
            {JSON.stringify(index + 1)}.{" "}
            {capitalizeFirtLetter(definition.definition.trim())}
          </Text>
        );
      })}
    </View>
  );
}
