import { StudentDetailsViewView } from "@/features";
import { getServerSidePropsWrapper } from "@/server";
import { yearOfStudyEndpoints } from "@/store";
import { classroomEndpoints } from "@/store/api/classroom.endpoint";

export default StudentDetailsViewView;

export const getServerSideProps = getServerSidePropsWrapper(
  async ({ store, context, user, session }) => {
    // Get student
    store.dispatch(
      yearOfStudyEndpoints.endpoints.findClassroomStudent.initiate({
        yearOfStudyId: context.query.yearOfStudyId as string,
        classroomId: context.query.classroomId as string,
        studentId: context.query.studentId as string,
      })
    );

    await Promise.all(
      store.dispatch(classroomEndpoints.util.getRunningQueriesThunk())
    );

    return {
      props: { session },
    };
  }
);
