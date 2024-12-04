import xlsx from 'xlsx';
import { parseAsync } from 'json2csv';

// Utility function to convert data to Excel format
// export const exportToExcel = (data: any[]): Buffer => {
//   const worksheet = XLSX.utils.json_to_sheet(data);
//   const workbook = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
//   return XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
// };

// // Utility function to convert data to CSV format
// export const exportToCSV = (data: any[]): Buffer => {
//   const worksheet = XLSX.utils.json_to_sheet(data);
//   return Buffer.from(XLSX.utils.sheet_to_csv(worksheet));
// };

export async function generateCSV(data: any[], fields: string[]): Promise<Buffer> {
  const opts = { fields };
  const csv = await parseAsync(data, opts);
  return Buffer.from(csv);
}

export function generateExcel(data: any[], fields: string[]): Buffer {
  const workbook = xlsx.utils.book_new();
  const worksheetData = data.map((record) => fields.reduce((acc, field) => ({ ...acc, [field]: record[field] }), {}));
  const worksheet = xlsx.utils.json_to_sheet(worksheetData);
  xlsx.utils.book_append_sheet(workbook, worksheet, 'Users');
  return xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' });
}

export async function generateExport(data: any[], fields: string[], format: 'csv' | 'excel'): Promise<Buffer> {
  if (format === 'csv') {
    return generateCSV(data, fields);
  } else {
    return generateExcel(data, fields);
  }
}
