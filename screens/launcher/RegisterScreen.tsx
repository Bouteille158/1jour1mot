import { StyleSheet, Text, ScrollView, View } from "react-native";
import React, { useState } from "react";
import { auth, fireDB } from "../../firebase";
import { RootStackScreenProps } from "../../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Input from "../../components/atoms/input";
import BlueBox from "../../components/atoms/blue-box";
import Button from "../../components/atoms/button";
import Spacer from "../../components/atoms/spacer";
import { useDispatch } from "react-redux";
import { setGlobalUser } from "../../redux";
import { User } from "../../services/users";

export default function RegisterScreen({
  navigation,
}: RootStackScreenProps<"Register">) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  const register = (
    name: string,
    email: string,
    password: string,
    address: string
  ) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(async (credentials) => {
        const user = credentials.user;
        if (!user) throw new Error("User is null");

        const userToAdd: User = {
          uid: user.uid,
          name: name,
          address: address,
        };

        await fireDB.collection("user").add({
          uid: user.uid,
          name: name,
          address: address,
        });
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
      .catch((error) => console.error(error));
  };

  const funcRegister = () => {
    if (name.trim() === "") return;
    if (email.trim() === "") return;
    if (password.trim() === "") return;
    if (address.trim() === "") return;

    register(name, email, password, address);
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <BlueBox>
          <View style={styles.header}>
            <Text style={styles.title}>Sign In</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.label}>Name</Text>
            <Input
              placeholder="Name"
              value={name}
              onChange={(value) => setName(value)}
            />
            <Spacer height={10} />
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
            <Spacer height={10} />
            <Text style={styles.label}>Address</Text>
            <Input
              placeholder="Address"
              value={address}
              onChange={(value) => setAddress(value)}
            />
            <Spacer height={10} />
            <Button onPress={funcRegister}>
              <Text style={styles.text}>Register</Text>
            </Button>
          </View>
        </BlueBox>
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
