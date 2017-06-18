import React ,{Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  AsyncStorage,
  TextInput
} from 'react-native'
import NavigationBar from './js/common/NavigationBar'
import Toast,{DURATION} from 'react-native-easy-toast'

const KEY ='text';
export default class AsyncStorageTest extends Component {
  constructor(props){
    super(props);
  }
  // 存储
  onSave(){
    AsyncStorage.setItem(KEY,this.text,(error)=>{
      if(!error){
        this.toast.show('成功↑',DURATION.LENGTH_LONG)
      }else{
        this.toast.show('失败咯~',DURATION.LENGTH_LONG)
      }
    })
  }
  // 取出
  onFetch() {
    AsyncStorage.getItem(KEY,(error,result)=>{
      if(!error){
        if(result!==''&&result!==null){
          this.toast.show('取出了'+result,DURATION.LENGTH_LONG);
        }else{
          this.toast.show('取出内容不存在',DURATION.LENGTH_LONG);
        }
      }else{
        this.toast.show('取出失败~=。=',DURATION.LENGTH_LONG)
      }
    })
  }
  // 移除
  onRemove() {
    AsyncStorage.removeItem(KEY,(error)=>{
      if(!error){
        this.toast.show('移除成功↑',DURATION.LENGTH_LONG)
      }else{
        this.toast.show('移除失败',DURATION.LENGTH_LONG)
      }
    })
  }
  render(){
    return <View>
      <NavigationBar
         title={'AsyncStorageTest'}
      ></NavigationBar>
      <TextInput
        style={{borderWidth:1,
          height:40,
          margin:6
        }}
        onChangeText={text=>this.text=text}
      ></TextInput>

        <View style={{flexDirection:'row'}}>
          <Text style={{fontSize:20,margin:5}}
            onPress={()=>this.onSave()}
          >保存</Text>
          <Text style={{fontSize:20,margin:5}}
            onPress={()=>this.onRemove()}
          >移除</Text>
          <Text style={{fontSize:20,margin:5}}
            onPress={()=>this.onFetch()}
          >取出</Text>
        </View>
        <Toast ref={toast=>this.toast=toast}></Toast>
      </View>
  }
}