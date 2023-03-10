import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import {Context} from "./src/context/store";
import {reducer} from "./src/reducer/index";
import {useReducer} from "react";
import Accueil from "./src/components/Accueil";
import Register from "./src/components/Register";
import JobList from "./src/components/JobList";

const Stack = createNativeStackNavigator();

export default function App() {
  const defaultState = {
    jwt: null,
  };

  const [state, dispatch] = useReducer(reducer, defaultState);

  let navigator = (
    <Stack.Navigator>
      <Stack.Screen name="accueil" component={Accueil} />
      <Stack.Screen name="register" component={Register} />
    </Stack.Navigator>
  );
  if (state.jwt) {
    navigator = (
      <Stack.Navigator>
        <Stack.Screen name="jobList" component={JobList} />
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Context.Provider value={{state, dispatch}}>
        {navigator}
      </Context.Provider>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  App:{
    backgroundColor: '#fff',
    alignItems: 'center',
    marginLeft: 0,
  }
});
