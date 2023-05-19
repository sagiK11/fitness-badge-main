import { Teacher } from "@/models";
import { teacherEndpoints } from "@/store";
import React from "react";

interface UseCreateTeacher {
  onSuccess?: (result: Teacher) => void;
}

export function useCreateTeacher(options: UseCreateTeacher = {}) {
  const { onSuccess } = options;
  const [_create, updateResult] = teacherEndpoints.useCreateTeacherMutation();

  const create = React.useCallback(
    async (payload: Partial<Teacher>) => {
      try {
        const result = await _create(payload).unwrap();
        onSuccess?.(result);
      } catch (error) {
        console.log(error);
      }
    },
    [_create, onSuccess]
  );

  return { create, isLoading: updateResult.isLoading };
}
