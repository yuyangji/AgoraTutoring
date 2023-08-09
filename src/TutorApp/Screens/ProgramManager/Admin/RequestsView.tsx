import { View, StyleSheet, Text, FlatList } from "react-native";
import { EnrolmentRequest } from "../../../../Types/ModelTypes";

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
