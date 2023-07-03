import { Dimensions, FlatList, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation,  useIsFocused  } from '@react-navigation/native';


const Products = () => {
  const navigation = useNavigation();
  
  const [productList, setProductList] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    getProducts();
  }, [isFocused]);

  const getProducts = async () => {
    const userId = await AsyncStorage.getItem('USERID');
    console.log('check user id ', userId)
    firestore().collection('products').where('userId','==', userId).get().then(snapshot => {
      console.log('snapshot data', snapshot._docs[0]._data);
        if(snapshot.docs !== []) {
          setProductList(snapshot.docs);
          console.log('userid data****', userId)
          console.log('snapshot check', snapshot._docs[0]._data);
        }
        else{
          console.log('snapshot else ', snapshot._docs[0]._data);
        }

      });
  };

const deleteItem =(item)=> {
  firestore()
  .collection('products')
  .doc(item._data.productId)
  .delete()
  .then(() => {
    console.log('User deleted!',deleteItem );
    getProducts();
  });

};

  return (<View style={styles.container}>
    <FlatList
      data={productList}
      renderItem={({ item, index }) => {
        return (
          <View style={styles.productItem}>
            <View style={{ flexDirection: 'row', alignItems: 'center',}}>
              <Image
                source={{ uri: item._data.productImage }}
                style={styles.productImage}
              />
              <View style={{ marginLeft: 10 }}>
                <Text style={{ fontSize: 18, fontWeight: '800' }}>{item._data.productName}</Text>
                <Text>{item._data.productDesc}</Text>
                <Text style={{ color: 'green' }}>{'INR' + item._data.price}</Text>
              </View>
      
            </View>
            <View>
                <TouchableOpacity onPress={()=>{
                  navigation.navigate('AddProducts',{data:item, type:'edit'});
                }}>
                  <Image source={require('../Assets/Images/edit.png')}
                    style={{ width: 30, height: 30 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginTop: 20 }}
                onPress={() => {
                  deleteItem(item);
                }}
                >
                  <Image source={require('../Assets/Images/delete.png')}
                    style={{ width: 30, height: 30 }}
                  />
                </TouchableOpacity>
              </View>
          </View>
        )
      }}
    />
  </View>);
}

export default Products

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  productItem: {
    width: Dimensions.get('window').width,
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
 
  },
  productImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
   
  }

})