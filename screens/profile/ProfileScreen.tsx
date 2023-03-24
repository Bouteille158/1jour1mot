import { ActivityIndicator, FlatList, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { RootTabScreenProps } from "../../types";
import { getOrders, Order } from "../../services/order";
import OrderItemBox from "../../components/organisms/order-item-box";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../../services/users";
import { fireDB } from "../../firebase";
import { setGlobalUser } from "../../redux";
import { useDispatch } from "react-redux";

export default function ProfileScreen({
  navigation,
}: RootTabScreenProps<"Profile">) {
  const dispatch = useDispatch();
  const [user, setUser] = useState<User>();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    AsyncStorage.getItem("user")
      .then((value) => JSON.parse(value!).uid)
      .then((uid) => {
        fireDB
          .collection("user")
          .where("uid", "==", uid)
          .onSnapshot((res) => {
            const user = {
              ...res.docs[0].data(),
              id: res.docs[0].id,
            } as any;
            dispatch(setGlobalUser(user));
            setUser(user);
            getOrders(user.uid).then((res) => setOrders(res));
          });
      });
  }, []);

  useEffect(() => {
    if (user) {
      getOrders(user.uid).then((res) => {
        console.log("Orders res: ", res);
        setOrders(res);
      });
    }
  }, [user]);

  return (
    <ScrollView>
      {user ? (
        <View style={styles.container}>
          <View style={styles.header}>
            <Image
              source={user.profilePic ?
                { uri: user.profilePic } :
                require("../../assets/images/user-icon.png")}
              style={styles.profilePic}
            />
            <View style={styles.profileInfos}>
              <Text style={styles.profileName}>{user.name}</Text>
              <Text style={styles.profileAddress}>{user.address}</Text>
            </View>
          </View>

          <Text style={styles.ordersTitle}>Orders</Text>

          <FlatList
            data={orders}
            style={styles.orders}
            keyExtractor={(item, index) => item.id ?? index.toString()}
            renderItem={({ item }) => (
              <OrderItemBox order={item} />
            )}
            ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
          />
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      )}

    </ScrollView>
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
    borderRadius: 300,
    borderWidth: 4,
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
    color: "#808080"
  },
  ordersTitle: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 8,
    paddingHorizontal: 16,
    fontWeight: "bold",
    color: "#505050"
  },
  orders: {
    paddingHorizontal: 16,
  },
});
