import React, { Component } from 'react';
import HomeStack from './navigators/navigator';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from "./navigators/navigator"
import AddScreen from "./screens/AddScreen"

export default function App() {
  return (
    <NavigationContainer>
       <HomeStack/>
    </NavigationContainer>
  );
}