import { studentEndpoints } from "@/store";
import { useRouter } from "next/router";
import { useUser } from "./use-user";

export function useStudent() {
  const user = useUser();
  const router = useRouter();
  const classroomId = router.query.classroomId as string;
  const studentId = router.query.studentId as string;
  const {
    data: student,
    isLoading,
    isFetching,
  } = studentEndpoints.useGetTeacherClassroomStudentQuery(
    {
      teacherId: user.id,
      classroomId,
      studentId,
    },
    { skip: !user.id || !classroomId || !studentId }
  );

  return {
    student,
    isLoading: isLoading || isFetching,
  };
}
