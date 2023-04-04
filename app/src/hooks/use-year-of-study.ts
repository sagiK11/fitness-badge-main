import { useUser } from "./use-user";

export const useYearOfStudy = () => {
  const user = useUser();
  const yearsOfStudy = user.yearsOfStudy;

  const getCurrentYearOfStudy = () => {
    const now = new Date();
    for (const year of yearsOfStudy) {
      if (new Date(year.startDate) <= now && now <= new Date(year.endDate)) {
        return year;
      }
    }
    throw new Error("year not found");
  };

  return {
    current: getCurrentYearOfStudy(),
    yearsOfStudy,
  };
};
