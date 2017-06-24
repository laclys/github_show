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
}