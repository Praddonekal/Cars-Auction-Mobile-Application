import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ItemFormScreen from '../screens/ItemFormScreen';
import HomeScreen from '../screens/HomeScreen';

const Tab = createMaterialTopTabNavigator();

/**
 * Seller dashbord navigation tabs
 */
const BuyerDashboardStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Posts" component={HomeScreen} />
      <Tab.Screen name="Sell Item" component={ItemFormScreen} />
    </Tab.Navigator>
  );
};

export default BuyerDashboardStack;
