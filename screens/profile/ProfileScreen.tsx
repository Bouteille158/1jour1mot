import {
  ActivityIndicator,
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
import { isWordCurrentlyLearned } from "../../services/words";
import TextCustom from "../../components/TextCustom";

import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";

export default function ProfileScreen({
  navigation,
}: RootTabScreenProps<"Profile">) {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const scheme = useColorScheme();
  const theme = scheme === "dark" ? Colors.dark : Colors.light;

  useEffect(() => {
    AsyncStorage.getItem("user").then((value) => {
      if (value) {
        console.log("User found in async storage");
        console.log(user);
      }
    });
  }, [user]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
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
      color: theme.text,
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

  return (
    <>
      {user ? (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
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
                isWordCurrentlyLearned(user.id, "word:230425").then((value) => {
                  console.log("Value : " + value);
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
