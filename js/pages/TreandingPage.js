import React ,{Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput
} from 'react-native'
import DataRepository ,{FLAG_STORAGE}from '../expand/dao/DataRepository'
import NavigationBar from '../common/NavigationBar'

const URL = 'https://github.com/trending/';
export default class TreandingPage extends Component {
  constructor(props){
    super(props);
    this.datarepository=new DataRepository(FLAG_STORAGE.flag_trending);
    this.state={
      result:''
    }
  }
  onLoad() {
    let url=URL+this.text;
    console.log(url);
    this.datarepository.fetchRepository(url)
        .then(result=>{
          this.setState({
            result:JSON.stringify(result),
          })
        })
        .catch(error=>{
          this.setState({
            result:JSON.stringify(error),
          })
        })
  }
  render(){
    return <View>
      <NavigationBar
         title={'TreandingTest'}
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
            onPress={()=>this.onLoad()}
          >加载数据</Text>
          <Text style={{flex:1}}>
          {this.state.result}
          </Text>
        </View>
      </View>
  }
}