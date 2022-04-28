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
} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';
import firestore, {addDoc, firebase} from '@react-native-firebase/firestore';
import BidsList from '../components/SearchComponents/BidsList';
/**
 * Bid screen to place bids
 */
const BidsScreen = ({navigation}) => {
  const {user, logout} = useContext(AuthContext);
  const [response, setResponse] = useState(null);

  //get all items
  const getBids = async () => {
    let snapshot = await firestore().collection('CarsItems').get();

    if (!snapshot.empty) {
      setResponse(snapshot.docs.map(doc => doc.data()));
    } else {
      setResponse(null);
    }
  };
  //get all bids when screen loads
  useEffect(() => {
    getBids();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView>
        {response !== null && <BidsList items={response} />}
      </ScrollView>
    </SafeAreaView>
  );
};

export default BidsScreen;
//styles for the screen
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
});
