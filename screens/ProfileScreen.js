import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';
import firestore, {addDoc, firebase} from '@react-native-firebase/firestore';
/**
 * User profile screen
 */
const ProfileScreen = ({navigation}) => {
  const [userData, setUserData] = useState([]);
  const {user, logout} = useContext(AuthContext);
  const [response, setResponse] = useState(null);

  const getProfile = async () => {
    let currUser = await firestore()
      .collection('users')
      .doc(user.uid)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          console.log('User Data', documentSnapshot.data());
          setUserData(documentSnapshot.data());
        } else {
          console.log('User Data');
        }
      });
  };
  //load user information on page load
  useEffect(() => {
    getProfile();
  }, []);
  //return user profile screen
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.text}>
          {userData.fname} {userData.lname}
        </Text>
        <Image style={styles.userImg} source={{uri: userData.userImg}} />
        <Text style={styles.emtext}>Email: {userData.email}</Text>
        <Text style={styles.emtext}>Role: {userData.role}</Text>
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity style={styles.userBtn} onPress={() => logout()}>
          <Text style={styles.userBtnTxt}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;
//styles for user profile screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  userImg: {
    height: 200,
    width: 200,
    borderRadius: 75,
    marginTop: 30,
    marginBottom: 30,
    alignSelf: 'center',
  },
  userBtn: {
    borderColor: '#B93746',
    borderWidth: 6,
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
    width: 350,
  },
  userBtnTxt: {
    color: '#ed3737',
    textAlign: 'center',
    fontFamily: 'Lato-Regular',
    color: '#B93746',
    fontSize: 20,
  },
  text: {
    fontSize: 25,
    marginTop: 30,
    color: 'blue',
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'center',
  },
  emtext: {
    fontSize: 18,
    marginBottom: 10,
    color: 'black',
    fontWeight: 'bold',
    alignSelf: 'center',
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
