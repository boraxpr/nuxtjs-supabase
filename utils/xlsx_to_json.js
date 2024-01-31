import * as XLSX from "xlsx";
export default async function (xlsxFile) {
  const workbook = XLSX.read(xlsxFile);
  const sheetName = workbook.SheetNames;
  const sheet = workbook.Sheets[sheetName];
  return XLSX.utils.sheet_add_json(sheet);
}
