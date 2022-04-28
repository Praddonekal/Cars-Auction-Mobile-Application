/**
 * Android authentication
 */
import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore, {addDoc} from '@react-native-firebase/firestore';
import {
  View,
  Alert,
  ToastAndroid,
  Image,
  ImageBackground,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  StyleSheet,
} from 'react-native';

/**
 * Export authentication context
 */
export const AuthContext = createContext();

/**
 * Export authentication provider
 */
export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const usersCollection = firestore().collection('Users');
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            Alert.alert(
              'Profile Not Found!',
              'Your Email or Password is Incorrect!',
            );
          }
        },
        register: async (email, password, fName, lName, role) => {
          try {
            await auth()
              .createUserWithEmailAndPassword(email, password)
              .then(() => {
                firestore()
                  .collection('users')
                  .doc(auth().currentUser.uid)
                  .set({
                    fname: fName,
                    lname: lName,
                    email: email,
                    role: role,
                    createdAt: firestore.Timestamp.fromDate(new Date()),
                    userImg: null,
                  })
                  .catch(error => {
                    console.log(
                      'Something went wrong with added user to firestore: ',
                      error,
                    );
                  });
              })
              .catch(error => {
                console.log('Something went wrong with sign up: ', error);
              });
          } catch (e) {
            console.log(e);
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.log(e);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
