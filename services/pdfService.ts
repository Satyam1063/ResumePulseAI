import 'pdf-parse/worker';
import {PDFParse} from 'pdf-parse';

export async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  try {
    // pdf-parse's ESM export is often just the function itself
    // but can be nested. We cast to any to bypass the strict type check
    // while relying on the runtime behavior of the library.
    const pdfParse = new PDFParse({data: buffer}) 
    const data = await pdfParse.getText();
    // console.log('asdajsdjasdghj',data);
    return data.text;
  } catch (error) {
    console.error('Error parsing PDF:', error);
    throw new Error('Failed to extract text from PDF');
  }
}
