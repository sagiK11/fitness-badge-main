import { testEndpoints } from "@/store/api/test.endpoint";

import { UpdateTestParams } from "@/store";
import { useAsync } from "./use-async";

export function useTests() {
  const [_updateTests, updateTestsResult] =
    testEndpoints.useUpdateTestsMutation();
  const [_updateTest, updateTestResult] = testEndpoints.useUpdateTestMutation();

  const [updateTests] = useAsync({
    func: async (tests: UpdateTestParams[]) => {
      await _updateTests(tests).unwrap();
    },
  });

  const [updateTest] = useAsync({
    func: async (test: UpdateTestParams) => {
      await _updateTest(test).unwrap();
    },
  });

  return {
    updateTests,
    updateTest,
    updateTestsResult,
    updateTestResult,
  };
}
