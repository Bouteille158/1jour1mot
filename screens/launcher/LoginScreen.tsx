import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import firebase from "../../firebase";
import { RootStackScreenProps } from "../../types";
import Spacer from "../../components/Spacer";
import InputCustom from "../../components/InputCustom";
import { useDispatch } from "react-redux";
import ButtonCustom from "../../components/ButtonCustom";
import TextCustom from "../../components/TextCustom";

export default function LoginScreen({}: RootStackScreenProps<"Login">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

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
    } catch (error: Error | any) {
      console.error(error);

      alert(error.message);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <TextCustom size={22} isBold>
            Log in
          </TextCustom>
        </View>
        <View style={styles.box}>
          <TextCustom size={14} padding={8}>
            Email
          </TextCustom>
          <InputCustom
            placeholder="gerard@mail.com"
            value={email}
            onChange={(value) => setEmail(value)}
          />
          <Spacer height={10} />
          <TextCustom size={14} padding={8}>
            Password
          </TextCustom>
          <InputCustom
            placeholder="*********"
            value={password}
            onChange={(value) => setPassword(value)}
            otherOptions={{ secureTextEntry: true }}
          />
          <Spacer height={40} />
          <ButtonCustom onPress={funcLogin} isBold>
            Login
          </ButtonCustom>
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
