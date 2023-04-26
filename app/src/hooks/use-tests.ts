import React from "react";

import { testEndpoints } from "@/store/api/test.endpoint";

import { UpdateTestParams } from "@/store";

export function useTests() {
  const [_updateTests, updateTestsResult] =
    testEndpoints.useUpdateTestsMutation();
  const [_updateTest, updateTestResult] = testEndpoints.useUpdateTestMutation();

  const updateTests = React.useCallback(
    async (tests: UpdateTestParams[]) => {
      try {
        await _updateTests(tests).unwrap();
      } catch (error) {
        console.log(error);
      }
    },
    [_updateTests]
  );

  const updateTest = React.useCallback(
    async (test: UpdateTestParams) => {
      try {
        await _updateTest(test).unwrap();
      } catch (error) {
        console.log(error);
      }
    },
    [_updateTest]
  );

  return {
    updateTests,
    updateTest,
    updateTestsResult,
    updateTestResult,
  };
}
