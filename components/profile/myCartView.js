import { View, Text, Image } from "react-native";
import React from "react";
import { themeColors } from "../../theme";
import * as Icon from "react-native-feather";

export default function MyCartView({ id, name, imgUrl, description }) {
  return (
    <View
      style={{ shadowColor: themeColors.bgColor(0.2), shadowRadius: 7 }}
      className="mr-6 bg-white rounded-3xl shadow-lg mt-5"
    >
      <View style={{ flexDirection: "row" }}>
        <Image
          className="rounded-3xl"
          style={{ height: 100, width: 100 }}
          source={require("../../assets/images/pizzaDish.png")}
        />

        <View className="px-3 pb-4 space-y-2 flex-1">
          <Text className="text-lg font-bold pt-2">{name}</Text>
          <View className="flex-row items-center space-x-1">
            <Image
              source={require("../../assets/images/fullStar.png")}
              className="h-4 w-4"
            />
            <Text className="text-xs">
              <Text className="text-gray-700"> {description} </Text>
            </Text>
          </View>
          <View className="flex-row items-center space-x-1">
            <Icon.MapPin color="gray" width={15} height={15} />
            <Text className="text-blue-700 text-xs">Pending</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
