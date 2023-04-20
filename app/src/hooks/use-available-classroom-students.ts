import { classroomEndpoints } from "@/store";
import { formatName } from "@/utils";
import { useRouter } from "next/router";
import React from "react";

export function useAvailableClassroomStudents() {
  const router = useRouter();
  const classroomId = router.query.classroomId as string;

  const { data: availableStudents } =
    classroomEndpoints.useFindAvailableStudentsQuery(classroomId, {
      skip: !classroomId,
    });

  const availableStudentsOptions = React.useMemo(
    () =>
      availableStudents?.map((student) => ({
        label: formatName(student),
        value: student.id,
      })) ?? [],
    [availableStudents]
  );

  return { availableStudents, availableStudentsOptions };
}
