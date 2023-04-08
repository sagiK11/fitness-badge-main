import { yearOfStudyEndpoints } from "@/store";
import { useRouter } from "next/router";

export function useStudent() {
  const router = useRouter();
  const yearOfStudyId = router.query.yearOfStudyId as string;
  const classroomId = router.query.classroomId as string;
  const studentId = router.query.studentId as string;
  const {
    data: student,
    isLoading,
    isFetching,
  } = yearOfStudyEndpoints.useFindClassroomStudentQuery(
    {
      yearOfStudyId,
      classroomId,
      studentId,
    },
    { skip: !yearOfStudyId || !classroomId || !studentId }
  );

  return {
    student,
    isLoading: isLoading || isFetching,
  };
}
