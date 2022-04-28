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
const NotificationList = props => {
  const onPressHandler = item => {
    props.navigate(item);
  };
  const data = props.items;

  //return item list screen
  return (
    <View style={styles.container}>
   
          <FlatList 
          data = {data}
          keyExtractor={(item,index)=>{return index.toString()}}
          renderItem ={({item})=>{
              return(
                  <View style={styles.container}>
                      <View style={styles.HeaderLeftImageView}>
                      <Image style={styles.HeaderLeftImage} source={{uri: item.image}}/>
                      </View>
                      <View style={{flexDirection:'row', marginLeft:10}}>
                          <View>
                      <Text style={{color:'#1B6ADF',fontSize:15}}>{item.name}</Text>
                      <Text style={{color:'#64676B',fontSize:15}}>Bid update: $ {item.price}</Text>

                      </View>
                     
                      </View>
                  </View>
                  
              )
          }}
          />
     
    </View>
  );
};

export default NotificationList;
//styles for itemlist search screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:'100%',
    height:'100%',
    padding:15,
    backgroundColor:'white',
  },HeaderLeftImage:{
      width:'100%',
      height:'100%',
      borderRadius:50,
  },HeaderLeftImageView:{
     width:40,
      height:40,
      borderRadius:40/2,
      marginLeft:15,
  },
});
