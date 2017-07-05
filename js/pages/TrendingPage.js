import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput,ListView,RefreshControl,DeviceEventEmitter} from 'react-native';
import NavigationBar from '../common/NavigationBar';
import ScrollableTabView ,{ScrollableTabBar} from 'react-native-scrollable-tab-view';
import HomePage from './HomePages';
import RepositoryCell from '../common/RepositoryCell';
import LanguageDao,{FLAG_LANGUAGE} from '../expand/dao/LanguageDao';
import DataRepository,{FLAG_STORAGE} from '../expand/dao/DataRepository'
import RepositoryDetail from './RepositoryDetail';

const API_URL='https://github.com/trending/';

export default class TrendingPage extends Component {
  constructor(props) {
    super(props);
    this.languageDao=new LanguageDao(FLAG_LANGUAGE.flag_language)
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
          return lan.checked? <TrendingTab key={i} tabLabel={lan.name} {...this.props}>Java</TrendingTab>:null;
        })}
      </ScrollableTabView>:null;
    return <View style={styles.container}>
      <NavigationBar 
        title={'Hot'}
        style={{backgroundColor:'#6495ED'}}
      />
      {content}
    </View>
  }
}

class TrendingTab extends Component{
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
    // this.LoadData();
  }
  LoadData(){
    this.setState({
      isLoading:true
    })
    let url=this.genUrl(this.props.tabLabel);
    console.log(url);
    this.dataRepository.fetchRepository(url)
      .then(result=>{
        let items = result && result.items? result.items:result?result:[];
        this.setState({
          dataSource:this.state.dataSource.cloneWithRows(items),
          isLoading:false,
        });
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
        this.setState({
          dataSource:this.state.dataSource.cloneWithRows(items),
          isLoading:false,
        });
        DeviceEventEmitter.emit('showToast','显示网络数据');
      })
      .catch(error=>{
        console.log(error);
        this.setState({
          isLoading:false
        })
      })
  }
  // 拼接url
  genUrl(key){
    return URL + key;
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
  renderRow(data){
    return <RepositoryCell
        data={data}
        onSelect={()=>this.onSelect(data)}
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