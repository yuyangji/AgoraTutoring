import { useState, useEffect } from "react";
import {

  StyleSheet,
  SafeAreaView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { MyTheme } from "../../../useGlobalStyles";
import GradesSubView from "./GradesView";
import SubmissionsSubView from "./SubmissionsView";
import SegmentedControl from "../../../Components/Navigation/SegmentedControl";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import { fetchSubmissions, selectSubmissionByAssessmentDict, selectSubmissions } from "../../../Redux/slices/submissionsSlice";
import { selectAssessments } from "../../../Redux/slices/assessmentsSlice";

const data = [
  { title: "English Language Essay 1", score: "81/100", grade: "HD" },
  // Add more items as needed
];

const percentToGrade = (percent) => {
  if (percent >= 85) return "HD";
  if (percent >= 75) return "D";
  if (percent >= 65) return "C";
  if (percent >= 50) return "P";
  return "F";
}
export type GradeItemProps = {
  title: string;
  score: string;
  grade: string;
}
export type GradesSubViewProps = {
  data : GradeItemProps[]
}

const Assessments = () => {
  const options = ["Submission", "Grades"];
  const [selected, setSelected] = useState(options[0]);
  const [grades, setGrades] = useState<GradeItemProps[]>([])

  const assessments = useAppSelector(selectAssessments);
  const submissions = useAppSelector(selectSubmissions)
  const submissionByAssessId = useAppSelector(selectSubmissionByAssessmentDict);
  const dispatch = useAppDispatch()

  useEffect(() => {
    if(submissions.length == 0) return
    console.log("assessment Dict  ",  submissionByAssessId )
    let grades = []
    for (let i = 0; i < assessments.length; i++) {
      const assessment = assessments[i];
      const submission = submissionByAssessId[assessment.assessmentId];
     
      if (submission == undefined) {
        grades.push({title: assessment.title, score: 0, grade: "Ungraded"})
      } else {
        const score = submission.grade ?? 0
        const grade = percentToGrade(score)
        grades.push({title: assessment.title, score: score, grade: grade})
      }
    }
    setGrades(grades)
  }, [submissions])

  useEffect(() => {
    const fetchData = async () => {
      if (assessments) {
        const result = await dispatch(fetchSubmissions(assessments)).unwrap();
        console.log("result ", result)
      }
    };
    fetchData();
  }, [assessments]);


  return (
    <SafeAreaView style={styles.ScreenContainer}>
      <SegmentedControl
        options={options}
        selected={selected}
        setSelected={setSelected}
      />
      {selected == "Grades" ? (
        <GradesSubView data={grades} />
      ) : (
        <SubmissionsSubView />
      )}
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
