import { useGetTeacher } from "./use-get-teacher";

export const useYearOfStudy = () => {
  const { data: teacher } = useGetTeacher();
  const yearsOfStudy = teacher.yearsOfStudy;

  const getCurrentYearOfStudy = () => {
    const now = new Date();
    for (const year of yearsOfStudy) {
      if (new Date(year.startDate) <= now && now <= new Date(year.endDate)) {
        return year;
      }
    }
  };

  return {
    current: getCurrentYearOfStudy(),
    yearsOfStudy,
  };
};
