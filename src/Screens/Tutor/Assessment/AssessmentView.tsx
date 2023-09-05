import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Pressable,
  FlatList,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { MyTheme, globalStyles } from "../../../Styles/useGlobalStyles";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import { AntDesign } from "@expo/vector-icons";
import { useAppSelector } from "../../../Redux/hooks";
import { selectAssessments } from "../../../Redux/slices/assessmentsSlice";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TutorRootStackParamList } from "../../../Navigation/Tutor/NavigatorTypes";
import Submissions from "./SubmissionsView";
import AssessmentDetails from "./AssessmentDetails";

import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useWindowDimensions } from 'react-native';


const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: MyTheme.colors.secondary }}
    style={{ backgroundColor: MyTheme.colors.surfaceDark }}
    activeColor={MyTheme.colors.secondary}
    inactiveColor='white'
  />
);
const AssessmentTabs = ({ assessmentId }) => {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'submissions', title: 'Submissions', assessmentId },
    { key: 'details', title: 'Details', assessmentId },
  ]);

  const renderScene = SceneMap({
    submissions: Submissions,
    details: AssessmentDetails,
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={renderTabBar}
    />
  );
};



const DownloadButon = () => {
  return (
    <TouchableOpacity style={styles.downloadBtn}>
      <MaterialCommunityIcons name="download-box" size={20} color="white" />
    </TouchableOpacity>
  );
};



type AssessmentViewProps = NativeStackScreenProps<TutorRootStackParamList, "Assessment">;

const AssessmentView = ({ navigation, route }: AssessmentViewProps) => {
  const { assessmentId } = route.params;
  const assessment = useAppSelector(selectAssessments).find(
    (a) => a.assessmentId == assessmentId
  );
    
  return (
    <View style = {{flex: 1}}>
      <View
        style={{
          backgroundColor: MyTheme.colors.backgroundDark,
          gap: 8,
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ flexDirection: "row", gap: 4 }}
        >
          <AntDesign name="arrowleft" size={24} color="white" />

          <Text style={{ color: "white", fontSize: 15 }}>Back</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.headerContainer}>


        <Text style={styles.title}>{assessment.title}</Text>
     
          <Text style={styles.groupName}>Specialist Class A</Text>
          <View style={styles.row}>
            <Text style={styles.dateTime}>Open {assessment.open}</Text>
            <Text style={styles.dateTime}>Close {assessment.close}</Text>
          </View>
       
      </View>
        <AssessmentTabs assessmentId={assessmentId} />
      
    </View>
  );
};

export default AssessmentView;

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: MyTheme.colors.backgroundDark,
    padding: 15,
    paddingTop: 10,
    gap: 15,
    paddingBottom: 20,
    elevation: 10,
  },
  headerFooter: {
    flexDirection: "row",
    gap: 2,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
  },
  groupName: {
    fontWeight: "300",
    color: "white",
    fontSize: 15,
  },
  row: {
    flexDirection: "row",
    gap: 15,
  },
  dateTime: {
    fontSize: 12,
    color: MyTheme.colors.secondary,
    fontWeight: "300",
  },
  downloadBtn: {
    flexDirection: "row",
    gap: 4,
    backgroundColor: MyTheme.colors.secondary,
    alignItems: "center",
    borderRadius: 7,
    paddingVertical: 5,
    paddingHorizontal: 8,
  },
  downloadText: {
    fontSize: 12,
    color: "white",
  },

  list: {
    marginTop: 8,
  },

  lightHeaderText: {
    fontSize: 13,
    color: "white",
  },
  editBtn: {
    position: "absolute",
    top: 20,
    right: 0,
  },

});
