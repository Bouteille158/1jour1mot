import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import firebase from "../../firebase";
import { RootStackScreenProps } from "../../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BlueBox from "../../components/atoms/blue-box";
import Spacer from "../../components/atoms/spacer";
import Button from "../../components/atoms/button";
import Input from "../../components/atoms/input";
import { getUser } from "../../services/users";
import { useDispatch, useSelector } from "react-redux";
import { activateLoginCheck, RootState, setGlobalUser } from "../../redux";

export default function LoginScreen({
  navigation,
}: RootStackScreenProps<"Login">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const funcLogin = () => {
    if (email.trim() === "") return;
    if (password.trim() === "") return;

    login(email, password);
  };

  const login = async (email: string, password: string) => {
    try {
      if (!email || !password) {
        throw new Error("Please provide both email and password");
      }
      const credentials = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      const user = credentials.user;
      if (!user) {
        alert("Failed to sign in user");
        throw new Error("Failed to sign in user");
      }
      const userFromDB = await getUser(user.uid);
      await AsyncStorage.setItem("user", JSON.stringify({ uid: user.uid }));
      navigation.reset({
        index: 0,
        routes: [{ name: "Root" }],
      });
      dispatch(setGlobalUser(userFromDB));

      dispatch(activateLoginCheck());
    } catch (error: Error | any) {
      console.error(error);

      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <BlueBox>
        <View style={styles.header}>
          <Text style={styles.title}>Log in</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.label}>Email</Text>
          <Input
            placeholder="Email"
            value={email}
            onChange={(value) => setEmail(value)}
          />
          <Spacer height={10} />
          <Text style={styles.label}>Password</Text>
          <Input
            placeholder="Password"
            value={password}
            onChange={(value) => setPassword(value)}
            otherOptions={{ secureTextEntry: true }}
          />
          <Spacer height={40} />
          <Button onPress={funcLogin}>
            <Text style={styles.text}>Login</Text>
          </Button>
        </View>
      </BlueBox>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    paddingTop: 40,
  },
  box: {
    flex: 1,
    alignItems: "center",
    padding: 60,
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    height: 100,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    padding: 8,
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    padding: 8,
    color: "#fff",
    textTransform: "uppercase",
  },
});
