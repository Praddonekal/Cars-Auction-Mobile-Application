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

import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import ItemList from '../components/SearchComponents/ItemsList';
/**
 * Search screen
 */
const SearchScreen = ({navigation}) => {
  const [request, setRequest] = useState('');
  const [response, setResponse] = useState(null);

  const navigate = item => {
    console.log('button clicked');
    navigation.navigate('Info', {item: item});
  };
  //get serached item
  const getItems = async () => {
    if (request === '') {
      let snapshot = await firestore().collection('CarsItems').get();
      if (!snapshot.empty) {
        setResponse(snapshot.docs.map(doc => doc.data()));
      } else {
        setResponse(null);
      }
    } else {
      let snapshot = await firestore()
        .collection('CarsItems')
        .where('name', '==', request)
        .get();

      if (!snapshot.empty) {
        setResponse(snapshot.docs.map(doc => doc.data()));
      } else {
        setResponse(null);
      }
    }
  };

  //return search screen
  return (
    <ScrollView>
      <View style={styles.container}>
        <FormInput
          labelValue={request}
          onChangeText={input => setRequest(input)}
          placeholderText="Find"
          autoCorrect={false}
        />
        <FormButton
          buttonTitle="Find"
          onPress={() => {
            getItems();
          }}
        />
      </View>
      {response !== null && <ItemList items={response} navigate={navigate} />}
    </ScrollView>
  );
};

export default SearchScreen;
//styles for search screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
});
