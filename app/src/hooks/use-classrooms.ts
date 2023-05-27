import { classroomEndpoints } from "@/store/api/classroom.endpoint";
import React from "react";
import { useUser } from "./use-user";
import { useYearOfStudy } from "./use-year-of-study";
import { yearOfStudyEndpoints } from "@/store";
import { Classroom, GenderEnum } from "@/models";

export function useClassrooms() {
  const user = useUser();
  const { currentYearOfStudy } = useYearOfStudy();
  const [_addClassroomStudent] =
    yearOfStudyEndpoints.useAddClassroomStudentMutation();

  // Get all school's classroom
  const { data: allClassrooms } = classroomEndpoints.useFindClassroomsQuery({
    schoolId: user.schoolId,
  });

  // Get teacher's current classrooms for this current year of study
  const { data: classrooms } =
    yearOfStudyEndpoints.useFindTeacherClassroomsQuery(
      { teacherId: user?.id as string, yearOfStudyId: currentYearOfStudy.id },
      {
        skip: !user?.id || !currentYearOfStudy.id,
      }
    );

  // Add classroom for a teacher for a this current year of study
  const [_addTeacherClassroom] =
    yearOfStudyEndpoints.useAddTeacherClassroomMutation();

  const addTeacherClassroom = React.useCallback(
    async (classroomId?: string) => {
      if (!classroomId) return;
      await _addTeacherClassroom({
        teacherId: user.id,
        classroomId,
        yearOfStudyId: currentYearOfStudy.id,
      });
    },
    [_addTeacherClassroom, user, currentYearOfStudy]
  );

  const { availableMaleClassOptions, availableFemaleClassOptions } =
    React.useMemo(() => {
      const onlyAvailable = (cs1: Classroom) =>
        !classrooms?.find((cs2) => cs2.id === cs1.id);

      const availableClassrooms = allClassrooms?.filter(onlyAvailable);

      const onlyFemale = (classroom: Classroom) =>
        classroom.gender === GenderEnum.female;

      const onlyMale = (classroom: Classroom) =>
        classroom.gender === GenderEnum.male;

      const toSelect = (classroom: Classroom) => ({
        label: classroom.name,
        value: classroom.id,
      });

      const availableFemaleClassOptions =
        availableClassrooms?.filter(onlyFemale)?.map(toSelect) ?? [];

      const availableMaleClassOptions =
        availableClassrooms?.filter(onlyMale)?.map(toSelect) ?? [];

      return { availableFemaleClassOptions, availableMaleClassOptions };
    }, [allClassrooms, classrooms]);

  return {
    addTeacherClassroom,
    allClassrooms,
    availableFemaleClassOptions,
    availableMaleClassOptions,
    classrooms,
  };
}
