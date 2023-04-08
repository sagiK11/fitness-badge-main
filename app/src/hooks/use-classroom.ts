import React from "react";
import { useYearOfStudy } from "./use-year-of-study";
import { yearOfStudyEndpoints } from "@/store";
import { useUser } from "./use-user";
import { useRouter } from "next/router";

export function useClassroom() {
  const user = useUser();
  const router = useRouter();
  const classroomId = router.query.classroomId as string;
  const { currentYearOfStudy } = useYearOfStudy();
  const [_addClassroomStudent] =
    yearOfStudyEndpoints.useAddClassroomStudentMutation();

  const { data: classroom } = yearOfStudyEndpoints.useFindTeacherClassroomQuery(
    {
      teacherId: user?.id as string,
      yearOfStudyId: currentYearOfStudy.id,
      classroomId,
    },
    {
      skip: !user?.id || !currentYearOfStudy.id || !classroomId,
    }
  );

  const addClassroomStudent = React.useCallback(
    async ({
      classroomId,
      studentId,
    }: {
      studentId?: string;
      classroomId?: string;
    }) => {
      if (!classroomId || !studentId) return;
      await _addClassroomStudent({
        classroomId,
        yearOfStudyId: currentYearOfStudy.id,
        studentId,
      });
    },
    [_addClassroomStudent, currentYearOfStudy]
  );

  return {
    classroom,
    addClassroomStudent,
  };
}
