import { StyleSheet, Text, View,Image } from 'react-native'
import React,{useState} from 'react'
import { THEME_COLOR } from '../utils/Colors'
import CustiomTextInput from '../Components/CustiomTextInput'
import CustomButton from '../Components/CustomButton'
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage'

const Login = () => {
    const navigation = useNavigation();

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const loginUser =()=>{
firestore().collection('vendors')
.where('email', '==', email)
.get()
.then(snapShot=>{
    if(snapShot.docs !=[])
    {
        if(snapShot.docs[0].data().password == password){
            goToNextScreen(snapShot.docs[0].data());
        }
    }
    console.log(snapShot.docs[0].data());
})
    }

const goToNextScreen = async data =>{
    await AsyncStorage.setItem('NAME', data.name);
    await AsyncStorage.setItem('EMAIL', data.email);
    await AsyncStorage.setItem('MOBILE', data.mobile);
    await AsyncStorage.setItem('USERID', data.userId);
    navigation.navigate('Main');

}

  return (
    <View style={styles.container}>
        <Image source={require('../Assets/Images/ecom.png')}
        style={styles.banner}
        />
        <View style={styles.card}>
            <Text style={styles.title}>Login</Text>

            <CustiomTextInput
        placeholder={'Enter Email'}
        value={email}
        onChangeText={txt=>setEmail(txt)}
        />

    <CustiomTextInput
        placeholder={'Enter Password'}
        value={password}
        onChangeText={txt=>setPassword(txt)}
        />

        <CustomButton title={'Login'} onClick={()=>{
            loginUser();
        }} />
        <View style={styles.row}>
        <Text>{"Don't have account ?"} </Text>
        <Text style={{marginLeft:10, color:THEME_COLOR, fontWeight:'600'}}
        onPress={()=>{
            navigation.navigate('Signup')
        }}
        >{"Create One"} </Text>
        </View>
        </View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    banner:{
        width:'100%',
        height:210,
    },
    card:{
        width:'100%',
        height:'80%',
        backgroundColor:'white',
        position:'absolute',
        top:180,
        elevation:5,
        borderTopLeftRadius:40,
        borderTopRightRadius:40,
    },
    title:{
        alignSelf:'center',
        fontSize:25,
        fontWeight:'500',
        color:THEME_COLOR,
        marginTop:20,
    },
    row:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:30,
        justifyContent:'center',
    }
})
