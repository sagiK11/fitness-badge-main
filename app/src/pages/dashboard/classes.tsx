import { MainLayout } from "@components";
import { Box } from "@mui/material";
import { R } from "@resources";

const ClassesPage = () => {
  return (
    <MainLayout>
      <Box>{R.strings.headlines.yearOfStudy}</Box>
    </MainLayout>
  );
};

export default ClassesPage;
