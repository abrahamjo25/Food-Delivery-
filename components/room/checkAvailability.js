import React, { useState } from "react";
import { View, Text, TouchableOpacity, DatePickerAndroid } from "react-native";

const CheckAvailability = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const showDatePicker = async () => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: selectedDate,
      });

      if (action !== DatePickerAndroid.dismissedAction) {
        const newDate = new Date(year, month, day);
        setSelectedDate(newDate);
      }
    } catch ({ code, message }) {
      console.warn("Cannot open date picker", message);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={showDatePicker}>
        <Text>Show Date Picker</Text>
      </TouchableOpacity>
      <Text>Selected Date: {selectedDate.toDateString()}</Text>
    </View>
  );
};

export default CheckAvailability;
