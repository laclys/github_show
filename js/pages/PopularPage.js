import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput,ListView,RefreshControl,DeviceEventEmitter} from 'react-native';
import NavigationBar from '../common/NavigationBar';
import ScrollableTabView ,{ScrollableTabBar} from 'react-native-scrollable-tab-view';
import HomePage from './HomePages';
import RepositoryCell from '../common/RepositoryCell';
import LanguageDao,{FLAG_LANGUAGE} from '../expand/dao/LanguageDao';
import DataRepository,{FLAG_STORAGE} from '../expand/dao/DataRepository'
import RepositoryDetail from './RepositoryDetail';
import ProjectModel from '../model/ProjectModel';

const URL='https://api.github.com/search/repositories?q=';
const QUERY_STR='&sort=stars&order=desc';

export default class PopularPage extends Component {
  constructor(props) {
    super(props);
    this.languageDao=new LanguageDao(FLAG_LANGUAGE.flag_key)
    this.state={
      languages:[]
    }
  }

  componentDidMount(){
    this.loadData();
  }
  loadData(){
  this.languageDao.fetch()
      .then(result=>{
        this.setState({
          languages:result
        })
      })
      .catch(error=>{
        console.log(error);
      })
}
  render() {
    let content=this.state.languages.length>0?
      <ScrollableTabView
        tabBarBackgroundColor="#6495ED"
        tabBarInactiveTextColor="lightgrey"
        tabBarActiveTextColor="mintcream"
        tabBarUnderlineStyle={{backgroundColor:'mintcream',height:2}}
        renderTabBar={()=><ScrollableTabBar/>}
        > 
        {this.state.languages.map((result,i,arr)=>{
          let lan=arr[i];
          return lan.checked? <PopularTab key={i} tabLabel={lan.name} {...this.props}>Java</PopularTab>:null;
        })}
        {/*<PopularTab tabLabel="Java">Java</PopularTab>
        <PopularTab tabLabel="IOS">IOS</PopularTab>
        <PopularTab tabLabel="Vue">Vue</PopularTab>
        <PopularTab tabLabel="Python">Python</PopularTab>*/}
      </ScrollableTabView>:null;
    return <View style={styles.container}>
      <NavigationBar 
        title={'Popular'}
        style={{backgroundColor:'#6495ED'}}
      />
      {content}
    </View>
  }
}

class PopularTab extends Component{
    constructor(props) {
    super(props);
    this.dataRepository=new DataRepository(FLAG_STORAGE.flag_popular);
    this.state={
      result:'',
      isLoading:false,
      dataSource:new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2})
    }
  }
  componentDidMount(){
    this.LoadData();
  }
  // 更新Project item 收藏 状态
  flushFavoriteState() {
    let projectModels = [];
    let items = this.items;
    for(var i=0,len=items.length;i<len;i++){
      projectModels.push(new ProjectModel(items[i],false));
    }
    console.log(projectModels);
    this.updateState({
      isLoading:false,
      dataSource:this.getDataSource(projectModels),
    })
  }
  updateState(dic){
    if(!this)return;
    this.setState(dic);
  }
  LoadData(){
    this.updateState({
      isLoading:true
    })
    let url=this.genUrl(this.props.tabLabel);
    console.log(url);
    this.dataRepository.fetchRepository(url)
      .then(result=>{
        this.items = result && result.items? result.items:result?result:[];
        this.flushFavoriteState();
        if(result&&result.update_date&&!this.dataRepository.checkDate(result.update_date)){
          DeviceEventEmitter.emit('showToast','数据过时');
          return this.dataRepository.fetchNetRepository(url);
        }else{
          DeviceEventEmitter.emit('showToast','显示缓存数据');
        }
      })
      .then(items=>{
        console.log(items);
        if(!items||items.length===0) return;
        this.items=items;
        this.flushFavoriteState();
        DeviceEventEmitter.emit('showToast','显示网络数据');
      })
      .catch(error=>{
        console.log(error);
        this.updateState({
          isLoading:false
        })
      })
  }
  // 拼接url
  genUrl(key){
    return URL + key + QUERY_STR;
  }
  getDataSource(items) {
    return this.state.dataSource.cloneWithRows(items);
  }
  onSelect(item) {
    this.props.navigator.push({
      component:RepositoryDetail,
      params:{
        item:item,
        ...this.props
      }
    })
  }
  onFavorite(item,isFavorite) {
    
  }
  renderRow(projectModel){
    return <RepositoryCell
        key={projectModel.item.id}
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