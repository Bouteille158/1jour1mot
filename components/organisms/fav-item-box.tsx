import { useEffect } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Shoe } from "../../services/shoes";
import Button from "../atoms/button";
import CircleIcon from "../atoms/circle-icon";
import Spacer from "../atoms/spacer";

interface BoxItemProps {
  item: Shoe;
  addToCart: (shoe: Shoe) => void;
  removeItem: (id: string) => void;
}

export default function FavItemBox({
  item,
  removeItem,
  addToCart,
}: BoxItemProps) {
  const shoe: Shoe = { ...item };
  useEffect(() => {
    console.log("Shoe : ", shoe);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.upbox}>
        <View>
          <Image source={{ uri: item.img }} style={styles.img} />
        </View>
        <View style={styles.shoesname}>
          <Text style={styles.text}>{item.name}</Text>
        </View>
        <Text style={styles.text}>{item.price}$</Text>
      </View>
      <Spacer height={10} />

      <View style={styles.downbox2}>
        <Button
          deleteVersion
          onPress={() => {
            removeItem(item.id);
          }}
        >
          <Text style={styles.btnText}>Remove</Text>
        </Button>
        <Spacer width={15} />
        <CircleIcon
          onPress={() => {
            console.log(item);
            addToCart(item);
          }}
          url={require("../../assets/images/cart-plus.png")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#000",
    backgroundColor: "#ffffffff",
    padding: 5,
    paddingRight: 40,
    paddingLeft: 40,
    paddingBottom: 10,
    flexDirection: "column",
    margin: 20,
    alignItems: "center",
  },
  upbox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  shoesname: {
    flexDirection: "column",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#000",
    fontSize: 16,
    fontStyle: "italic",
    fontWeight: "bold",
  },
  btnText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
    // borderWidth: 2,
    // borderColor: "#000",
  },
  btnPress: {
    // borderWidth: 2,
    // borderColor: "#000",
    width: 20,
    alignItems: "center",
  },
  downbox: {
    alignItems: "center",
    justifyContent: "center",
  },
  downbox2: {
    alignItems: "center",
    backgroundColor: "#00ccff5",
    flex: 1,
    flexDirection: "row",
  },
  img: {
    width: 80,
    height: 80,
  },
});
