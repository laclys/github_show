import React, {Component} from 'react';
import {View, Text, StyleSheet,Navigator} from 'react-native';
import WelcomePage from './WelcomePage'

function setup() {
  // 进行初始化配置
  class Root extends Component{
    renderScene(route,navigator){
      let Component = route.component;
      return <Component {...route.params} navigator={navigator}/>
    }
    render(){
      return <Navigator
        initialRoute={{component:WelcomePage}}
        renderScene={(route,navigator)=>this.renderScene(route,navigator)}
      />
    }
  }
  return <Root/>
}

module.exports=setup;