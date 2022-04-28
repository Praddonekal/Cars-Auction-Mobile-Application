import firestore, {firebase} from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
//Searching item from firebase database
export function searchItem(itemName) {
  firestore().collection('items').where('name', '==', itemName).get();
}
//updating item on firebase
export function updateItem(item, updateComplete) {
  item.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
  console.log('Updating item in firebase');

  firestore()
    .collection('items')
    .doc(item.id)
    .set(item)
    .then(() => updateComplete())
    .catch(error => console.log(error));
}
//uploading image to firbase
export async function uploadItem(item, onFoodUploaded, {updating}) {
  if (item.imageUri) {
    //const auth = getAuth();
    const user = auth().currentUser;
    console.log('Current user is ' + user.uid);
    const fileExtension = item.imageUri.split('.').pop();
    var uuid = uuidv4();
    const fileName = `${uuid}.${fileExtension}`;

    var storageRef = storage().ref(`items/images/${fileName}`);

    storageRef.putFile(item.imageUri).on(
      'state_changed',
      snapshot => {
        console.log('snapshot: ' + snapshot.state);
        console.log(
          'progress: ' +
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        );

        if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
          console.log('Success');
        }
      },
      error => {
        console.log('image upload error: ' + error.toString());
      },
      () => {
        storageRef.getDownloadURL().then(downloadUrl => {
          console.log('File available at: ' + downloadUrl);

          item.image = downloadUrl;
          item.uid = user.uid;
          delete item.imageUri;

          if (updating) {
            console.log('Updating....');
            updateItem(item, onFoodUploaded);
          } else {
            console.log('adding...');
            addItem(item, onFoodUploaded);
          }
        });
      },
    );
  } else {
    console.log('Skipping image upload');

    delete item.imageUri;

    if (updating) {
      console.log('Updating....');
      updateItem(item, onFoodUploaded);
    } else {
      console.log('adding...');
      addItem(item, onFoodUploaded);
    }
  }
}
//add item to firebase
export function addItem(item, addComplete) {
  item.createdAt = firebase.firestore.FieldValue.serverTimestamp();

  firestore()
    .collection('CarsItems')
    .add(item)
    .then(snapshot => {
      item.id = snapshot.id;
      snapshot.set(item);
    })
    .then(() => addComplete())
    .catch(error => console.log(error));
}
