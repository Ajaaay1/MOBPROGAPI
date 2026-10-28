import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function AppButton({ name, color, onPress }) {
  return (
    // Dynamically apply the color prop to the background, fallback to a default color if none is passed
    <TouchableOpacity style={[styles.button, { backgroundColor: color || '#007AFF' }]} onPress={onPress}>
      <Text style={styles.text}>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
});