import { StyleSheet, View, Text, Image } from "react-native";
import { Shoe } from "../../services/shoes";
import Button from "../atoms/button";
import CircleIcon from "../atoms/circle-icon";
import Spacer from "../atoms/spacer";

interface BoxItemProps {
  item: Shoe;
  favOption?: boolean;
  removeItem: () => void;
}

export default function ItemBox({ item, removeItem, favOption }: BoxItemProps) {
  return (
    <View style={styles.container}>
      <View style={styles.upbox}>
        {/* replace by img */}
        <View>
          <Image source={{ uri: item.img }} style={styles.img} />
        </View>
        <View style={styles.shoesname}>
          <Text style={styles.text}>{item.brandID}</Text>
          <Text style={styles.text}>{item.name}</Text>
        </View>
        <Text style={styles.text}>{item.price}$</Text>
      </View>
      <Spacer height={10} />
      {!favOption ? (
        <View style={styles.downbox}>
          <Button deleteVersion onPress={removeItem}>
            <Text style={styles.btnText}>Remove</Text>
          </Button>
        </View>
      ) : (
        <View style={styles.downbox2}>
          <Button deleteVersion onPress={removeItem}>
            <Text style={styles.btnText}>Remove</Text>
          </Button>
          <Spacer width={15} />
          <CircleIcon
            onPress={() => {}}
            url={require("../../assets/images/cart-plus.png")}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#000",
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
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
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
