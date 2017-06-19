import React, {Component} from 'react';
import {View, Text, StyleSheet, Navigator,Image} from 'react-native';
import NavigationBar from '../../common/NavigationBar'
import ViewUtils from '../../util/ViewUtils'

export default class CustomKeyPage extends Component {
  constructor(props) {
    super(props);
  }
  onSave(){
    this.props.navigator.pop();
  }
  render() {
    return <View style={styles.container}>
      <NavigationBar title='自定义~标签'
        leftButton={ViewUtils.getLeftButton(()=>{
          this.onSave()
        })}
      
      />
      <Text style={styles.text}>自定义标签</Text>
    </View>
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  text:{
    fontSize:29
  }
});