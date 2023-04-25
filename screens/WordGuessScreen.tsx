import { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import Spacer from "../components/Spacer";
import ShopItem from "../components/ShopItem";
import { Text, View } from "../components/Themed";
import { getShoes, Shoe } from "../services/shoes";

export default function WordGuessScreen() {
  const [shoes, setShoes] = useState<Shoe[]>([]);
  useEffect(() => {
    getShoes().then((res) => {
      console.log("res: ", res);
      setShoes(res);
      console.log("Shoes : ", shoes);
    });
  }, []);
  return (
    <View style={styles.container}>
      <Spacer height={20} />
      <Text style={styles.title}>WIP</Text>
      <Spacer height={5} />
      <FlatList
        data={shoes}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.shoeList}
        keyExtractor={(_) => _.id}
        renderItem={({ item, index }) => {
          return <ShopItem key={index} shoe={item}></ShopItem>;
        }}
        ItemSeparatorComponent={() => {
          return <Spacer height={20}></Spacer>;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 2,
    // borderColor: "#00ccff",
  },
  scroll: {
    flex: 1,
    // borderWidth: 2,
    // borderColor: "#000",
  },
  title: {
    // borderWidth: 2,
    // borderColor: "#275745",
    fontSize: 20,
    fontWeight: "bold",
  },
  shoeList: {
    // width: "100%",
    // height: "100%",
    // borderWidth: 2,
    // borderColor: "#03f137",
    paddingBottom: 20,
  },
});
