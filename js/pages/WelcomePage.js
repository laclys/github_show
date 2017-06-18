import React, {Component} from 'react';
import {View, Text, StyleSheet, Navigator,Image} from 'react-native';
import NavigationBar from '../common/NavigationBar'
import HomePage from './HomePages'
export default class WelcomePage extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.timer = setTimeout(() => {
      this
        .props
        .navigator
        .resetTo({component: HomePage})
    }, 500)
  }
  componentWilllUnmount() {
    this.timer && clearTimeout(this.timer);
  }
  render() {
    return <View style={styles.container}>
      {/*<NavigationBar title={'欢迎'}/>*/}
      <Image
        style={styles.welPic}
          source={require('../../pic.jpg')}
          resizeMode={'contain'}
      />
      <Text style={styles.text}>欢迎</Text>
    </View>
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  text:{
    position:'relative',
    top:-100,
    fontSize:20,
    marginTop:20
  },
  welPic:{
    // flex:1,
    position:'relative',
    top:-100,
    height:50,
    width:50,
  }
});