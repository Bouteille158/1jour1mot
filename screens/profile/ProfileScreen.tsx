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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootState } from "../../redux";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentDayWordFromSurreal,
  getTodayWordForEndUser,
  importNewWordFromDicolink,
} from "../../services/words";
import { getNewWordFromDicolink } from "../../services/dicolink";
import TextCustom from "../../components/TextCustom";
import { getSurrealCompatibleDate } from "../../surrealdb";

export default function ProfileScreen({
  navigation,
}: RootTabScreenProps<"Profile">) {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

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
              <TextCustom>{user.id}</TextCustom>
            </View>
          </View>
          <View>
            <Button
              title="Activate function"
              onPress={async () => {
                console.log("Button pressed");
                getTodayWordForEndUser(user.id).then((res) => {
                  console.log("res: ", res);
                });
              }}
            ></Button>
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
