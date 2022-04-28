import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import NumericInput from 'react-native-numeric-input';
import firestore, {addDoc, firebase} from '@react-native-firebase/firestore';

import FormButton from '../FormButton';

/**
 * Show bid list
 */
const BidsList = props => {
  /**
   * tracs currently selected item and calue
   */
  let info = {};

  const [items, setItems] = useState(props.items);
  const bidValue = useRef(null);
  const bidTarget = useRef(null);

  /**
   * get all bids
   */
  const getBids = async () => {
    let snapshot = await firestore().collection('CarsItems').get();

    if (!snapshot.empty) {
      setItems(snapshot.docs.map(doc => doc.data()));
    } else {
      setItems(null);
    }
  };

  /**
   * Updates item info
   */
  const BidHandler = () => {
    console.log(info);
    firestore()
      .collection('CarsItems')
      .doc(bidTarget.value)
      .update({
        price: bidValue.value,
      })
      .then(() => {
        ToastAndroid.show('Bid placed successfully!', ToastAndroid.SHORT);
        console.log('Bid placed');
      })
      .then(() => {
        getBids();
      });
  };

  //return bidlist screen
  return (
    <View>
      {items.map(item => (
        <View style={styles.root}>
          <Image style={styles.image} source={{uri: item.image}} />
          <View style={styles.rightContainer}>
            <Text style={styles.text} numberOfLines={3}>
              {item.name}
            </Text>
            {/* <Text style={styles.text}>
           My Price: ${item.myPrice}
         </Text> */}
            <Text style={styles.text}>
              Current Price: ${item.price ? item.price : 0}
            </Text>
            <NumericInput
              minValue={item.price + 1}
              value={info.price}
              onChange={value => {
                bidValue.value = value;
                bidTarget.value = item.id;
              }}
            />
            <FormButton
              buttonTitle="Bid"
              onPress={() => {
                if (bidTarget.value !== item.id) {
                  ToastAndroid.show('Select value first.', ToastAndroid.SHORT);
                } else if (bidValue.value <= item.price) {
                  ToastAndroid.show(
                    'Bid can bot be less than a current price',
                    ToastAndroid.SHORT,
                  );
                } else {
                  BidHandler();
                }
              }}></FormButton>
          </View>
        </View>
      ))}
    </View>
  );
};

export default BidsList;
//styles for bidlist screen
const styles = StyleSheet.create({
  root: {
    width: 300,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#d1d1d1',
    borderRadius: 10,
    backgroundColor: '#fff',
    marginVertical: 5,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
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
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  expiredDate: {
    fontSize: 12,
    fontStyle: 'italic',
  },
});
