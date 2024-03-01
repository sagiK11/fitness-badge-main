import { useYearOfStudy } from "./use-year-of-study";
import {
  UploadStudentsPayload,
  classroomEndpoints,
  yearOfStudyEndpoints,
} from "@/store";
import { useUser } from "./use-user";
import { useRouter } from "next/router";
import { useAsync } from "./use-async";

export function useClassroom() {
  const user = useUser();
  const router = useRouter();
  const classroomId = router.query.classroomId as string;
  const { currentYearOfStudy } = useYearOfStudy();
  const [_addClassroomStudent] =
    yearOfStudyEndpoints.useAddClassroomStudentMutation();
  const [_uploadStudents] =
    classroomEndpoints.useUploadStudentsFromXlsxMutation();

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

  const [addClassroomStudent] = useAsync({
    func: async ({
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
  });

  const [uploadStudents, { isLoading }] = useAsync({
    func: async (payload: UploadStudentsPayload) => {
      await _uploadStudents(payload).unwrap();
    },
  });

  return {
    classroom,
    addClassroomStudent,
    uploadStudents,
    isUploading: isLoading,
  };
}
