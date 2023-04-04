import { classroomEndpoints } from "@/store/api/classroom.endpoint";
import { useUser } from "./use-user";

export function useClassrooms() {
  const teacher = useUser();
  const [getClassrooms, getClassroomsResult] =
    classroomEndpoints.useLazyGetTeacherClassroomsQuery();
  const { data: classrooms } = classroomEndpoints.useGetTeacherClassroomsQuery(
    { teacherId: teacher?.id as string },
    {
      skip: !teacher?.id,
    }
  );

  return {
    classrooms,
    getClassrooms,
    getClassroomsResult,
    isLoading: getClassroomsResult.isLoading || getClassroomsResult.isFetching,
  };
}
