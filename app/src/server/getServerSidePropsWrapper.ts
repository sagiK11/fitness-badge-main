import { Teacher, YearOfStudy } from "@/models";
import { routesTree } from "@/routesTree";
import {
  AppStore,
  teacherEndpoints,
  wrapper,
  yearOfStudyEndpoints,
} from "@/store";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

type Callback = (param: {
  store: AppStore;
  context: GetServerSidePropsContext;
  user: Teacher;
  session: Session;
  yearsOfStudy: YearOfStudy[];
}) => Promise<GetServerSidePropsResult<any>>;

export function getServerSidePropsWrapper(callback: Callback) {
  return wrapper.getServerSideProps((store) => async (context) => {
    const session = await getSession(context);
    // Extra safety check, the auth is handled in middleware.ts
    if (!session) {
      return {
        redirect: {
          destination: routesTree().auth,
          permanent: false,
        },
      };
    }
    const { user: authUser } = session;

    const defaultEndpoints = [
      teacherEndpoints.endpoints.getTeacher.initiate(authUser?.email as string),
      yearOfStudyEndpoints.endpoints.findMany.initiate(),
      // Add here more
    ];

    // Fire default endpoints
    const [user, yearsOfStudy] = await Promise.all(
      defaultEndpoints.map((action: any) => store.dispatch(action).unwrap())
    );

    if (!user?.id) {
      return {
        redirect: {
          destination: routesTree().auth,
          permanent: false,
        },
      };
    }

    return callback({ store, context, user, session, yearsOfStudy });
  });
}
