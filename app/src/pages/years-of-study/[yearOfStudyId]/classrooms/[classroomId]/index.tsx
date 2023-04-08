import { ClassroomDetailsView } from "@/features";
import { getServerSidePropsWrapper } from "@/server";
import { yearOfStudyEndpoints } from "@/store";
import { classroomEndpoints } from "@/store/api/classroom.endpoint";

export default ClassroomDetailsView;

export const getServerSideProps = getServerSidePropsWrapper(
  async ({ store, context, user, session }) => {
    // Get teacher classroom
    store.dispatch(
      yearOfStudyEndpoints.endpoints.findTeacherClassroom.initiate({
        teacherId: user?.id as string,
        yearOfStudyId: context.query.yearOfStudyId as string,
        classroomId: context.query.classroomId as string,
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
