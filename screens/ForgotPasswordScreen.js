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
import { useEffect } from "react";
import { retrieveToken } from "../constants/tokens";
export default function ForgotePassword() {
  const navigation = useNavigation();
  const toast = useRef();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const sendUserData = async () => {
    setSubmitted(true);
    if (email) {
      try {
        let res = await fetch(`${baseURL}/account/forgotePassword`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Add any other headers as needed
          },
          body: JSON.stringify({
            email: email,
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
            text1: "Successful. Check your email.",
          });
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
            <Text className="text-gray-700 ml-4">Email</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
              value={email || ""}
              onChangeText={(text) => setEmail(text)}
              placeholder="Enter User Id"
            />
            {submitted && !email && (
              <Text className="text-red-600">Please fill Email</Text>
            )}
            <TouchableOpacity
              className="py-4 rounded-xl"
              style={{ backgroundColor: themeColors.bgColor(1) }}
              onPress={sendUserData}
            >
              <Text className="text-xl font-bold text-center text-white">
                Send
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
