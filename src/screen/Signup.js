import { StyleSheet, Text, View,Image,TouchableOpacity, Alert } from 'react-native'
import React,{useState} from 'react'
import { THEME_COLOR } from '../utils/Colors'
import CustiomTextInput from '../Components/CustiomTextInput'
import CustomButton from '../Components/CustomButton'
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import Loader from '../Components/Loader'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Signup = () => {
  const [visible,setVisible] = useState(false)


    const navigation = useNavigation();

  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [mobile,setMobile] = useState('');
  const [password,setPassword] = useState('');
  const [confirmPass,setConfirmPassword] = useState('');
  const registerVendor =()=>{
    setVisible(true);
    const userId= uuid.v4()
    firestore().collection('vendors').doc(userId).set({
      name:name,
      email:email,
      mobile:mobile,
      password:password,
      userId:userId,
    }).then(res=>{
      setVisible(false)
      console.log('user created');
      navigation.goBack();
    })
    .catch(error=>{
      setVisible(false)
      console.log(error)
    })
  }

  const validate = () =>{
    let valid = true;
    if(name == ''){
      valid = false;
    }
    if(email == ''){
      valid = false;
    }
    if(mobile == '' || mobile.length < 10){
      valid = false;
    }
    if(password == ''){
      valid = false;
    }
    if(confirmPass == ''){
      valid = false;
    }
    if(password !== confirmPass){
      valid = false;
    }
    return valid;

  }


  return (
    <View style={styles.container}>
        <Image source={require('../Assets/Images/ecom.png')}
        style={styles.banner}
        />
        <TouchableOpacity style={styles.backbtn}
        onPress={()=>{
            navigation.goBack();
        }}
        > 
        <Image source={require('../Assets/Images/back.png')} 
        style={{width:'50%', height:'50%'}}
        />
        </TouchableOpacity>
        <View style={styles.card}>
            <Text style={styles.title}>Sign Up</Text>
        <CustiomTextInput
        placeholder={'Enter name'}
        value={name}
        onChangeText={txt=>setName(txt)}
        />
          <CustiomTextInput
        placeholder={'Enter Email'}
        value={email}
        onChangeText={txt=>setEmail(txt)}
        />
          <CustiomTextInput
        placeholder={'Enter Mobile'}
        type={'number-pad'}
        value={mobile}
        onChangeText={txt=>setMobile(txt)}
        />
          <CustiomTextInput
        placeholder={'Enter Password'}
        value={password}
        onChangeText={txt=>setPassword(txt)}
        />
          <CustiomTextInput
        placeholder={'Enter Confim Password'}
        value={confirmPass}
        onChangeText={txt=>setConfirmPassword(txt)}
        />
        <CustomButton title={'Sign Up'} 
        onClick={()=>{
          if(validate()){
            registerVendor();
          } else {
            Alert.alert('please check enytered data');
          }

        }} />
        </View>
        <Loader visible={visible}/>
    </View>
  )
}

export default Signup

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
    backbtn:{
        width:40,
        height:40,
        borderRadius:10,
        backgroundColor:'#fff',
        elevation:5,
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        top:20,
        left:20,
    }
})