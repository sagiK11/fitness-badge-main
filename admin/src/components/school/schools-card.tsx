import { formatDate, routesTree } from "@/utils";
import { Card } from "../card";
import { CardBody } from "../card-body";
import { CardTitle } from "../card-title";
import { FlexBox } from "../flexbox";
import { Grid } from "../grid";
import { Typography } from "../typography";
import { useSchools } from "@/hooks";
import { Button } from "../button";
import { AiOutlineArrowRight } from "react-icons/ai";

export function SchoolsCard() {
  const { schools } = useSchools();
  return (
    <Card section>
      <CardTitle>Schools</CardTitle>
      {schools?.map((school) => {
        return (
          <CardBody key={school.id}>
            <Grid className="grid-cols-2 md:grid-cols-5  gap-2 lg:gap-3 md:items-center">
              <FlexBox className="flex-col md:gap-1">
                <Typography className="text-secondary">Name</Typography>
                <Typography bold>{school.name}</Typography>
              </FlexBox>

              <FlexBox className="flex-col md:gap-1">
                <Typography className="text-secondary">
                  Last update date
                </Typography>
                <Typography bold>{formatDate(school.createdAt)}</Typography>
              </FlexBox>

              <FlexBox className="flex-col md:gap-1">
                <Typography className="text-secondary">Create date</Typography>
                <Typography bold>{formatDate(school.createdAt)}</Typography>
              </FlexBox>

              <FlexBox className="justify-end w-full col-span-2">
                <Button
                  className="btn-secondary"
                  iconEnd={AiOutlineArrowRight}
                  href={routesTree({ schoolId: school.id }).schoolDetails}
                >
                  Details
                </Button>
              </FlexBox>
            </Grid>
          </CardBody>
        );
      })}
    </Card>
  );
}
