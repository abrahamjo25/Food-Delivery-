import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  emptyBasket,
  removeFromBasket,
  selectBasketItems,
  selectBasketTotal,
} from "../slices/basketSlice";
import { selectResturant } from "../slices/resturantSlice";
import { useNavigation } from "@react-navigation/native";
import * as Icon from "react-native-feather";
import { themeColors } from "../theme";
import { API_URL, ApiService } from "../constants/accessAPI";
import Toast from "react-native-toast-message";

export default function BasketScreen() {
  const resturant = useSelector(selectResturant);
  const [groupedItems, setGroupedItems] = useState([]);
  const basketItems = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const deliveryFee = 20;
  useMemo(() => {
    const gItems = basketItems.reduce((group, item) => {
      if (group[item.id]) {
        group[item.id].push(item);
      } else {
        group[item.id] = [item];
      }
      return group;
    }, {});
    setGroupedItems(gItems);
    // console.log('items: ',gItems);
  }, [basketItems]);
  const apiService = new ApiService();

  const orderNow = async () => {
    setSubmitted(true);
    try {
      if (Object.entries(groupedItems).length === 0) {
        Toast.show({
          type: "error",
          position: "top",
          text1: "Basket is empty.",
        });
      } else {
        const transformedData = Object.entries(groupedItems).map(
          ([categoryId, items]) => {
            const quantity = items.length;
            const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

            return {
              Quantity: quantity,
              TotalPrice: totalPrice,
              MenuItemId: categoryId,
            };
          }
        );
        const data = await apiService.post("api/Orders", transformedData);
        if (data) {
          dispatch(emptyBasket());
          Toast.show({
            type: "success",
            position: "top",
            text1: "Successfully ordered.",
          });
        } else {
          Toast.show({
            type: "error",
            position: "top",
            text1: "Please try later.",
          });
        }
      }
    } catch (error) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Please try later.",
      });
    } finally {
      setSubmitted(false);
    }
  };
  return (
    <View className=" bg-white flex-1">
      {/* top button */}
      <View className="relative py-4 shadow-sm">
        <TouchableOpacity
          style={{ backgroundColor: themeColors.bgColor(1) }}
          onPress={navigation.goBack}
          className="absolute z-10 rounded-full p-1 shadow top-5 left-2"
        >
          <Icon.ArrowLeft strokeWidth={3} stroke="white" />
        </TouchableOpacity>
        <View>
          <Text className="text-center font-bold text-xl">Your cart</Text>
          <Text className="text-center text-gray-500">{resturant.title}</Text>
        </View>
      </View>

      {/* delivery time */}
      <View
        style={{ backgroundColor: themeColors.bgColor(0.2) }}
        className="flex-row px-4 items-center"
      >
        <Image
          source={require("../assets/images/bikeGuy.png")}
          className="w-20 h-20 rounded-full"
        />
        <Text className="flex-1 pl-4">Take 20-30 minutes</Text>
      </View>

      {/* dishes */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="bg-white pt-5"
        contentContainerStyle={{
          paddingBottom: 50,
        }}
      >
        {Object.entries(groupedItems).map(([key, items]) => {
          return (
            <View
              key={key}
              className="flex-row items-center space-x-3 py-2 px-4 bg-white rounded-3xl mx-2 mb-3 shadow-md"
            >
              <Text style={{ color: themeColors.text }} className="font-bold">
                {items.length} x{" "}
              </Text>
              <Image
                className="h-14 w-14 rounded-full"
                source={{
                  uri: `${API_URL}/images/Menu/${items[0]?.image}`,
                }}
              />
              <Text className="flex-1 font-bold text-gray-700">
                {items[0]?.name}
              </Text>
              <Text className="font-semibold text-base">
                ETB {items[0]?.price}
              </Text>
              <TouchableOpacity
                className="p-1 rounded-full"
                style={{ backgroundColor: themeColors.bgColor(1) }}
                onPress={() => dispatch(removeFromBasket({ id: items[0]?.id }))}
              >
                <Icon.Minus
                  strokeWidth={2}
                  height={20}
                  width={20}
                  stroke="white"
                />
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
      {/* totals */}
      <View
        style={{ backgroundColor: themeColors.bgColor(0.2) }}
        className=" p-6 px-8 rounded-t-3xl space-y-4"
      >
        <View className="flex-row justify-between">
          <Text className="text-gray-700">Subtotal</Text>
          <Text className="text-gray-700">ETB {basketTotal}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-700">Delivery Fee</Text>
          <Text className="text-gray-700">ETB {deliveryFee}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="font-extrabold">Order Total</Text>
          <Text className="font-extrabold">
            ETB {basketTotal + deliveryFee}
          </Text>
        </View>
        <View>
          <TouchableOpacity
            style={{ backgroundColor: themeColors.bgColor(1) }}
            onPress={orderNow}
            className="p-3 rounded-full"
          >
            {submitted ? (
              <ActivityIndicator size="small" color="#0000ff" />
            ) : (
              <Text className="text-white text-center font-bold text-lg">
                Place Order
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
