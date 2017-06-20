import React, {Component} from 'react';
import {View, Text, StyleSheet, Navigator,Image,TouchableOpacity,ScrollView} from 'react-native';
import NavigationBar from '../../common/NavigationBar'
import ViewUtils from '../../util/ViewUtils'
import LanguageDao,{FLAG_LANGUAGE} from '../../expand/dao/LanguageDao'

export default class CustomKeyPage extends Component {
  constructor(props) {
    super(props);
    this.languageDao=new LanguageDao(FLAG_LANGUAGE.flag_key);
    this.state={
      dataArray:[]
    }
  }
  componentDidMount(){
    this.loadData();
  }
  loadData(){
    this.languageDao.fetch()
        .then(result=>{
          this.setState({
            dataArray:result
          })
        })
        .catch(error=>{
          console.log(error);
        })
  }
  onSave(){
    this.props.navigator.pop();
  }
  renderView(){
    return <Text style={{height:400,width:400}}>{JSON.stringify(this.state.dataArray)}</Text>
  }
  render() {
    let rightButton=<TouchableOpacity
      onPress={
        ()=>this.props.onSave()
      }
    >
      <View style={{margin:10}}>
        <Text style={styles.btn}>Save</Text>
      </View>
    </TouchableOpacity>

    return <View style={styles.container}>
      <NavigationBar title='自定义~标签'
        leftButton={ViewUtils.getLeftButton(()=>{
          this.onSave()
        })}
        rightButton={rightButton}
      />
      <ScrollView>
        {this.renderView()}
      </ScrollView>
    </View>
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  text:{
    fontSize:29
  },
  btn:{
    fontSize:20,
    color:'white'
  }
});