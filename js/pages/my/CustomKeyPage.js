import React, {Component} from 'react';
import {View, Text, StyleSheet, Navigator,Image} from 'react-native';
import NavigationBar from '../common/NavigationBar'
import HomePage from './HomePages'
export default class CustomKeyPage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <View style={styles.container}>
      <NavigationBar title='自定义~'/>
      <Text style={styles.text}>自定义标签</Text>
    </View>
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  text:{
    fontSize:29
  }
});