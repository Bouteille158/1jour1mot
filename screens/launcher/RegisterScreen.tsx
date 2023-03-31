import {
  StyleSheet,
  ScrollView,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { RootStackScreenProps } from "../../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import InputCustom from "../../components/InputCustom";
import Spacer from "../../components/Spacer";
import { useDispatch } from "react-redux";
import { setGlobalUser } from "../../redux";
import { createUser, User } from "../../services/users";
import firebase from "../../firebase";
import TextCustom from "../../components/TextCustom";
import ButtonCustom from "../../components/ButtonCustom";
import { useHeaderHeight } from "@react-navigation/elements";

export default function RegisterScreen({
  navigation,
}: RootStackScreenProps<"Register">) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const headerHeight = useHeaderHeight();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.select({ android: undefined, ios: "padding" })}
      keyboardVerticalOffset={Platform.select({
        android: headerHeight + 2000,
        ios: headerHeight - 200,
      })}
    >
      <ScrollView bounces={false}>
        <View style={styles.container}>
          <TextCustom size={22} isBold>
            Sign in
          </TextCustom>
          <View style={styles.box}>
            <TextCustom size={14} padding={8}>
              Name
            </TextCustom>
            <InputCustom
              placeholder="Gérard"
              value={name}
              onChange={(value) => setName(value)}
            />
            <Spacer height={10} />
            <TextCustom size={14} padding={8}>
              Email
            </TextCustom>
            <InputCustom
              placeholder="gerard@gmail.com"
              value={email}
              onChange={(value) => setEmail(value)}
            />
            <Spacer height={10} />
            <TextCustom size={14} padding={8}>
              Password
            </TextCustom>
            <InputCustom
              placeholder="******"
              value={password}
              onChange={(value) => setPassword(value)}
              otherOptions={{ secureTextEntry: true }}
            />
            <Spacer height={40} />
            <ButtonCustom onPress={funcRegister} isBold>
              Register
            </ButtonCustom>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
    // textTransform: "uppercase",
  },
});
