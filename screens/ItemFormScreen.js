import React, {Component} from 'react';
import ItemForm from '../ui/ItemForm';
import {Alert} from 'react-native';
/**
 * Add item form
 */
export default class ItemFormScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      //check if item os being updated or added to determine page title
      title: navigation.getParam('item') ? 'Edit Item' : 'New Item',
    };
  };

  state = {
    item: {
      name: '',
    },
  };

  componentDidMount() {
    const currentItem = this.props.route.params?.item;

    if (currentItem) {
      this.setState(prevState => ({item: (prevState.item = currentItem)}));
    }
  }
  //navigate to home when completed desired operation
  onItemUpdated = item => {
    //console.log(item);
    this.props.navigation.navigate('Home');
  };

  onItemAdded = item => {
    // this.setState(prevState => ({
    //   itemList: [...prevState.itemList, item],
    // }));
    this.props.navigation.navigate('Home');
    Alert.alert('Success', 'Item added', [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  };
  //return add item form
  render() {
    return (
      <ItemForm
        item={this.state.item}
        onItemAdded={this.onItemAdded}
        onItemUpdated={this.onItemUpdated}
      />
    );
  }
}
