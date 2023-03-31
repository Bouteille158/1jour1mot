import { StyleSheet, Text, ScrollView, View } from "react-native";
import React, { useState } from "react";
import { RootStackScreenProps } from "../../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import InputCustom from "../../components/InputCustom";
import BlueBox from "../../components/atoms/blue-box";
import Button from "../../components/atoms/button";
import Spacer from "../../components/Spacer";
import { useDispatch } from "react-redux";
import { setGlobalUser } from "../../redux";
import { createUser, User } from "../../services/users";
import firebase from "../../firebase";

export default function RegisterScreen({
  navigation,
}: RootStackScreenProps<"Register">) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  const register = (name: string, email: string, password: string) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async (credentials) => {
        const user = credentials.user;
        if (!user) throw new Error("User is null");
        const userToAdd: User = {
          uid: user.uid,
          id: "account:" + user.uid,
          name: name,
        };
        await createUser(userToAdd);
        AsyncStorage.setItem("user", JSON.stringify({ uid: user.uid }));

        return userToAdd;
      })
      .then((user) => {
        navigation.reset({
          index: 0,
          routes: [{ name: "Root" }],
        });
        dispatch(setGlobalUser(user));
      })
      .catch((error) => {
        alert(error.message);
        console.error(error);
      });
  };

  const funcRegister = () => {
    if (name.trim() === "") return;
    if (email.trim() === "") return;
    if (password.trim() === "") return;

    register(name, email, password);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Sign In</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.label}>Name</Text>
          <InputCustom
            placeholder="Gérard"
            value={name}
            onChange={(value) => setName(value)}
          />
          <Spacer height={10} />
          <Text style={styles.label}>Email</Text>
          <InputCustom
            placeholder="gerard@gmail.com"
            value={email}
            onChange={(value) => setEmail(value)}
          />
          <Spacer height={10} />
          <Text style={styles.label}>Password</Text>
          <InputCustom
            placeholder="******"
            value={password}
            onChange={(value) => setPassword(value)}
            otherOptions={{ secureTextEntry: true }}
          />
          <Spacer height={10} />
          <Button onPress={funcRegister}>
            <Text style={styles.text}>Register</Text>
          </Button>
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
    padding: 20,
    paddingTop: 40,
  },
  box: {
    flex: 1,
    alignItems: "center",
    padding: 60,
    paddingTop: 20,
    width: "100%",
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
