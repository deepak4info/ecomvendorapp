import { StyleSheet, Text, View, Switch, Image, PermissionsAndroid,TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import CustiomTextInput from '../Components/CustiomTextInput'
import CustomButton from '../Components/CustomButton'
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import storage from '@react-native-firebase/storage'
import { useNavigation, useRoute } from '@react-navigation/native';
import Loader from '../Components/Loader';


const AddProducts = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [productName, setProductName] = useState(
        route.params.type == 'edit' ? route.params.data._data.productName : '',
    );
    const [productDesc, setProductDesc] = useState(
    route.params.type == 'edit' ? route.params.data._data.productDesc : '',
    );
    const [productPrice, setProductPrice] = useState(
        route.params.type == 'edit' ? route.params.data._data.price : '',
    );
    const [productDiscountPrice, setProductDiscountPrice] = useState(
        route.params.type == 'edit' ? route.params.data._data.discountPrice : '',
    );
    const [inStock, setInStock] = useState(
        route.params.type == 'edit' ? route.params.data._data.inStock : true,
    );
    const [visible, setVisible] = useState(false)
    const [imageData, setImageData] = useState({
        assets: [{
            fileName:'',
            uri: route.params.type == 'edit' ? route.params.data._data.productImage : '',
        },],
    });

    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Cool Photo App Camera Permission',
                    message:
                        'Cool Photo App needs access to your camera ' +
                        'so you can take awesome pictures.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use the camera');
                openGallery();
            } else {
                console.log('Camera permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    };


    const openGallery = async () => {
  
        const res = await launchImageLibrary({ mediaType: 'photo' })
        if (!res.didCancel) {
            setImageData(res);
        }
    };
    const saveProduct = async () => {
        const name = await AsyncStorage.getItem("NAME")
        const userId = await AsyncStorage.getItem("USERID")
        const productId = uuid.v4();

        let url ='';
        if(imageData.assets[0].fileName !=''){
            const reference = storage().ref(imageData.assets[0].fileName);
            const pathToFile = imageData.assets[0].uri;
            // uploads file
            await reference.putFile(pathToFile);
            url = await storage().ref(imageData.assets[0].fileName).getDownloadURL();
        }
 
        // console.log('url',url)
        if(route.params.type == 'edit') {
            firestore()
            .collection('products').doc(route.params.data._data.productId).update({
                productId: route.params.data._data.productId,
                userId: userId,
                addedBy: name,
                productName: productName,
                productDesc: productDesc,
                price: price,
                discountPrice: discountPrice,
                inStock: inStock,
                productImage: imageData.assets[0].fileName=='' ? route.params.data._data.productImage:url,
            })
                .then(res => {
                    setVisible(false)
                    navigation.goBack();
                   
                })
                .catch(error => {
                    setVisible(false)
                 });
        }else{
            firestore()
            .collection('products').doc(productId).set({
                productId: productId,
                userId: userId,
                addedBy: name,
                productName: productName,
                productDesc: productDesc,
                price: productPrice,
                discountPrice: productDiscountPrice,
                inStock: inStock,
                productImage: url,
            })
                .then(res => {
                    setVisible(false)
                    navigation.goBack();
                   
                })
                .catch(error => {
                    setVisible(false)
                 })
        };
        }

 

    return (
        <View style={styles.container}>
            <View style={styles.bannerView}>
                {imageData.assets[0].uri == '' ? (<TouchableOpacity
                     onPress={() => {
                        requestCameraPermission();
                    }}
                >
                    <Image source={require('../Assets/Images/photo.png')}
                        style={styles.camera}
                    />
                </TouchableOpacity>) : (<TouchableOpacity
                    onPress={() => {
                        requestCameraPermission();
                    }}
                >
                    <Image source={{ uri: imageData.assets[0].uri }}
                        style={styles.banner}
                    />
                </TouchableOpacity>)}

            </View>
            <CustiomTextInput placeholder={'Product'}
                value={productName}
                onChangeText={txt => {
                    setProductName(txt);
                }}

            />
            <CustiomTextInput placeholder={'Product description'}
                value={productDesc}
                onChangeText={txt => {
                    setProductDesc(txt);
                }}
            />
            <CustiomTextInput placeholder={'Price'}
                value={productPrice}
                type={'number-pad'}
                onChangeText={txt => {
                    setProductPrice(txt);
                }}

            />
            <CustiomTextInput placeholder={'Discount Price '}
                value={productDiscountPrice}
                type={'number-pad'}
                onChangeText={txt => {
                    setProductDiscountPrice(txt);
                }}

            />
            <View style={styles.stock}>
                <Text> In Stock </Text>
                <Switch value={inStock} onChange={() => {
                    setInStock(!inStock);
                }} />
            </View>
            <CustomButton title={'Save Product'} onClick={() => { saveProduct() }} />
        </View>
    )
}

export default AddProducts

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bannerView: {
        width: '90%',
        height: 110,
        borderWidth: 0.5,
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 30,
        borderRadius: 10,
    },
    stock: {
        width: '90%',
        alignSelf: 'center',
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
    camera: {
        width: 50,
        height: 50,
        alignSelf: 'center',
    },
    banner: {
        width: '100%',
        height: '100%',
    }
})