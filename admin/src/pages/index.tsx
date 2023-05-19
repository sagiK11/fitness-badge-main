import { HomeView } from "@/features";
import { getServerSidePropsWrapper } from "@/server";

export default HomeView;

export const getServerSideProps = getServerSidePropsWrapper(
  async ({ store, context, user, session }) => {
    return {
      props: { session },
    };
  }
);
