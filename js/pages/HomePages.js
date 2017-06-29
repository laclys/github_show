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
  render() {
    return (
      <View style={styles.container}>
        <TabNavigator>

          <TabNavigator.Item
            selected={this.state.selectedTab === 'tb_popular'}
            selectedTitleStyle={{color:'#2196f3'}}
            title="最热"
            renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_polular.png')} />}
            renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'#2196f3'}]} source={require('../../res/images/ic_polular.png')} />}
            onPress={() => this.setState({ selectedTab: 'tb_popular' })}>
            <PopularPage/>
          </TabNavigator.Item>

          <TabNavigator.Item
            selected={this.state.selectedTab === 'tb_trending'}
            selectedTitleStyle={{color:'yellow'}}
            title="趋势"
            renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_trending.png')} />}
            renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'yellow'}]} source={require('../../res/images/ic_trending.png')} />}
            onPress={() => this.setState({ selectedTab: 'tb_trending' })}>
            <AsyncStorageTest />
          </TabNavigator.Item>

          <TabNavigator.Item
            selected={this.state.selectedTab === 'tb_favorite'}
            selectedTitleStyle={{color:'#7FFFD4'}}
            title="V2EX"
            renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_polular.png')} />}
            renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'#7FFFD4'}]} source={require('../../res/images/ic_polular.png')} />}
            onPress={() => this.setState({ selectedTab: 'tb_favorite' })}>
            <WebViewTest></WebViewTest>
          </TabNavigator.Item>

          <TabNavigator.Item
            selected={this.state.selectedTab === 'tb_my'}
            selectedTitleStyle={{color:'#DA70D6'}}
            title="我的"
            renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_trending.png')} />}
            renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'#DA70D6'}]} source={require('../../res/images/ic_trending.png')} />}
            onPress={() => this.setState({ selectedTab: 'tb_my' })}>
            <MyPage {...this.props}/>
          </TabNavigator.Item>
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