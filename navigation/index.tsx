/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable, Text, View } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import LauncherScreen from "../screens/launcher/LauncherScreen";
import RegisterScreen from "../screens/launcher/RegisterScreen";
import LoginScreen from "../screens/launcher/LoginScreen";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import TabOneScreen from "../screens/TabOneScreen";
import ShopScreen from "../screens/ShopScreen";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import { Provider } from "react-redux/es/exports";
import { store } from "../redux";
import NewWordScreen from "../screens/CartScreen";
import FavScreen from "../screens/FavScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import ProfileSettingsScreen from "../screens/profile/ProfileSettingsScreen";
import CircleIcon from "../components/atoms/circle-icon";
import { Feather } from "@expo/vector-icons";
import Spacer from "../components/atoms/spacer";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}

const Header = () => {
  return (
    <View style={{ flexDirection: "row" }}>
      <Feather name="book-open" size={24} color="black" />
      <Spacer width={10}></Spacer>
      <Text style={{ fontWeight: "bold" }}>1 jour 1 mot</Text>
    </View>
  );
};

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Launcher"
        component={LauncherScreen}
        options={{
          headerTitle: () => <Header />,
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          headerTitle: () => <Header />,
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerTitle: () => <Header />,
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
        <Stack.Screen
          name="ProfileSettings"
          component={ProfileSettingsScreen}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <Provider store={store}>
      <BottomTab.Navigator
        initialRouteName="Shop"
        screenOptions={{
          tabBarActiveTintColor: "#000",
          tabBarInactiveTintColor: "#000",
          tabBarStyle: {
            // height: 60,
            paddingTop: 6,
          },
          tabBarShowLabel: false,
        }}
      >
        {/* <BottomTab.Screen
          name="TabOne"
          component={TabOneScreen}
          options={{
            title: "Tab One",
            headerStyle: {
              backgroundColor: "#ebebeb",
            },
            headerTitle: () => <Header />,
            headerTitleAlign: "center",
            tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          }}
        /> */}
        <BottomTab.Screen
          name="Shop"
          component={ShopScreen}
          options={{
            title: "Shop",
            headerStyle: {
              backgroundColor: "#ebebeb",
            },
            headerTitle: () => <Header />,
            headerTitleAlign: "center",
            tabBarIcon: ({ color }) => (
              <Feather name="file-text" color="black" size={30} />
            ),
          }}
        />
        <BottomTab.Screen
          name="Cart"
          component={NewWordScreen}
          options={{
            title: "Cart",
            headerStyle: {
              backgroundColor: "#ebebeb",
            },
            headerTitle: () => <Header />,
            headerTitleAlign: "center",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="form-textbox-password"
                size={30}
                color="black"
              />
            ),
          }}
        />
        <BottomTab.Screen
          name="Favorites"
          component={FavScreen}
          options={{
            title: "Favorites",
            headerStyle: {
              backgroundColor: "#ebebeb",
            },
            headerTitle: () => <Header />,
            headerTitleAlign: "center",
            tabBarIcon: ({ color }) => (
              <Feather name="book" size={30} color="black" />
            ),
          }}
        />
        <BottomTab.Screen
          name="Profile"
          component={ProfileScreen}
          options={({ navigation }: RootTabScreenProps<"Profile">) => ({
            title: "Profile",
            headerStyle: {
              backgroundColor: "#ebebeb",
            },
            headerTitle: () => <Header />,
            headerTitleAlign: "center",
            tabBarIcon: ({ color }) => (
              <Feather name="user" size={30} color="black" />
            ),
            headerRight: () => (
              <Pressable
                onPress={() => navigation.navigate("ProfileSettings")}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                })}
              >
                <Feather
                  name="edit"
                  size={25}
                  color={"#000"}
                  style={{ marginRight: 15 }}
                />
              </Pressable>
            ),
          })}
        />
      </BottomTab.Navigator>
    </Provider>
  );
}
