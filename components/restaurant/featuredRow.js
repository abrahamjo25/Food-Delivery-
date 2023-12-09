import { View, FlatList } from "react-native";
import React from "react";
import ResturantCard from "./resturantCard";

export default function FeatureRow({ food }) {

  const renderResturantCard = ({ item }) => (
    <View style={{ flex: 1, margin: 8, width: "50%" }}>
      <ResturantCard
        key={item.foodCategoryId}
        id={item.foodCategoryId}
        title={item.categoryName}
        dishes={item?.menuItems}
        description={item.description}
        imgUrl={item.imageUrl}
        rating={4}
        reviews={120}
      />
    </View>
  );
  return (
    <View>

      <FlatList
        data={food}
        renderItem={renderResturantCard}
        keyExtractor={(item) => item.foodCategoryId.toString()}
        numColumns={2}
        contentContainerStyle={{ paddingHorizontal: 15, paddingVertical: 10 }}
      />
    </View>
  );
}
