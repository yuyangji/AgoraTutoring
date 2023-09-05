import { useState, useEffect, useMemo } from "react";
import { StyleSheet, SafeAreaView } from "react-native";

import { MyTheme } from "../../../Styles/useGlobalStyles";
import GradesSubView from "./GradesView";
import SubmissionsSubView from "./SubmissionsView";
import SegmentedControl from "../../../Components/Navigation/SegmentedControl";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";

import {
  selectAssessmentIds,
  selectAssessments,
} from "../../../Redux/slices/assessmentsSlice";
import {useSubmissions} from "../../../hooks/useSubmission";
import { selectUser } from "../../../Redux/slices/userSlice";
import { percentToGrade } from "../../../Utils";


export type GradeItemProps = {
  title: string;
  score: string;
  grade: string;
};
export type GradesSubViewProps = {
  data: GradeItemProps[];
};

const Assessments = () => {
  const options = ["Submission", "Grades"];
  const [selected, setSelected] = useState(options[0]);
  const [grades, setGrades] = useState<GradeItemProps[]>([]);

  const assessmentIds = useAppSelector(selectAssessmentIds);
  const assessments = useAppSelector(selectAssessments);
  const { submissions } = useSubmissions(assessmentIds);

  useEffect(() => {
    if (!submissions || submissions.length == 0) return;
    let grades = [];
    assessments.forEach((assessment) => {
      const submission = submissions.find(
        (s) => s.assessmentId == assessment.assessmentId
      );
      if (submission == undefined) {
        grades.push({ title: assessment.title, score: 0, grade: "Ungraded" });
      } else {
        const grade = submission.grade ? percentToGrade(submission.grade) : 0;
        grades.push({
          title: assessment.title,
          score: submission.grade ?? 0,
          grade: grade,
        });
      }
    });

    setGrades(grades);
  }, [submissions]);

  return (
    <SafeAreaView style={styles.ScreenContainer}>
      <SegmentedControl options={options} selected={selected} setSelected={setSelected} />
      {selected == "Grades" ? <GradesSubView data={grades} /> : <SubmissionsSubView />}
    </SafeAreaView>
  );
};

export default Assessments;

const styles = StyleSheet.create({
  ScreenContainer: {
    flexDirection: "column",
    backgroundColor: "white",
    paddingTop: 20,
    gap: 10,
    flex: 1,
  },
});
