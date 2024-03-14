import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  View,
  Alert,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { RootTabScreenProps } from "../../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootState, setGlobalUser } from "../../redux";
import { useDispatch, useSelector } from "react-redux";
import TextCustom from "../../components/TextCustom";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import Spacer from "../../components/Spacer";
import * as Clipboard from "expo-clipboard";
import { User } from "../../services/users";
import { updateUser } from "../../services/users";
import firebase from "../../firebase";
import Dialog from "react-native-dialog";

export default function ProfileScreen({
  navigation,
}: RootTabScreenProps<"Profile">) {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [profilePic, setProfilePic] = useState(user.profilePicture);
  const [name, setName] = useState(user.name);
  const [url, setUrl] = useState("");
  const [showProfilePictureDialog, setShowProfilePictureDialog] =
    useState(false);

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

  const saveUserChange = () => {
    console.log("Save change button pressed");
    const userNewData: User = {
      uid: user.uid,
      id: user.id,
      profilePicture: profilePic,
      name: name,
    };
    updateUser(userNewData);
    dispatch(setGlobalUser(userNewData));
  };

  const logout = async () => {
    await firebase.auth().signOut();
    AsyncStorage.setItem("user", "").then(() => {
      dispatch(setGlobalUser({ uid: "", id: "", name: "" }));
      navigation.reset({
        index: 0,
        routes: [{ name: "Launcher" }],
      });
    });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    header: {
      alignItems: "center",
      flexDirection: "column",
      padding: 16,
    },
    profilePic: {
      width: 240,
      height: 240,
      borderColor: "#808080",
      borderRadius: 10,
      padding: 10,
      borderWidth: 1,
    },
    profileInfos: {},
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
    logoutButton: {
      alignItems: "center",
      justifyContent: "center",
      padding: 26,
    },
    logoutText: {
      color: "red",
      fontSize: 20,
      fontWeight: "bold",
    },
  });

  return (
    <>
      {user ? (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
          <View style={styles.header}>
            <Pressable
              onPress={() => {
                setShowProfilePictureDialog(true);
              }}
            >
              <Dialog.Container
                visible={showProfilePictureDialog}
                onBackdropPress={() => setShowProfilePictureDialog(false)}
              >
                <Dialog.Title>Change profile picture</Dialog.Title>
                <Dialog.Description>
                  Enter the URL of your new profile picture.
                </Dialog.Description>
                <Dialog.Input
                  onChangeText={(value) => {
                    setUrl(value);
                  }}
                  placeholder="https://example.com/image.png"
                ></Dialog.Input>
                <Dialog.Button
                  onPress={() => {
                    setShowProfilePictureDialog(false);
                  }}
                  label="Cancel"
                />
                <Dialog.Button
                  onPress={() => {
                    console.log("OK Pressed, url : " + url);
                    setProfilePic(url);
                    saveUserChange();
                    setShowProfilePictureDialog(false);
                  }}
                  label="Confirm"
                />
              </Dialog.Container>
              <Image
                source={
                  user.profilePicture
                    ? { uri: user.profilePicture }
                    : require("../../assets/images/user-icon.png")
                }
                style={styles.profilePic}
              />
            </Pressable>
            <Spacer height={16} />
            <View style={styles.profileInfos}>
              <Pressable>
                <Text style={styles.profileName}>{user.name}</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  console.log("Copy to clipboard : " + user.id);
                  Clipboard.setStringAsync(user.id);
                  Alert.alert("User ID copied to clipboard");
                }}
              >
                <TextCustom>{user.id}</TextCustom>
              </Pressable>
            </View>
          </View>
          <View style={{ flex: 1 }} />
          <Pressable style={styles.logoutButton} onPress={() => logout()}>
            <Text style={styles.logoutText}>Logout</Text>
          </Pressable>
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
