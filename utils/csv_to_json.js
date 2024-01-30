export default async function (csvFile) {
  const reader = new FileReader();
  const csvString = reader.readAsText(csvFile);

  const records = csvString.split("\n");
  const header = records[0].split(",");

  const recordData = records.slice(1).map((record) => {
    const values = record.split(",");
    return header.reduce((obj, key, index) => {
      obj[key.trim()] = values[index].trim();
      return obj;
    }, {});
  });
  return recordData;
}
