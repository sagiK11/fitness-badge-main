import React from "react";
import { FlexBox } from "./flexbox";
import { Typography } from "./typography";

interface IProps {
  name: React.ReactNode;
  value: React.ReactNode;
}

export function NameValueGroup({ name, value }: IProps) {
  return (
    <FlexBox className="flex-col">
      <Typography className="text-accent">{name}</Typography>
      <Typography bold>{value}</Typography>
    </FlexBox>
  );
}
