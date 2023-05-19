import { Teacher } from "@/models";
import { teacherEndpoints } from "@/store";
import React from "react";

export function useUpdateTeacher() {
  const [_update, updateResult] = teacherEndpoints.useUpdateTeacherMutation();

  const update = React.useCallback(
    async (payload: Partial<Teacher>) => {
      try {
        return await _update(payload).unwrap();
      } catch (error) {
        console.log(error);
      }
    },
    [_update]
  );

  return { update, isLoading: updateResult.isLoading };
}
