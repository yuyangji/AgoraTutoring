import { Pressable, ScrollView, TouchableOpacity } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import { startOfWeek, addDays, format } from "date-fns";
import { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const CalendarButton = ({ date, day, selectedDate, onPress }) => {
  return (
    <Pressable
      style={{
        ...styles.buttonContainer,
        backgroundColor: selectedDate == date ? "#FCA055" : "#E3EDEF",
      }}
      onPress={onPress}
    >
      <View>
        <Text style={styles.buttonDateText}>{date}</Text>
        <Text style={styles.buttonDayText}>{day}</Text>
      </View>
    </Pressable>
  );
};

const CalendarScroll = () => {
  const [currentWeek, setCurrentWeek] = useState(0);
  const startDate = addDays(startOfWeek(new Date()), currentWeek * 7);
  const dates = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <View style={{ paddingTop: 10 }}>
      <View style={styles.calendarHeader}>
        <TouchableOpacity onPress={() => setCurrentWeek(currentWeek - 1)}>
          <Ionicons name="chevron-back" size={30} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>{format(startDate, "MMMM, yyyy")}</Text>

        <TouchableOpacity onPress={() => setCurrentWeek(currentWeek + 1)}>
          <Ionicons name="chevron-forward" size={30} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView horizontal={true} style={{ padding: 10, height: 120 }}>
        {dates.map((date, index) => (
          <CalendarButton
            key={index}
            date={date.getDate()}
            selectedDate={selectedDate}
            day={format(date, "eee")}
            onPress={() => setSelectedDate(date.getDate())}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "column",
    borderRadius: 5,
    height: 72,
    width: 53,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E3EDEF",
    elevation: 5,
  },
  buttonDateText: {
    fontSize: 14,
    color: "#808080",
    textAlign: "center",
    fontWeight: "bold",
  },
  buttonDayText: {
    fontSize: 11,
    color: "#808080",
    textAlign: "center",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "500",
  },
  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});

export default CalendarScroll;
