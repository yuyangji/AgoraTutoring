import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { MyTheme } from "../../../useGlobalStyles";
import GradesSubView from "./GradesView";
import SubmissionsSubView from "./SubmissionsView";
import SegmentedControl from "../../../Components/Navigation/SegmentedControl";

const data = [
  { title: "English Language Essay 1", score: "81/100", grade: "HD" },
  // Add more items as needed
];

const Assessments = () => {
  const options = ["Submission", "Grades"];
  const [selected, setSelected] = useState(options[0]);

  return (
    <SafeAreaView style={styles.ScreenContainer}>
      <SegmentedControl
        options={options}
        selected={selected}
        setSelected={setSelected}
      />
      {selected == "Grades" ? (
        <GradesSubView data={data} />
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
