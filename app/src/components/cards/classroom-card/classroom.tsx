import { Classroom } from "@models/classroom";
import { SimpleCard } from "../simple-card";
import { Typography, Box, Button } from "@mui/material";
import { R } from "@resources";
import { genderToText } from "@utils";

interface ClassroomCardProps {
  classroom: Classroom;
}
const ClassroomCard = ({ classroom }: ClassroomCardProps): JSX.Element => {
  return (
    <SimpleCard padding="lg">
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Typography variant="subtitle1" sx={{ color: "secondary.dark" }}>
          {R.strings.labels.classroom}:
        </Typography>

        <Typography variant="subtitle1" sx={{ color: "primary.light" }}>
          {classroom.name}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Typography variant="subtitle1" sx={{ color: "secondary.dark" }}>
          {R.strings.labels.gender}:
        </Typography>

        <Typography variant="subtitle1" sx={{ color: "primary.light" }}>
          {genderToText(classroom.gender)}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Typography variant="subtitle1" sx={{ color: "secondary.dark" }}>
          {R.strings.labels.studentsNumber}:
        </Typography>

        <Typography variant="subtitle1" sx={{ color: "primary.light" }}>
          {classroom.students.length}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Button variant="contained" color="secondary">
          hi
        </Button>
      </Box>
    </SimpleCard>
  );
};

export default ClassroomCard;
