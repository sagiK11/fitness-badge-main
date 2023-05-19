import { SchoolDetailsView } from "@/features";
import { getServerSidePropsWrapper } from "@/server";
import { schoolEndpoints } from "@/store";

export default SchoolDetailsView;

export const getServerSideProps = getServerSidePropsWrapper(
  async ({ store, context, user, session }) => {
    // Get teacher's classrooms
    store.dispatch(
      schoolEndpoints.endpoints.getTeachers.initiate(
        context.query.schoolId as string
      )
    );

    //Wait for queries to finish
    await Promise.all(
      store.dispatch(schoolEndpoints.util.getRunningQueriesThunk())
    );

    return {
      props: { session },
    };
  }
);
