import { useForm } from "react-hook-form";
import { FormInput } from "../form-inputs";
import { R } from "@resources";
import { Button, Box } from "@mui/material";
import { useSchoolClassrooms } from "@hooks/user-school-classrooms";
import { Classroom } from "@models/classroom";
import { useAddTeacherClassroomMutation } from "@store/slices/classrooms.slice";
import { useSelector } from "react-redux";
import { useGetTeacher } from "@hooks";

interface AddNewClassFormProps {}
interface FormShape {
  classroomId: string;
}
const AddNewClassForm = (props: AddNewClassFormProps): JSX.Element => {
  const { data: schoolClassrooms, isLoading } = useSchoolClassrooms();
  const { data: teacher } = useGetTeacher();
  const [addClassroom, result] = useAddTeacherClassroomMutation();
  const { handleSubmit, control } = useForm({
    defaultValues: {
      classroomId: schoolClassrooms?.[0]?.id,
    },
  });

  if (isLoading) return <h2>Loading...</h2>;

  const options = schoolClassrooms.map(({ name, id }: Classroom) => ({
    id,
    label: name,
    value: id,
  }));

  const onSubmit = async (data: FormShape) => {
    await addClassroom({
      teacherId: teacher.id,
      data: { classrooms: [{ id: data.classroomId }] },
    });
  };

  return (
    <Box
      component="form"
      sx={{ display: "flex", gap: "1rem", flexDirection: "column" }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormInput
        id="classrooms-select"
        label={R.strings.labels.classroom}
        name="classroomId"
        control={control}
        options={options}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ width: "100%" }}
      >
        {R.strings.buttons.save}
      </Button>
    </Box>
  );
};

export default AddNewClassForm;
