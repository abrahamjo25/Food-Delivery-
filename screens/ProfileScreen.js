import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { retrieveToken } from "../constants/tokens";

export default function ProfileScreen() {
  const navigation = useNavigation();
  useEffect(() => {
    checkToken();
  }, []);
  const checkToken = async () => {
    const token = await retrieveToken();
    if (token) {
      navigation.navigate("MyCart");
    }
  };
  return (
    <SafeAreaView
      className="flex-1"
      //style={{ backgroundColor: themeColors.bgColor(1) }}
    >
      <View className="flex-1 flex justify-around my-4">
        <Text
          className="font-bold text-2xl text-center"
          style={{ color: themeColors.bgColor(1) }}
        >
          Let's Get Started!
        </Text>
        <View className="flex-row justify-center">
          <Image
            source={require("../assets/images/welcome.png")}
            style={{ width: 350, height: 350 }}
          />
        </View>
        <View className="space-y-4">
          <TouchableOpacity
            onPress={() => navigation.navigate("SignUp")}
            className="py-3 bg-yellow-400 mx-7 rounded-xl"
            style={{ backgroundColor: themeColors.bgColor(1) }}
          >
            <Text className="text-xl font-bold text-center text-white">
              Sign Up
            </Text>
          </TouchableOpacity>
          <View className="flex-row justify-center">
            <Text
              className="text-white font-semibold"
              style={{ color: themeColors.bgColor(1) }}
            >
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text className="font-semibold text-yellow-900"> Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
