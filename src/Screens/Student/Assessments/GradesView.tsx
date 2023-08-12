
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import DropDownPicker from 'react-native-dropdown-picker';
import { globalStaticStyles } from '../../../useGlobalStyles';



const GradeListItem = ({title, score, grade}) => {


  return (
    <View style = {styles.gradeListItem}>
    <Text>{title}</Text>
    <Text>{score}</Text>
    <Text>{grade}</Text>
  </View>
  )
}


const GradesSubView = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const [items, setItems] = useState([
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' }
  ]);


  return (
    <View style = {styles.screen}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}

        style={styles.dropdown}
        textStyle={{ fontSize: 13 }}
        dropDownContainerStyle = {{maxHeight: 80, width: 300, alignSelf: 'center'}}
      />

      

      <Text style={globalStaticStyles.SubHeading}>Grades</Text>

      <View
        style={{
          borderBottomColor: 'black',
          borderBottomWidth: StyleSheet.hairlineWidth,
          marginVertical: 8
        }}
      />
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <GradeListItem title={item.title} score = {item.score} grade={item.grade} />

        )}
        keyExtractor={(item) => item.title}
      />
    </View>
  )
}

export default GradesSubView

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 10,
    marginTop: 10,

  },
  gradeListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  dropdown: {
    width: 300,
    alignSelf: 'center',
    minHeight: 30,
    height: 30,
    marginBottom: 30


  }
})