import { Option } from "@/components";
import { yearOfStudyEndpoints } from "@/store";
import { useRouter } from "next/router";
import React from "react";

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

  const { data: availableTests } =
    yearOfStudyEndpoints.useFindStudentAvailableTestsQuery({
      studentId,
      yearOfStudyId,
    });

  const availableTestsOptions: Option[] = React.useMemo(() => {
    return (
      availableTests?.map((test) => {
        return { label: test.name, value: test.id };
      }) ?? []
    );
  }, [availableTests]);

  const [_addStudentTest] =
    yearOfStudyEndpoints.useAddStudentTestCategoryMutation();

  const addStudentTest = React.useCallback(
    async (testCategoryId?: string) => {
      if (!testCategoryId) return;
      await _addStudentTest({
        studentId,
        testCategoryId,
        yearOfStudyId,
      });
    },
    [_addStudentTest, yearOfStudyId, studentId]
  );

  return {
    student,
    isLoading: isLoading || isFetching,
    availableTests,
    availableTestsOptions,
    addStudentTest,
  };
}
