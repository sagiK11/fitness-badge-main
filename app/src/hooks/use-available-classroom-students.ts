import { yearOfStudyEndpoints } from "@/store";
import { formatNameWithIsraelId } from "@/utils";
import { useRouter } from "next/router";
import React from "react";

export function useAvailableClassroomStudents() {
  const router = useRouter();
  const yearOfStudyId = router.query.yearOfStudyId as string;
  const classroomId = router.query.classroomId as string;

  const { data: availableStudents } =
    yearOfStudyEndpoints.useFindClassroomAvailableStudentsQuery(
      { classroomId, yearOfStudyId },
      {
        skip: !classroomId,
      }
    );

  const availableStudentsOptions = React.useMemo(
    () =>
      availableStudents?.map((student) => ({
        label: formatNameWithIsraelId(student),
        value: student.id,
      })) ?? [],
    [availableStudents]
  );

  return { availableStudents, availableStudentsOptions };
}
