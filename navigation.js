import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import ResturantScreen from "./screens/ResturantScreen";
import CartScreen from "./screens/CartScreen";
import PreparingOrderScreen from "./screens/PreparingOrderScreen";
import DeliveryScreen from "./screens/DeliveryScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RoomScreens from "./screens/RoomScreen";
import ProfileScreen from "./screens/ProfileScreen";
import * as Icon from "react-native-feather";
import { Text } from "react-native";
import { themeColors } from "./theme";
import RoomsDetailScreen from "./screens/RoomsDetailScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import ForgotePassword from "./screens/ForgotPasswordScreen";
import ChangePasswordScreen from "./screens/ChangePasswordScreen";
import { retrieveToken } from "./constants/tokens";
import MyCartScreen from "./screens/MyCartScreen";
import { useSelector } from "react-redux";
import { selectBasketItems } from "./slices/basketSlice";
import { useLogin } from "./components/context/LoginProvider";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Home() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Resturant" component={ResturantScreen} />

      <Stack.Screen
        name="PreparingOrder"
        options={{ presentation: "fullScreenModal", headerShown: false }}
        component={PreparingOrderScreen}
      />
      <Stack.Screen
        name="Delivery"
        options={{ presentation: "fullScreenModal", headerShown: false }}
        component={DeliveryScreen}
      />
    </Stack.Navigator>
  );
}
function Rooms() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Room" component={RoomScreens} />
      <Stack.Screen name="RoomDetail" component={RoomsDetailScreen} />
    </Stack.Navigator>
  );
}
function Profile() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MyCart" component={MyCartScreen} />
    </Stack.Navigator>
  );
}
function UserInfo() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <>
        <Stack.Screen name="Profiles" component={ProfileScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ForgotePassword" component={ForgotePassword} />
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
      </>
    </Stack.Navigator>
  );
}
export default function Navigation() {
  const { isLoggedIn } = useLogin();
  const basketItems = useSelector(selectBasketItems);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="Restaurant"
        component={Home}
        options={{
          tabBarLabel: () => <Text className="font-semibold">Restaurant</Text>,
          tabBarIcon: () => (
            <Icon.Coffee
              height="30"
              width="30"
              style={{ color: themeColors.bgColor(1) }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Rooms"
        component={Rooms}
        options={{
          tabBarLabel: () => <Text className="font-semibold">Rooms</Text>,
          tabBarIcon: () => (
            <Icon.Home
              height="30"
              width="30"
              style={{ color: themeColors.bgColor(1) }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarLabel: () => <Text className="font-semibold">Cart</Text>,
          tabBarIcon: () => (
            <Icon.ShoppingCart
              height="30"
              width="30"
              style={{ color: themeColors.bgColor(1) }}
            />
          ),
          tabBarBadge: basketItems.length > 0 ? basketItems.length : null,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={isLoggedIn ? Profile : UserInfo}
        options={{
          tabBarLabel: () => <Text className="font-semibold">Profile</Text>,
          tabBarIcon: () => (
            <Icon.User
              height="30"
              width="30"
              style={{ color: themeColors.bgColor(1) }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
