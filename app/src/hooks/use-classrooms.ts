import { classroomEndpoints } from "@/store/api/classroom.endpoint";
import React from "react";
import { useUser } from "./use-user";
import { useYearOfStudy } from "./use-year-of-study";

export function useClassrooms() {
  const user = useUser();
  const { currentYearOfStudy } = useYearOfStudy();

  // Get teacher's current classrooms for a specific year of study on demand
  const [getClassrooms, getClassroomsResult] =
    classroomEndpoints.useLazyGetTeacherClassroomsQuery();

  // Get all school's classroom
  const { data: allClassrooms } = classroomEndpoints.useGetAllClassroomsQuery(
    user.schoolId
  );

  // Get teacher's current classrooms for this current year of study
  const { data: classrooms } = classroomEndpoints.useGetTeacherClassroomsQuery(
    { teacherId: user?.id as string, yearOfStudyId: currentYearOfStudy.id },
    {
      skip: !user?.id,
    }
  );

  // Add classroom for a teacher for a this current year of study
  const [_addTeacherClassroom] =
    classroomEndpoints.useAddTeacherClassroomMutation();

  const addTeacherClassroom = React.useCallback(
    async (classroomId: string) => {
      await _addTeacherClassroom({
        teacherId: user.id,
        classroomId,
        yearOfStudyId: currentYearOfStudy.id,
      });
    },
    [_addTeacherClassroom, user, currentYearOfStudy]
  );

  const allSchoolClassesOptions = React.useMemo(
    () =>
      allClassrooms
        ?.map((classroom) => ({
          label: classroom.name,
          value: classroom.id,
        }))
        ?.filter((cs1) => !classrooms?.find((cs2) => cs2.id === cs1.value)) ??
      [],
    [allClassrooms, classrooms]
  );

  return {
    addTeacherClassroom,
    allClassrooms,
    allSchoolClassesOptions,
    classrooms,
    getClassrooms,
    getClassroomsResult,
    isLoading: getClassroomsResult.isLoading || getClassroomsResult.isFetching,
  };
}
