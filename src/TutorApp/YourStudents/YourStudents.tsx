import React, { useState } from "react"
import { View, StyleSheet, Text, Pressable } from "react-native"


import DropDownPicker from 'react-native-dropdown-picker';
import useGlobalStyles, { MyTheme, globalStaticStyles } from "../../useGlobalStyles";

const StudentListItem = ({ studentName, joinedDate }) => {

    return (
        <View style={styles.studentItemContainer}>
            <Text style={{ ...styles.studentName, fontWeight: '500' }}>{studentName}</Text>
            <Text style={{ fontWeight: '300' }}>{joinedDate}</Text>
        </View>
    )

}


const YourStudents = () => {
    const [items, setItems] = useState([
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' }
    ]);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(items[0].value);


    const style = useGlobalStyles()

    return (
        <View style={globalStaticStyles.screen}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: 10, marginVertical: 20 }}>
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    containerStyle={styles.dropdown}
                    style={[styles.dropdown, styles.dropdownField]}
                    textStyle={{ fontSize: 13, textAlign: 'center' }}
                    dropDownContainerStyle={{ ...styles.dropdown, maxHeight: 100, minHeight: 100 }}
                />
                <Pressable style={{ width: 100, borderWidth: 0.5, padding: 7, borderRadius: 10, borderColor: MyTheme.colors.secondary, flex: 3 }} >
                    <Text style={styles.addClassText}>+ Add Class</Text>
                </Pressable>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10, gap: 20, marginBottom: 20 }}>
                <Text style={{ ...style.Heading }}>Students</Text>
                <Pressable style={{ backgroundColor:MyTheme.colors.secondary, borderRadius: 15 }} >
                    <Text style={{color:'white', padding: 5, paddingHorizontal: 12}}>+ Add a student</Text>
                </Pressable>
            </View>

            <View style={styles.studentList} >
                <StudentListItem studentName={"Ruth Williams"} joinedDate="Joined 10th July 2023" />
                <StudentListItem studentName={"Ruth Williams"} joinedDate="Joined 10th July 2023" />
                <StudentListItem studentName={"Ruth Williams"} joinedDate="Joined 10th July 2023" />

            </View>

        </View>
    )
}
export default YourStudents


const styles = StyleSheet.create({

    studentList: {
        gap: 15
    },
    gradeListItem: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    addClassText: {
        color: MyTheme.colors.secondary,

    },
    studentItemContainer: {
        flexDirection: 'row',
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 25,
        justifyContent: 'space-between',
        padding: 15
    },
    studentName: {
        color: MyTheme.colors.textPrimary
    },

    dropdown: {
        flex: 10,
        minHeight: 35,
        height: 35,
        zIndex: 2,


    },
    dropdownField: {
        borderWidth: 0.5,
        backgroundColor: 'transparent',


    }
})

