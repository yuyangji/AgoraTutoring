import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Modal,
} from "react-native";
import { MyTheme, globalStyles, GlobalValues } from "../../Styles/useGlobalStyles";
import { Icons } from "../../Components/Icons/Icons";
import DatePickerField from "../../Components/DatePickerField";
import TimePickerField from "../../Components/TimePickerField";
import SubmitBoxButton from "../../Components/SubmitBoxButton";
import { DocumentPickerResponse } from "react-native-document-picker";
import { useAppSelector } from "../../Redux/hooks";
import { selectPrograms, selectGroups } from "../../Redux/slices/programSlice";
import { Group } from "../../Types/Group";
import AddGroup from "./AddGroupModal";
import { Program } from "../../Types/Program";
import { useNavigation } from "@react-navigation/native";
import { Assessment, AssessmentDb } from "../../Types/Assessment";
import { createAssessment } from "../../Database/Firebase/AssessmentsApi";
import useDocumentUploader from "../../hooks/useDocumentUploader";
import { AssessmentsDb } from "../../Database/Firebase/Firebase";

const CreateAssessmentHeader = ({
  onCancel,
  onSave,
}: {
  onCancel: () => void;
  onSave: () => void;
}) => {
  return (
    <View style={headerStyle.container}>
      <TouchableOpacity onPress={onCancel}>{Icons.back}</TouchableOpacity>

      <Text style={headerStyle.pageTitle}>New Assessment</Text>
      <TouchableOpacity onPress={onSave}>{Icons.check}</TouchableOpacity>
    </View>
  );
};

const headerStyle = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: MyTheme.colors.primary,
  },
  pageTitle: {
    fontSize: 20,
    color: "white",
  },
});

const CreateAssessment = () => {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [groups, setGroups] = useState<Group[]>([]);
  const [program, setProgram] = useState<Program>();
  const [instructions, setInstructions] = useState<string>("");
  const [isForProgram, setIsForProgram] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false);

  const allGroups = useAppSelector(selectGroups);
  const allPrograms = useAppSelector(selectPrograms);

  const { pickResults, onPickDocuments, handleUpload } = useDocumentUploader();

  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };
  const onSave = async () => {
    if (!program) return;
  
    const assessment: Assessment = {
      assessmentId: "",
      title: title,
      programId: program.programId,
      open: startDate.toISOString(),
      close: endDate.toISOString(),
      submitInstructions: instructions,
      files: [],
      groups: groups.map((group) => group.groupId),
    };
  
    try {
      const assessmentId = await createAssessment(assessment);
  
      const getStoragePath = (result: DocumentPickerResponse) => {
        return `${assessmentId}/files/${result.name}`;
      };
      const getFirestoreRef = () => {
        return AssessmentsDb.doc(assessmentId);
      };
  
      try {
        await handleUpload(getStoragePath, getFirestoreRef);
        goBack();
      } catch (e) {
        console.log("Error uploading files. Deleting assessment document.");
        await AssessmentsDb.doc(assessmentId).delete(); // Delete the assessment document if file upload fails
        throw e; // Re-throw the error to be caught by the outer catch block
      }
    } catch (e) {
      console.log("Error creating assessment");
    }
  };
  

  const onSetInstruction = (input: string) => {
    setInstructions(input);
  };

  const onAddGroup = (group: Group) => {
    setGroups([...groups, group]);
  };

  useEffect(() => {
    if (allPrograms) setProgram(allPrograms[0]);
  }, [allPrograms]);

  return (
    <View style={styles.screen}>
      <CreateAssessmentHeader onCancel={goBack} onSave={onSave} />
      <Modal
        animationType="slide"
        transparent={false}
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(false);
        }}
      >
        <AddGroup
          allGroups={allGroups}
          addGroup={onAddGroup}
          setIsVisible={setIsModalVisible}
        />
      </Modal>
      <View style={styles.main}>
        <TextInput
          onChangeText={setTitle}
          style={{
            fontSize: 18,
            paddingHorizontal: 3,
            paddingVertical: 5,
            borderBottomWidth: 0.5,
            borderColor: "gray",
          }}
          placeholder="Title"
        />
        <Text style={globalStyles.SubHeading}>Program</Text>
        <View
          style={{
            borderWidth: 0.5,
            paddingHorizontal: 10,
            paddingVertical: 10,
            borderColor: "gray",
            borderRadius: 4,
          }}
        >
          <Text style={globalStyles.text_md}>{program ? program.title : ""}</Text>
        </View>
        <Text style={globalStyles.SubHeading}>Groups</Text>
        <View>
          <FlatList
            data={groups}
            renderItem={({ item }) => (
              <View style={{ marginBottom: 5 }}>
                <Text>{item.name}</Text>
              </View>
            )}
          />
          <TouchableOpacity onPress={() => setIsModalVisible(true)}>
            {Icons.plus(MyTheme.colors.secondary)}
          </TouchableOpacity>
        </View>

        <View style={{ gap: 10 }}>
          <Text style={globalStyles.SubHeading}>Open and Close</Text>
          <View style={styles.dateTimeRow}>
            <DatePickerField date={startDate} setDate={setStartDate} />
            <TimePickerField date={startDate} setDate={setStartDate} />
          </View>
          <View style={styles.dateTimeRow}>
            <DatePickerField date={endDate} setDate={setEndDate} />
            <TimePickerField date={endDate} setDate={setEndDate} />
          </View>
        </View>

        <Text style={globalStyles.SubHeading}>Assessment Files</Text>
        <SubmitBoxButton onPickDocuments={onPickDocuments} pickResults={pickResults} />
        <Text style={globalStyles.SubHeading}>Submission Instructions</Text>
        <TextInput
          onChangeText={onSetInstruction}
          style={styles.submissionInstructions}
          placeholder="Optionally add submission instructions"
        />
      </View>
    </View>
  );
};

export default CreateAssessment;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  main: {
    paddingVertical: GlobalValues.screenPaddingVertical,
    paddingHorizontal: GlobalValues.screenPaddingHorizontal,
    gap: 20,
  },

  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  dateTimeRow: {
    flexDirection: "row",
    gap: 10,
  },
  submissionInstructions: {
    padding: 10,
  },
});
