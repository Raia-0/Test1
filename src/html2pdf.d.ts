// types/html2pdf.d.ts
declare module 'html2pdf.js' {
    interface Html2PdfOptions {
      margin?: number | [number, number];
      filename?: string;
      image?: { type: string; quality: number };
      html2canvas?: { 
        scale?: number;
        useCORS?: boolean;
        allowTaint?: boolean;
      };
      jsPDF?: {
        unit?: 'mm' | 'cm' | 'in' | 'pt';
        format?: 'a0' | 'a1' | 'a2' | 'a3' | 'a4' | 'letter' | [number, number];
        orientation?: 'portrait' | 'landscape';
      };
    }
  
    interface Html2Pdf {
      (): {
        from: (element: HTMLElement) => {
          set: (options: Html2PdfOptions) => {
            save: () => Promise<void>;
          };
        };
      };
    }
  
    const html2pdf: Html2Pdf;
    export default html2pdf;
  }