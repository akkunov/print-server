import { PDFDocument, rgb } from 'pdf-lib';
import fontKit from '@pdf-lib/fontkit';
import fs from 'fs';
import path from 'path';
import { ExcelRow } from './xlsxReader.service';
import {__DIRNAME} from "../index";
import {defaultEnvelopeProfile, getProfileByName} from "./envProfile.service";

const MM_TO_PT = (mm: number) => mm * 2.83465;


export async function generatePdfFromExcelData(data: ExcelRow[], name?:string): Promise<Uint8Array> {
    let profile;
    if (!name) {
        profile = defaultEnvelopeProfile;
    } else profile = await getProfileByName(name);

    if (!profile) {
        profile = defaultEnvelopeProfile;
    }
    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontKit);

    const fontPath = path.resolve(__DIRNAME, '../assets/fonts/RobotoMono-Regular.ttf');
    const fontBytes = fs.readFileSync(fontPath);
    const font = await pdfDoc.embedFont(fontBytes);

    const width = MM_TO_PT(profile.width);
    const height = MM_TO_PT(profile.height);
    const fontSize = profile.fontSize;
    const lineHeight = font.heightAtSize(fontSize) + profile.lineHeight;

    const startX = MM_TO_PT(profile.padding.left);
    const startY = height - MM_TO_PT(profile.padding.top);
    const maxLineWidth = MM_TO_PT(60);

    const removeLastWord = (text: string): string =>
        text.trim().split(' ').slice(0, -1).join(' ');

    for (const row of data.slice(1)) {
        const page = pdfDoc.addPage([width, height]);
        let line1;
        if(!profile.isRemoveLastWord) {
            line1 = String(row[1] || '')
        }

        line1 = removeLastWord(String(row[1] || ''));
        const line2 = String(row[3] || '');

        // 🔸 Перенос для row[1] — максимум 3 строки
        const words1 = line1.split(' ');
        const lines: string[] = [];
        let currentLine = '';

        for (const word of words1) {
            const testLine = currentLine ? currentLine + ' ' + word : word;
            const testWidth = font.widthOfTextAtSize(testLine, fontSize);

            if (testWidth <= maxLineWidth) {
                currentLine = testLine;
            } else {
                lines.push(currentLine);
                currentLine = word;

                if (lines.length >= 3) break;
            }
        }
        if (currentLine && lines.length < 3) lines.push(currentLine);


        while (lines.length < 3) {
            lines.push('');
        }

        const words2 = line2.split(' ');
        currentLine = '';

        for (const word of words2) {
            const testLine = currentLine ? currentLine + ' ' + word : word;
            const testWidth = font.widthOfTextAtSize(testLine, fontSize);

            if (testWidth <= maxLineWidth) {
                currentLine = testLine;
            } else {
                lines.push(currentLine);
                currentLine = word;

                if (lines.length >= 6) break;
            }
        }
        if (currentLine && lines.length < 6) lines.push(currentLine);

        lines.forEach((line, i) => {
            page.drawText(line, {
                x: startX,
                y: startY - i * lineHeight - (i >= 3 ? MM_TO_PT(3) : 0),
                size: fontSize,
                font,
                color: rgb(0, 0, 0),
            });
        });
    }

    return await pdfDoc.save();
}