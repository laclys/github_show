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
  Platform
} from 'react-native'

import ParallaxScrollView from 'react-native-parallax-scroll-view';
import ViewUtils from '../../util/ViewUtils';
import {MORE_MENU} from '../../common/MoreMenu';
import GlobalStyles from '../../../res/styles/GlobalStyles'

export default class AboutPage extends Component {
  constructor(props) {
    super(props);
  }
  onClick(tab) {
    let TargetComponent,params = {...this.props,menuType:tab}
    switch (tab) {
      case MORE_MENU.Blog:
        break
    }
    switch (tab) {
      case MORE_MENU.Feedback:
        break
    }
    if(TargetComponent){
      this.props.navigator.push({
        component:TargetComponent,
        params:params
      })
    }
  }
  getParallaxRenderConfig(params) {
    let config={};
    // 背景
    config.renderBackground = () => (
        <View key="background">
          <Image
            source={{
            uri: params.backgroundImg,
            width: window.width,
            height: PARALLAX_HEADER_HEIGHT
          }}/>
          <View
            style={{
            position: 'absolute',
            top: 0,
            width: window.width,
            backgroundColor: 'rgba(0,0,0,.4)',
            height: PARALLAX_HEADER_HEIGHT
          }}/>
        </View>
      )
    // 前景
    config.renderForeground = () => (
        <View key="parallax-header" style={styles.parallaxHeader}>
          <Image style={ styles.avatar } source={{
            uri: params.avatar,
            width: AVATAR_SIZE,
            height: AVATAR_SIZE
          }}/>
          <Text style={styles.sectionSpeakerText}>
            {params.name}
          </Text>
          <Text style={styles.sectionTitleText}>
            {params.desc}
          </Text>
        </View>
      )
    config.renderStickyHeader = () => (
        <View key="sticky-header" style={styles.stickySection}>
          <Text style={styles.stickySectionText}>{params.name}</Text>
        </View>
      )
    config.renderFixedHeader = () => (
        <View key="fixed-header" style={styles.fixedSection}>
          {ViewUtils.getLeftButton(()=>this.props.navigator.pop())}
        </View>
      )
    return config;
  }
  renderView(contentView,params) {
    let renderConfig = this.getParallaxRenderConfig(params)
    return (
      <ParallaxScrollView
        headerBackgroundColor="#333"
        stickyHeaderHeight={STICKY_HEADER_HEIGHT}
        parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
        backgroundSpeed={10}
        {...renderConfig}
      >
        {contentView}
      </ParallaxScrollView>
    );
  }
  render() {
    let content =<View>
      <View style={GlobalStyles.line} />
      {ViewUtils.getSettingItem(()=>this.onClick(MORE_MENU.Blog),require('../../../res/images/ic_contacts.png'),MORE_MENU.Blog,{tintColor:"#6495ED"},null)}
      <View style={GlobalStyles.line} />
    </View>
    return this.renderView(content,{
      'name': 'Github Repo Show',
      'desc': 'A Simple React Demo',
      'avatar':'http://ww2.sinaimg.cn/mw690/68f74d54jw8f22cfa95ijj20ku0kumy7.jpg',
      'backgroundImg':'http://img.t.sinajs.cn/t5/skin/public/covervip/2042.jpg'
    })
  }
}

const window = Dimensions.get('window');

const AVATAR_SIZE = 120;
const ROW_HEIGHT = 60;
const PARALLAX_HEADER_HEIGHT = 350;
const STICKY_HEADER_HEIGHT = 70;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: window.width,
    height: PARALLAX_HEADER_HEIGHT
  },
  stickySection: {
    height: STICKY_HEADER_HEIGHT,
    width: 300,
    justifyContent: 'center',
    alignItems:'center',
    paddingTop: (Platform.OS==='ios')?20:0,
  },
  stickySectionText: {
    color: 'white',
    fontSize: 20,
    margin: 10
  },
  fixedSection: {
    position: 'absolute',
    bottom: 0,
    right: 10,
    left:0,
    top:0,
    paddingRight:8,
    flexDirection:'row',
    alignItems:'center',
    paddingTop: (Platform.OS==='ios')?20:0,
    justifyContent:'space-between'
  },
  fixedSectionText: {
    color: '#999',
    fontSize: 20
  },
  parallaxHeader: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    paddingTop: 100
  },
  avatar: {
    marginBottom: 10,
    borderRadius: AVATAR_SIZE / 2
  },
  sectionSpeakerText: {
    color: 'white',
    fontSize: 24,
    paddingVertical: 5
  },
  sectionTitleText: {
    color: 'white',
    fontSize: 18,
    paddingVertical: 5
  },
  row: {
    overflow: 'hidden',
    paddingHorizontal: 10,
    height: ROW_HEIGHT,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderBottomWidth: 1,
    justifyContent: 'center'
  },
  rowText: {
    fontSize: 20
  }
});
