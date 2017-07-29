import React, {Component} from 'react'
import {View, Text, StyleSheet, Navigator, Image, TouchableOpacity,TouchableHighlight} from 'react-native'

export default class ViewUtils {
  /**
   * 获取设置页item
   * @param {*} cb 单击item的回调
   * @param {*} icon 左侧图标
   * @param {*} text 显示文本
   * @param {*} tintStyle 图标着色 
   * @param {*} expandableIcon 右侧图标 
   */
  static getSettingItem(cb,icon,text,tintStyle,expandableIcon){
    return(
      <TouchableHighlight
        onPress = {cb}
      >
        <View style={styles.item}>
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <Image
              style={[{width:16,height:16,marginRight:10},tintStyle]}
              source={icon}
              resizeMethod='stretch'
            />
            <Text>{text}</Text>
          </View>
          <Image
            style={[{
              marginRight:10,
              height:22,
              width:22
            },{tintColor:'#6495ED'}]}
            source={expandableIcon?expandableIcon:require('../../res/images/ic_tiaozhuan.png')}
          />
        </View>
      </TouchableHighlight>
    )
  }
  static getLeftButton (cb) {
    return (
      <TouchableOpacity
        style={{padding: 8}}
        onPress={cb}
      >
        <Image
          style={{width: 26, height: 26, tintColor: 'white'}}
          source={require('../../res/images/ic_arrow_back_white_36pt.png')}
       />
      </TouchableOpacity>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    padding:10,
    height:60,
    backgroundColor:'white'
  }
})
