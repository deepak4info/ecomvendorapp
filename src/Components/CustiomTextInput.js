import { StyleSheet, Text, View,TextInput, Dimensions } from 'react-native'
import React from 'react'

const CustiomTextInput = ({placeholder,value,onChangeText, type}) => {
  return (
    <View style={styles.input}>
        <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={txt=>{
            onChangeText(txt);
        }}
        keyboardType={type? type: 'default'}
        />
    </View>
  )
}

export default CustiomTextInput

const styles = StyleSheet.create({
    input:{
        width:Dimensions.get('window').width - 50,
        height:50,
        borderWidth:0.5,
        borderRadius:10,
        alignSelf:'center',
        marginTop:20,
        paddingLeft:20,
    }
})