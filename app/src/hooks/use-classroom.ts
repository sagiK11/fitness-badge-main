import React from "react";
import { useYearOfStudy } from "./use-year-of-study";
import {
  UploadStudentsPayload,
  classroomEndpoints,
  yearOfStudyEndpoints,
} from "@/store";
import { useUser } from "./use-user";
import { useRouter } from "next/router";

export function useClassroom() {
  const user = useUser();
  const router = useRouter();
  const classroomId = router.query.classroomId as string;
  const { currentYearOfStudy } = useYearOfStudy();
  const [_addClassroomStudent] =
    yearOfStudyEndpoints.useAddClassroomStudentMutation();
  const [_uploadStudents, uploadResult] =
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

  const uploadStudents = React.useCallback(
    async (payload: UploadStudentsPayload) => {
      try {
        await _uploadStudents(payload).unwrap();
      } catch (error) {
        console.log(error);
      }
    },
    [_uploadStudents]
  );

  return {
    classroom,
    addClassroomStudent,
    uploadStudents,
    isUploading: uploadResult.isLoading,
  };
}
