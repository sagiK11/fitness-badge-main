import { ViewWrapper } from "@/components";
import { routesTree } from "@/routesTree";
import { getServerSidePropsWrapper } from "@/server";
import { getYearOfStudyByCurrentDate } from "@/utils";

export default function View() {
  return <ViewWrapper title="Redirecting...">Redirecting...</ViewWrapper>;
}

export const getServerSideProps = getServerSidePropsWrapper(
  async ({ store, context, user, yearsOfStudy }) => {
    const yearOfStudy = getYearOfStudyByCurrentDate(yearsOfStudy);

    return {
      redirect: {
        destination: routesTree({ yearOfStudyId: yearOfStudy.id }).yearOfStudy,
        permanent: true,
      },
    };
  }
);
