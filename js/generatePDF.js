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

  getDefinition = (data) => {
    return {
      pageMargins: 70,
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
          text: ["FICHA DE AVALIAÇÃO DA SESSÃO DE ANDAMENTO\n", "\n\n\n"],
          style: "title"
        },
        {
          text: [
            `Aluno: ${data.generalInformation.studentName}\n`,
            `Professor: ${data.generalInformation.professorName}\n`,
            `Data: ${data.generalInformation.date}\n`,
            `Horário: ${data.generalInformation.time}\n`,
            `${data.generalInformation.period}º Semestre`
          ],
          style: "normal"
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
        },
        normal: {
          font: "Times",
          fontSize: 12,
          alignment: "justify",
          lineHeight: 1.5
        }
      }
    }
  }

  getData = () => {
    return {
      generalInformation: {
        studentName: $('#studentName').val(),
        professorName: $('#professorName').val(),
        period: $('input[name=period]:checked').val(),
        date: $('#date').val(),
        time: $('#time').val()
      },
      evaluation: {
        relevanceAndOriginality: Number($(`#relevanceAndOriginalityValue`).text()),
        contentQuality: Number($(`#contentQualityValue`).text()),
        presentation: Number($(`#presentationValue`).text()),
        finalValue: Number($(`#finalValue`).text())
      },
      signatureType: $('input[name=signatureType]:checked').val()
    }
  }

  open = () => {
    if ($('#evaluationForm').valid()) {
      const data = this.getData()
      pdfMake.createPdf(this.getDefinition(data)).open();
    }
  }

}
