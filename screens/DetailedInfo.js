import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Image,
} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';
import firestore, {addDoc, firebase} from '@react-native-firebase/firestore';

import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import ItemList from '../components/SearchComponents/ItemsList';
/**
 * Auction item detailed info screen
 */
const DetailedInfo = ({route}) => {
  const item = route.params.item;
  console.log(item);
  return (
    <View style={styles.root}>
      <Image style={styles.image} source={{uri: item.image}} />
      <Text style={styles.price}>Name: {item.name}</Text>
      <Text style={styles.price}>Color: {item.color}</Text>
      <Text style={styles.price}>Year: {item.year}</Text>
      <Text style={styles.price}>Packaged: {item.packaged}</Text>
      <Text style={styles.price}>limited Edition: {item.limitedEdition}</Text>
      <Text style={styles.price}>Expiry date: {item.expired}</Text>
      <Text style={styles.price}>Bid start price: {item.price}</Text>
    </View>
  );
};

export default DetailedInfo;
//styles for detailed info screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  userImg: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  aboutUser: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  userBtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10,
  },
  userBtn: {
    borderColor: '#2e64e5',
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  userBtnTxt: {
    color: '#2e64e5',
  },
  userInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
  },
  userInfoItem: {
    justifyContent: 'center',
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  root: {
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: '#d1d1d1',
    borderRadius: 10,
    backgroundColor: '#fff',
    marginVertical: 5,
  },
  image: {
    flex: 0,
    height: 150,
    resizeMode: 'contain',
  },
  rightContainer: {
    padding: 10,
    flex: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  expiredDate: {
    fontSize: 12,
    fontStyle: 'italic',
  },
});
