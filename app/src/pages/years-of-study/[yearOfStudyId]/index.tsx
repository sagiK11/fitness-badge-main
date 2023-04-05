import { HomeView } from "@/features";
import { getServerSidePropsWrapper } from "@/server";
import { classroomEndpoints } from "@/store/api/classroom.endpoint";

export default HomeView;

export const getServerSideProps = getServerSidePropsWrapper(
  async ({ store, context, user, session }) => {
    // Get classrooms
    store.dispatch(
      classroomEndpoints.endpoints.getTeacherClassrooms.initiate({
        teacherId: user?.id as string,
        yearOfStudyId: context.query.yearOfStudyId as string,
      })
    );

    //Wait for queries to finish
    await Promise.all(
      store.dispatch(classroomEndpoints.util.getRunningQueriesThunk())
    );

    return {
      props: { session },
    };
  }
);
