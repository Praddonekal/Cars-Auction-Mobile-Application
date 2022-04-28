import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Bids from '../screens/Bids';
import HomeScreen from '../screens/HomeScreen';

const Tab = createMaterialTopTabNavigator();

/**
 * Buyer dashbord navigation tabs
 */
const BuyerDashboardStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Posts" component={HomeScreen} />
      <Tab.Screen name="Bids" component={Bids} />
    </Tab.Navigator>
  );
};

export default BuyerDashboardStack;
