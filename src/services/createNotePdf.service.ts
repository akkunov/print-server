import { PDFDocument, rgb } from 'pdf-lib';
import fontKit from '@pdf-lib/fontkit';
import fs from 'fs';
import path from 'path';
import { ExcelRow } from './xlsxReader.service.js';
import {defaultEnvelopeProfile, getUsingProfile} from "./noteProfile.service.js";
import {__dirname} from "../utils/index.js";

const MM_TO_PT = (mm: number) => mm * 2.83465;


export async function generateNotePdfFromExcel(data: ExcelRow[]): Promise<Uint8Array> {
    let profile;
    profile = await getUsingProfile();
    if (!profile) {
        profile = defaultEnvelopeProfile;
    }
    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontKit);

    const fontPath = path.join(process.cwd(), 'src/assets/fonts/RobotoMono-Regular.ttf');
    const fontBytes = fs.readFileSync(fontPath);
    const font = await pdfDoc.embedFont(fontBytes);

    const width = MM_TO_PT(profile.width);
    const height = MM_TO_PT(profile.height);
    const fontSize = profile.fontSize;
    const lineHeight = font.heightAtSize(fontSize) + profile.lineHeight;

    const startX = MM_TO_PT(profile.paddingLeft);
    const startY = height - MM_TO_PT(profile.paddingTop);
    const maxLineWidth = MM_TO_PT(95);

    const removeLastWord = (text: string): string =>
        text.trim().split(' ').slice(0, -1).join(' ');

    for (const row of data.slice(1)) {
        const page = pdfDoc.addPage([width, height]);

        const address = String(row[3] || '');
        let name = String(row[1] || '');
        name = profile.isRemoveLastWord? removeLastWord(name) : name;

        const wrapText = (text: string, maxWidth: number, maxLines: number): string[] => {
            const words = text.split(' ');
            const lines: string[] = [];
            let currentLine = '';

            for (const word of words) {
                const testLine = currentLine ? currentLine + ' ' + word : word;
                const testWidth = font.widthOfTextAtSize(testLine, fontSize);

                if (testWidth <= maxWidth) {
                    currentLine = testLine;
                } else {
                    lines.push(currentLine);
                    currentLine = word;

                    if (lines.length >= maxLines) break;
                }
            }
            if (currentLine && lines.length < maxLines) lines.push(currentLine);

            return lines;
        };

        // 🔹 Адрес → максимум 2 строки
        const addressLines = wrapText(address, maxLineWidth, 2);

        // 🔹 Имя → максимум 3 строки
        const nameLines = wrapText(name, maxLineWidth, 3);

        // 🔹 Объединяем: адрес идёт первым, имя после него
        const lines = [...addressLines, ...nameLines];

        lines.forEach((line, i) => {
            page.drawText(line, {
                x: startX,
                y: startY - i * lineHeight,
                size: fontSize,
                font,
                color: rgb(0, 0, 0),
            });
        });
    }
    return await pdfDoc.save();
}