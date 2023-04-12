import {
  Card,
  CardBody,
  CardTitle,
  FileInput,
  ViewWrapper,
} from "@/components";
import { RootLayout } from "@/components/layout";
import { useSchools } from "@/hooks";
import React from "react";

export default function Home() {
  const { schools } = useSchools();
  return (
    <ViewWrapper>
      <RootLayout>
        <Card>
          <CardTitle>Upload csv</CardTitle>
          <CardBody>
            <FileInput className="file-input-bordered file-input-primary w-full max-w-xs" />
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
