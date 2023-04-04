import { studentEndpoints } from "@/store";
import { useRouter } from "next/router";
import { useUser } from "./use-user";

export function useStudents() {
  const user = useUser();
  const router = useRouter();
  const classroomId = router.query.classroomId as string;

  const {
    data: students,
    isLoading,
    isFetching,
  } = studentEndpoints.useGetTeacherClassroomStudentsQuery(
    {
      teacherId: user.id,
      classroomId,
    },
    { skip: !user.id || !classroomId }
  );

  return {
    students,
    isLoading: isLoading || isFetching,
  };
}
