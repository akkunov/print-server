import XLSX from 'xlsx';
export function parseExcel(buffer) {
    const workbook = XLSX.read(buffer, {
        type: 'buffer',
        dense: true,
    });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
        blankrows: false,
        defval: '',
    });
    return {
        sheetName,
        rows,
    };
}
