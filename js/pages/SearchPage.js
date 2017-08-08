import React, {Component} from 'react'
import {View, Text, StyleSheet, TextInput, ListView, RefreshControl, DeviceEventEmitter,Platform,StatusBar,TouchableOpacity} from 'react-native'
import NavigationBar from '../common/NavigationBar'
import ViewUtils from '../util/ViewUtils'
import GlobalStyles from '../../res/styles/GlobalStyles'

export default class SearchPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      rightBtnText:'Search'
    }
  }
  componentDidMount () {
  }
  onBackPress(){
    this.refs.input.blur();
    this.props.navigator.pop();
  }
  updateState(dic){
    this.setState(dic)
  }
  onRightBtnClick() {
    if(this.state.rightBtnText ==='Search'){
      this.updateState({
        rightBtnText:'Cancel'
      })
    }else{
      this.updateState({
        rightBtnText:'Search'
      })
    }
  }
  renderNavBar(){
    let backBtn = ViewUtils.getLeftButton(()=>this.onBackPress())
    let inputView = <TextInput
      ref="input"
      style ={styles.textInput}
    >
    </TextInput>
    let rightBtn=<TouchableOpacity
      onPress = {
       () => {
         // 失去焦点，关闭键盘
         this.refs.input.blur()
         this.onRightBtnClick()
         }
      }
    >
      <View style={{
        marginRight:10,

      }}>
        <Text
        style={{
          fontSize:18,
          color:'white',
          fontWeight:'500'
        }}
        >{this.state.rightBtnText}</Text>
      </View>
    </TouchableOpacity>  
    return <View style={{
      backgroundColor:'#6495ED',
      flexDirection:'row',
      alignItems:'center',
      height:(Platform.OS==='ios')?GlobalStyles.nav_bar_height_ios:GlobalStyles.nav_bar_height_android
    }}>
      {backBtn}
      {inputView}
      {rightBtn}
    </View>
  }
  render () {
    let statusBar = null
    if(Platform.OS ==='ios'){
      statusbar = <View style={[styles.statusBar,{backgroundColor:'#6495ED'}]}>
      </View>  
    }
    return <View style={GlobalStyles.root_container}>
       {statusbar} 
      {this.renderNavBar()}
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  statusBar:{
    height:20
  },
  textInput:{
    flex:1,
    height:(Platform.Os==='ios')?30:40,
    borderWidth:(Platform.Os==='ios')?1:0,
    borderColor:'white',
    alignSelf:'center',
    paddingLeft:5,
    paddingRight:10,
    marginRight:5,
    borderRadius:3,
    opacity:0.7,
    color:'white'
  }
})
