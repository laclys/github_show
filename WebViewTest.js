import React,{Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  WebView
} from 'react-native'
import NavigationBar from './js/common/NavigationBar'
const URL = "https://www.v2ex.com/"
export default class WebViewTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url:URL
    }
  }
  render() {
    return<View style={styles.container}>
      <NavigationBar
        title='WebView'
        style={{backgroundColor:'#6cf'}}
      ></NavigationBar>
      <WebView
        source={{uri:this.state.url}}
      ></WebView>
    </View>
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  }
})