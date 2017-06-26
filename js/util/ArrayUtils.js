export default class ArrayUtils {
  /**
   * 更新数组，若item已存在则从数组中将它移除，否则添加进数组中
   */
  static updateArray(array, item) {
    for (var i = 0, len = array.length; i < len; i++) {
      var temp = array[i];
      if (temp === item) {
        array.splice(i, 1);
        return;
      }
    }
    array.push(item);
  }
  /**
   * 克隆一个数组
   * @param from 
   * @return {newArr}
   */
  static clone(from){
    if(!from){
      return [];
    }
    let newArr=[];
    for(let i=0;i<from.length;i++){
      newArr[i]=from[i];
    }
    return newArr;
  }
  /**
   * 判断两个数组是否一一对应
   * @param {*} arr1 
   * @param {*} arr2 
   */
  static isEqual(arr1,arr2){
    if(!(arr1&&arr2)){
      return false;
    }
    if(arr1.length !== arr2.length){
      return false;
    }
    for(let i = 0;i<arr2.length;i++){
      if(arr1[i] !== arr2[i]){
        return false;
      }
    }
    return true;
  }
/**
 * 将数组中指定元素移除
 * @param {*} arr 
 * @param {*} item 
 */
  static remove(arr,item){
    if(!arr)return;
    for(let i=0;i<arr.length;i++){
      if(item==arr[i])arr.splice(i,1);
    }
  }
}