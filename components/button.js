import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { themeColors } from "../theme";
import * as Icon from "react-native-feather";
import { View } from "react-native";

const Button = ({ onPress, title, icon }) => {
          const FeatherIcon = Icon[icon];

  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-blue-500 p-3 rounded-full"
      style={{ backgroundColor: themeColors.bgColor(1) }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FeatherIcon strokeWidth={2} height={20} width={20} stroke="white" />

        <Text className="text-white text-center text-lg"> {title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;
