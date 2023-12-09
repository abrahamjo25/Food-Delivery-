import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Add login logic here
  };

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-3xl font-bold mb-6">Login</Text>
      <View className="w-4/5 mb-4">
        <TextInput
          className="border-b-2 border-gray-400 p-2"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View className="w-4/5 mb-4">
        <TextInput
          className="border-b-2 border-gray-400 p-2"
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <TouchableOpacity
        className="bg-blue-500 py-2 px-4 rounded-md mb-4"
        onPress={handleLogin}
      >
        <Text className="text-white text-center">Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
