const GeneratePDF = class {

  static {
    pdfMake.fonts = {
      Times: {
        normal: 'Times-Roman',
        bold: 'Times-Bold',
        italics: 'Times-Italic',
        bolditalics: 'Times-BoldItalic'
      }
    }
  }

  getDefinition = () => {
    return {
      content: [
        {
          text: [
            "MINISTÉRIO DA EDUCAÇÃO\n",
            "UNIVERSIDADE FEDERAL DE SANTA MARIA\n",
            "CENTRO DE TECNOLOGIA\n",
            "CURSO DE CIÊNCIA DA COMPUTAÇÃO\n",
            "\n\n\n"
          ],
          style: "header"
        },
        {
          text: "FICHA DE AVALIAÇÃO DA SESSÃO DE ANDAMENTO",
          style: "title"
        }
      ],
      styles: {
        header: {
          font: "Times",
          fontSize: 14,
          alignment: "center",
          lineHeight: 1.5
        },
        title: {
          font: "Times",
          fontSize: 14,
          bold: true,
          alignment: "center",
          lineHeight: 1.5
        }
      }
    }
  }

  open = () => {
    if ($('#evaluationForm').valid()) {
      pdfMake.createPdf(this.getDefinition()).open();
    }
  }

}
