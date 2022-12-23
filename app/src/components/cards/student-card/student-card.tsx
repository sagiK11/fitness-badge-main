import { Student } from "@models";
import { Box, Typography, Card, Button } from "@mui/material";
import { R } from "@resources";
import { resolveRoute, routesTree } from "@routes";
import { Link } from "react-router-dom";

type StudentCardProps = Student & {};

const StudentCard = ({
  firstName,
  lastName,
  studentClass,
  phone,
  gender,
  tests,
  ...props
}: StudentCardProps): JSX.Element => {
  return (
    <Card
      sx={(theme) => ({
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px;",
        "& > *:not(:first-child)": {
          borderTop: `1px solid ${theme.palette.grey[300]}`,
        },
      })}
    >
      <Box
        sx={{
          display: "flex",
          gap: "1rem",
          padding: "1rem",
        }}
      >
        <Typography variant="subtitle1">{`${firstName} ${lastName}`}</Typography>
        <Typography variant="subtitle1">{studentClass}</Typography>
        <Typography variant="subtitle1">{gender}</Typography>
        <Typography variant="subtitle1">{phone}</Typography>
      </Box>
      <Box
        sx={(theme) => ({
          display: "flex",
          gap: "2rem",
          padding: "1rem",
          flexDirection: "row",
          [theme.breakpoints.down("lg")]: {
            flexDirection: "column",
            gap: "0.5rem",
          },
        })}
      >
        {tests.map((test) => {
          return (
            <Box>
              <Typography variant="subtitle1" sx={{ color: "secondary.dark" }}>
                {test.category}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: "1rem",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography variant="body2">
                    {R.strings.labels.result}
                  </Typography>
                  <Typography variant="body2">
                    {R.strings.labels.grade}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography variant="body2">{`${test.score} ${test.measureUnit}`}</Typography>
                  <Typography variant="body2">{test.grade}</Typography>
                </Box>
              </Box>
            </Box>
          );
        })}
      </Box>
      <Box
        sx={(theme) => ({
          display: "flex",
          gap: "1rem",
          padding: "1rem",
          justifyContent: "space-between",
          [theme.breakpoints.down("lg")]: {
            flexDirection: "column",
          },
        })}
      >
        <Box
          sx={(theme) => ({
            display: "flex",
            gap: "1rem",
            [theme.breakpoints.down("lg")]: {
              justifyContent: "space-between",
              flexDirection: "row-reverse",
            },
          })}
        >
          <Box
            sx={(theme) => ({
              display: "block",
              [theme.breakpoints.down("lg")]: {
                display: "none",
              },
            })}
          >
            <EditButton />
          </Box>
          <Box
            sx={(theme) => ({
              display: "none",
              [theme.breakpoints.down("lg")]: {
                display: "block",
              },
            })}
          >
            <DeleteButton />
          </Box>

          <Button color="primary" variant="outlined">
            {R.strings.buttons.sendGrades}
          </Button>
        </Box>

        <Box
          sx={(theme) => ({
            display: "block",
            [theme.breakpoints.down("lg")]: {
              display: "none",
            },
          })}
        >
          <DeleteButton />
        </Box>
        <Box
          sx={(theme) => ({
            display: "none",
            [theme.breakpoints.down("lg")]: {
              display: "block",
            },
          })}
        >
          <EditButton />
        </Box>
      </Box>
    </Card>
  );
};

export default StudentCard;

const DeleteButton = (props: any) => {
  return (
    <Button color="error" variant="outlined" {...props}>
      {R.strings.buttons.delete}
    </Button>
  );
};

const EditButton = (props: any) => {
  const id = "123";
  return (
    <Button
      component={Link}
      to={resolveRoute(routesTree.updateStudent, id)}
      color="secondary"
      variant="contained"
      fullWidth
      {...props}
    >
      {R.strings.buttons.edit}
    </Button>
  );
};
