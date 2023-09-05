import { View, StyleSheet } from "react-native/types";

const TextBox = (props: any) => {
  return (
    <View style={styles.container}>
      {props.children}
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
        borderWidth: 0.5,
        borderColor: 'gray',
        padding: 5,
    }

})

export default TextBox;