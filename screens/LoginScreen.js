import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";
import * as Icon from "react-native-feather";
import { ScrollView } from "react-native";
import { ApiService } from "../constants/accessAPI";
import { ActivityIndicator } from "react-native";
import { retrieveToken, storeToken } from "../constants/tokens";
import { useEffect } from "react";
import Toast from "react-native-toast-message";
import { useLogin } from "../components/context/LoginProvider";

export default function LoginScreen() {
  const navigation = useNavigation();
  let emptyResult = {
    Username: "",
    Password: "",
  };
  const { setIsLoggedIn, setProfile } = useLogin();

  const [userData, setUserData] = useState(emptyResult);
  const [submitted, setSubmitted] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const OnInputChange = (value, name) => {
    let _result = { ...userData };
    _result[`${name}`] = value;
    setUserData(_result);
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const apiService = new ApiService();

  const saveUserData = async () => {
    setSubmitted(true);
    try {
      const data = await apiService.post("api/User/Login", userData);
      if (data.token) {
        storeToken(data.token);
        setProfile(data);
        setIsLoggedIn(true);
        Toast.show({
          type: "success",
          position: "top",
          text1: "Successful.",
        });
        navigation.navigate("Restaurant");
      } else {
        Toast.show({
          type: "error",
          position: "top",
          text1: "Incorrect credentials.",
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Incorrect credentials.",
      });
    } finally {
      setSubmitted(false);
    }
  };
  return (
    <View
      className="flex-1 bg-white"
      style={{ backgroundColor: themeColors.bgColor(1) }}
    >
      {/* <Toast ref={toast} /> */}
      <ScrollView vertical showsVerticalScrollIndicator={false}>
        <SafeAreaView className="flex ">
          <View className="flex-row justify-start">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="absolute top-14 left-4 bg-gray-50 p-2 rounded-full shadow"
            >
              <Icon.ArrowLeft strokeWidth={3} stroke={themeColors.bgColor(1)} />
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-center">
            <Image
              source={require("../assets/images/login.png")}
              style={{ width: 200, height: 200 }}
            />
          </View>
        </SafeAreaView>
        <View
          style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
          className="flex-1 bg-white px-8 pt-8"
        >
          <View className="form space-y-2">
            <Text className="text-gray-700 ml-4">Phone | Email</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
              value={userData.Username || ""}
              onChangeText={(text) => OnInputChange(text, "Username")}
              placeholder="Enter User Id"
            />
            {submitted && !userData.Username && (
              <Text className="text-red-600">Please fill Username</Text>
            )}
            <Text className="text-gray-700 ml-4">Password</Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "gray", // Replace with your desired background color
                borderRadius: 20,
                overflow: "hidden",
              }}
            >
              <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
                style={{
                  flex: 1,
                  padding: 16,
                  color: "gray", // Replace with your desired text color
                }}
                value={userData.Password || ""}
                onChangeText={(text) => OnInputChange(text, "Password")}
                placeholder="Enter Password"
                secureTextEntry={!passwordVisible}
              />
              <TouchableOpacity
                style={{
                  padding: 16,
                }}
                onPress={() => togglePasswordVisibility()}
              >
                {passwordVisible ? (
                  <Icon.EyeOff
                    stroke="white"
                    strokeWidth={2}
                    width={20}
                    height={20}
                    style={{ marginLeft: 4 }}
                  />
                ) : (
                  <Icon.Eye
                    stroke="white"
                    strokeWidth={2}
                    width={20}
                    height={20}
                    style={{ marginLeft: 4 }}
                  />
                )}
              </TouchableOpacity>
            </View>
            {submitted && !userData.Password && (
              <Text className="text-red-600">Please fill Password</Text>
            )}
            <TouchableOpacity
              className="flex items-end"
              onPress={() => navigation.navigate("ForgotePassword")}
            >
              <Text className="text-gray-700 mb-5">Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="py-4 rounded-xl"
              style={{ backgroundColor: themeColors.bgColor(1) }}
              onPress={() => saveUserData()}
            >
              {submitted ? (
                <ActivityIndicator size="small" color="#0000ff" />
              ) : (
                <Text className="text-xl font-bold text-center text-white">
                  Login
                </Text>
              )}
            </TouchableOpacity>
          </View>
          <View className="py-3 flex-row justify-center mt-7 mb-3">
            <Text className="text-gray-500 font-semibold">
              Don't have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text className="font-semibold text-grey-600"> Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
