import { Option } from "@/components";
import { UploadGradesPayload } from "@/models";
import { testCategoryEndpoints } from "@/store";
import React from "react";

export function useTestCategories() {
  const { data: categories } = testCategoryEndpoints.useFindCategoriesQuery();

  const [_uploadGrades, uploadGradesResult] =
    testCategoryEndpoints.useUploadGradesMutation();

  const uploadGrades = React.useCallback(
    async ({ data, testCategoryId }: UploadGradesPayload) => {
      try {
        await _uploadGrades({ testCategoryId, data }).unwrap();
      } catch (error) {
        console.log(error);
      }
    },
    [_uploadGrades]
  );

  const categoryOptions: Option[] = React.useMemo(() => {
    if (!categories) return [];
    return categories?.map((category) => {
      return {
        label: category.name,
        value: category.id,
      };
    });
  }, [categories]);

  return {
    categories,
    categoryOptions,
    uploadGrades,
    isUploadingGrades: uploadGradesResult.isLoading,
  };
}
