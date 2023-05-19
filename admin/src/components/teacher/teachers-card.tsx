import { formatDate, formatName } from "@/utils";
import { Card } from "../card";
import { CardBody } from "../card-body";
import { CardTitle } from "../card-title";
import { FlexBox } from "../flexbox";
import { Grid } from "../grid";
import { Typography } from "../typography";
import { useTeachers } from "@/hooks";
import { TeacherModal } from "./teacher-modal";

type TeachersCardProps = {
  schoolId: string;
};

export function TeachersCard({ schoolId }: TeachersCardProps) {
  const { teachers } = useTeachers();

  return (
    <Card section>
      <FlexBox className="w-full justify-between">
        <CardTitle>Teachers</CardTitle>
        <TeacherModal schoolId={schoolId} />
      </FlexBox>

      {teachers?.map((teacher) => {
        return (
          <CardBody key={teacher.id}>
            <Grid className="grid-cols-2 md:grid-cols-5  gap-2 lg:gap-3 md:items-center">
              <FlexBox className="flex-col md:gap-1">
                <Typography className="text-secondary">Name</Typography>
                <Typography bold>{formatName(teacher)}</Typography>
              </FlexBox>
              <FlexBox className="flex-col md:gap-1">
                <Typography className="text-secondary">Email</Typography>
                <Typography bold>{teacher.email}</Typography>
              </FlexBox>

              <FlexBox className="flex-col md:gap-1">
                <Typography className="text-secondary">
                  Last update date
                </Typography>
                <Typography bold>{formatDate(teacher.createdAt)}</Typography>
              </FlexBox>
              <FlexBox className="flex-col md:gap-1">
                <Typography className="text-secondary">Create date</Typography>
                <Typography bold>{formatDate(teacher.createdAt)}</Typography>
              </FlexBox>
            </Grid>
          </CardBody>
        );
      })}
    </Card>
  );
}
