import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Button, ScrollView, StyleSheet, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import {
  addToCart,
  addToFavorites,
  removeFromCart,
  removeFromFavorites,
  RootState,
  updateCart,
} from "../redux";
import {
  createOrder,
  getOrders,
  Order,
  updateOrderStatus,
} from "../services/order";
import { getShoes, Shoe } from "../services/shoes";
import { getUser, User } from "../services/users";
import { RootTabScreenProps } from "../types";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);
  const favorites = useSelector((state: RootState) => state.favorites);
  const user = useSelector((state: RootState) => state.user);
  // const orders = useSelector((state: RootState) => state.orders);
  const [shoes, setShoes] = useState<Shoe[]>([]);
  const [quantity, setQuantity] = useState<string>("1");
  // const [user, setUser] = useState<User>();
  const [orders, setOrders] = useState<Order[]>([]);
  const [status, setStatus] = useState<string>("");
  const orderID = "uWDwbeNBigIYmzkuf5Ww";
  useEffect(() => {
    getShoes().then((res) => {
      // console.log("res: ", res);
      setShoes(res);
      // console.log("Shoes : ", shoes);
    });

    console.log("Tab one user : ", user);
    updateOrders();
  }, []);

  function updateOrders() {
    if (user) {
      getOrders(user.uid).then((res) => {
        console.log("Orders res: ", res);
        setOrders(res);
      });
    } else {
      console.error("User undefined");
    }
  }

  function addItemToCart(shoe: Shoe): any {
    dispatch(addToCart(shoe));
    console.log("Cart : " + JSON.stringify(cart));
  }

  function addItemToFavorites(shoe: Shoe): any {
    dispatch(addToFavorites(shoe));
    console.log("Favorites : " + JSON.stringify(favorites));
  }

  function removeItemFromCart(id: string): any {
    dispatch(removeFromCart({ shoeID: id }));
    console.log("Cart : " + JSON.stringify(cart));
  }

  function removeItemFromFavorites(id: string): any {
    dispatch(removeFromFavorites(id));
    console.log("Favorites : " + JSON.stringify(favorites));
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

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* <Text style={styles.title}>Tab One</Text> */}
        <Text style={styles.title}>Cart redux</Text>

        {/* <EditScreenInfo path="/screens/TabOneScreen.tsx" /> */}
        <View style={styles.buttonDesk}>
          <View style={styles.buttonContainer}>
            <Button title="Add 1" onPress={() => addItemToCart(ShoeOne)} />
            <Button title="Add 2" onPress={() => addItemToCart(ShoeTwo)} />
            <Button title="Add 3" onPress={() => addItemToCart(ShoeThree)} />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title="Remove 1"
              onPress={() => removeItemFromCart(ShoeOne.id)}
            />
            <Button
              title="Remove 2"
              onPress={() => removeItemFromCart(ShoeTwo.id)}
            />
            <Button
              title="Remove 3"
              onPress={() => removeItemFromCart(ShoeThree.id)}
            />
          </View>
          <TextInput
            placeholder="Quantity"
            onChangeText={setQuantity}
            value={quantity}
            keyboardType="number-pad"
            maxLength={2}
          ></TextInput>
          <View style={styles.buttonContainer}>
            <Button
              title="Update 1"
              onPress={() => changeQuantityFromCart(ShoeOne.id, quantity)}
            />
            <Button
              title="Update 2"
              onPress={() => changeQuantityFromCart(ShoeTwo.id, quantity)}
            />
            <Button
              title="Update 3"
              onPress={() => changeQuantityFromCart(ShoeThree.id, quantity)}
            />
          </View>
        </View>
        {/* <Text>{JSON.stringify(shoes)}</Text> */}
        <View>
          {cart.map((item) => {
            return (
              <Text key={item.id}>
                {item.name}, {item.quantity}
              </Text>
            );
          })}
        </View>
        {/* <Text>{JSON.stringify(cart)}</Text> */}
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <Text style={styles.title}>Favorites redux</Text>

        <View style={styles.buttonContainer}>
          <Button title="Add 1" onPress={() => addItemToFavorites(ShoeOne)} />
          <Button title="Add 2" onPress={() => addItemToFavorites(ShoeTwo)} />
          <Button title="Add 3" onPress={() => addItemToFavorites(ShoeThree)} />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Remove 1"
            onPress={() => removeItemFromFavorites(ShoeOne.id)}
          />
          <Button
            title="Remove 2"
            onPress={() => removeItemFromFavorites(ShoeTwo.id)}
          />
          <Button
            title="Remove 3"
            onPress={() => removeItemFromFavorites(ShoeThree.id)}
          />
        </View>
        <View>
          {favorites.map((item) => {
            return <Text key={item.id}>{item.name}</Text>;
          })}
        </View>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-evenly" }}
          >
            <TextInput
              placeholder="Status"
              onChangeText={setStatus}
              value={status}
            ></TextInput>
            <Button
              title="Update status"
              onPress={() => {
                updateOrderStatus(status, orderID);
                updateOrders();
              }}
            />
            <Button
              title="Update user"
              onPress={() => {
                console.log(user.uid);
              }}
            />
          </View>
          <Text>{orders.length}</Text>
          <View>
            {orders.map((item) => {
              return (
                <Text key={item.id}>
                  {item.id} ,{item.userID}, {item.status}
                </Text>
              );
            })}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    borderColor: "#000",
    borderWidth: 2,
    alignContent: "space-between",
    justifyContent: "space-around",
    flexDirection: "row",
    marginBottom: 10,
    width: "100%",
  },
  buttonDesk: {
    width: 300,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

const ShoeOne: Shoe = {
  brandID: " xi2DBD7ikcO239LCyfQk",
  id: "EIUB7z6CWXCyzAyi9Dw9",
  img: "https://cdn.shopify.com/s/files/1/0606/8692/6069/products/AQ0818-100_4A_900x_68f01a70-75e9-4de0-86ad-d887ebbbcd7e_1445x.jpg?v=1635350617",
  name: "Air Jordan 1",
  price: 120,
  promo: 0,
};
const ShoeTwo: Shoe = {
  name: "Yeezy Boost 350",
  price: 110,
  img: "https://www.pngall.com/wp-content/uploads/2016/06/Adidas-Shoes-Free-Download-PNG.png",
  brandID: "KaC6SQPmXP0m2adLg1RF",
  id: "M1Tm5XDjL4bCfP7ggrDm",

  promo: 0,
};
const ShoeThree: Shoe = {
  img: "https://myalpins.com/1680-large_default/nike-air-jordan-1-mid-noir-blanc.jpg",
  price: 120,
  brandID: " xi2DBD7ikcO239LCyfQk",
  name: "Air Jordan 1",
  id: "YSGRHbTfAV0XdOXX79Or",
  promo: 0,
};
