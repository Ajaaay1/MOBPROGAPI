import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import AppButton from "../../components/AppButton";
import AppInput from "../../components/AppInput";
import Card from "../../components/Card";

export default function CreateScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  function createProduct() {
    fetch('https://dummyjson.com/products/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: title,
        description: description,
        price: price,
        thumbnail: imageUrl,
      })
    })
    .then(res => res.json())
    .then(newProduct => {
      const productToAdd = {
        ...newProduct,
        title: title, // Ensures your typed inputs are used
        description: description,
        price: price,
        thumbnail: imageUrl || newProduct.thumbnail,
      };

      // OPTION A: Simply go back to the previous screen (the product list)
      router.back();

      // OR OPTION B: Explicitly navigate back to the list screen with params
      /*
      router.navigate({
        pathname: '/ProductsScreen', // Make sure this matches your file path name
        params: { newProduct: JSON.stringify(productToAdd) }
      });
      */
    })
    .catch(error => console.log(error));
  }

  return (
    <SafeAreaView style={styles.container}>
      <Card>
        <AppInput placeholder={"Title"} value={title} onChangeText={setTitle} />
        <AppInput placeholder={"Description"} value={description} onChangeText={setDescription} />
        <AppInput placeholder={"Price"} value={price} onChangeText={setPrice} />
        <AppInput 
          placeholder={"Image URL (https://..."} 
          value={imageUrl} 
          onChangeText={setImageUrl} 
          autoCapitalize="none" 
          keyboardType="url" 
        />

        <AppButton name="Create Product" onPress={createProduct} />
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});