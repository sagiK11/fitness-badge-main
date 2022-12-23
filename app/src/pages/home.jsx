import { MainLayout } from "@components";
import { routesTree } from "@routes";
import { useGetTeacherByEmailQuery } from "@store/slices/teacher.slice";
import { Navigate } from "react-router-dom";

const HomePage = (props) => {
  const { data: teacher, isLoading } =
    useGetTeacherByEmailQuery("alice@prisma.io");
  console.log("GOT TEACHER", teacher);

  return (
    <MainLayout>
      <>
        {isLoading && "Loading..."}
        {teacher && <Navigate to={routesTree.classes} />}
      </>
    </MainLayout>
  );
};

export default HomePage;
