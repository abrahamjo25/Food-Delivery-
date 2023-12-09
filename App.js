import React, { forwardRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "./store";
import Navigation from "./navigation";
import Toast from "react-native-toast-message";
import LoginProvider from "./components/context/LoginProvider";

const App = forwardRef((props, ref) => (
  <Provider store={store}>
    <LoginProvider>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
      <Toast ref={ref} />
    </LoginProvider>
  </Provider>
));

export default App;
