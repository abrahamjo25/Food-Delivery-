import AsyncStorage from "@react-native-async-storage/async-storage";

// Store token
export const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem("token", token);
  } catch (er) {}
};

// Retrieve token
export const retrieveToken = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    return token;
  } catch (er) {
    return null;
  }
};

// Remove token
export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem("token");
  } catch (er) {}
};
