import React, {Component} from 'react';
import {View, Text, StyleSheet, Navigator,Image,TouchableOpacity,ScrollView} from 'react-native';
import NavigationBar from '../../common/NavigationBar'
import ViewUtils from '../../util/ViewUtils'

export default class CustomKeyPage extends Component {
  constructor(props) {
    super(props);
  }
  onSave(){
    this.props.navigator.pop();
  }
  renderView(){
    
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