import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import React, { useState } from "react";
import { themeColors } from "../theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import * as Icon from "react-native-feather";
import { ScrollView } from "react-native";
import { ApiService } from "../constants/accessAPI";
import { ActivityIndicator } from "react-native";
import { retrieveToken, storeToken } from "../constants/tokens";
import { useEffect } from "react";
import Toast from "react-native-toast-message";
import { useLogin } from "../components/context/LoginProvider";

export default function SignUpScreen() {
  const navigation = useNavigation();

  let emptyResult = {
    Name: "",
    Email: "",
    Phone: "",
    Password: "",
    ConfirmPassword: "",
  };
  const { setIsLoggedIn, setProfile } = useLogin();

  const [userData, setUserData] = useState(emptyResult);
  const [submitted, setSubmitted] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const OnInputChange = (value, name) => {
    let _result = { ...userData };
    _result[`${name}`] = value;
    setUserData(_result);
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const validatePhone = (phone) => {
    const regex = /^\d{10}$/;
    return regex.test(phone);
  };
  const apiService = new ApiService();

  const saveUserData = async () => {
    setSubmitted(true);
    if (!validateEmail(userData.Email)) {
      setError("Invalid Email!");
    } else if (!validatePhone(userData.Phone)) {
      setError("Invalid Phone!");
    } else if (
      userData.Name &&
      userData.Email &&
      userData.Phone &&
      userData.Password
    ) {
      try {
        const data = await apiService.post("api/User/Register", userData);
        if (data.token) {
          storeToken(data.token);
          setProfile(data);
          setIsLoggedIn(true);
          navigation.navigate("Restaurant");
          Toast.show({
            type: "success",
            position: "top",
            text1: "Successful.",
          });
        } else {
          Toast.show({
            type: "error",
            position: "top",
            text1: "Error occured.",
          });
        }
      } catch (error) {
        Toast.show({
          type: "error",
          position: "top",
          text1: "Error occured.",
        });
      } finally {
        setSubmitted(false);
      }
    }
  };
  return (
    <View
      className="flex-1 bg-white"
      style={{ backgroundColor: themeColors.bgColor(1) }}
    >
      {/* <Toast ref={toast} /> */}

      <ScrollView vertical showsVerticalScrollIndicator={false}>
        <SafeAreaView className="flex">
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
              source={require("../assets/images/signup.png")}
              style={{ width: 165, height: 110 }}
            />
          </View>
        </SafeAreaView>
        <View
          className="flex-1 bg-white px-8 pt-8"
          style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
        >
          <Text className="text-red-600">{error}</Text>
          <View className="form space-y-2">
            <Text className="text-gray-700 ml-4">Full Name</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
              value={userData.Name || ""}
              onChangeText={(text) => OnInputChange(text, "Name")}
              placeholder="Enter Name"
            />
            {submitted && !userData.Name && (
              <Text className="text-red-600">Please fill Name</Text>
            )}
            <Text className="text-gray-700 ml-4">Email Address</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
              value={userData.Email || ""}
              onChangeText={(text) => OnInputChange(text, "Email")}
              placeholder="Enter Email"
            />
            {submitted && !userData.Email && (
              <Text className="text-red-600">Please fill Email</Text>
            )}
            <Text className="text-gray-700 ml-4">Phone</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
              value={userData.Phone || ""}
              onChangeText={(text) => OnInputChange(text, "Phone")}
              placeholder="Enter Phone"
            />
            {submitted && !userData.Phone && (
              <Text className="text-red-600">Please fill Phone</Text>
            )}
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
                onPress={togglePasswordVisibility}
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
              className="py-4 rounded-xl"
              style={{ backgroundColor: themeColors.bgColor(1) }}
              onPress={() => saveUserData()}
            >
              {submitted ? (
                <ActivityIndicator size="small" color="#0000ff" />
              ) : (
                <Text className="font-xl font-bold text-xl text-center text-white">
                  Sign Up
                </Text>
              )}
            </TouchableOpacity>
          </View>
          <View className="py-3 flex-row justify-center mt-7">
            <Text className="text-gray-500 font-semibold">
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text className="font-semibold text-grey-600"> Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
