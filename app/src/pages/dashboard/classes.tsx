import {
  SimpleCard,
  MainLayout,
  AddNewClassForm,
  ClassroomCard,
  YearOfStudyCard,
} from "@components";
import { useGetClassrooms } from "@hooks/use-get-teacher-classrooms";
import { Classroom } from "@models/classroom";
import { Box } from "@mui/material";
import { R } from "@resources";

const ClassesPage = () => {
  const { data: classrooms, loading, isFetching } = useGetClassrooms();
  if (loading || isFetching) return <h1>loading...</h1>;
  return (
    <MainLayout>
      <YearOfStudyCard />

      <SimpleCard padding="lg">
        <AddNewClassForm />
      </SimpleCard>

      {classrooms.map((cs: Classroom) => (
        <ClassroomCard key={cs.id} classroom={cs} />
      ))}

      {JSON.stringify(classrooms.entities)}
    </MainLayout>
  );
};

export default ClassesPage;
