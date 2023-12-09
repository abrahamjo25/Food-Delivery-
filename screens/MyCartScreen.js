import { View, SafeAreaView, StatusBar, ScrollView } from "react-native";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import MyCartView from "../components/profile/myCartView";
import foods from "./Food";
import { removeToken, retrieveToken } from "../constants/tokens";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { useLogin } from "../components/context/LoginProvider";
export default function MyCartScreen() {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);
  useEffect(() => {
    // getFeaturedResturants().then((data) => {
    //   setFeaturedCategories(data);
    // });
  }, []);
  const { setIsLoggedIn, setProfile } = useLogin();

  const logout = () => {
    removeToken();
    setProfile(null);
    setIsLoggedIn(false);
    navigation.navigate("Home");
  };
  return (
    <SafeAreaView className="bg-white">
      <StatusBar barStyle="dark-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 50,
        }}
      >
        <TouchableOpacity
          style={{
            padding: 16,
          }}
          onPress={() => logout()}
        >
          <Text>Logout</Text>
        </TouchableOpacity>
        <View className="mt-5 ml-3">
          {foods.map((resturant) => {
            return (
              <MyCartView
                key={resturant.id}
                id={resturant.id}
                name={resturant.name}
                imgUrl={resturant.image}
                description={resturant.description}
              />
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
