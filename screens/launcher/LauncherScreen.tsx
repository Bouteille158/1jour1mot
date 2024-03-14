import { StyleSheet, View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { RootStackScreenProps } from "../../types";
import CustomButton from "../../components/ButtonCustom";
import Spacer from "../../components/Spacer";
import firebase from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  activateLoginCheck,
  deactivateLoginCheck,
  RootState,
  setGlobalUser,
} from "../../redux";
import { getUser } from "../../services/users";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TextCustom from "../../components/TextCustom";
import WelcomeHeader from "../../components/WelcomeHeader";

export default function LauncherScreen({
  navigation,
}: RootStackScreenProps<"Launcher">) {
  const dispatch = useDispatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        console.log("Changement d'état de l'utilisateur :");
        // console.log(user);
        const userFromDB = await getUser(user.uid).catch(async (err) => {
          alert("Erreur lors de la récupération des données de l'utilisateur");
          console.error(err);
          await firebase.auth().signOut();
          AsyncStorage.setItem("user", "").then(() => {
            dispatch(setGlobalUser({ uid: "", id: "", name: "" }));
            navigation.reset({
              index: 0,
              routes: [{ name: "Launcher" }],
            });
          });
        });

        if (userFromDB) {
          AsyncStorage.setItem("user", JSON.stringify({ uid: user.uid }));
          dispatch(setGlobalUser(userFromDB));
          navigation.reset({
            index: 0,
            routes: [{ name: "Root" }],
          });
        }
      } else {
        console.log("Pas d'utilisateur connecté");
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <WelcomeHeader />
      <View style={{ flex: 2 }}></View>
      <View style={styles.buttonBox}>
        <TextCustom>First time here ?</TextCustom>
        <Spacer height={4} />
        <CustomButton
          onPress={() => navigation.navigate("Register")}
          width="100%"
          height={50}
          isBold
          showBorder
        >
          Create account
        </CustomButton>
        <Spacer height={10} />
        <TextCustom>Already have an account ?</TextCustom>
        <Spacer height={4} />
        <CustomButton
          onPress={() => navigation.navigate("Login")}
          width="100%"
          height={50}
          isBold
        >
          Login
        </CustomButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 40,
    width: "100%",
  },
  buttonBox: {
    alignItems: "center",
    width: "100%",
  },
});
