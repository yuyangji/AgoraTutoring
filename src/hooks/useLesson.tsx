import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { useEffect, useState } from "react";
import { fetchLessons, selectLessons } from "../Redux/slices/lessonSlice";
import { Lesson } from "../Types/Lesson";

const useLessons = ({
  groupIds,
  startDate,
  endDate,
}: {
  groupIds: string[];
  startDate: Date;
  endDate?: Date;
}) => {
  const dispatch = useAppDispatch();
  const [lessons, setLessons] = useState<Lesson[]>([]);

  const getLessons = async (startDate: Date, endDate: Date) => {
    let end = endDate;
    if (!end) {
      end = new Date(startDate);
      end.setHours(23, 59, 59, 999);
    }

    const result = await dispatch(
      fetchLessons({ groupIds, startDate, endDate })
    ).unwrap();
    setLessons(result);
  };

  useEffect(() => {
    getLessons(startDate, endDate);
  }, [groupIds, startDate, endDate]);
  

  return { lessons };
};

export default useLessons;
