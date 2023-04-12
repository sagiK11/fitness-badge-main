import React from "react";

import { testEndpoints } from "@/store/api/test.endpoint";
import { Test } from "@/models";

export function useTests() {
  const [_updateTests] = testEndpoints.useUpdateTestsMutation();

  const updateTests = React.useCallback(
    async (tests: Partial<Test>[]) => {
      try {
        await _updateTests(tests).unwrap();
      } catch (error) {
        console.log(error);
      }
    },
    [_updateTests]
  );

  return {
    updateTests,
  };
}
