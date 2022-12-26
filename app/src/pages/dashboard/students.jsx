import { MainLayout, StudentCard } from "@components";
import { R } from "@resources";
import { routesTree } from "@routes";
import { useGetTeacher } from "@hooks";

const StudentsPage = (props) => {
  const { data: teacher } = useGetTeacher();
  const fabs = [
    {
      id: 1,
      text: R.strings.buttons.addNewStudent,
      to: routesTree.createStudent,
    },
  ];

  return (
    <MainLayout fabs={fabs}>
      {JSON.stringify(teacher)}
      {data.map((student) => {
        return <StudentCard key={student.id} {...student} />;
      })}
    </MainLayout>
  );
};

export default StudentsPage;
