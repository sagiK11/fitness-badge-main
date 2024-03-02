import React from "react";
import { FlexBox } from "./flexbox";
import { Typography } from "./typography";
import { cls } from "@/utils";

interface IProps {
  name: React.ReactNode;
  value: React.ReactNode;
  classNames?: {
    holder?: string;
    name?: string;
    value?: string;
  };
}

export function NameValueGroup({ name, value, classNames }: IProps) {
  return (
    <FlexBox className={cls("flex-col", classNames?.holder)}>
      <Typography className="text-accent">{name}</Typography>
      <Typography bold>{value}</Typography>
    </FlexBox>
  );
}
