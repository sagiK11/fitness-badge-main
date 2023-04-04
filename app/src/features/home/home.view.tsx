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
} from "@/components";
import { useClassrooms, useUser, useYearOfStudy } from "@/hooks";
import { GenderEnum } from "@/models/enums";
import { routesTree } from "@/routesTree";
import { formatDate } from "@/utils/format-date";
import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

export function HomeView() {
  const user = useUser();
  const { current } = useYearOfStudy();
  const {
    classrooms,
    getClassrooms,
    getClassroomsResult: { isSuccess, data },
  } = useClassrooms();

  const list = isSuccess ? data : classrooms;

  const onClassroomChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) =>
      getClassrooms({
        teacherId: user.id,
        yearOfStudyId: e.target.value,
      }),
    [user.id, getClassrooms]
  );

  const yearOfStudyOptions = React.useMemo(
    () =>
      user.yearsOfStudy.map((year) => ({
        label: year.yearName,
        value: year.id,
        selected: year.id === current.id,
      })),
    [user, current]
  );

  return (
    <ViewWrapper>
      <RootLayout>
        <Container className="gap-4 lg:gap-6">
          <Card section>
            <CardTitle>שנת לימוד</CardTitle>
            <CardBody>
              <Select
                onChange={onClassroomChange}
                options={yearOfStudyOptions}
              />
            </CardBody>
          </Card>
          <Card section>
            <CardTitle>כיתות</CardTitle>

            {list?.map((classroom) => (
              <CardBody key={classroom.id} hover>
                <Grid className="grid-cols-1 md:grid-cols-5  gap-2 lg:gap-3 md:items-center">
                  <FlexBox className="flex-col md:gap-1">
                    <Typography className="text-secondary">שם הכתה</Typography>
                    <Typography bold>{classroom.name}</Typography>
                  </FlexBox>

                  <FlexBox className="flex-col md:gap-1">
                    <Typography className="text-secondary">מגדר</Typography>
                    <Typography bold>
                      {classroom.gender.toLocaleLowerCase() === GenderEnum.male
                        ? "בן"
                        : "בת"}
                    </Typography>
                  </FlexBox>

                  <FlexBox className="flex-col md:gap-1">
                    <Typography className="text-secondary">
                      תאריך עדכון אחרון
                    </Typography>
                    <Typography bold>
                      {formatDate(classroom.updatedAt)}
                    </Typography>
                  </FlexBox>

                  <FlexBox className="flex-col md:gap-1 col-span-2">
                    <Button
                      className="btn-secondary btn-sm self-start md:self-end"
                      iconEnd={<AiOutlineArrowLeft />}
                      href={
                        routesTree({
                          yearOfStudyId: current.id,
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
        </Container>
      </RootLayout>
    </ViewWrapper>
  );
}
