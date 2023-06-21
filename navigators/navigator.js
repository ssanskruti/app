import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MainScreen from '../screens/MainScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';
import LogInScreen from '../screens/LogInScreen';
import ForgotPasswordScreen from '../screens/FPScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfile from '../screens/EditProfile';
import AboutApp from '../screens/AboutApp';
import FeedScreen from '../screens/FeedScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BookListScreen from '../screens/BookListScreen';
import AddScreen from '../screens/AddScreen';
import BookDetailsScreen from '../screens/BookDetails';
import ReviewDetailsScreen from '../screens/ReviewDetails';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="main"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="main" component={MainScreen} />
      <Stack.Screen name="home" component={TabNavigator} />
      <Stack.Screen name="login" component={LogInScreen} />
      <Stack.Screen name="signUp" component={SignUpScreen} />
      <Stack.Screen name="fp" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      labeled={false}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name == 'profile') {
            iconName = 'person';
          }
          if (route.name == 'feed') {
            iconName = 'add-circle';
          }
          if (route.name == 'home') {
            iconName = 'home';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        style: {
          height: '10%',
          justifyContent: 'center',
          backgroundColor: '#fff',
        },
        tabStyle: {
          marginTop: 5,
          marginLeft: 10,
          marginRight: 10,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Alegreya',
        },
        labelStyle: {
          fontSize: 15,
        },
        activeTintColor: '#f1613e',
        inactiveTintColor: '#ffbaa8',
      }}>
      <Tab.Screen name="home" component={HomeStack2} />
      <Tab.Screen name="feed" component={FeedStack} />

      <Tab.Screen name="profile" component={SettingsStack} />
    </Tab.Navigator>
  );
};


const Stack3 = createStackNavigator();

const SettingsStack = () => {
  return (
    <Stack3.Navigator
      initialRouteName="proflie"
      screenOptions={{ headerShown: false }}>
      <Stack3.Screen name="proflie" component={ProfileScreen} />
      <Stack3.Screen name="editProfile" component={EditProfile} />
      <Stack3.Screen name="AboutApp" component={AboutApp} />
    </Stack3.Navigator>
  );
};

const Stack1 = createStackNavigator();

const HomeStack2 = () => {
  return (
    <Stack1.Navigator
      initialRouteName="home"
      screenOptions={{ headerShown: false }}>
      <Stack1.Screen name="bookList" component={BookListScreen} />
      <Stack1.Screen name="bookDetails" component={BookDetailsScreen} />
      <Stack1.Screen name="home" component={HomeScreen} />
    </Stack1.Navigator>
  );
};

const Stack2 = createStackNavigator();

const FeedStack = () => {
  return (
    <Stack2.Navigator
      initialRouteName="feed"
      screenOptions={{ headerShown: false }}>
      <Stack2.Screen name="feed" component={FeedScreen} />
      <Stack2.Screen name="reviewDetails" component={ReviewDetailsScreen} />
      <Stack2.Screen name="add" component={AddScreen} />
    </Stack2.Navigator>
  );
};

export default HomeStack;
//export default TabNavigator;
