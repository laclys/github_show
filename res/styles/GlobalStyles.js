/**
 * 全局样式
 */
import { Dimensions } from 'react-native'
const {height,width} = Dimensions.get('window')
 module.exports = {
   line:{
    //  flex:1,
     height:0.4,
     opacity:0.5,
     backgroundColor:'darkgray'
   },
    root_container:{
      flex:1,
      backgroundColor:'#f3f3f3'
    },
    nav_bar_height_ios:44,
    nav_bar_height_android:50,
    window_height: height
 }