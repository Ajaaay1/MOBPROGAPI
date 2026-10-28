import { View, Text, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react'; 
import { useLocalSearchParams, useRouter} from 'expo-router';
import Card from '../../../components/Card';       
import AppInput from '../../../components/AppInput'; 
import AppButton from '../../../components/AppButton'; 


export default function Update() {
    const { id } = useLocalSearchParams();
    const [title, setTitle] = useState('r');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    useEffect(() => {
        
        fetch(`https://dummyjson.com/products/${id}`)
        .then(res => res.json())
        .then(data => {
            setTitle(data.title);       
            setDescription(data.description); 
            setPrice(String(data.price)); 
        })
    }, [id]); 

    function saveChanges() {
        fetch(`https://dummyjson.com/products/${id}`, {
        method: 'PATCH', /* or PATCH */
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title: title,
            description: description,
            price: Number(price),
        })
        })
        .then(res => res.json())
        .then(data => {
            console.log("Updated successfully:", data);
            
        })
        
    }
    
  return (
    <SafeAreaView>
      <Card>
          <AppInput placeholder={"Title"} value={title} onChangeText={setTitle} />
          <AppInput placeholder={"Description"} value={description} onChangeText={setDescription} />
          <AppInput placeholder={"Price"} value={price} onChangeText={setPrice} keyboardType="numeric" />
   
          <AppButton name="Save Changes" color="green" onPress={saveChanges} />
      </Card>
    </SafeAreaView>
  );
}