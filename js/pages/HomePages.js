import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Navigator,
  View,
  Image,
  ListView,
  DeviceEventEmitter,
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';
import Toast,{DURATION} from 'react-native-easy-toast';
import PopularPage from './PopularPage';
import AsyncStorageTest from '../../AsyncStorageTest';
import MyPage from './my/MyPage'
import WebViewTest from '../../WebViewTest';
import TrendingPage from './TrendingPage';

export default class HomePage extends Component {
  constructor(props){
    super(props);
    this.state={
      selectedTab:'tb_popular',
    }
  }
  componentDidMount() {
    // 创建toast监听
    this.listener=DeviceEventEmitter.addListener('showToast',(text)=>{
      this.toast.show(text,DURATION.LENGTH_LONG);
    })
  }
  componentWillUnmount(){
    // 移除监听
    this.listener&&this.listener.remove();
  }
  _renderTab(Component,selectedTab,title,renderIcon){
    return <TabNavigator.Item
      selected={this.state.selectedTab === selectedTab}
      selectedTitleStyle={{color:'#2196f3'}}
      title = {title}
      renderIcon={() => <Image style={styles.image} source={renderIcon} />}
      renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'#2196f3'}]} source={renderIcon} />}
      onPress={() => this.setState({ selectedTab: selectedTab })}>
      <Component {...this.props}/>
    </TabNavigator.Item>
  }
  render() {
    return (
      <View style={styles.container}>
        <TabNavigator>
          {this._renderTab(PopularPage,'tb_popular',"最热",require('../../res/images/ic_polular.png'))}
          {this._renderTab(TrendingPage,'tb_trending',"趋势",require('../../res/images/ic_trending.png'))}
          {this._renderTab(WebViewTest,'tb_favorite',"V2EX",require('../../res/images/ic_favorite.png'))}
          {this._renderTab(MyPage,'tb_my',"我的",require('../../res/images/ic_my.png'))}
        </TabNavigator>
        <Toast ref={toast=>this.toast=toast} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  page1:{
    flex:1,
    backgroundColor:'#7FFFD4',
  },
  page2:{
    flex:1,
    backgroundColor:'yellow',
  },
  page3:{
    flex:1,
    backgroundColor:'#DA70D6',
  },
  image:{
    height:22,
    width:22
  }
});