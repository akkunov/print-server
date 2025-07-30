import { PDFDocument, rgb } from 'pdf-lib';
import fontKit from '@pdf-lib/fontkit';
import fs from 'fs';
import path from 'path';
import { __DIRNAME } from "../index.js";
const MM_TO_PT = (mm) => mm * 2.83465;
export async function generatePdfFromExcelData(data) {
    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontKit);
    const fontPath = path.resolve(__DIRNAME, '../assets/fonts/RobotoMono-Regular.ttf');
    const fontBytes = fs.readFileSync(fontPath);
    const font = await pdfDoc.embedFont(fontBytes);
    const width = MM_TO_PT(220);
    const height = MM_TO_PT(110);
    const fontSize = 8;
    const lineHeight = font.heightAtSize(fontSize) + 4;
    const startX = MM_TO_PT(150);
    const startY = height - MM_TO_PT(59);
    const maxLineWidth = MM_TO_PT(60);
    const removeLastWord = (text) => text.trim().split(' ').slice(0, -1).join(' ');
    for (const row of data.slice(1)) {
        const page = pdfDoc.addPage([width, height]);
        const line1 = removeLastWord(String(row[1] || ''));
        const line2 = String(row[3] || '');
        // 🔸 Перенос для row[1] — максимум 3 строки
        const words1 = line1.split(' ');
        const lines = [];
        let currentLine = '';
        for (const word of words1) {
            const testLine = currentLine ? currentLine + ' ' + word : word;
            const testWidth = font.widthOfTextAtSize(testLine, fontSize);
            if (testWidth <= maxLineWidth) {
                currentLine = testLine;
            }
            else {
                lines.push(currentLine);
                currentLine = word;
                if (lines.length >= 3)
                    break; // ограничиваем 3 строками
            }
        }
        if (currentLine && lines.length < 3)
            lines.push(currentLine);
        // 🔹 Пропускаем строки до 4-й, если строк меньше 3
        while (lines.length < 3) {
            lines.push(''); // пустые строки
        }
        // 🔹 Переносим row[3] — начиная с 4-й строки
        const words2 = line2.split(' ');
        currentLine = '';
        for (const word of words2) {
            const testLine = currentLine ? currentLine + ' ' + word : word;
            const testWidth = font.widthOfTextAtSize(testLine, fontSize);
            if (testWidth <= maxLineWidth) {
                currentLine = testLine;
            }
            else {
                lines.push(currentLine);
                currentLine = word;
                if (lines.length >= 6)
                    break; // максимум 6 строк
            }
        }
        if (currentLine && lines.length < 6)
            lines.push(currentLine);
        // 🔹 Рисуем строки
        lines.forEach((line, i) => {
            page.drawText(line, {
                x: startX,
                y: startY - i * lineHeight - (i >= 3 ? MM_TO_PT(3) : 0), // ⬅️ добавили интервал после 3 строки
                size: fontSize,
                font,
                color: rgb(0, 0, 0),
            });
        });
    }
    return await pdfDoc.save();
}
