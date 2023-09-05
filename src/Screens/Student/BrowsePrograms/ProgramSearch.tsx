import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import CourseCard, { CourseCardProps } from "./ProgramCard";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import {
  enrolInProgram,
  selectProgramIds,
} from "../../../Redux/slices/programSlice";
import { globalStyles } from "../../../Styles/useGlobalStyles";
import SearchField from "../../../Components/SearchBar";
import { getAllPrograms } from "../../../Database/Firebase/Firebase";
import ConfirmationModal from "./ConfirmationModal";
import { Program } from "../../../Types/Program";
import { selectUser } from "../../../Redux/slices/userSlice";
import { getStudentEnrolmentRequests } from "../../../Database/Firebase/EnrolmentApi";
import { SafeScreen } from "../../../Styles/Layout";

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
  const [allPrograms, setPrograms] = useState<Program[]>([]);
  const [pendingPrograms, setPendingPrograms] = useState<string[]>([]);
  const [selectedProgramID, setSelectedProgramID] = useState<string | null>(
    null
  );

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const myPrograms = useAppSelector(selectProgramIds);
  const user = useAppSelector(selectUser);

  const onPressEnrolbtn = (programID: string) => {
    setSelectedProgramID(programID);
    setShowModal(true);
    console.log("showing modal");
  };

  const onPressConfirmEnrolment = async () => {
    setLoading(true);
    if (selectedProgramID) {
      await dispatch(enrolInProgram(selectedProgramID));
    }
    setLoading(false);
    setShowModal(false);
  };

  const isPending = (programId: string) => {
    return pendingPrograms.findIndex((id) => id == programId) != -1;
  };
  const isEnrolled = (programId: string): boolean => {
    return myPrograms.findIndex((p) => p == programId) != -1;
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const programs = await getAllPrograms();
        const requests = await getStudentEnrolmentRequests(user.id);

        setPrograms(programs);
        setPendingPrograms(requests.map((request) => request.programId));
      } catch (e) {}
    };
    getData();
    return () => {};
  }, []);

  return (
    <SafeScreen >
      <SearchField additionalStyles={{ marginBottom: 14 }} />
      <FlatList
        data={allPrograms}
        renderItem={({ item }) => (
          <CourseCard
            props={{
              ...item,
              onPressEnrol: onPressEnrolbtn,
              enrolmentState: isPending(item.programId)
                ? "pending"
                : isEnrolled(item.programId)
                ? "enrolled"
                : "none",
            }}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <ConfirmationModal
        showModal={showModal}
        setShowModal={setShowModal}
        loading={loading}
        onConfirmEnrol={onPressConfirmEnrolment}
      />
    </SafeScreen>
  );
};

export default ProgramSearch;
