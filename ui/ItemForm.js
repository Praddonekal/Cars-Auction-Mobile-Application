import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Button,
  ScrollView,
} from 'react-native';
import {withFormik} from 'formik';
import * as yup from 'yup';
import {addItem, updateItem, uploadItem} from '../api/item';
import CustomImagePicker from './ImagePicker';
import DateTimePicker, {
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';
import NumericInput from 'react-native-numeric-input';
import SelectDropdown from 'react-native-select-dropdown';
/**
 * Form to add/uodate auction items
 */
const ItemForm = props => {
  const [show, setShow] = useState(false);
  setItemImage = image => {
    props.setFieldValue('imageUri', image.uri);
  };
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(selectedDate);
    props.setFieldValue('expired', selectedDate.toLocaleString());
  };
  const showDatepicker = () => {
    setShow(true);
  };
  const [date, setDate] = useState(new Date());
  //return the for to add/update auction item
  return (
    <ScrollView>
      <View style={styles.container}>
        <CustomImagePicker
          image={props.item.image}
          onImagePicked={setItemImage}
        />
        <TextInput
          style={styles.longFormInput}
          placeholder="Name"
          onChangeText={text => {
            props.setFieldValue('name', text);
          }}
        />
        <TextInput
          style={styles.longFormInput}
          placeholder="Color"
          onChangeText={text => {
            props.setFieldValue('color', text);
          }}
        />
        <TextInput
          style={styles.longFormInput}
          placeholder="Year"
          onChangeText={text => {
            props.setFieldValue('year', text);
          }}
        />
        <Text> Is the item packaged?</Text>
        <SelectDropdown
          data={['Yes', 'No']}
          onSelect={(selectedItem, index) => {
            props.setFieldValue('packaged', selectedItem);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item;
          }}
        />

        <Text> Is it a limited edition?</Text>
        <SelectDropdown
          data={['Yes', 'No']}
          onSelect={(selectedItem, index) => {
            props.setFieldValue('limitedEdition', selectedItem);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item;
          }}
        />

        <Text style={styles.validationText}> {props.errors.name}</Text>
        <Text>Expiry date: {date.toLocaleString()}</Text>
        <Button onPress={showDatepicker} title="Select Expiry Date" />
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={'date'}
            is24Hour={true}
            onChange={onChange}
          />
        )}
        <Text>Price</Text>
        <NumericInput
          minValue={1}
          onChange={value => props.setFieldValue('price', value)}
        />
        <Button title="Submit" onPress={() => props.handleSubmit()} />
      </View>
    </ScrollView>
  );
};
//styles for auction item add/update form
const styles = StyleSheet.create({
  row: {
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  container: {
    width: 300,
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 32,
  },
  formInput: {
    borderColor: '#B5B4BC',
    borderWidth: 1,
    padding: 8,
    height: 50,
    color: 'black',
    width: '75%',
    marginBottom: 16,
    marginTop: 16,
  },
  validationText: {
    color: 'red',
  },
  longFormInput: {
    width: '100%',
    height: 50,
    color: 'black',
    borderColor: '#B5B4BC',
    borderWidth: 1,
    padding: 8,
    margin: 16,
  },
});

export default withFormik({
  mapPropsToValues: ({item}) => ({
    name: item.name,
    color: item.color,
    year: item.year,
    packaged: item.packaged,
    limitedEdition: item.limitedEdition,
    expired: item.expired,
    price: item.price,
    imageUri: null,
  }),
  enableReinitialize: true,
  validationSchema: props =>
    yup.object().shape({
      name: yup.string().max(30).required(),
    }),
  handleSubmit: (values, {props}) => {
    if (props.item.id) {
      console.log(values);
      values.id = props.item.id;
      values.createdAt = props.item.createdAt;
      values.image = props.item.image;

      //uploadItem(values, {updating: true});
      uploadItem(values, props.onItemUpdated, {updating: true});
    } else {
      //uploadItem(values, {updating: false});

      uploadItem(values, props.onItemAdded, {updating: false});
    }
  },
})(ItemForm);
