import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ListView,
  RefreshControl
} from 'react-native';
import NavigationBar from './NavigationBar'
import Toast,{DURATION} from 'react-native-easy-toast'

var data = {
  "result": [
    {
      "email": "laclys@126.com",
      "fullName": "Lac"
    }, {
      "email": "sylcal@126.com",
      "fullName": "Cal"
    }, {
      "email": "zyy@126.com",
      "fullName": "Zyy"
    }, {
      "email": "421084802@126.com",
      "fullName": "Zhang"
    }, {
      "email": "yoyo@126.com",
      "fullName": "Yoyo"
    }, {
      "email": "123321@126.com",
      "fullName": "Bill"
    }, {
      "email": "swonwhite@126.com",
      "fullName": "Swon"
    }, {
      "email": "Mac@126.com",
      "fullName": "Mac"
    }, {
      "email": "laclys1@126.com",
      "fullName": "Lac"
    }, {
      "email": "sylcal1@126.com",
      "fullName": "Cal"
    }, {
      "email": "zyy1@126.com",
      "fullName": "Zyy"
    }, {
      "email": "4210848021@126.com",
      "fullName": "Zhang"
    }, {
      "email": "yoyo1@126.com",
      "fullName": "Yoyo"
    }, {
      "email": "1233211@126.com",
      "fullName": "Bill"
    }, {
      "email": "swonwhite1@126.com",
      "fullName": "Swon"
    }, {
      "email": "Mac1@126.com",
      "fullName": "Mac"
    }
  ],
  "statusCode": 0
};

export default class ListViewTest extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })
    this.state = {
      dataScource: ds.cloneWithRows(data.result),
      isLoading:true,
    }
    this.onLoad();
  }
  renderRow(item,sectionID, rowID, highlightRow) {
    return <View key={rowID} style={styles.row}>
      <TouchableOpacity
        onPress={()=>{
          this.toast.show('clicked!'+item.fullName,DURATION.LENGTH_LONG)
        }}
      >
        <Text style={styles.text}>{item.fullName}</Text>
        <Text style={styles.text}>{item.email}</Text>
      </TouchableOpacity>
    </View>
  }
  renderSeparator(sectionID, rowID, adjacentRowHighlighted){
    return <View key={rowID} style={styles.line}></View>
  }
  renderFooter(){
    return <Image style={{width:50,height:50}} source={{uri:'https://avatars1.githubusercontent.com/u/22010181?v=3&s=460'}}/>  
  }
  onLoad() {
    setTimeout(()=>{
      this.setState({
        isLoading:false
      })
    },2000);
  }
  render() {
    return (
      <View style={styles.container}>
        <NavigationBar title={'ListViewTest'}/>
        <ListView
          dataSource={this.state.dataScource}
          renderRow={(item,sectionID, rowID, highlightRow) => this.renderRow(item,sectionID, rowID, highlightRow)}
          renderSeparator={(sectionID, rowID, adjacentRowHighlighted)=>this.renderSeparator(sectionID, rowID, adjacentRowHighlighted)}
          renderFooter={()=>this.renderFooter()}
          refreshControl={<RefreshControl
            refreshing={this.state.isLoading}
            onRefresh={()=>this.onLoad()}
          />}
          />
          <Toast ref={toast=>{this.toast=toast}} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  text: {
    fontSize: 20
  },
  row: {
    height: 50
  },
  line:{
    height:1,
    backgroundColor:'black'
  }
})