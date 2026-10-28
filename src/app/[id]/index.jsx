import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProductDetailScreen() {
  const { id, productData } = useLocalSearchParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If product data was passed directly (like a new local product), use it!
    if (productData) {
      try {
        setProduct(JSON.parse(productData));
        setLoading(false);
        return;
      } catch (e) {
        console.log("Failed to parse product data", e);
      }
    }

    // Otherwise, fetch normally from the API
    fetch(`https://dummyjson.com/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, [id, productData]);

  if (loading || !product) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading product details...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>{product.title}</Text>
        <Text>Product ID: {product.id}</Text>
        <Text>Description: {product.description}</Text>
        <Text>Category: {product.category || "N/A"}</Text>
        <Text>Rating: {product.rating ?? "N/A"}</Text>
        <Text>Stock: {product.stock ?? "N/A"}</Text>
        <Text>Availability: {product.availabilityStatus || "N/A"}</Text>
        <Text>Discount: {product.discountPercentage ?? "N/A"}</Text>
        <Text>Weight: {product.weight ?? "N/A"}</Text>
        <Text>Dimensions: {product.dimensions ? `${product.dimensions.width} x ${product.dimensions.height} x ${product.dimensions.depth}` : "N/A"}</Text>
        <Text>Warranty: {product.warrantyInformation || "N/A"}</Text>
        <Text>Shipping: {product.shippingInformation || "N/A"}</Text>
        <Text>Return Policy: {product.returnPolicy || "N/A"}</Text>
        <Text>Minimum Order: {product.minimumOrderQuantity || "N/A"}</Text>
        <Text>Tags: {product.tags ? product.tags.join(', ') : "N/A"}</Text>

        {product.reviews?.length > 0 && (
          <View style={{ marginTop: 12 }}>
            <Text style={{ fontWeight: "bold" }}>Reviews:</Text>
            {product.reviews.map((review, index) => (  
              <Text key={`${product.id}-review-${index}`}>
                {review.reviewerName}: {review.comment} (Rating: {review.rating})
              </Text>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  scrollContainer: { padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' },
  loadingText: { marginTop: 10, fontSize: 16, color: '#666' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
});