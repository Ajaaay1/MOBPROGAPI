import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet } from 'react-native';
import AppInput from "../../components/AppInput";
import Card from "../../components/Card";
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import AppButton from "../../components/AppButton";

export default function CreateScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

 
function createProduct() {
  fetch('https://dummyjson.com/products/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: 'BMW Pencil',
      description: description,
      price: price

    })
  })
  .then(res => res.json())
  .then(console.log);
}


  return (
    <SafeAreaView style={styles.container}>
      <Card>
        
        <AppInput placeholder={"Title"} value={title} onChangeText={setTitle} />
        <AppInput placeholder={"Description"} value={description} onChangeText={setDescription} />
        <AppInput placeholder={"Price"} value={price} onChangeText={setPrice} />

        <AppButton name="Create Product" onPress={createProduct} />

      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});