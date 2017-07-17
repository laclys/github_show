import React,{Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  WebView,
  TextInput,
  DeviceEventEmitter,
  TouchableOpacity,
  Image
} from 'react-native'
import NavigationBar from '../../js/common/NavigationBar';
import ViewUtils from '../util/ViewUtils';
import FavoriteDao from '../expand/dao/FavoriteDao';

const URL ="https://github.com/"
export default class RepositoryDetail extends Component {
  constructor(props) {
    super(props);
    this.url=this.props.projectModel.item.html_url?this.props.projectModel.item.html_url
      :URL+this.props.projectModel.item.fullName;
    var title=this.props.projectModel.item.full_name?this.props.projectModel.item.full_name:this.props.projectModel.item.fullName;
    this.favoriteDao = new FavoriteDao(this.flag)
    this.state = {
      url:this.url,
      title:title,
      canGoBack:false,
      isFavorite:this.props.projectModel.isFavorite,
      favoriteIcon:this.props.projectModel.isFavorite?
        require('../../res/images/ic_star.png')
        :require('../../res/images/ic_unstar_navbar.png')      
    }
  }
  onBack(){
    if(this.state.canGoBack) {
      this.webView.goBack();
    }else{
      // DeviceEventEmitter.emit('showToast','到顶了');
      this.props.navigator.pop();
    }
  }
  go() {
    this.setState({
      url:this.text
    })
  }
  onNavigationStateChange(e) {
    this.setState({
      canGoBack:e.canGoBack,
    })
  }
  onRightBtnClick() {
    var projectModel = this.props.projectModel;
    this.setFavoriteState(projectModel.isFavorite=!projectModel.isFavorite)
    var key =projectModel.item.fullName?projectModel.item.fullName:projectModel.item.id.toString();
    if(projectModel.isFavorite) {
      this.favoriteDao.saveFavoriteItem(key,JSON.stringify(projectModel.item));
    }else {
      this.favoriteDao.removeFavoriteItem(key);
    }
  }
  setFavoriteState(flag){
    this.setState({
      isFavorite:flag,
      favoriteIcon:flag?require('../../res/images/ic_star.png')
        :require('../../res/images/ic_unstar_navbar.png')    
    })
  }
  renderRightBtn() {
    console.log(this.state.favoriteIcon);
    return <TouchableOpacity
      onPress={()=>this.onRightBtnClick()}
    >
      <Image
        style={{
          width:20,
          height:20,
          marginRight:10
        }}
        source={this.state.favoriteIcon}
      />
    </TouchableOpacity>
  }
  render() {
    return<View style={styles.container}>
      <NavigationBar
        title={this.state.title}
        style={{backgroundColor:'#6495ED'}}
        leftButton={ViewUtils.getLeftButton(()=>this.onBack())}
        rightButton={this.renderRightBtn()}
      ></NavigationBar>
      <WebView
        ref={webView=>this.webView=webView}
        source={{uri:this.state.url}}
        onNavigationStateChange={(e)=>this.onNavigationStateChange(e)}
        startInLoadingState={true}
      ></WebView>
    </View>
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  row:{
    flexDirection:'row',
    alignItems:'center',
    margin:10
  },
  input:{
    height:40,
    flex:1,
    borderWidth:1,
    margin:1
  },
  tips:{
    fontSize:20
  }
})