import {
  Button,
  CardBody,
  CardTitle,
  Container,
  FlexBox,
  Grid,
  RootLayout,
  Typography,
  ViewWrapper,
  Card,
  Select,
  Breadcrumbs,
} from "@/components";
import { useClassrooms, useUser, useYearOfStudy } from "@/hooks";
import { GenderEnum } from "@/models";
import { routesTree } from "@/routesTree";
import { formatDate } from "@/utils";
import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

export function HomeView() {
  const user = useUser();

  return (
    <ViewWrapper>
      <RootLayout>
        <Container className="gap-4 lg:gap-6">
          <Breadcrumbs items={[{ label: "בית", href: routesTree().home }]} />

          <Typography className="text-3xl">שלום {user.firstName} </Typography>

          <Card section>
            <CardTitle>פרטי בית ספר</CardTitle>
            <CardBody>
              <Grid className="grid-cols-2 md:grid-cols-5  gap-2 lg:gap-3 md:items-center">
                <FlexBox className="flex-col md:gap-1">
                  <Typography className="text-secondary">שם</Typography>
                  <Typography bold>{user.school?.name}</Typography>
                </FlexBox>

                <FlexBox className="flex-col md:gap-1">
                  <Typography className="text-secondary">
                    תאריך יצירה
                  </Typography>
                  <Typography bold>
                    {formatDate(user.school?.createdAt)}
                  </Typography>
                </FlexBox>
                <FlexBox className="flex-col md:gap-1">
                  <Typography className="text-secondary">
                    תאריך עדכון אחרון
                  </Typography>
                  <Typography bold>
                    {formatDate(user.school?.updatedAt)}
                  </Typography>
                </FlexBox>
              </Grid>
            </CardBody>
          </Card>

          <MyClassroomCard gender={GenderEnum.female} />
          <MyClassroomCard gender={GenderEnum.male} />
        </Container>
      </RootLayout>
    </ViewWrapper>
  );
}

function MyClassroomCard({ gender }: { gender: GenderEnum }) {
  const { currentYearOfStudy } = useYearOfStudy();
  const {
    classrooms,
    addTeacherClassroom,
    availableFemaleClassOptions,
    availableMaleClassOptions,
  } = useClassrooms();

  const [classroomId, setClassroomId] = React.useState<string>();
  const isFemale = gender === GenderEnum.female;
  const options = isFemale
    ? availableFemaleClassOptions
    : availableMaleClassOptions;

  React.useEffect(() => {
    if (!options?.[0]?.value) return;
    setClassroomId(options?.[0]?.value);
  }, [options]);

  const title = isFemale ? "כיתות הבנות שלי" : "כיתות הבנים שלי";

  const items = React.useMemo(() => {
    return classrooms?.filter((classroom) =>
      isFemale
        ? classroom.gender === GenderEnum.female
        : classroom.gender === GenderEnum.male
    );
  }, [classrooms, isFemale]);

  return (
    <Card section>
      <CardTitle className="justify-between">
        <Typography as="h2">{title}</Typography>
        <Grid className="grid-cols-2 gap-1 md:gap-3 items-center">
          <Select
            onChange={(e) => setClassroomId(e.target.value)}
            options={options}
            className="select-sm md:select-md"
          />
          <Button
            className="btn-primary btn-outline btn-sm md:btn-md"
            onClick={() => addTeacherClassroom(classroomId)}
            disabled={!classroomId}
          >
            הוסף
          </Button>
        </Grid>
      </CardTitle>

      {items?.map((classroom) => (
        <CardBody key={classroom.id} hover>
          <Grid className="grid-cols-1 md:grid-cols-6  gap-2 lg:gap-3 md:items-center">
            <FlexBox className="flex-col md:gap-1">
              <Typography className="text-secondary">שם</Typography>
              <Typography bold>{classroom.name}</Typography>
            </FlexBox>

            <FlexBox className="flex-col md:gap-1">
              <Typography className="text-secondary">מגדר</Typography>
              <Typography bold>
                {classroom.gender === GenderEnum.male ? "בנים" : "בנות"}
              </Typography>
            </FlexBox>

            <FlexBox className="flex-col md:gap-1">
              <Typography className="text-secondary">תאריך יצירה</Typography>
              <Typography bold>{formatDate(classroom.createdAt)}</Typography>
            </FlexBox>

            <FlexBox className="flex-col md:gap-1">
              <Typography className="text-secondary">
                תאריך עדכון אחרון
              </Typography>
              <Typography bold>{formatDate(classroom.updatedAt)}</Typography>
            </FlexBox>

            <FlexBox className="flex-col md:gap-1 col-span-2">
              <Button
                className="btn-secondary btn-sm self-start md:self-end"
                iconEnd={AiOutlineArrowLeft}
                href={
                  routesTree({
                    yearOfStudyId: currentYearOfStudy?.id,
                    classroomId: classroom.id,
                  }).classroomDetails
                }
              >
                פרטים נוספים
              </Button>
            </FlexBox>
          </Grid>
        </CardBody>
      ))}
    </Card>
  );
}
