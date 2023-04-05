import { YearOfStudy } from "@/models/year-of-study";
import { teacherEndpoints } from "@/store";
import { getYearOfStudyByCurrentDate } from "@/utils";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

export const useYearOfStudy = () => {
  const { data } = useSession();
  const router = useRouter();
  const { data: user } = teacherEndpoints.useGetTeacherQuery(
    data?.user?.email as string,
    {
      skip: !data?.user?.email,
    }
  );

  const currentYearOfStudy = React.useMemo(() => {
    if (!user) return;
    // If there's a year of study id in the route return it
    if (router.query.yearOfStudyId) {
      return user.yearsOfStudy.find(
        (year) => year.id === router.query.yearOfStudyId
      );
    }
    // Else take the it based of the current date
    return getYearOfStudyByCurrentDate(user.yearsOfStudy);
  }, [user, router]) as YearOfStudy;

  const yearOfStudyOptions = React.useMemo(
    () =>
      user?.yearsOfStudy.map((year) => ({
        label: year.yearName,
        value: year.id,
        selected: year.id === currentYearOfStudy?.id,
      })) ?? [],
    [user, currentYearOfStudy]
  );

  return {
    currentYearOfStudy,
    yearsOfStudy: user?.yearsOfStudy,
    yearOfStudyOptions,
  };
};
