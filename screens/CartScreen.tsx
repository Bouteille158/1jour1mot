import { useEffect, useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/atoms/button";
import Input from "../components/atoms/input";
import Spacer from "../components/atoms/spacer";
import CartItemBox from "../components/organisms/cart-item-box";
import { Text, View } from "../components/Themed";
import { addToCart, removeFromCart, RootState, updateCart } from "../redux";
import { createOrder, Order } from "../services/order";
import { getShoes, Shoe } from "../services/shoes";

export default function CartScreen() {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);
  const favorites = useSelector((state: RootState) => state.favorites);
  const user = useSelector((state: RootState) => state.user);
  const [shoes, setShoes] = useState<Shoe[]>([]);
  const [promoCode, setPromoCode] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("1");
  const validCode: string = "E5PARIS";
  useEffect(() => {
    getShoes().then((res) => {
      console.log("res: ", res);
      setShoes(res);
      console.log("Shoes : ", shoes);
    });
  }, []);

  function addItemToCart(shoe: Shoe): any {
    dispatch(addToCart(shoe));
    console.log("Cart : " + JSON.stringify(cart));
  }

  function applyPromo(promo: number) {
    if (promoCode === validCode) {
      cart.map((item) => {
        item.promo = promo;
      });
    }
  }

  function createNewOrder(): any {
    const newOrder: Order = {
      items: cart,
      deliveryAddress: user.address,
      status: "pending",
      userID: user.uid,
    };
    createOrder(newOrder);
    console.log("Cart : " + JSON.stringify(cart));
  }

  function removeItemFromCart(id: string, removeAll?: boolean): any {
    dispatch(removeFromCart({ shoeID: id, removeAll: removeAll }));
    console.log("Cart : " + JSON.stringify(cart));
  }

  function changeQuantityFromCart(id: string, quantity: string): any {
    const quantityNum: number = parseInt(quantity);
    console.log("Number quantity : ", quantityNum);
    dispatch(
      updateCart({
        id: id,
        quantity: quantityNum,
      })
    );
    console.log("Cart : " + JSON.stringify(cart));
  }

  let finishOrderSection;
  if (cart[0]) {
    finishOrderSection = (
      <>
        <View style={{ flexDirection: "row", backgroundColor: "#ff000000" }}>
          <Input
            value={promoCode}
            placeholder="PROMO CODE"
            onChange={(input) => {
              setPromoCode(input);
            }}
            width={200}
          />
          <Spacer width={20} />
          {/* <Text>{promoCode}</Text> */}
          <Button
            onPress={() => {
              applyPromo(20);
            }}
          >
            Apply coupon
          </Button>
        </View>
        <Spacer height={20} />
        <Button
          onPress={() => {
            createNewOrder();
          }}
        >
          Finish purchase
        </Button>
      </>
    );
  } else {
    finishOrderSection = <View></View>;
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Cart</Text>
        <Spacer height={40} />
        <View style={styles.list}>
          {cart.map((shoe) => (
            <CartItemBox
              key={shoe.id}
              item={shoe}
              removeItem={(id: string, removeAll?: boolean) => {
                removeItemFromCart(id, removeAll);
              }}
              addItem={(shoe: Shoe) => {
                addItemToCart(shoe);
              }}
            />
          ))}
          {cart.length === 0 && (
            <Text style={{ textAlign: "center" }}>
              You have no item in your cart ! Check out the shop !
            </Text>
          )}
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "100%",

            backgroundColor: "#ff000000",
          }}
        >
          {finishOrderSection}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
    height: "100%",
    backgroundColor: "#ff000000",
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
