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
  NameValueGroup,
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

          <Typography className="text-2xl md:text-3xl px-3 md:px-0 pt-3">
            שלום {user.firstName}{" "}
          </Typography>

          <Card section>
            <CardTitle>פרטי בית ספר</CardTitle>
            <CardBody>
              <Grid className="grid-cols-2 md:grid-cols-5  gap-2 lg:gap-3 md:items-center">
                <NameValueGroup name="שם" value={user.school?.name} />

                <NameValueGroup
                  name="תאריך יצירה"
                  value={formatDate(user.school?.createdAt)}
                  classNames={{ holder: "hidden md:flex" }}
                />

                <NameValueGroup
                  name="תאריך עדכון אחרון"
                  value={formatDate(user.school?.updatedAt)}
                />
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
            placeholder="בחר כיתה"
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
        <CardBody
          key={classroom.id}
          hover
          href={
            routesTree({
              yearOfStudyId: currentYearOfStudy?.id,
              classroomId: classroom.id,
            }).classroomDetails
          }
        >
          <Grid className="grid-cols-1 md:grid-cols-6  gap-2 lg:gap-3 md:items-center">
            <NameValueGroup name="שם" value={classroom.name} />

            <NameValueGroup
              name="מגדר"
              value={classroom.gender === GenderEnum.male ? "בנים" : "בנות"}
            />

            <NameValueGroup
              name="תאריך יצירה"
              value={formatDate(classroom.createdAt)}
            />

            <NameValueGroup
              name="תאריך עדכון אחרון"
              value={formatDate(classroom.updatedAt)}
            />

            <FlexBox className="flex-col md:gap-1 col-span-2">
              <Button
                className="btn-secondary btn-sm self-end hidden md:inline-flex"
                iconEnd={AiOutlineArrowLeft}
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
