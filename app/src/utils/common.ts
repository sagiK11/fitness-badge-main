import { YearOfStudy } from "@/models";
import { twMerge } from "tailwind-merge";
import baseClassNames from "classnames";

const now = new Date();
export const getYearOfStudyByCurrentDate = (yearsOfStudy: YearOfStudy[]) => {
  for (const year of yearsOfStudy) {
    if (new Date(year.startDate) <= now && now <= new Date(year.endDate)) {
      return year;
    }
  }
  throw new Error("could not find year of study");
};

/**
 * Encapsulation of classnames with tailwind-merge
 *  */
export function cls(...inputs: Parameters<typeof baseClassNames>) {
  return twMerge(baseClassNames(inputs));
}
