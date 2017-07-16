import React ,{Component} from 'react';
import {
  AsyncStorage
} from 'react-native'

import keys from '../../../res/data/keys.json'
import langs from '../../../res/data/langs.json'

const FAVORITE_KEY_PREFIX = 'favorite_';

export default class FavoriteDao{
  constructor(flag){
    this.flag=flag;
    this.favoriteKey=FAVORITE_KEY_PREFIX + flag;
  }
  /**
   * 收藏项目 保存收藏项目
   * @param {*} key 项目id
   * @param {*} value 收藏的项目
   * @param {*} callback 回调
   */
  saveFavoriteItem(key,value,callback) {
    AsyncStorage.setItem(key,value,(error)=>{
      if(!error) {
        this.updateFavoriteKeys(key,true);
      }
    })
  }
  /**
   * 更新Favorite key 集合
   * @param {*} key 
   * @param {*} isAdd true:添加 ，false：删除
   */
  updateFavoriteKeys(key,isAdd) {
    AsyncStorage.getItem(this.favoriteKey,(error,result)=>{
      if(!error){
        var favoriteKeys = [];
        if(result) {
          favoriteKeys=JSON.parse(result);
        }
        var index = favoriteKeys.indexOf(key);
        if(isAdd) {
          if(index===-1){
            favoriteKeys.push(keys);
          }
        }else{
          if(index!==-1){
            favoriteKeys.splice(index,1);
          }
          AsyncStorage.setItem(this.favoriteKey,JSON.stringify(favoriteKeys));
        }
      }
    })
  }
  /**
   * 获取收藏项目对应的key
   */
  getFavoriteKeys(){
    return new Promise((resolve,reject)=>{
      AsyncStorage.getItem(this.favoriteKey,(error,result)=>{
        if(!error){
          try{
            resolve(JSON.parse(result));
          }catch(e){
            reject(e);
          }
        }else{
          reject(error);
        }
      })
    })
  }
  /**
   * 取消收藏 移除已经收藏的项目
   * @param {*} key 
   */
  removeFavoriteItem(key){
    AsyncStorage.setItem(key,(error)=>{
      if(!error){
        this.updateFavoriteKeys(key,false)
      }
    })
  }
}