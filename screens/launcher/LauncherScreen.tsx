import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { RootStackScreenProps } from "../../types";
import SquareButton from "../../components/atoms/square-button";
import Spacer from "../../components/atoms/spacer";
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

export default function LauncherScreen({
  navigation,
}: RootStackScreenProps<"Launcher">) {
  const dispatch = useDispatch();
  const LoginCheck = useSelector((state: RootState) => state.loginCheck);

  const [isSignedIn, setisSignedIn] = useState(false);

  useEffect(() => {
    console.log("Already checked login : " + LoginCheck.toString());
    if (!LoginCheck) {
      dispatch(deactivateLoginCheck());
      firebase.auth().onAuthStateChanged(async (user) => {
        if (!user) {
          if (isSignedIn) {
            console.log("Déconnexion de l'utilisateur :");
            console.log(user);
            setisSignedIn(false);
          } else {
            console.log("Utilisateur déjà déconnecté !");
          }
        } else {
          console.log("Changement d'état de l'utilisateur :");
          console.log(user);
          setisSignedIn(true);
          const userFromDB = await getUser(user.uid);
          AsyncStorage.setItem("user", JSON.stringify({ uid: user.uid }));
          navigation.reset({
            index: 0,
            routes: [{ name: "Root" }],
          });
          dispatch(setGlobalUser(userFromDB));
          dispatch(activateLoginCheck());
        }
      });
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <SquareButton onPress={() => navigation.navigate("Login")}>
          Log in your account here !
        </SquareButton>
        <Spacer width={10} />
        <SquareButton onPress={() => navigation.navigate("Register")}>
          Not a member yet ? Register here !
        </SquareButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  box: {
    flexDirection: "row",
    height: 160,
  },
});
