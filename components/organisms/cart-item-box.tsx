import { useEffect } from "react";
import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { ShoeInCart } from "../../redux";
import { Shoe } from "../../services/shoes";
import Button from "../atoms/button";
import Spacer from "../atoms/spacer";

interface BoxItemProps {
  item: ShoeInCart;
  addItem: (shoe: Shoe) => void;
  removeItem: (id: string, removeAll?: boolean) => void;
}

export default function CartItemBox({
  item,
  addItem,
  removeItem,
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
          <View style={{ flexDirection: "row" }}>
            <Pressable
              style={styles.btnPress}
              onPress={() => {
                removeItem(item.id);
              }}
            >
              <Text style={styles.btnText}>-</Text>
            </Pressable>
            <Text style={styles.text}>{item.quantity}</Text>
            <Pressable
              style={styles.btnPress}
              onPress={() => {
                addItem(item);
              }}
            >
              <Text style={styles.btnText}>+</Text>
            </Pressable>
          </View>
        </View>
        <Text style={styles.text}>{item.price}$</Text>
      </View>
      <Spacer height={10} />
      <View style={styles.downbox}>
        <Button
          deleteVersion
          onPress={() => {
            console.log(item.id);
            removeItem(item.id, true);
          }}
        >
          Remove
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#000000",
    backgroundColor: "#ffffff",
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
