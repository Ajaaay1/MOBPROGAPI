import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";

export default function index() {
    const { id } = useLocalSearchParams();
    const [product, setProduct] = useState(null); 

    useEffect(() => {
        fetch(`https://dummyjson.com/products/${id}`)
        .then(res => res.json())
        .then(data => setProduct(data)); // Fixed: Save the data into state
    }, [id]); 

    if (!product) {
        return (
            <SafeAreaView>
                <Text>Loading...</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView>
            <Text>Product ID: {product.id} </Text>
            <Text>Title: {product.title} </Text>
            <Text>Category: {product.category} </Text>
            <Text>Rating: {product.rating} </Text>
            <Text>Stock: {product.stock} </Text>

        </SafeAreaView>
    );
}