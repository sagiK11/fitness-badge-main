import { AddOrEditModelLayout, FormInput, Divider } from "@components";
import * as React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { useForm } from "react-hook-form";
import { Button, Typography } from "@mui/material";
import { R } from "@resources";

const studentDetails = [
  {
    id: 1,
    name: "firstName",
    label: R.strings.labels.firstName,
    required: R.strings.forms.required,
  },
  {
    id: 2,
    name: "lastName",
    label: R.strings.labels.lastName,
    required: R.strings.forms.required,
  },
  {
    id: 3,
    name: "gender",
    label: R.strings.labels.gender,
    required: R.strings.forms.required,
    options: [
      { id: 1, label: R.strings.labels.male, value: "male" },
      { id: 2, label: R.strings.labels.female, value: "female" },
    ],
  },
  {
    id: 4,
    name: "studentClass",
    label: R.strings.labels.studentClass,
    required: R.strings.forms.required,
  },
  { id: 5, name: "phone", label: R.strings.labels.phone },
];

const studentScores = [
  {
    id: 1,
    name: "aerobic",
    label: R.strings.labels.aerobic,
    measureUnit: R.strings.labels.minutes,
  },
  {
    id: 2,
    name: "hands",
    label: R.strings.labels.handsTime,
    measureUnit: R.strings.labels.seconds,
  },
  {
    id: 3,
    name: "quickness",
    label: R.strings.labels.cubes,
    measureUnit: R.strings.labels.seconds,
  },
  {
    id: 4,
    name: "abs",
    label: R.strings.labels.abs,
    measureUnit: R.strings.labels.units,
  },
];

const AddStudentPage = (props) => {
  const { handleSubmit, control } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <AddOrEditModelLayout>
      <Typography variant="h1">{R.strings.headlines.addNewStudent}</Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid sx={{ width: "100%" }}>
          <Divider> {R.strings.headlines.studentDetails}</Divider>
        </Grid>

        <Grid container spacing={2}>
          {studentDetails.map((field) => {
            return (
              <Grid key={field.id} xs={12} sm={6}>
                <FormInput control={control} variant="outlined" {...field} />
              </Grid>
            );
          })}

          <Grid sx={{ width: "100%" }}>
            <Divider> {R.strings.headlines.results}</Divider>
          </Grid>

          {studentScores.map((field) => {
            return (
              <Grid key={field.id} xs={12} sm={6}>
                <FormInput
                  name={`tests.${field.name}`}
                  measureUnit={field.measureUnit}
                  control={control}
                  label={field.label}
                  variant="outlined"
                  required={field.required}
                />
              </Grid>
            );
          })}

          <Grid xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ width: "100%" }}
            >
              {R.strings.buttons.save}
            </Button>
          </Grid>
        </Grid>
      </form>
    </AddOrEditModelLayout>
  );
};

export default AddStudentPage;
