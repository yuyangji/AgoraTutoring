import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { MyTheme } from "../Styles/useGlobalStyles";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const backIcon = <Ionicons name="arrow-back-outline" size={24} color="white" />;

const MyHeader = ({ renderLeft = null, renderRight, title, showBack, onPressBack }) => {


  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {showBack && <TouchableOpacity onPress={onPressBack}>{backIcon}</TouchableOpacity>}
        <Text style={styles.title}>{title}</Text>
      </View>

      {renderRight && renderRight()}
    </View>
  );
};

export default MyHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: MyTheme.colors.primary,
    alignItems: "center",
  },
  left: {
    alignItems: "center",
    gap: 17,
    flexDirection: "row",
  },
  title: {
    color: "white",
    fontSize: 20,
  },
});
