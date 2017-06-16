import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import NavigationBar from './NavigationBar'

export default class FetchTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: ''
    }
  }
  onLoad(url) {
    fetch(url)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        this.setState({
          result: JSON.stringify(result)
        })
      })
      .catch(error => {
        this.setState({
          result: JSON.stringify(error)
        })
      })
  }
  render() {
    return (
      <View style={styles.container}>
        <NavigationBar title={'Fetch的使用'}/>
        <Text
          onPress={() => this.onLoad('http://rap.taobao.org/mockjsdata/11793/test')}>获取数据</Text>
        <Text>返回结果：{this.state.result}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  text: {
    fontSize: 20
  }
})