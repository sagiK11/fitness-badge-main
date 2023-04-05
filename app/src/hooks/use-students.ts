import { studentEndpoints } from "@/store";
import { useRouter } from "next/router";
import { useUser } from "./use-user";
import { useYearOfStudy } from "./use-year-of-study";

export function useStudents() {
  const user = useUser();
  const router = useRouter();
  const { currentYearOfStudy } = useYearOfStudy();
  const classroomId = router.query.classroomId as string;

  const {
    data: students,
    isLoading,
    isFetching,
  } = studentEndpoints.useGetTeacherClassroomStudentsQuery(
    {
      teacherId: user.id,
      classroomId,
      yearOfStudyId: currentYearOfStudy.id,
    },
    { skip: !user.id || !classroomId || !currentYearOfStudy.id }
  );

  return {
    students,
    isLoading: isLoading || isFetching,
  };
}
