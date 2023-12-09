import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToBasket, selectBasketItemsById } from "../../slices/basketSlice";
import Button from "../button";

export default function RoomShow({ name, id, price, image }) {
  const handleBook = () => {
    console.warn("Booked");
  };
  return (
    <>
      <View className="flex-row items-center bg-white p-3 rounded-3xl shadow-2xl mb-3 mx-2">
        <Image
          className="rounded-3xl"
          style={{ height: 100, width: 100 }}
          source={image}
        />
        <View className="flex flex-1 space-y-3">
          <View className="pl-3">
            <Text className="text-xl">Room {name}</Text>
          </View>
          <View className="flex-row pl-3 justify-between items-center">
            <Text className="text-gray-700 text-lg font-bold">ETB {price}</Text>
            <View className="flex-row items-center">
              <Button onPress={handleBook} title="Book" icon="Plus" />
            </View>
          </View>
        </View>
      </View>
    </>
  );
}
