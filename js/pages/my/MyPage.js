import React, {Component} from 'react';
import {View, Text, StyleSheet, Navigator, Image} from 'react-native';
import NavigationBar from '../../common/NavigationBar';
import CustomKeyPage from './CustomKeyPage'
import SortKeyPage from './SortKeyPage'

export default class MyPage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <View style={styles.container}>
      <NavigationBar title='My'/>
      <Text
        style={styles.text}
        onPress={() => {
        this
          .props
          .navigator
          .push({
            component: CustomKeyPage,
            params:  {...this.props}
          })
      }}>自定义标签</Text>
      <Text
        style={styles.text}
        onPress={() => {
        this
          .props
          .navigator
          .push({
            component: SortKeyPage,
            params:  {...this.props}
          })
      }}>标签排序</Text>
      <Text
        style={styles.text}
        onPress={() => {
        this
          .props
          .navigator
          .push({
            component: CustomKeyPage,
            params:  {...this.props,isRemoveKey:true}
          })
      }}>标签移除</Text>
    </View>
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    fontSize: 29
  }
});