
import {
  AsyncStorage
} from 'react-native'
import GitHubTrending from 'GitHubTrending'

export var FLAG_STORAGE = {flag_popular:'popular',flag_trending:'trending'};

export default class DataRepository{
  constructor(flag){
    this.flag = flag;
    if(flag===FLAG_STORAGE.flag_trending){
      this.trending=new GitHubTrending();
    }
  }
  fetchRepository(url){
    return new Promise((resolve,reject)=>{
      // 获取本地的数据
      this.fetchLocalRepository(url)
          .then(result=>{
            if(result){
              resolve(result);
            }else{
              this.fetchNetRepository(url)
                  .then(result=>{
                    resolve(result);
                  })
                  .catch(e=>{
                    resolve(e);
                  })
            }
          })
          .catch(e=>{
              this.fetchNetRepository(url)
                  .then(result=>{
                    resolve(result);
                  })
                  .catch(e=>{
                    resolve(e);
                  })
          })
    })
  }


  fetchLocalRepository(url){
    return new Promise((resolve,reject)=>{
      AsyncStorage.getItem(url,(error,result)=>{
        if(!error){
          try{
            resolve(JSON.parse(result)); // json转化成对象
          }catch(e){
            reject(e);
          }
        }else{
          reject(error);
        }
      })
    })
  }
  fetchNetRepository(url){
        return new Promise((resolve, reject)=> {
            if(this.flag===FLAG_STORAGE.flag_trending){
              this.trending.fetchTrending(url)
                  .then(result=>{
                    if(!result) {
                      reject(new Error('responseData is null'));
                      return;
                    }
                    this.saveRepository(url,result);
                    resolve(result);
                  })
            }else{
              fetch(url)
                  .then((response)=>response.json())
                  .catch((error)=> {
                      reject(error);
                  }).then((responseData)=> {
                  if (!responseData || !responseData.items) {
                      reject(new Error('responseData is null'));
                      return;
                  }
                  resolve(responseData.items);
                  console.log('请求了网路数据');
                  this.saveRepository(url, responseData.items)
              }).done();
            }
        })
  }
  saveRepository(url, items, callback) {
      if (!items || !url)return;
      let wrapData = {items: items, update_date: new Date().getTime()};
      AsyncStorage.setItem(url, JSON.stringify(wrapData), callback);
  }
  /**
   * 判断数据是否过时 传过来的是数据的时间戳
   * @param {*} longTime 数据的时间戳
   */
  checkDate(longTime){
    let currentDate = new Date();
    let targetDate = new Date();
    targetDate.setTime(longTime);
    if (currentDate.getMonth() !== targetDate.getMonth())return false;
    if (currentDate.getDate() !== targetDate.getDate())return false;
    if (currentDate.getHours() - targetDate.getHours() > 4)return false;
    return true;
  }
}