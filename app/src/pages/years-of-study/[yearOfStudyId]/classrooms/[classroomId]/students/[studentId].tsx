import { StudentDetailsViewView } from "@/features";
import { getServerSidePropsWrapper } from "@/server";
import { studentEndpoints } from "@/store";
import { classroomEndpoints } from "@/store/api/classroom.endpoint";

export default StudentDetailsViewView;

export const getServerSideProps = getServerSidePropsWrapper(
  async ({ store, context, user, session }) => {
    // Get students
    store.dispatch(
      studentEndpoints.endpoints.getTeacherClassroomStudent.initiate({
        teacherId: user?.id as string,
        yearOfStudyId: context.query.yearOfStudyId as string,
        classroomId: context.query.classroomId as string,
        studentId: context.query.studentId as string,
      })
    );

    //Clean
    await Promise.all(
      store.dispatch(classroomEndpoints.util.getRunningQueriesThunk())
    );

    return {
      props: { session },
    };
  }
);
