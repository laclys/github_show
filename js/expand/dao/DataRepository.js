
import {
  AsyncStorage
} from 'react-native'


export default class DataRepository{
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
                this.saveRepository(url, responseData.items)
            }).done();
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
    // return false;
    let currentDate = new Date();
    let targetDate = new Date();
    targetDate.setTime(longTime);
    if (currentDate.getMonth() !== targetDate.getMonth())return false;
    if (currentDate.getDate() !== targetDate.getDate())return false;
    if (currentDate.getHours() - targetDate.getHours() > 4)return false;
    return true;
  }
}