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
import ItemList from '../components/SearchComponents/ItemsList';
/**
 * Home screen
 */
const HomeScreen = ({navigation}) => {
  const {user, logout} = useContext(AuthContext);
  const [response, setResponse] = useState(null);

  const navigate = item => {
    console.log('button clicked');
    navigation.navigate('Info', {item: item});
  };
  //get all items to show on home screen
  const getItems = async () => {
    let snapshot = await firestore().collection('CarsItems').get();

    if (!snapshot.empty) {
      setResponse(snapshot.docs.map(doc => doc.data()));
    } else {
      setResponse(null);
    }
  };
  //load all items when home page loads
  useEffect(() => {
    getItems();
  }, []);
  const sort = async key => {
    getItems();
    console.log('Press');
    let snapshot = await firestore().collection('CarsItems').get();

    if (!snapshot.empty) {
      setResponse(
        snapshot.docs
          .map(doc => doc.data())
          .sort((a, b) => {
            return parseFloat(a['price']) - parseFloat(b['price']);
          }),
      );
    } else {
      setResponse(null);
    }
  };
  const sortYear = async key => {
    getItems();
    console.log('Press');
    let snapshot = await firestore().collection('CarsItems').get();

    if (!snapshot.empty) {
      setResponse(
        snapshot.docs
          .map(doc => doc.data())
          .sort((a, b) => {
            return parseFloat(a['year']) - parseFloat(b['year']);
          }),
      );
    } else {
      setResponse(null);
    }
  };
  //return screen with all auction items
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView>
        <View>
          <TouchableOpacity style={styles.userBtn} onPress={getItems}>
            <Text style={styles.userBtnTxt}>Refresh</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.userBtn} onPress={sort}>
            <Text style={styles.userBtnTxt}>Sort by Price</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.userBtn} onPress={sortYear}>
            <Text style={styles.userBtnTxt}>Sort by Year</Text>
          </TouchableOpacity>
        </View>
        {response !== null && <ItemList items={response} navigate={navigate} />}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
//styles for home screen
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
