import { StyleSheet, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Spacer from "../components/Spacer";
import { Text, View } from "../components/Themed";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

export default function WordHistoryScreen() {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);
  const favorites = useSelector((state: RootState) => state.favorites);

  const scheme = useColorScheme();
  const theme = scheme === "dark" ? Colors.dark : Colors.light;
    console.log("Favorites : " + JSON.stringify(favorites));
  }

  function addItemToCart(shoe: Shoe): any {
    dispatch(addToCart(shoe));
    console.log("Cart : " + JSON.stringify(cart));
  }

  return (
    <ScrollView style={{ backgroundColor: theme.background }}>
      <View style={styles.container}>
        <Text style={styles.title}>Favorites</Text>
        <Spacer height={40} />
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
