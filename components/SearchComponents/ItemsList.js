import React, {useEffect} from 'react';
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
  TouchableHighlight,
} from 'react-native';
import {SIZES, COLORS, FONTS} from '../../assets/constants';
import FormButton from '../FormButton';
/**
 * Item list component to shpw search items
 */
const ItemList = props => {
  const onPressHandler = item => {
    props.navigate(item);
  };

  //return item list screen
  return (
    <View>
      {props.items.map(item => (
        <TouchableHighlight
          onPress={() => {
            onPressHandler(item);
          }}>
          <View style={styles.root}>
            <Image style={styles.image} source={{uri: item.image}} />
            <View style={styles.rightContainer}>
              <Text style={styles.title} numberOfLines={3}>
                {item.name}
              </Text>
              <Text style={styles.price}>{item.price}$</Text>
              <Text style={styles.expiredDate} numberOfLines={3}>
                Expired Date:{item.expired}
              </Text>
            </View>
          </View>
        </TouchableHighlight>
      ))}
    </View>
  );
};

export default ItemList;
//styles for itemlist search screen
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
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#d1d1d1',
    borderRadius: 10,
    backgroundColor: '#fff',
    marginVertical: 5,
  },
  image: {
    flex: 2,
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
