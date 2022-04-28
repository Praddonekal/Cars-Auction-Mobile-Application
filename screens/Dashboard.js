import React, {useEffect, useContext, useState} from 'react';
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
  Button,
} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BuyerDashboard from './Buyer';
import SellerDashboard from './Seller';
import FormButton from '../components/FormButton';
import {time} from 'console';
import DashboardStack from '../navigation/BuyerDashboardStack';
import {domainToASCII} from 'url';

/**
 * User dashboard
 */
const Dashboard = ({navigation}) => {
  const [userData, setUserData] = useState([]);
  const [role, setRole] = useState();
  const {user, logout} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    console.log('Code Ran' + user.uid);
    const currentUser = await firestore()
      .collection('users')
      .doc(user.uid)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          console.log('User Data', documentSnapshot.data());
          setUserData(documentSnapshot.data());
          console.log('User Role ' + documentSnapshot.data().role);
          setRole(documentSnapshot.data().role);
        } else {
          console.log('User Data');
        }
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  //   function DashboardCondition()
  //  {
  //     if (loading) {
  //       console.log('HHH', userData.role);
  //       if (userData.role == 'Buyer') {
  //         return <BuyerDashboard />;
  //       }
  //       if (userData.role == 'Seller') {
  //         return <Text>Hello World!</Text>;
  //       }
  //     }
  //   }

  if (userData.role == 'Buyer') {
    return <BuyerDashboard role={role} />;
  } else {
    return <SellerDashboard />;
  }
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafd',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  userBtn: {
    borderColor: '#ed3737',
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
    width: 200,
  },
  userBtnTxt: {
    color: '#ed3737',
    textAlign: 'center',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  logo: {
    height: 200,
    width: 200,
    resizeMode: 'cover',
  },
  text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },
  navButton: {
    marginTop: 15,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
    fontFamily: 'Lato-Regular',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 35,
    justifyContent: 'center',
  },
  color_textPrivate: {
    fontSize: 13,
    fontWeight: '400',
    fontFamily: 'Lato-Regular',
    color: 'grey',
  },
});
