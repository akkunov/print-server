import XLSX from 'xlsx';


export type ExcelRow = (string | number | boolean | null)[];


export function parseExcel(buffer: Buffer): { rows: ExcelRow[]; sheetName: string } {
    const workbook = XLSX.read(buffer, {
        type: 'buffer',
        dense: true,
    });

    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const rows:ExcelRow[] = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
        blankrows: false,
        defval: '',
    });

    return {
        sheetName,
        rows,
    };
}
