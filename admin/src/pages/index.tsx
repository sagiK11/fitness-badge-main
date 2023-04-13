import {
  Card,
  CardBody,
  CardTitle,
  FileInput,
  Select,
  ViewWrapper,
} from "@/components";
import { RootLayout } from "@/components/layout";
import { useSchools, useTestCategories } from "@/hooks";
import React from "react";

export default function Home() {
  const { schools } = useSchools();
  const { categories, categoryOptions, uploadGrades, isUploadingGrades } =
    useTestCategories();
  const [testCategoryId, setTestCategoryId] = React.useState(
    categories?.[0]?.id
  );

  // lazy - todo add server wrapper
  React.useEffect(() => {
    if (!categories) return;
    setTestCategoryId(categories[0].id);
  }, [categories]);

  return (
    <ViewWrapper>
      <RootLayout>
        <Card>
          <CardTitle>Upload csv</CardTitle>
          <CardBody>
            <Select
              options={categoryOptions}
              onChange={(e) => setTestCategoryId(e.target.value)}
              disabled={isUploadingGrades}
            />
            <FileInput
              className="file-input-bordered file-input-primary w-full max-w-xs"
              disabled={!testCategoryId || isUploadingGrades}
              onChange={(e) => {
                if (!testCategoryId) return;
                const data = new FormData();
                data.append("file", e.target.files?.[0] as File);
                uploadGrades({ testCategoryId, data });
              }}
            />
          </CardBody>
        </Card>
        <Card>
          <CardTitle>Schools</CardTitle>
          <CardBody>{JSON.stringify(schools, null, 2)}</CardBody>
        </Card>
      </RootLayout>
    </ViewWrapper>
  );
}
