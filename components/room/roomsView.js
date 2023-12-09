import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import ResturantCard from "../restaurant/resturantCard";
import { getFeaturedResturantById } from "../../api";
import * as Icon from "react-native-feather";
import { themeColors } from "../../theme";
import rooms from "../../screens/Room";
import RoomCard from "./roomCard";

export default function RoomsView() {
  // const [resturants, setResturants] = useState([]);

  useEffect(() => {
    // getFeaturedResturantById(id).then(data=>{
    //   // console.log('got data: ',data);
    //   setResturants(data?.resturants);
    // })
  }, []);
  // console.log(resturants);

  return (
    <View>
      {/* <View className="flex-row justify-between items-center px-4">
        <View>
          <Text className="font-bold text-lg">{title}</Text>
          <Text className="text-gray-500 text-xs">{description}</Text>
        </View>

        <TouchableOpacity>
          <Text style={{ color: themeColors.text }} className="font-semibold">
            See All
          </Text>
        </TouchableOpacity>
      </View> */}

      <ScrollView
        vertical
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        className="overflow-visible py-5"
      >
        {rooms.map((room) => {
          return (
            <RoomCard
              key={room.id}
              id={room.id}
              title={room.roomType}
              imgUrl={room.image}
              address="123 main street"
              description={room.description}
              rating={room.rating}
              reviews={room.reviews}
              type={room.type}
              room={room.room}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}
