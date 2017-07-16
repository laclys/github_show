import React ,{Component} from 'react';
import {
  AsyncStorage
} from 'react-native'

import keys from '../../../res/data/keys.json'
import langs from '../../../res/data/langs.json'

const FAVORITE_KEY_PREFIX = 'favorite_';

export default class FavoriteDao{
  constructor(flag){
    this.flag=FAVORITE_KEY_PREFIX + flag;
  }
}