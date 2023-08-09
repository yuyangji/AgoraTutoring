import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import CourseCard, { CourseCardProps } from "./ProgramCard";
import { globalStaticStyles } from "../../useGlobalStyles";
import SearchField from "../../Components/SearchBar";
import { sendEnrolmentRequest } from "../../Firebase/FirebaseStudent";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { addProgram, selectPrograms, selectUser } from "../../Redux/userSlice";
import { getAllPrograms } from "../../Firebase/Firebase";
import { Program, ProgramLocal } from "../../Types/ModelTypes";
import ConfirmationModal from "./ConfirmationModal";
import { enrolInProgram } from "../../Redux/programSlice";

// const dummyData: Omit<CourseCardProps, "onPressEnrol" | "admin">[] = [
//   {
//     programID: "dfdfdf",
//     title: "English Language Accelerated",
//     tutors: ["Harley Zhong"],
//     price: 65,
//     rate: "1.5 hour",
//     subtitle: "40+ raw guarantee",
//     products: [
//       "Weekly lessons taught exclusively by Harley.",
//       "Out-of-class feedback & commentary on Essays & selected ACs.",
//       "10 recordings of Harley's Lessons, selected at your own choice (valued at $1,000).",
//     ],
//     start: new Date("2022-01-01T00:00:00"),
//     end: new Date("2024-12-31T18:30:00"),
//     isEnrolled: false,
//   },
// ];

const ProgramSearch = () => {
  const [programs, setPrograms] = useState<ProgramLocal[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedProgramID, setSelectedProgramID] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const myPrograms = useAppSelector(selectPrograms);
  const user = useAppSelector(selectUser)

  const onPressEnrol = (programID: string) => {
    setSelectedProgramID(programID);
    setShowModal(true);
    console.log("showing modal")
  };

  const ConfirmEnrolment = async() => {
    if (selectedProgramID) {
      await dispatch(enrolInProgram(selectedProgramID))
    }
    setLoading(false);
    setShowModal(false);
  }

  const OnPressConfirmEnrol = () => {
    setLoading(true);
    ConfirmEnrolment()
  };

  useEffect(() => {
    getAllPrograms().then((response) => {
      if (response.success) {
        console.log(response.data);
        setPrograms(response.data);
      }
    });
  }, []);

  return (
    <View style={globalStaticStyles.screen}>
      <SearchField additionalStyles={{ marginBottom: 14 }} />
      <FlatList
        data={programs}
        renderItem={({ item }) => (
          <CourseCard
            props={{
              ...item,
              onPressEnrol: onPressEnrol,
              isEnrolled:
                myPrograms.findIndex((programID) => programID == item.programId) !=
                -1,
            }}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <ConfirmationModal
        showModal={showModal}
        setShowModal={setShowModal}
        loading={loading}
        onConfirmEnrol={OnPressConfirmEnrol}
      />
    </View>
  );
};

export default ProgramSearch;
