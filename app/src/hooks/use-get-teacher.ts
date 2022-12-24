import { selectAuthUser } from "@store/slices/auth.slice";
import { useGetTeacherByEmailQuery } from "@store/slices/teacher.slice";
import { useSelector } from "react-redux";

export const useGetTeacher = (): ReturnType<
  typeof useGetTeacherByEmailQuery
> => {
  const authUser = useSelector(selectAuthUser);
  return useGetTeacherByEmailQuery(authUser.email);
};
