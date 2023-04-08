import { HomeView } from "@/features";
import { getServerSidePropsWrapper } from "@/server";
import { yearOfStudyEndpoints } from "@/store";
import { classroomEndpoints } from "@/store/api/classroom.endpoint";

export default HomeView;

export const getServerSideProps = getServerSidePropsWrapper(
  async ({ store, context, user, session }) => {
    // Get teacher's classrooms
    store.dispatch(
      yearOfStudyEndpoints.endpoints.findTeacherClassrooms.initiate({
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
