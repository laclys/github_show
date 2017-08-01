import React, {Component} from 'react'
import {
  View,
  Text,
  StyleSheet,
  Navigator,
  Image,
  ScrollView,
  TouchableHighlight,
  Dimensions,
  ListView,
  Platform,
  Linking
} from 'react-native'

import ViewUtils from '../../util/ViewUtils';
import {MORE_MENU} from '../../common/MoreMenu';
import GlobalStyles from '../../../res/styles/GlobalStyles'
import AboutCommon,{FLAG_ABOUT} from './AboutCommon'
import WebViewPage from '../WebViewPage'

const FLAG = {
  WWW: {
    name: 'Website',
    items:{
      BLOG: {
        title:'Blog',
        url:'https://laclys.github.io/'
      },
      GITHUB: {
        title:'GitHub',
        url:'https://github.com/laclys/'
      },
      WEIBO: {
        title:'WeiBo',
        url:'http://www.weibo.com/lacly/'
      },
      INS: {
        title:'Instagram',
        url:'https://www.instagram.com/laccly/'
      }
    }
  },
  CONTACT: {
    name:'联系方式',
    items: {
      TEL: {
        title:'Tel',
        account:'13028517639'
      },
      WEIXIN: {
        title:'Weixin',
        account:'13028517639'
      },
      QQ: {
        title:'QQ',
        account:'421084802'
      },
      EMAIL: {
        title:'E-mail',
        account:'laclys@126.com'
      }
    }
  }
}
export default class AboutMePage extends Component {
  constructor(props) {
    super(props);
    this.AboutCommon = new AboutCommon(props,(dic)=>this.updateState(dic),FLAG_ABOUT.flag_about_me)
    this.state = {
      showBlog: false,
      showContact: false
    }
  }
  updateState(dic) {
    this.setState(dic)
  }

  getClickIcon(isShow){
    return isShow?require('../../../res/images/ic_tiaozhuan_up.png'):require('../../../res/images/ic_tiaozhuan_down.png')
  }

  onClick(tab) {
    let TargetComponent,params = {...this.props,menuType:tab}
    switch (tab) {
      case FLAG.WWW:
        this.updateState({
          showBlog:!this.state.showBlog
        })
        break
      case FLAG.CONTACT:
        this.updateState({
          showContact:!this.state.showContact
        })
        break
    }
    if(TargetComponent){
      this.props.navigator.push({
        component:TargetComponent,
        params:params
      })
    }
  }
  renderItems(dic,isShowAccount){
    if(!dic) return null
    let views = []
    for(let i in dic){
      let title = isShowAccount?dic[i].title +' : '+dic[i].account:dic[i].title
      views.push(
        <View key = {i}>
          <View style={GlobalStyles.line} />
          {ViewUtils.getSettingItem(()=>this.onClick(dic[i]),'',title,{tintColor:"#6495ED"})}
          <View style={GlobalStyles.line} />
        </View>  
      )
    }
    return views;
  }
  render() {
    let content =<View>
      {ViewUtils.getSettingItem(()=>this.onClick(FLAG.WWW),require('../../../res/images/ic_computer.png'),FLAG.WWW.name,{tintColor:"#6495ED"},this.getClickIcon(this.state.showBlog))}
      <View style={GlobalStyles.line} />
      {this.state.showBlog?this.renderItems(FLAG.WWW.items):null}
      {ViewUtils.getSettingItem(()=>this.onClick(FLAG.CONTACT),require('../../../res/images/ic_code.png'),FLAG.CONTACT.name,{tintColor:"#6495ED"},this.getClickIcon(this.state.showContact))}
      <View style={GlobalStyles.line} />
      {this.state.showContact?this.renderItems(FLAG.CONTACT.items,true):null}
    </View>
    return this.AboutCommon.render(content,{
      'name': 'Lac',
      'desc': 'Coder TV-Gamer Runner',
      'avatar':'http://tva2.sinaimg.cn/crop.0.0.750.750.180/68f74d54jw8f22cfa95ijj20ku0kumy7.jpg',
      'backgroundImg':'http://img.t.sinajs.cn/t5/skin/public/covervip/2042.jpg'
    })
  }
}

