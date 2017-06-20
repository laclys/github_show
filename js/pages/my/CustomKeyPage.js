import React, {Component} from 'react';
import {View, Text, StyleSheet, Navigator,Image,TouchableOpacity,ScrollView} from 'react-native';
import NavigationBar from '../../common/NavigationBar'
import ViewUtils from '../../util/ViewUtils'
import LanguageDao,{FLAG_LANGUAGE} from '../../expand/dao/LanguageDao'
import CheckBox from 'react-native-check-box'

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
    if(!this.state.dataArray||this.state.dataArray.length===0)return null;
    let len = this.state.dataArray.length;
    let views=[];
    for(let i=0,l=len-1;i<l;i+=2){
      views.push(
        <View key={i}>
          <View style={styles.item}>
              {this.renderCheckBox(this.state.dataArray[i])}
              {this.renderCheckBox(this.state.dataArray[i+1])}
          </View>
          <View style={styles.line}></View>
        </View>
      )
    }
    views.push(
      <View key={len-1}>
        <View style={styles.item}>
            {len%2 === 0 ? this.renderCheckBox(this.state.dataArray[len-2]):null}
            {this.renderCheckBox(this.state.dataArray[len-1])}
            <View style={styles.line}></View>
        </View>
      </View>
    )
    return views;
  }
  onClick(data){
    
  }
  renderCheckBox(data){
    leftText=data.name;
    return (
      <CheckBox
        style={{flex:1}}
        onClick={()=>this.onClick(data)}
        leftText={leftText}  
        checkedImage={<Image
          source={require('./images/ic_check_box.png')}
         />}
        unCheckedImage={<Image
          source={require('./images/ic_check_box_outline_blank.png')}
         />}
      />
    )
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
  },
  line:{
    height:1,
    backgroundColor:'black'
  },
  item:{
    flexDirection:'row',
    alignItems:'center'
  }
});