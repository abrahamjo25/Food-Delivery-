import React from "react";
import { View, Text, Image, TouchableWithoutFeedback } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { themeColors } from "../../theme";
import { API_URL } from "../../constants/accessAPI";

import { LinearGradient } from "expo-linear-gradient";

export default function ResturantCard({
  id,
  title,
  imgUrl,
  rating,
  description,
  dishes,
  reviews,
}) {
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate("Resturant", {
          id,
          title,
          imgUrl,
          rating,
          description,
          dishes,
          reviews,
        });
      }}
    >
      <LinearGradient
        colors={[
          "#FFF",
          "rgba(255, 255, 255, 0.8)",
          "rgba(255, 255, 255, 0.5)",
        ]} // Adjust the gradient colors as needed
        style={{
          shadowColor: themeColors.bgColor(0.2),
          shadowRadius: 7,
          backgroundColor: "#FFF",
          borderRadius: 20,
          overflow: "hidden",
          marginHorizontal: 10,
        }}
      >
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Image
            style={{
              height: 120,
              width: "100%",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
            source={{ uri: `${API_URL}/images/Menu/${imgUrl}` }}
          />
        </View>
        <View style={{ padding: 15 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", paddingBottom: 8 }}>
            {title}
          </Text>
          <Text style={{ color: "#666", paddingBottom: 12, lineHeight: 20 }}>
            {description}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingBottom: 8,
            }}
          >
            <Image
              source={require("../../assets/images/fullStar.png")}
              style={{ height: 14, width: 14 }}
            />
            <Text style={{ fontSize: 14, marginLeft: 4, color: "#28A745" }}>
              {rating}
            </Text>
            <Text style={{ fontSize: 14, color: "#666", marginLeft: 8 }}>
              {" "}
              ({reviews} reviews)
            </Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}

