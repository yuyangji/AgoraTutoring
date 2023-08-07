import React, {useState} from 'react';
import { View, FlatList } from 'react-native';
import CourseCard, { CourseCardProps } from './CourseCard';
import { globalStaticStyles } from '../../useGlobalStyles';
import SearchField from '../../Components/SearchBar';
import { sendEnrolmentRequest } from '../../Firebase/FirebaseStudent';
import { useAppSelector } from '../../Redux/hooks';
import { selectUser } from '../../Redux/userSlice';

const dummyData: Omit<CourseCardProps,"onPressEnrol">[]  = [
  {
    title: 'English Language Accelerated',
    tutors: ['Harley Zhong'],
    price: 65,
    rate: '1.5 hour',
    subtitle: '40+ raw guarantee',
    products: [
      "Weekly lessons taught exclusively by Harley.",
      "Out-of-class feedback & commentary on Essays & selected ACs.",
      "10 recordings of Harley's Lessons, selected at your own choice (valued at $1,000).",
    ],
    start: '01/08/2023',
    end: '30/12/2023',
   isEnrolled : false
  },
];

const BrowseCourses = () => {

  const [enrolled,setEnrolled] = useState([])
  const userState = useAppSelector(selectUser)

  const onPressEnrol = async (courseId: string) => {

      const userID = userState.user.id
      const result = await sendEnrolmentRequest(courseId,userID)
  }

  return (
      <View style={globalStaticStyles.screen}>
          <SearchField additionalStyles={{marginBottom: 14}} />
      <FlatList
        data={dummyData}
        renderItem={({ item }) => <CourseCard props= {{...item, onPressEnrol :onPressEnrol}}/>}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default BrowseCourses;
