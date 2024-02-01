import { read, utils } from "xlsx";

export default async function (xlsxFile) {
  console.log(xlsxFile);
  const buffer = await xlsxFile.arrayBuffer();

  const workbook = read(buffer, { type: "buffer" });
  console.log(workbook);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  console.log(JSON.stringify(workbook.SheetNames));
  const jsonArray = utils.sheet_to_json(worksheet);
  console.log(jsonArray);
  return jsonArray;
}
