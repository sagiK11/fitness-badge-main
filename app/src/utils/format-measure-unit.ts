import { MeasureUnitEnum } from "@/models";

export function formatMeasureUnit(measureUnit: MeasureUnitEnum) {
  const map = {
    [MeasureUnitEnum.minutes]: "דקות",
    [MeasureUnitEnum.centimeters]: "ס״מ",
    [MeasureUnitEnum.seconds]: "שניות",
    [MeasureUnitEnum.amount]: "יחידות",
  };

  return map[measureUnit];
}
