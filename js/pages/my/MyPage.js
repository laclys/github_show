import React, {Component} from 'react'
import {View, Text, StyleSheet, Navigator, Image,ScrollView,TouchableHighlight} from 'react-native'
import NavigationBar from '../../common/NavigationBar'
import CustomKeyPage from './CustomKeyPage'
import SortKeyPage from './SortKeyPage'
import {FLAG_LANGUAGE} from '../../expand/dao/LanguageDao'
import {MORE_MENU} from '../../common/MoreMenu'
import GlobalStyles from '../../../res/styles/GlobalStyles'
import ViewUtils from '../../util/ViewUtils'

export default class MyPage extends Component {
  constructor (props) {
    super(props)
  }
  onClick(tab) {

  }
  getItem(tag,icon,text){
    return ViewUtils.getSettingItem(()=>this.onClick(tag),icon,text,{tintColor:"#6495ED"},null)
  } 
  render () {
    var navigationBar = <NavigationBar 
      title='My' 
      style={{backgroundColor: '#6495ED'}}
      />
    return (
    <View style={GlobalStyles.root_container}>
      {navigationBar}
      <ScrollView>
        <TouchableHighlight
          onPress={()=>this.onClick(MORE_MENU.About)}
        >
          <View style={styles.item}>
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
        {/* popular item */}
        <Text style={styles.groupTitle}>Popular repo </Text>
        <View style={GlobalStyles.line} />
        {this.getItem(MORE_MENU.About,require('./images/ic_custom_language.png'),'Custom Language')}
        <View style={GlobalStyles.line} />
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
