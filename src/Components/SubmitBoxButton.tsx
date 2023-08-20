import { TouchableOpacity, View, Text, Button, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const SubmitBoxButton = ({pickResults, onPickDocuments}) => {


  return (
    <TouchableOpacity onPress={onPickDocuments}>
      <View style={styles.submitBoxContainer}>
        <FontAwesome name="upload" size={30} color="#585858" />
        <Text>Tap to upload</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SubmitBoxButton;

const styles = StyleSheet.create({
  submitBoxContainer: {
    borderWidth: 0.5,
    borderRadius: 10,
    height: 145,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
});
