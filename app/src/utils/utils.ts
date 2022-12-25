import { R } from "@resources";
import { Gender } from "./enums";

export const genderToText = (gender: string): string => {
  return gender === "MALE" ? R.strings.labels.male : R.strings.labels.female;
};
