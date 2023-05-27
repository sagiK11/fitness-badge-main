import * as XLSX from 'xlsx';
import { parse } from 'csv-parse/sync';

export function bufferToCsv(buffer: Buffer) {
  const workbook = XLSX.read(buffer);
  const [sheetName] = workbook.SheetNames;
  return XLSX.utils.sheet_to_csv(workbook.Sheets[sheetName]);
}

export function parseCsv(...[params, options]: Parameters<typeof parse>) {
  return parse(params, {
    columns: true,
    skip_empty_lines: true,
    ...options,
  });
}
