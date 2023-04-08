import { studentEndpoints, yearOfStudyEndpoints } from "@/store";
import { useRouter } from "next/router";
import { useUser } from "./use-user";
import { useYearOfStudy } from "./use-year-of-study";
import React from "react";
import { formatName } from "@/utils";

export function useStudents() {
  const user = useUser();
  const router = useRouter();
  const { currentYearOfStudy } = useYearOfStudy();
  const classroomId = router.query.classroomId as string;

  const {
    data: classroom,
    isLoading,
    isFetching,
  } = yearOfStudyEndpoints.useFindTeacherClassroomQuery(
    {
      teacherId: user.id,
      classroomId,
      yearOfStudyId: currentYearOfStudy.id,
    },
    { skip: !user.id || !classroomId || !currentYearOfStudy.id }
  );

  const { data: allStudents } = studentEndpoints.useGetAllStudentsQuery(
    { schoolId: user.schoolId },
    {
      skip: !user.id,
    }
  );

  const classAvailableStudentOptions = React.useMemo(
    () =>
      allStudents
        ?.filter(
          (st1) => !classroom?.students?.find?.((st2) => st2.id === st1.id)
        )
        ?.map((student) => ({
          label: formatName(student),
          value: student.id,
        })) ?? [],
    [allStudents, classroom?.students]
  );

  return {
    students: classroom?.students,
    isLoading: isLoading || isFetching,
    classAvailableStudentOptions,
  };
}
