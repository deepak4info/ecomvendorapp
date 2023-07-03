import { StyleSheet, View, ActivityIndicator,Modal, Dimensions } from 'react-native'
import React from 'react'
// const [width, height] = Dimensions.get('window')



const Loader = ({visible}) => {
  return (
    <Modal visible={visible} transparent> 
    <View style={styles.modalView}>
        <View style={styles.mainView}> 
        <ActivityIndicator size={'large'}/>
        </View>
    </View>
    </Modal>
  )
}

export default Loader

const styles = StyleSheet.create({
    modalView:{
        width:100,
        height:100,
        position:'absolute',
        backgroundColor:'rgba(0,0,0)',
        justifyContent:'center',
        alignItems:'center',
    },
    mainView:{
        width:100,
        height:100,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white',
    }
})