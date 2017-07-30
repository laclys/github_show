import React, {Component} from 'react'
import {View, Text, StyleSheet, Navigator, Image,ScrollView,TouchableHighlight} from 'react-native'
import NavigationBar from '../../common/NavigationBar'
import CustomKeyPage from './CustomKeyPage'
import SortKeyPage from './SortKeyPage'
import {FLAG_LANGUAGE} from '../../expand/dao/LanguageDao'
import {MORE_MENU} from '../../common/MoreMenu'
import GlobalStyles from '../../../res/styles/GlobalStyles'
import ViewUtils from '../../util/ViewUtils'
import AboutPage from '../about/AboutPage'

export default class MyPage extends Component {
  constructor (props) {
    super(props)
  }
  onClick(tab) {
    let TargetComponent,params = {...this.props,menuType:tab}
    switch (tab) {
      case MORE_MENU.Custom_Language:
        TargetComponent=CustomKeyPage,
        params.flag = FLAG_LANGUAGE.flag_language
        break
      case MORE_MENU.Custom_Key:
        TargetComponent=CustomKeyPage,
        params.flag = FLAG_LANGUAGE.flag_key
        break
      case MORE_MENU.Remove_Key:
        TargetComponent=CustomKeyPage,
        params.flag = FLAG_LANGUAGE.flag_key
        params.isRemoveKey = true
        break
      case MORE_MENU.Sort_Key:
        TargetComponent=SortKeyPage,
        params.flag = FLAG_LANGUAGE.flag_key
        break
      case MORE_MENU.Sort_Language:
        TargetComponent=SortKeyPage,
        params.flag = FLAG_LANGUAGE.flag_language
        break
      case MORE_MENU.Theme:
        break
      case MORE_MENU.About_Author:
        break
      case MORE_MENU.About:
      TargetComponent=AboutPage
        break
    }
    if(TargetComponent){
      this.props.navigator.push({
        component:TargetComponent,
        params:params
      })
    }
  }
  getItem(tag,icon,text){
    return ViewUtils.getSettingItem(()=>this.onClick(tag),icon,text,{tintColor:"#6495ED"},null)
  } 
  render () {
    var navigationBar = <NavigationBar 
      title='Personal Center ' 
      style={{backgroundColor: '#6495ED'}}
      />
    return (
    <View style={GlobalStyles.root_container}>
      {navigationBar}
      <ScrollView>
        <TouchableHighlight
          onPress={()=>this.onClick(MORE_MENU.About)}
        >
          <View style={[styles.item,{height:90}]}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
              <Image
                style={[{width:40,height:40,marginRight:10,borderRadius:23}]}
                source={require('./images/Bleach.png')}
              />
              <Text>GitHub Show~</Text>
            </View>
            <Image
              style={[{
                marginRight:10,
                height:22,
                width:22
              },{tintColor:'#6495ED'}]}
              source={require('../../../res/images/ic_tiaozhuan.png')}
            />
          </View>
        </TouchableHighlight>
        <View style={GlobalStyles.line} />
        {/* trending item */}
        <Text style={styles.groupTitle}>Trending repo </Text>
        <View style={GlobalStyles.line} />
        {this.getItem(MORE_MENU.Custom_Language,require('./images/ic_custom_language.png'),'Custom Language')}
        <View style={GlobalStyles.line} />
        {this.getItem(MORE_MENU.Sort_Language,require('./images/ic_sort.png'),'Language Sort')}
        {/* popular key item*/}
        <View style={GlobalStyles.line} />
        <Text style={styles.groupTitle}>Popular repo </Text>
        <View style={GlobalStyles.line} />
        {this.getItem(MORE_MENU.Custom_Key,require('./images/ic_custom_language.png'),'Custom Key')}
        <View style={GlobalStyles.line} />
        {this.getItem(MORE_MENU.Sort_Key,require('./images/ic_swap_vert.png'),'Custom Key Sort')}
        {this.getItem(MORE_MENU.Remove_Key,require('./images/ic_remove.png'),'Remove Key')}
        {/* setting */}
        <View style={GlobalStyles.line} />
          <Text style={styles.groupTitle}>Setting</Text>
        <View style={GlobalStyles.line} />
        {this.getItem(MORE_MENU.Theme,require('./images/ic_view_quilt.png'),'Theme')}
        <View style={GlobalStyles.line} />
        {this.getItem(MORE_MENU.About_Author,require('./images/ic_insert_emoticon.png'),'About Me')}
      </ScrollView>
    </View>)
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    padding:10,
    height:60,
    backgroundColor:'white'
  },
  groupTitle:{
    marginLeft:10,
    marginRight:10,
    marginTop:10,
    fontSize:12,
    color:'grey'
  }
})
