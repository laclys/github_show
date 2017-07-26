import React, {Component} from 'react'
import {View, Text, StyleSheet, Navigator, Image,ScrollView,TouchableHighlight} from 'react-native'
import NavigationBar from '../../common/NavigationBar'
import CustomKeyPage from './CustomKeyPage'
import SortKeyPage from './SortKeyPage'
import {FLAG_LANGUAGE} from '../../expand/dao/LanguageDao'
import {MORE_MENU} from '../../common/MoreMenu'
import GlobalStyles from '../../../res/styles/GlobalStyles'

export default class MyPage extends Component {
  constructor (props) {
    super(props)
  }
  onClick(tab) {

  }
  render () {
    var navigationBar = <NavigationBar 
      title='My' 
      style={{backgroundColor: '#6495ED'}}
      />
    return (
    <View style={styles.container}>
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
  }
})
