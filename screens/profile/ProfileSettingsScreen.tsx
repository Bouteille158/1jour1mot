import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootStackScreenProps } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { RootState, setGlobalUser } from "../../redux";
import { updateUser, User } from "../../services/users";
import firebase from "../../firebase";

export default function ProfileSettingsScreen({
  navigation,
}: RootStackScreenProps<"ProfileSettings">) {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [profilePic, setProfilePic] = useState(user.profilePicture);
  const [name, setName] = useState(user.name);

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

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Account Details</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputName}>Profile Pic</Text>
          <TextInput
            placeholder="URL"
            style={styles.inputField}
            value={profilePic}
            onChangeText={(value) => setProfilePic(value)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputName}>Name</Text>
          <TextInput
            placeholder="Name"
            style={styles.inputField}
            value={name}
            onChangeText={(value) => setName(value)}
          />
        </View>
        <Pressable style={styles.saveButton} onPress={() => saveUserChange()}>
          <Text>Save</Text>
        </Pressable>
      </View>
      <View>
        <Text style={styles.title}>More</Text>
        <Pressable style={styles.logoutButton} onPress={() => logout()}>
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    color: "#505050",
    backgroundColor: "#DDDDDD",
    fontWeight: "bold",
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  inputContainer: {
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderColor: "#EEEEEE",
    borderWidth: 1,
  },
  inputName: {
    fontWeight: "bold",
    minWidth: 80,
  },
  inputField: {
    marginLeft: 16,
    flex: 1,
  },
  saveButton: {
    alignSelf: "center",
    borderRadius: 300,
    borderColor: "black",
    borderWidth: 2,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginVertical: 12,
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
