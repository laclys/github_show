import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput,ListView} from 'react-native';
import NavigationBar from '../common/NavigationBar'
import ScrollableTabView ,{ScrollableTabBar} from 'react-native-scrollable-tab-view';
import HomePage from './HomePages'

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
      dataSource:new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2})
    }
  }
  componentDidMount(){
    this.LoadData();
  }
  LoadData(){
    let url=this.genUrl(this.props.tabLabel);
    console.log(url);
    this.dataRepository.fetchNetRepository(url)
      .then(result=>{
        console.log(123);
        this.setState({
          dataSource:this.state.dataSource.cloneWithRows(result.items)
        })
      })
      .catch(error=>{
        this.setState({
          result:JSON.stringify(error)
        })
      })
  }
  genUrl(key){
    return URL + key + QUERY_STR;
  }
  renderRow(data){
    return <View>
        <Text>{data.full_name}</Text>
        <Text>{data.description}</Text>
        <Text>{data.owner.avatar_url}</Text>
        <Text>{data.stargazers_count}</Text>
      </View>
  }
  render() {
    return <View>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={(data)=>this.renderRow(data)}
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