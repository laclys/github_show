import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput,ListView,RefreshControl,DeviceEventEmitter} from 'react-native';
import NavigationBar from '../common/NavigationBar';
import ScrollableTabView ,{ScrollableTabBar} from 'react-native-scrollable-tab-view';
import HomePage from './HomePages';
import RepositoryCell from '../common/RepositoryCell';
import TrendingCell from '../common/TrendingCell'
import {FLAG_STORAGE} from '../expand/dao/DataRepository'
import RepositoryDetail from './RepositoryDetail';
import ProjectModel from '../model/ProjectModel';
import FavoriteDao from '../expand/dao/FavoriteDao';

export default class FavoritePage extends Component {
  constructor(props) {
    super(props);
    this.state={

    }
  }
  componentDidMount(){
  }
  render() {
      let content=<ScrollableTabView
        tabBarBackgroundColor="#6495ED"
        tabBarInactiveTextColor="lightgrey"
        tabBarActiveTextColor="mintcream"
        tabBarUnderlineStyle={{backgroundColor:'mintcream',height:2}}
        renderTabBar={()=><ScrollableTabBar/>}
        > 
          <FavTab tabLabel='popular' flag={FLAG_STORAGE.flag_popular} {...this.props}></FavTab>
          <FavTab tabLabel='trending' flag={FLAG_STORAGE.flag_trending} {...this.props}></FavTab>
      </ScrollableTabView>;
    return <View style={styles.container}>
      <NavigationBar 
        title={'Favorite Repo'}
        style={{backgroundColor:'#6495ED'}}
      />
      {content}
    </View>
  }
}

class FavTab extends Component{
    constructor(props) {
      super(props);
      this.favoriteDao = new FavoriteDao(this.props.flag);
      this.state={
        isLoading:false,
        dataSource:new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2}),
        favoriteKeys:[]
      }
    }
  componentDidMount(){
    this.LoadData();
  }
  updateState(dic){
    if(!this)return;
    this.setState(dic);
  }
  LoadData(){
    this.updateState({
      isLoading:true
    })
    this.favoriteDao.getAllItems()
        .then(items=>{
          var resultData = [];
          for(var i = 0,len=items.length;i<len;i++){
            resultData.push(new ProjectModel(items[i],true));
          }
          this.updateState({
            isLoading:false,
            dataSource:this.getDataSource(resultData)
          })
        })
        .catch(e=>{
          this.updateState({
            isLoading:false
          })
        })
  }
  getDataSource(items) {
    return this.state.dataSource.cloneWithRows(items);
  }
  onSelect(projectModel) {
    this.props.navigator.push({
      title:projectModel.item.full_name,
      component:RepositoryDetail,
      params:{
        projectModel:projectModel,
        parentComponent:this,
        flag:FLAG_STORAGE.flag_popular,
        ...this.props
      }
    })
  }
  onFavorite(item,isFavorite) {
    var key = this.props.flag === FLAG_STORAGE.flag_popular?item.id.toString():item.fullName;
    if(isFavorite) {
      this.favoriteDao.saveFavoriteItem(key,JSON.stringify(item));
    }else {
      this.favoriteDao.removeFavoriteItem(key);
    }
  }
  renderRow(projectModel){
    let CellComponent = this.props.flag ===FLAG_STORAGE.flag_popular?RepositoryCell:TrendingCell;
    return <CellComponent
        key={this.props.flag ===FLAG_STORAGE.flag_popular?projectModel.item.id:projectModel.item.fullName}
        projectModel={projectModel}
        onSelect={()=>this.onSelect(projectModel)}
        onFavorite={(item,isFavorite)=>this.onFavorite(item,isFavorite)}
      />
  }
  render() {
    return <View style={{flex:1}}>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={(data)=>this.renderRow(data)}
              enableEmptySections={true}
              refreshControl={
                <RefreshControl
                  // 是否刷新flag
                  refreshing={this.state.isLoading}
                  // 下拉刷新
                  onRefresh={()=>this.LoadData()}
                  // android 刷新等待颜色（数组形式）
                  colors={['#6cf']}
                  // ios 刷新等待颜色
                  tintColor={'#6cf'}
                  title={'努力加载中~~~~'}
                  titleColor={'grey'}
                />
              }
            /> 
          </View> 
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    fontSize: 29
  }
});