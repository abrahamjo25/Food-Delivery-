import {
  View,
  Text,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import DishRow from "../components/restaurant/dishRow";
import BasketIcon from "../components/restaurant/basketIcon";
import { useDispatch, useSelector } from "react-redux";
import { selectResturant, setResturant } from "../slices/resturantSlice";
import { emptyBasket } from "../slices/basketSlice";
import * as Icon from "react-native-feather";
import { themeColors } from "../theme";
import { API_URL } from "../constants/accessAPI";

export default function ResturantScreen() {
  const navigation = useNavigation();
  const resturant = useSelector(selectResturant);
  let dispatch = useDispatch();
  const {
    params: { id, title, imgUrl, rating, description, dishes, reviews },
  } = useRoute();
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);
  useEffect(() => {
    if (resturant && resturant.id != id) {
      dispatch(emptyBasket());
    }
    dispatch(
      setResturant({
        id,
        title,
        imgUrl,
        rating,
        description,
        dishes,
        reviews,
      })
    );
  }, []);
  return (
    <>
      <BasketIcon />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="relative">
          <Image
            className="w-full h-72"
            source={{ uri: `${API_URL}/images/Menu/${imgUrl}` }}
          />
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="absolute top-14 left-4 bg-gray-50 p-2 rounded-full shadow"
          >
            <Icon.ArrowLeft strokeWidth={3} stroke={themeColors.bgColor(1)} />
          </TouchableOpacity>
        </View>
        <View
          style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
          className="bg-white -mt-12 pt-6"
        >
          <View className="px-5">
            <Text className="text-3xl font-bold">{title}</Text>
            {/* copy this code from restaurant card */}
            <View className="flex-row space-x-2 my-1">
              <View className="flex-row items-center space-x-1">
                <Image
                  source={require("../assets/images/fullStar.png")}
                  className="h-4 w-4"
                />
                <Text className="text-xs">
                  <Text className="text-green-700">{rating}</Text>
                  <Text className="text-gray-700"> (4.6k review)</Text> ·{" "}
                </Text>
              </View>
              <View className="flex-row items-center space-x-1">
                <Icon.MapPin color="gray" width={15} height={15} />
                <Text className="text-gray-800 text-xs">
                  Nearby 
                </Text>
              </View>
            </View>
            <Text className="text-gray-500 mt-2">{description}</Text>
          </View>
        </View>
        <View className="pb-36 bg-white">
          <Text className="px-4 py-4 text-2xl font-bold">Menu</Text>
          {/* dishes */}
          {dishes.map((dish) => {
            return (
              <DishRow
                key={dish.menuItemId}
                id={dish.menuItemId}
                name={dish.name}
                description={dish.description}
                price={dish.price}
                image={dish.imageUrl}
              />
            );
          })}
        </View>
      </ScrollView>
    </>
  );
}
