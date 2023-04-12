import { MeasureUnitEnum } from "../enums";
import { Test } from "../test/test";

export interface TestCategory {
  id: string;
  name: string;
  tests: Test[];
  measureUnit: MeasureUnitEnum;
  createdAt: string;
  updatedAt: string;
}
