import { YearOfStudy } from "@/models/year-of-study";
import { yearOfStudyEndpoints } from "@/store";
import { getYearOfStudyByCurrentDate } from "@/utils";
import { useRouter } from "next/router";
import React from "react";

export const useYearOfStudy = () => {
  const router = useRouter();
  const { data: yearsOfStudy } = yearOfStudyEndpoints.useFindManyQuery();

  const currentYearOfStudy = React.useMemo(() => {
    if (!yearsOfStudy) return;
    // If there's a year of study id in the route return it
    if (router.query.yearOfStudyId) {
      return yearsOfStudy.find((yearOfStudy) => {
        return yearOfStudy.id === router.query.yearOfStudyId;
      });
    }
    // Else take the it based of the current date
    return getYearOfStudyByCurrentDate(yearsOfStudy);
  }, [yearsOfStudy, router]) as YearOfStudy;

  const yearOfStudyOptions = React.useMemo(
    () =>
      yearsOfStudy?.map((yearOfStudy) => {
        return {
          label: yearOfStudy.yearName,
          value: yearOfStudy.id,
          selected: yearOfStudy.id === currentYearOfStudy?.id,
        };
      }) ?? [],
    [currentYearOfStudy, yearsOfStudy]
  );

  return {
    currentYearOfStudy,
    yearsOfStudy,
    yearOfStudyOptions,
  };
};
