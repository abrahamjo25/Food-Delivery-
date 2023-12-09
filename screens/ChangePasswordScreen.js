import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";
import * as Icon from "react-native-feather";
import { ScrollView } from "react-native";
import { useState } from "react";
import Toast from "../components/Toast";
import { useRef } from "react";
export default function ChangePasswordScreen() {
  const navigation = useNavigation();
  const toast = useRef();
  let emptyResult = {
    OldPassword: "",
    NewPassword: "",
  };

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
  const saveUserData = async () => {
    setSubmitted(true);
    if (
      userData.OldPassword &&
      userData.NewPassword
    ) {
      try {
        let res = await fetch(`${baseURL}/account/changePassword`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Add any other headers as needed
          },
          body: JSON.stringify({
            userData,
          }),
        });
        if (!res.ok) {
          toast.current.show({
            type: "error",
            text1: "Failed. Please try later.",
          });
        }
        let data = await res.json();
        if (data.Status === 200) {
          toast.current.show({
            type: "success",
            text1: "Password Changed.",
          });
          setUserData(emptyResult);
        } else {
          toast.current.show({
            type: "error",
            text1: `${data.Message}`,
          });
        }
      } catch (err) {
        toast.current.show({
          type: "error",
          text1: "Failed. Please try later.",
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
      <Toast ref={toast} />
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
            <Text className="text-gray-700 ml-4">Old Password</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
              value={userData.OldPassword || ""}
              onChangeText={(text) => OnInputChange(text, "OldPassword")}
              placeholder="Enter Old Password"
              secureTextEntry={!passwordVisible}
            />
            {submitted && !userData.OldPassword && (
              <Text className="text-red-600">Please fill old password</Text>
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
                value={userData.NewPassword || ""}
                onChangeText={(text) => OnInputChange(text, "NewPassword")}
                placeholder="Enter new password"
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
              <Text className="text-red-600">Please fill new password</Text>
            )}
            <TouchableOpacity
              className="flex items-end"
              onPress={navigation.navigate("ForgotePassword")}
            >
              <Text className="text-gray-700 mb-5">Forgot old Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="py-4 rounded-xl"
              style={{ backgroundColor: themeColors.bgColor(1) }}
              onPress={saveUserData}
            >
              <Text className="text-xl font-bold text-center text-white">
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
