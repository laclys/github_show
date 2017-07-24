import React, {Component} from 'react'
import {View, Text, StyleSheet, Navigator, Image, TouchableOpacity} from 'react-native'

export default class ViewUtils {
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
