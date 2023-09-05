import { TouchableOpacity, StyleSheet } from "react-native";

const FloatingButton = ({ onPress }) => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.floatingButton}>
        {/* <Text style={styles.plusSign}>+</Text> */}
      </TouchableOpacity>
    );
};
  
const styles = StyleSheet.create({
    floatingButton: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: '#FF5722',
      position: 'absolute',
      bottom: 30,
      right: 30,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 10, // for Android shadow
      shadowColor: '#000', // for iOS shadow
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    plusSign: {
      fontSize: 30,
      color: 'white',
    },
  });
  
  export default FloatingButton;