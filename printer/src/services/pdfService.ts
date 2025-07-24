import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

const MM_TO_PT = (mm: number) => mm * 2.83465;

export async function generatePdfFromExcelData(data: any[][]): Promise<Uint8Array> {
    console.log(data)
    const width = MM_TO_PT(220);
    const height = MM_TO_PT(110);
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([width, height]);

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontSize = 10;
    const lineHeight = 12;

    const startX = MM_TO_PT(150);
    const startY = height - MM_TO_PT(65);

    const lines = data[0]?.slice(0, 6) || [];

    lines.forEach((line, i) => {
        const offsetY = i < 2 ? i : i + 1; // Пропустить 3-ю строку визуально
        page.drawText(String(line || ''), {
            x: startX,
            y: startY - offsetY * lineHeight,
            size: fontSize,
            font,
            color: rgb(0, 0, 0),
            maxWidth: MM_TO_PT(60),
        });
    });

    return await pdfDoc.save();
}