import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from "../components/AppButton";

export default function ProductsScreen() {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useLocalSearchParams();

  // Fetch initial products on mount
  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=5')
      .then(response => response.json())
      .then(json => {
        setProducts(json.products);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  // Listen for the new product passed back from CreateScreen and add it locally
  useEffect(() => {
    if (params?.newProduct && products) {
      try {
        const parsedNewProduct = JSON.parse(params.newProduct);
        setProducts(prevProducts => {
          const exists = prevProducts.some(p => p.id === parsedNewProduct.id);
          if (!exists) {
            return [parsedNewProduct, ...prevProducts];
          }
          return prevProducts;
        });
      } catch (e) {
        console.log("Failed to parse new product", e);
      }
    }
  }, [params?.newProduct]);

  function deleteProduct(productId) {
    fetch(`https://dummyjson.com/products/${productId}`, {
      method: 'DELETE',
    })
    .then(res => res.json())
    .then(data => {
      console.log(data); 
      setProducts(prevProducts => prevProducts.filter(product => product.id !== productId)); 
    })
    .catch(error => console.log(error));
  }

  if (loading || !products) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading products...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <AppButton
        name="Create"
        color="green"
        onPress={() => router.push(`/CreateScreen`)}
      />
             
      <FlatList
        data={products}
        keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.thumbnail || item.image }} style={styles.image} resizeMode="contain" />
            <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
            <Text style={styles.price}>${item.price}</Text>
            <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
            
            <View style={styles.buttonRow}>
              <View style={styles.buttonWrapper}>
                <AppButton
                  name="View"
                  onPress={() => router.push(`/${item.id}`)}
                />
              </View>
            </View>

            <View style={styles.buttonRow}>
              <View style={styles.buttonWrapper}>
                <AppButton
                  name="Update"
                  color="orange"
                  onPress={() => router.push(`/${item.id}/update`)}
                />
              </View>
            </View>

            <View style={styles.buttonRow}>
              <View style={styles.buttonWrapper}>
                <AppButton
                  name="Delete"
                  color="red"
                  onPress={() => deleteProduct(item.id)}
                />
              </View>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  listContainer: { paddingHorizontal: 10, paddingVertical: 10, alignItems: 'center' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' },
  loadingText: { marginTop: 10, fontSize: 16, color: '#666' },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    margin: 6, 
    width: '45%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  image: { width: '100%', height: 100, marginBottom: 8 },
  title: { fontSize: 14, fontWeight: 'bold', color: '#333', marginBottom: 4 },
  price: { fontSize: 14, fontWeight: '600', color: '#2e7d32', marginBottom: 4 },
  description: { fontSize: 11, color: '#666', lineHeight: 14 },
});