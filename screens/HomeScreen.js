import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  TextInput,
} from "react-native";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Categories from "../components/restaurant/categories";
import { getFeaturedResturants } from "../api";
import * as Icon from "react-native-feather";
import { themeColors } from "../theme";
import FeatureRow from "../components/restaurant/featuredRow";
import { ActivityIndicator } from "react-native";
import { StyleSheet } from "react-native";

export default function HomeScreen() {
  const [featuredCategories, setFeaturedCategories] = useState([]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);
  useEffect(() => {
    setLoading(true);
    getFeaturedResturants()
      .then((data) => {
        setFeaturedCategories(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <SafeAreaView className="bg-white">
      <StatusBar barStyle="dark-content" />
      {/* search bar */}
      <View className="flex-row items-center space-x-2 px-4 pb-2 ">
        <View className="flex-row flex-1 items-center p-3 rounded-full border border-gray-300">
          <Icon.Search height="25" width="25" stroke="gray" />
          <TextInput
            placeholder="Restaurants"
            className="ml-2 flex-1"
            keyboardType="default"
          />
          <View className="flex-row items-center space-x-1 border-0 border-l-2 pl-2 border-l-gray-300">
            <Icon.MapPin height="20" width="20" stroke="gray" />
            <Text className="text-gray-600">Addis Ababa</Text>
          </View>
        </View>
        <View
          style={{ backgroundColor: themeColors.bgColor(1) }}
          className="p-3 rounded-full"
        >
          <Icon.Sliders
            height={20}
            width={20}
            strokeWidth="2.5"
            stroke="white"
          />
        </View>
      </View>
      {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Categories category={featuredCategories} />
          <View className="mt-5">
            <FeatureRow food={featuredCategories} />
          </View>
        </>
      )}
    </SafeAreaView>
  );
}
