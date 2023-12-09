import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import FeatureRow from "../components/restaurant/featuredRow";
import { getFeaturedResturants } from "../api";
import * as Icon from "react-native-feather";
import { themeColors } from "../theme";
import { foods } from "./Food";
import CheckAvailability from "../components/room/checkAvailability";
import RoomsView from "../components/room/roomsView";
import rooms from "./Room";
export default function RoomScreens() {
  const [featuredCategories, setFeaturedCategories] = useState([]);
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);
  useEffect(() => {
    // getFeaturedResturants().then((data) => {
    //   setFeaturedCategories(data);
    // });
  }, []);

  return (
    <SafeAreaView className="bg-white">
      <StatusBar barStyle="dark-content" />

      {/* main */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 50,
        }}
      >
        {/* Check Availability */}

        {/* featured */}
        <View className="mt-5">
          <RoomsView />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
