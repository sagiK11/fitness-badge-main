import { YearOfStudy } from "@/models";

const now = new Date();
export const getYearOfStudyByCurrentDate = (yearsOfStudy: YearOfStudy[]) => {
  for (const year of yearsOfStudy) {
    if (new Date(year.startDate) <= now && now <= new Date(year.endDate)) {
      return year;
    }
  }
  throw new Error("could not find year of study");
};
