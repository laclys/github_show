import React, {Component} from 'react';
import {View, Text, StyleSheet,Image, TextInput,ListView,RefreshControl,TouchableOpacity,DeviceEventEmitter} from 'react-native';
import NavigationBar from '../common/NavigationBar';
import ScrollableTabView ,{ScrollableTabBar} from 'react-native-scrollable-tab-view';
import HomePage from './HomePages';
import TrendingCell from '../common/TrendingCell';
import LanguageDao,{FLAG_LANGUAGE} from '../expand/dao/LanguageDao';
import DataRepository,{FLAG_STORAGE} from '../expand/dao/DataRepository'
import RepositoryDetail from './RepositoryDetail';
import TimeSpan from '../model/TimeSpan';
import Popover from '../common/Popover';
import Utills from '../util/Utills';

import ProjectModel from '../model/ProjectModel';
import FavoriteDao from '../expand/dao/FavoriteDao';

const API_URL='https://github.com/trending/';
var timeSpanTextArray=[
  new TimeSpan('今天','since=daily'),
  new TimeSpan('本周','since=weekly'),
  new TimeSpan('本月','since=monthly'),
  ];
var favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_popular);
var dataRepository=new DataRepository(FLAG_STORAGE.flag_trending);

export default class TrendingPage extends Component {
  constructor(props) {
    super(props);
    this.languageDao=new LanguageDao(FLAG_LANGUAGE.flag_language)
    this.state={
      languages:[],
      isVisible:false,
      buttonReact: {},
      timeSpan:timeSpanTextArray[0]
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
  showPopover() {
    this.refs.button.measure((ox, oy, width, height, px, py) => {
      this.setState({
        isVisible: true,
        buttonRect: {x: px, y: py, width: width, height: height}
      });
    });
  }
  renderTitleView() {
    return <View>
        <TouchableOpacity
          ref='button'
          onPress={()=>this.showPopover()}
        >
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <Text
              style={{
                fontSize:18,
                color:'white',
                fontWeight:'400'
              }}
            >Hot  {this.state.timeSpan.showText}</Text>
            <Image
              style={{width:12,height:12,marginLeft:5}}
              source={require('../../res/images/ic_spinner_triangle.png')}
            />
          </View>
        </TouchableOpacity>
      </View> 
  }
  closePopover() {
    this.setState({
      isVisible:false,
    })
  }
  onSelectTimeSpan(timeSpan) {
    this.closePopover();
    this.setState({
        timeSpan: timeSpan
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
          return lan.checked? <TrendingTab key={i} tabLabel={lan.name} timeSpan={this.state.timeSpan} {...this.props}></TrendingTab>:null;
        })}
      </ScrollableTabView>:null;
      let timeSpanView = 
        <Popover
          isVisible={this.state.isVisible}
          fromRect={this.state.buttonRect}
          placement="bottom"
          onClose={()=>this.closePopover()}
          contentStyle={{backgroundColor:"#343434",opacity:0.82}}
          >
          {timeSpanTextArray.map((result,i,arr)=>{
            return <TouchableOpacity
                key={i}
                onPress={()=>this.onSelectTimeSpan(arr[i])}
                underlayColor='transparent'
              >
              <Text 
                style={{fontSize:18,color:'white',fontWeight:'400' ,padding:8}}
              >{arr[i].showText}</Text>
            </TouchableOpacity>
          })}
        </Popover>
    return <View style={styles.container}>
      <NavigationBar 
        titleView={this.renderTitleView()}
        style={{backgroundColor:'#6495ED'}}
      />
      {content}
      {timeSpanView}
    </View>
  }
}

class TrendingTab extends Component{
    constructor(props) {
    super(props);
    this.state={
      result:'',
      isLoading:false,
      dataSource:new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2}),
      favoriteKeys:[],
    }
  }
  componentDidMount(){
    this.LoadData(this.props.timeSpan,true);
  }
  componentWillReceiveProps(nextProps) {
      if (nextProps.timeSpan !== this.props.timeSpan) {
          console.log(nextProps.timeSpan);
          this.LoadData(nextProps.timeSpan,true)
      }
  }
  onRefresh() {
    this.LoadData(this.props.timeSpan,true)
  }
   flushFavoriteState() {
    let projectModels = [];
    let items = this.items;
    for(var i=0,len=items.length;i<len;i++){
      projectModels.push(new ProjectModel(items[i],Utills.checkFavorite(items[i],this.state.favoriteKeys)));
    }
    // console.log(projectModels);
    this.updateState({
      isLoading:false,
      dataSource:this.getDataSource(projectModels),
    })
  }
  getDataSource(items) {
    return this.state.dataSource.cloneWithRows(items);
  }  
  getFavoriteKeys() {
    favoriteDao.getFavoriteKeys()
        .then(keys=>{
          if(keys){
            this.updateState({
              favoriteKeys:keys
            })
          }
          this.flushFavoriteState();
        })
        .catch(e=>{
          this.flushFavoriteState();
        })
  }
  LoadData(timeSpan,isRefresh){
    this.updateState({
      isLoading:true
    })
    let url=this.genUrl(timeSpan,this.props.tabLabel);
    dataRepository.fetchRepository(url)
      .then(result=>{
        this.items = result && result.items? result.items:result?result:[];
        this.getFavoriteKeys();
        if(!this.items||isRefresh && result&&result.update_date&&!dataRepository.checkDate(result.update_date)){
          return dataRepository.fetchNetRepository(url);
        }
      })
      .then(items=>{
        console.log(items);
        if(!items||items.length===0) return;
        this.items = items;
        this.getFavoriteKeys();
      })
      .catch(error=>{
        console.log(error);
        this.updateState({
          isLoading:false
        })
      })
  }
  updateState(dic){
    if(!this)return;
    this.setState(dic)
  }
  // 拼接url
  genUrl(timeSpan,category){
    return API_URL + category + '?' +timeSpan.searchText;
  }
  onFavorite(item,isFavorite) {
    console.log(item,isFavorite)
    if(isFavorite) {
      favoriteDao.saveFavoriteItem(item.fullName,JSON.stringify(item));
    }else {
      favoriteDao.removeFavoriteItem(item.fullName);
    }
  }
  onSelect(projectModel) {
    this.props.navigator.push({
      title:projectModel.item.fullName,
      component:RepositoryDetail,
      params:{
        projectModel:projectModel,
        parentComponent:this,
        flag:FLAG_STORAGE.flag_trending,
        ...this.props
      }
    })
  }
  renderRow(projectModel){
    return <TrendingCell
        key = {projectModel.item.fullName}
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
                  onRefresh={()=>this.onRefresh()}
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