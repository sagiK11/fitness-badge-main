import { MainLayout, StudentCard } from "@components";
import { useGetTeacherByEmailQuery } from "@store/slices/teacher.slice";

const DashboardPage = (props) => {
  const { data: teacher } = useGetTeacherByEmailQuery("alice@prisma.io");

  return (
    <MainLayout>
      {JSON.stringify(teacher)}
      {data.map((student) => {
        return <StudentCard key={student.id} {...student} />;
      })}
    </MainLayout>
  );
};

export default DashboardPage;
