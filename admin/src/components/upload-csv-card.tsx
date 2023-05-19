import { Card } from "./card";
import { CardBody } from "./card-body";
import { CardTitle } from "./card-title";

import { useTestCategories } from "@/hooks";
import { Select } from "./select";
import { FileInput } from "./file-input";
import React from "react";

export function UploadCsvCard() {
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
    <Card section>
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
  );
}
