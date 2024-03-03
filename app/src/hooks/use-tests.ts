import { testEndpoints } from "@/store/api/test.endpoint";

import { UpdateTestParams } from "@/store";
import { useAsync } from "./use-async";
import { toast } from "@/components/toast";

export function useTests() {
  const [_updateTests, updateTestsResult] =
    testEndpoints.useUpdateTestsMutation();
  const [_updateTest, updateTestResult] = testEndpoints.useUpdateTestMutation();

  const [updateTests] = useAsync({
    func: async (tests: UpdateTestParams[]) => {
      _updateTests(tests).unwrap();
    },
  });

  const [updateTest] = useAsync({
    func: async (test: UpdateTestParams) => {
      if (typeof test.score !== "number" || isNaN(test.score)) {
        toast.showWarning("אנא הכנס נתון תקין");
        return;
      }
      _updateTest(test).unwrap();
    },
  });

  return {
    updateTests,
    updateTest,
    updateTestsResult,
    updateTestResult,
  };
}
