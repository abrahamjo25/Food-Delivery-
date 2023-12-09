import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { themeColors } from "../../theme";
import * as Icon from "react-native-feather";

export default function RoomCard({
  id,
  title,
  description,
  address,
  imgUrl,
  type,
  reviews,
  rating,
  room,
}) {
  // console.log(urlFor(imgUrl).url());
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate("RoomDetail", {
          id,
          title,
          description,
          address,
          imgUrl,
          type,
          reviews,
          rating,
          room,
        });
      }}
    >
      <View
        style={{ shadowColor: themeColors.bgColor(0.2), shadowRadius: 7 }}
        className="mr-6 bg-white rounded-3xl shadow-lg mb-5"
      >
        <View style={{ flexDirection: "row" }}>
          <Image className="h-36 w-60 rounded-t-3xl" source={imgUrl} />

          <View className="px-3 pb-4 space-y-2 flex-1">
            <Text className="text-lg font-bold pt-2">{title}</Text>
            <View className="flex-row items-center space-x-1">
              <Image
                source={require("../../assets/images/fullStar.png")}
                className="h-4 w-4"
              />
              <Text className="text-xs">
                <Text className="text-green-700">{rating}</Text>
                <Text className="text-gray-700"> ({reviews} review)</Text>
                <Text className="font-semibold text-gray-700">{type}</Text>
              </Text>
            </View>
            <View className="flex-row items-center space-x-1">
              <Icon.MapPin color="gray" width={15} height={15} />
              <Text className="text-gray-700 text-xs"> Nearby · {address}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
