import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  Button,
} from "react-native";
import React, { useEffect } from "react";
import { RootTabScreenProps } from "../../types";
import { Order } from "../../services/order";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootState } from "../../redux";
import { useDispatch, useSelector } from "react-redux";

export default function ProfileScreen({
  navigation,
}: RootTabScreenProps<"Profile">) {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  // const user: User = {
  //   id: "aze",
  //   name: "Alexandre",
  //   uid: "123",
  //   profilePic:
  //     "https://www.pokekalos.fr/assets/images/jeux/or-argent/starters/hericendre.png",
  // };
  const orders: Order[] = [
    {
      deliveryAddress: "12 rue de la rue",
      items: [
        {
          brandID: "",
          id: "",
          img: "https://contents.mediadecathlon.com/p2155551/k$11e0e6f8f6f4906c580007288ce1bdd0/chaussure-jogging-homme-run-active-noir-jaune.jpg?format=auto&quality=40&f=800x800",
          name: "Chaussure",
          price: 123,
          promo: 0,
          quantity: 2,
        },
      ],
      status: "En attente",
      userID: "123",
      id: "888",
    },
  ];

  useEffect(() => {
    AsyncStorage.getItem("user").then((value) => {
      if (value) {
        console.log("User found in async storage");
        console.log(user);
      }
    });
  }, [user]);

  return (
    <>
      <View>
        <Button
          title="User"
          onPress={async () => {
            console.log("Button pressed");
          }}
        ></Button>
      </View>
      {user ? (
        <View style={styles.container}>
          <View style={styles.header}>
            <Image
              source={
                user.profilePicture
                  ? { uri: user.profilePicture }
                  : require("../../assets/images/user-icon.png")
              }
              style={styles.profilePic}
            />
            <View style={styles.profileInfos}>
              <Text style={styles.profileName}>{user.name}</Text>
              {/* <Text style={styles.profileAddress}>{user.address}</Text> */}
            </View>
          </View>

          <Text style={styles.ordersTitle}>Orders</Text>

          {/* <FlatList
            data={orders}
            style={styles.orders}
            keyExtractor={(item, index) => item.id ?? index.toString()}
            renderItem={({ item }) => <OrderItemBox order={item} />}
            ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
          /> */}

          <View>
            <Text></Text>
          </View>
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="large" />
          <Text>Chargement ...</Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    padding: 16,
  },
  profilePic: {
    width: 80,
    height: 80,
    borderColor: "#808080",
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
  },
  profileInfos: {
    flex: 1,
    marginLeft: 20,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  profileAddress: {
    color: "#808080",
  },
  ordersTitle: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 8,
    paddingHorizontal: 16,
    fontWeight: "bold",
    color: "#505050",
  },
  orders: {
    paddingHorizontal: 16,
  },
});
