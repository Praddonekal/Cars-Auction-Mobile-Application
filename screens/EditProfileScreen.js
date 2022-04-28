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
} from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import {AuthContext} from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';
import {reduce} from 'lodash';
/**
 * Edit user profile screen
 */
const SignupScreen = ({navigation}) => {
  const [userData, setUserData] = useState(null);
  const {user, logout} = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

  //Choose photo gellary
  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(image => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };
  //upload selected photo
  const uploadImage = async () => {
    if (image == null) {
      return null;
    }
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    setUploading(true);
    setTransferred(0);

    const storageRef = storage().ref(`photos/${filename}`);
    const task = storageRef.putFile(uploadUri);

    // Set transferred state
    task.on('state_changed', taskSnapshot => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );

      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );
    });

    try {
      await task;

      const url = await storageRef.getDownloadURL();

      setUploading(false);

      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

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
        } else {
          console.log('User Data');
        }
      });
  };
  //get user when screen loads
  useEffect(() => {
    getUser();
  }, []);
  //updating user data
  const handleUpdate = async () => {
    let imgUrl = await uploadImage();

    if (imgUrl == null && userData.userImg) {
      imgUrl = userData.userImg;
    }

    firestore()
      .collection('users')
      .doc(user.uid)
      .update({
        fname: userData.fname,
        lname: userData.lname,
        email: userData.email,
        role: userData.role,
        userImg: imgUrl,
      })
      .then(() => {
        ToastAndroid.show('Profile Updated successfully!', ToastAndroid.SHORT);
        console.log('User Updated!');
        Alert.alert(
          'Profile Updated!',
          'Your profile has been updated successfully.',
        );
      });
  };
  //return user interface
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.text}>Edit User</Text>

        <TouchableOpacity onPress={() => choosePhotoFromLibrary()}>
          <View
            style={{
              height: 150,
              width: 150,
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ImageBackground
              source={{
                uri: image
                  ? image
                  : userData
                  ? userData.userImg ||
                    'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'
                  : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
              }}
              style={{height: 100, width: 100}}
              imageStyle={{borderRadius: 15}}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <MaterialCommunityIcons
                  name="camera"
                  size={35}
                  color="#fff"
                  style={{
                    opacity: 0.7,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 1,
                    borderColor: '#fff',
                    borderRadius: 10,
                  }}
                />
              </View>
            </ImageBackground>
          </View>
        </TouchableOpacity>

        <FormInput
          placeholder="Email"
          placeholderTextColor="#666666"
          fontSize={20}
          autoCorrect={false}
          value={userData ? userData.email : ''}
          onChangeText={txt => setUserData({...userData, email: txt})}
          style={styles.textInput}
          editable={false}
        />

        <FormInput
          placeholder="First Name"
          placeholderTextColor="#666666"
          fontSize={20}
          autoCorrect={false}
          value={userData ? userData.fname : ''}
          onChangeText={txt => setUserData({...userData, fname: txt})}
          style={styles.textInput}
        />
        <FormInput
          placeholder="Last Name"
          placeholderTextColor="#666666"
          fontSize={20}
          autoCorrect={false}
          value={userData ? userData.lname : ''}
          onChangeText={txt => setUserData({...userData, lname: txt})}
          style={styles.textInput}
        />
        <FormInput
          placeholder="Role"
          placeholderTextColor="#666666"
          fontSize={20}
          autoCorrect={false}
          value={userData ? userData.role : ''}
          onChangeText={txt => setUserData({...userData, role: txt})}
          style={styles.textInput}
        />

        <FormButton
          buttonTitle="Update Profile"
          onPress={() => handleUpdate()}
        />
      </View>
    </ScrollView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafd',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  userBtn: {
    borderColor: '#B93746',
    borderWidth: 6,
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
    width: 372,
  },
  userBtnTxt: {
    color: '#ed3737',
    textAlign: 'center',
    fontFamily: 'Lato-Regular',
    color: '#B93746',
    fontSize: 20,
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
