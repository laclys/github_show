import React,{Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  WebView,
  TextInput,
  DeviceEventEmitter
} from 'react-native'
import NavigationBar from '../common/NavigationBar'
import ViewUtils from '../util/ViewUtils'
import GlobalStyles from '../../res/styles/GlobalStyles'

export default class ItemDetail extends Component {
  constructor(props) {
    super(props);
    this.url=this.props.url;
    let title=this.props.title;
    this.state = {
      url:this.url,
      title:title,
      canGoBack:false
    }
  }
  onBack(){
    if(this.state.canGoBack) {
      this.webView.goBack();
    }else{
      this.props.navigator.pop();
    }
  }
  onNavigationStateChange(e) {
    this.setState({
      canGoBack:e.canGoBack,
    })
  }
  render() {
    return<View style={GlobalStyles.root_container}>
      <NavigationBar
        title={this.state.title}
        style={{backgroundColor:'#6495ED'}}
        leftButton={ViewUtils.getLeftButton(()=>this.onBack())}
      ></NavigationBar>
      <WebView
        ref={webView=>this.webView=webView}
        source={{uri:this.state.url}}
        onNavigationStateChange={(e)=>this.onNavigationStateChange(e)}
        startInLoadingState={true}
      ></WebView>
    </View>
  }
}