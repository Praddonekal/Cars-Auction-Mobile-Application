import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Profile from '../screens/ProfileScreen';
import EditProfile from '../screens/EditProfileScreen';

const Tab = createMaterialTopTabNavigator();
/**
 * Profile navigation tabs
 */
function Home() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home!</Text>
    </View>
  );
}

const ProfileStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Edit" component={EditProfile} />
    </Tab.Navigator>
  );
};

export default ProfileStack;
