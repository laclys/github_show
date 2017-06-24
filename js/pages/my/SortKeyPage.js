import React, {Component} from 'react';
import {View, Text, StyleSheet, Navigator, Image,TouchableHighlight} from 'react-native';
import NavigationBar from '../../common/NavigationBar';
import CustomKeyPage from './CustomKeyPage'
import LanguageDao,{FLAG_LANGUAGE} from '../../expand/dao/LanguageDao';
import ArrayUtils from '../../util/ArrayUtils';
import SortableListView from 'react-native-sortable-listview';

export default class SortKeyPage extends Component {
  constructor(props) {
    super(props);
    this.dataArray=[];
    this.sortResultArray=[];
    this.originalCheckedArray=[];
    this.state={
      checkedArray:[]
    }
  }
  componentDidMount() {
    this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
    this.loadData()
  }

  loadData(){
    this.languageDao.fetch()
        .then(result=>{
          this.getCheckedItems(result);
        })
        .catch(error=>{

        })
  }
  getCheckedItems(result){
    this.dataArray=result;
    let checkedArray=[];
    for(let i=0,len=result.length;i<len;i++){
      let data=result[i];
      if(data.checked){
        checkedArray.push(data);
      }
    }
    this.setState({
      checkedArray:checkedArray,
    })
    this.originalCheckedArray=ArrayUtils.clone(checkedArray);
  }

  render() {
    return <View style={styles.container}>
      <NavigationBar title='Sort'/>
      <SortableListView
          style={{flex: 1}}
          data={this.state.checkedArray}
          order={Object.keys(this.state.checkedArray)}
          onRowMoved={e => {
            this.state.checkedArray.splice(e.to, 0, this.state.checkedArray.splice(e.from, 1)[0]);
            this.forceUpdate();
          }}
          renderRow={row => <SortCell data={row} />}
      />
    </View>
  }
}
class SortCell extends Component{
  render() {
    return (
      <TouchableHighlight
        underlayColor={'#eee'}
        delayLongPress={500}
        style={styles.item}
        {...this.props.sortHandlers}
      > 
        <View style={styles.row}>
          <Image 
            style={styles.img}
            source={require('./images/ic_sort.png')}></Image>
          <Text>{this.props.data.name}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    fontSize: 29
  },
  item:{
    padding:15,
    backgroundColor:'#f8f8f8',
    borderBottomWidth:1,
    borderColor:'#EEE'
  },
  row:{
    flexDirection:'row',
    alignItems:'center'
  },
  img:{
    tintColor:'#6cf',
    height:16,
    width:16,
    marginRight:10
  }
});