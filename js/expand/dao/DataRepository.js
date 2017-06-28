
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
    return new Promise((resolve,reject)=>{
      fetch(url)
        .then(response=>response.json())
        .then(result=>{
          if(!result) {
            reject(new Error('responseData is null'));
            return;
          }
          resolve(result.items);
          this.saveRepository(url,result.items)
        })
        .catch(error=>{
          reject(error);
        })
    })
  }
  saveRepository(url,items,callback){
    if(!url||!items)return;
    let wrapData={items:items,updata_data:new Data().getTime()};
    AsyncStorage.setItem(url,JSON.stringify(wrapData),callback);
  }
  /**
   * 判断数据是否过时 传过来的是数据的时间戳
   * @param {*} longTime 数据的时间戳
   */
  checkData(longTime){
    // 4h 不过时
    let cData=new Data();
    let tData=new Data();
    if(cData.getMonth()!==tData.getMonth())return false;
    if(cData.getHours() - tData.getHours() > 4)return false;
    return true;
  }
}