import {
  Modal,
  SafeAreaView,
  Button,
  TouchableOpacity,
  FlatList,
  TextInput,
  Text,
  View,
} from "react-native";
import { useState, useEffect } from "react";
import { Group } from "../../Types/Group";
import SearchField from "../../Components/SearchBar";
import { globalStyles } from "../../Styles/useGlobalStyles";

const AddGroup = ({ allGroups, addGroup, setIsVisible }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredGroups, setFilteredGroups] = useState<Group[]>(allGroups);

  useEffect(() => {
    if (searchTerm) {
      const results = allGroups.filter((group) =>
        group.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredGroups(results);
    } else {
      setFilteredGroups(allGroups);
    }
  }, [searchTerm, allGroups]);

  const handleSelectGroup = (group: Group) => {
    addGroup(group);
    setIsVisible(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 15, paddingVertical: 15, flex: 1 }}>
        <SearchField onSearch={setSearchTerm} />

              <FlatList
                  style = {{marginTop: 20}}
          data={filteredGroups}
          keyExtractor={(item) => item.groupId}
          renderItem={({ item }) => (
            <TouchableOpacity style={{ padding: 15,borderBottomWidth: 0.7, borderColor: 'gray' }} onPress={() => handleSelectGroup(item)}>
              <Text style = {globalStyles.text_md} >{item.name}</Text>
            </TouchableOpacity>
          )}
        />
        <Button title="Close" onPress={() => setIsVisible(false)} />
      </View>
    </View>
  );
};

export default AddGroup;
