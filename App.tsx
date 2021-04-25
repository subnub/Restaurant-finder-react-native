import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
// import {} from 'react-navig'
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './components/Home';

type StackNavigatorType = {
  Home: undefined;
};

const StackNavigator = createStackNavigator<StackNavigatorType>();

export default () => {
  return (
    <NavigationContainer>
      <StackNavigator.Navigator initialRouteName="Home">
        <StackNavigator.Screen component={HomeScreen} name="Home" />
      </StackNavigator.Navigator>
    </NavigationContainer>
  );
};
