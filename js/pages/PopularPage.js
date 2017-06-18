import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput,ListView,RefreshControl} from 'react-native';
import NavigationBar from '../common/NavigationBar'
import ScrollableTabView ,{ScrollableTabBar} from 'react-native-scrollable-tab-view';
import HomePage from './HomePages'
import RepositoryCell from '../common/RepositoryCell'

import DataRepository from '../expand/dao/DataRepository'

const URL='https://api.github.com/search/repositories?q=';
const QUERY_STR='&sort=stars&order=desc';

export default class PopularPage extends Component {
  constructor(props) {
    super(props);
    this.dataRepository=new DataRepository();
  }
  render() {
    return <View style={styles.container}>
      <NavigationBar 
        title={'Popular'}
        style={{backgroundColor:'#6495ED'}}
      />
      <ScrollableTabView
        tabBarBackgroundColor="#6495ED"
        tabBarInactiveTextColor="lightgrey"
        tabBarActiveTextColor="mintcream"
        tabBarUnderlineStyle={{backgroundColor:'mintcream',height:2}}
        renderTabBar={()=><ScrollableTabBar/>}
      >
        <PopularTab tabLabel="Java">Java</PopularTab>
        <PopularTab tabLabel="IOS">IOS</PopularTab>
        <PopularTab tabLabel="Vue">Vue</PopularTab>
        <PopularTab tabLabel="Python">Python</PopularTab>
      </ScrollableTabView>
    </View>
  }
}

class PopularTab extends Component{
    constructor(props) {
    super(props);
    this.dataRepository=new DataRepository();
    this.state={
      result:'',
      isLoading:false,
      dataSource:new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2})
    }
  }
  componentDidMount(){
    this.LoadData();
  }
  LoadData(){
    this.setState({
      isLoading:true
    })
    let url=this.genUrl(this.props.tabLabel);
    console.log(url);
    this.dataRepository.fetchNetRepository(url)
      .then(result=>{
        console.log(123);
        this.setState({
          dataSource:this.state.dataSource.cloneWithRows(result.items),
          isLoading:false,
        })
      })
      .catch(error=>{
        console.log(error);
      })
  }
  // 拼接url
  genUrl(key){
    return URL + key + QUERY_STR;
  }
  renderRow(data){
    return <RepositoryCell data={data}/>
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