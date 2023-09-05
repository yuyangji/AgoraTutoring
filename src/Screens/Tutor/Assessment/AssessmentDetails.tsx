import { View, Text, FlatList, StyleSheet } from "react-native";
import { useAppSelector } from "../../../Redux/hooks";
import { selectAssessments } from "../../../Redux/slices/assessmentsSlice";
import { useState } from "react";
import DatePickerField from "../../../Components/DatePickerField";
import FileItem from "../../../Components/FileItem";
import { BodyText, HighlightedHeading } from "../../../Styles/StyledTexts";
import { selectGroups } from "../../../Redux/slices/programSlice";
import {useMemo} from 'react'
const AssessmentDetails = ({ route }) => {
  const [{ startDate, endDate }, setDates] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  const { assessmentId } = route;
  const assessment = useAppSelector(selectAssessments).find(
    (a) => a.assessmentId == assessmentId
  );

  const groups = useAppSelector(selectGroups);

  const groupNames = useMemo(() => {
    return assessment.groups.map((groupId) => {
      const group = groups.find((g) => g.groupId === groupId);
      return group?.name;
    })

  }, [groups, assessment])

  const Section = ({ title, children }: { title: string; children }) => {
    return (
      <View>
        <HighlightedHeading>{title}</HighlightedHeading>
        <View style = {{padding: 10}}>
          {children}
        </View>
   
      </View>
    );
  };

  return (
    <View>
      {assessment && (
        <View>
          <Section title="Groups">
            <FlatList data={[groupNames]} renderItem={({ item }) => <BodyText>{item}</BodyText>} />
          </Section>
          <Section title="Instructions"><BodyText variant="dark">{assessment.submitInstructions}</BodyText></Section>
          <Section title="Open and Close">
            <DatePickerField date={startDate} setDate={(date) => setDates} />
            <DatePickerField date={startDate} setDate={(date) => setDates} />
          </Section>
          <Section title="Assessment Files">
            {assessment.files && assessment.files.map((file) => <FileItem file={file}/>)}
          </Section>
        </View>
      )}
    </View>
  );
};

export default AssessmentDetails;

const styles = StyleSheet.create({});
