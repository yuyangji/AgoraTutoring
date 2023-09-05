import {
  TextInput,
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { MyTheme, globalStyles } from "../../Styles/useGlobalStyles";
import { useAppSelector } from "../../Redux/hooks";
import { selectGroups } from "../../Redux/slices/programSlice";
import { Group } from "../../Types/Group";
import { GroupDb } from "../../Types/Group";
import { useState } from "react";
import { Lesson, LessonDbModel } from "../../Types/Lesson";
import { Tutor } from "../../Types/Users";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { addLessonForGroup } from "../../Database/Firebase/AttendanceApi";
import DatePickerField from "../../Components/DatePickerField";
import TimePickerField from "../../Components/TimePickerField";
import { Picker } from "@react-native-picker/picker";
import { useEffect } from "react";
import useNames from "../../hooks/useUserNames";

const CrossIcon = <Entypo name="cross" size={24} color="white" />;
const CheckIcon = <AntDesign name="check" size={24} color="white" />;
const PersonIcon = (
  <Ionicons name="person" size={24} color={MyTheme.colors.primary} />
);
const PinIcon = (
  <Entypo name="location-pin" size={24} color={MyTheme.colors.primary} />
);
const RepeatIcon = (
  <Ionicons name="md-repeat-sharp" size={24} color={MyTheme.colors.primary} />
);

const AddLessonHeader = ({
  onCancel,
  onSave,
}: {
  onCancel: () => void;
  onSave: () => void;
}) => {
  return (
    <View style={styles.lessonHeader}>
      <TouchableOpacity onPress={onCancel}>{CrossIcon}</TouchableOpacity>

      <Text style={{ color: "white" }}>New Lesson</Text>
      <TouchableOpacity onPress={onSave}>{CheckIcon}</TouchableOpacity>
    </View>
  );
};

const AddLesson = ({
  lessonDate,
  isVisible,
  setIsVisible,
  groupId,
}: {
  lessonDate: Date;
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  groupId: string;
  }) => {
  
  const groups = useAppSelector(selectGroups);

  const [selectedGroup, setGroup] = useState<Group>();
  const [instructions, setInstructions] = useState<string>("");
  const [startDate, setStartDate] = useState<Date>(lessonDate);
  const [endDate, setEndDate] = useState<Date>(lessonDate);
  const [location, setLocation] = useState<string>("");
  const [tutors, setTutors] = useState<string[]>([]);
  const [attendance, setAttendance] = useState<string[]>([]);
  const [isRecurring, setIsRecurring] = useState<boolean>(false);
  const [recurringDays, setRecurringDays] = useState<string[]>([]);
  const [recurringEndDate, setRecurringEndDate] = useState<Date>(new Date());

  const userNames = useNames(selectedGroup ? selectedGroup.tutors : []);

  const addLesson = async () => {
    const lesson = new Lesson(
      tutors,
      instructions,
      location,
      startDate.toISOString(),
      endDate.toISOString(),
      attendance,
      selectedGroup.groupId
    );
    try {
      const result = await addLessonForGroup(selectedGroup.groupId, lesson);
      console.log("addlessonresult ", result);
      setIsVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeGroup = (groupId: string) => {
    const group = groups.find((g) => g.groupId == groupId);
    if (group) {
      setGroup(group);
      console.log("setting tutors");
      setTutors(group.tutors);
    }
  };

  const onSave = () => {
    addLesson();
  };

  const onCancel = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    if (groups && groups.length > 0) {
      const initialGroup = groups.find((g) => g.groupId == groupId);

      onChangeGroup(initialGroup ? initialGroup.groupId : groups[0].groupId);
    }

    console.log("Groups ", groups);
  }, [groups]);

  useEffect(() => {
    setStartDate(lessonDate)
    setEndDate(lessonDate)

  }, [lessonDate])


  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isVisible}
      onRequestClose={() => {
        setIsVisible(!isVisible);
      }}
    >
      <AddLessonHeader onCancel={onCancel} onSave={onSave} />
      <View style={styles.screenContainer}>
        <View style={styles.field}>
          {PersonIcon}
          <Picker
            style={{ height: 50, width: 200 }}
            itemStyle={{ height: 20 }}
            mode="dropdown"
            selectedValue={selectedGroup ? selectedGroup.name : "Loading"}
            onValueChange={(groupId, itemIndex) => {
              onChangeGroup(groupId);
            }}
          >
            {groups.map((group, index) => (
              <Picker.Item label={group.name} value={group.name} key={index} />
            ))}
          </Picker>
        </View>

        <View style={styles.field}>
          {PinIcon}
          <TextInput placeholder="Location" onChangeText={setLocation} />
        </View>
        <View style={{ gap: 10 }}>
          <Text style={globalStyles.SubHeading}>Tutors</Text>
          {selectedGroup && (
            <FlatList
              data={selectedGroup.tutors}
              renderItem={({ item }) => {
                const user = userNames[item];

                return (
                  <View style={styles.field}>
                    {PersonIcon}
                    <Text>
                      {user ? `${user.firstName} ${user.lastName}` : "Loading"}
                    </Text>
                  </View>
                );
              }}
            />
          )}
        </View>

        <Text style={globalStyles.text_md}>Date & Time</Text>
        <View style={styles.dateTimeRow}>
          <DatePickerField date={startDate} setDate={setStartDate} />
          <TimePickerField date={startDate} setDate={setStartDate} />
        </View>
        <View style={styles.dateTimeRow}>
          <DatePickerField date={endDate} setDate={setEndDate} />
          <TimePickerField date={endDate} setDate={setEndDate} />
        </View>

        <View style={styles.repeatSelector}>
          {RepeatIcon}
          <Text>Repeat</Text>
        </View>
        <Text>Instructions</Text>
        <TextInput
          style={styles.instructions}
          placeholder="Type in instructions"
          onChangeText={setInstructions}
        />
      </View>
    </Modal>
  );
};

export default AddLesson;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 20,
    rowGap: 15,
  },
  field: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  text: {},
  instructions: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
  },
  dateTimeRow: {
    flexDirection: "row",
    gap: 10,
  },
  repeatSelector: {
    flexDirection: "row",
    gap: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    alignItems: "center",
  },

  lessonHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: MyTheme.colors.primary,
  },
});
