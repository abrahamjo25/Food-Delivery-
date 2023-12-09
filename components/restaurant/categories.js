import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { API_URL } from "../../constants/accessAPI";

export default function Categories({ category }) {
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <View className="mt-4">
      <ScrollView
        // className="p-4"
        horizontal
        showsHorizontalScrollIndicator={false}
        className="overflow-visible"
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
      >
        {category?.map((category) => {
          let isActive = category.foodCategoryId == activeCategory;
          let btnClass = isActive ? " bg-gray-600" : " bg-gray-200";
          let textClass = isActive
            ? " font-semibold text-gray-800"
            : " text-gray-500";
          return (
            <View
              key={category.foodCategoryId}
              className="flex justify-center items-center mr-6"
            >
              <TouchableOpacity
                onPress={() => setActiveCategory(category.foodCategoryId)}
                className={"p-1 rounded-full shadow" + btnClass}
              >
                <Image
                  style={{ width: 45, height: 45 }}
                  source={{
                    uri: `${API_URL}/images/Menu/${category.imageUrl}`,
                  }}
                />
              </TouchableOpacity>
              <Text className={"text-sm " + textClass}>
                {category.categoryName}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
