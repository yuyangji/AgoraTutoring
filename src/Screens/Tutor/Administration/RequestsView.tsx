import { View, StyleSheet, Text, FlatList } from "react-native";
import { EnrolmentRequest } from "../../../Types/Users";


const Requests = ({ requests }: { requests: EnrolmentRequest[] }) => {
  
  return (
    <View>
      <FlatList
        data={requests}
        renderItem={({ item }) => <Text>{item.studentName}</Text>}
      />

  </View>);
};

export default Requests;
