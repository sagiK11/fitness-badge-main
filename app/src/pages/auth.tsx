import { AuthView } from "@/features";
import { GetServerSideProps } from "next";

export default AuthView;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return { props: {} };
};
