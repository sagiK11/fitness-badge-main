import { AuthGuard, MainLayout } from "@components";
import { useGetClassrooms } from "@hooks/use-get-classrooms";
import { Box } from "@mui/material";
import { R } from "@resources";

const ClassesPage = () => {
  const { data: classrooms, loading, isFetching } = useGetClassrooms();
  if (loading || isFetching) return <h1>loading...</h1>;
  return (
    <MainLayout>
      <Box>{R.strings.headlines.yearOfStudy}</Box>
      {JSON.stringify(classrooms)}
    </MainLayout>
  );
};

export default ClassesPage;
