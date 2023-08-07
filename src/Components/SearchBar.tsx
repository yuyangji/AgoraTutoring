
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import {Ionicons} from '@expo/vector-icons';


interface SearchFieldProps {
  additionalStyles?: StyleProp<ViewStyle>;
  onSearch?: (text:string) => void
}

const SearchField: React.FC<SearchFieldProps> = ({ additionalStyles, onSearch }) => {
  const [search, setSearch] = useState('');

  const OnType = (text:string) => {
    setSearch(text)
    onSearch(text)
  }

  return (
    <View style={[styles.container, additionalStyles]}>
      <TextInput
        style={styles.input}
        value={search}
        onChangeText={OnType}
        placeholder="Search"
      />
      <Ionicons name="ios-search" color="#9B9999" size={20} style={styles.icon} />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: 19,
    borderColor: '#AFAFAF',
    borderWidth: 1,
    padding: 6,
    paddingHorizontal: 15,  
  },
  icon: {
    marginRight: 5,

  },
  input: {
    flex: 1,
  },
});

export default SearchField;