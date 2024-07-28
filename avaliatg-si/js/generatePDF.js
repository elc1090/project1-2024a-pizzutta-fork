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
            "CURSO DE SISTEMAS DE INFORMAÇÃO\n",
            "\n\n\n"
          ],
          style: "header"
        },
        {
          text: ["FICHA DE AVALIAÇÃO DE TRABALHO DE GRADUAÇÃO\n", "\n\n\n"],
          style: "title"
        },
        {
          text: [
            `Estudante: ${data.generalInformation.studentName}\n`,
            `Avaliador(a): ${data.generalInformation.professorName}\n`,
            `Data: ${data.generalInformation.date}\n`,
            `Horário: ${data.generalInformation.time}\n`,
            `${data.generalInformation.period}º Semestre\n`,
            "\n\n"
          ],
          style: "normal"
        },
        {
          columns: [
            {width: "*", text: ""},
            {
              width: "auto",
              table: {
                headerRows: 1,
                body: [
                  [
                    {text: "Critério", style: "tableHeader", noWrap: true},
                    {text: "Nota", style: "tableHeader", noWrap: true}
                  ],
                  [
                    {text: "Conteúdo da apresentação", style: "tableBody"},
                    {text: data.evaluation.presentationRubric1, style: "tableBody"}
                  ],
                  [
                    {text: "Domínio dos recursos didáticos", style: "tableBody"},
                    {text: data.evaluation.presentationRubric2, style: "tableBody"}
                  ],
                  [
                    {text: "Utilização do tempo e poder de síntese", style: "tableBody"},
                    {text: data.evaluation.presentationRubric3, style: "tableBody"}
                  ],
                  [
                    {text: "Estrutura do trabalho", style: "tableBody"},
                    {text: data.evaluation.contentRubric1, style: "tableBody"}
                  ],
                  [
                    {text: "Relevância, originalidade e qualidade do conteúdo do texto", style: "tableBody"},
                    {text: data.evaluation.contentRubric2, style: "tableBody"}
                  ],
                  [
                    {text: "Grau de conhecimento demonstrado no trabalho escrito", style: "tableBody"},
                    {text: data.evaluation.contentRubric3, style: "tableBody"}
                  ],
                  [
                    {text: "Adequação da bibliografia apresentada", style: "tableBody"},
                    {text: data.evaluation.contentRubric4, style: "tableBody"}
                  ],                                                                        
                  [
                    {text: "Nota final", style: "tableBody"},
                    {text: data.evaluation.finalValue, style: "tableBody"}
                  ]
                ],
                alignment: "center"
              }
            },
            {width: "*", text: ""},
          ]
        },
        {text: "\n\n", style: "normal"},
        {
          image: data.signature,
          width: 150,
          style: "center"
        },
        {
          text: [
            "___________________________________\n",
            "Avaliador(a)"
          ],
          style: "center"
        }
      ],
      styles: {
        header: {
          font: "Times",
          fontSize: 12,
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
        },
        tableHeader: {
          font: "Times",
          fontSize: 12,
          bold: true,
          margin: 5
        },
        tableBody: {
          font: "Times",
          fontSize: 12,
          margin: 5
        },
        center: {
          font: "Times",
          fontSize: 12,
          alignment: "center",
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
        presentationRubric1: Number($(`#presentationRubric1Value`).text()),
        presentationRubric2: Number($(`#presentationRubric2Value`).text()),
        presentationRubric3: Number($(`#presentationRubric3Value`).text()),
        contentRubric1: Number($(`#contentRubric1Value`).text()),
        contentRubric2: Number($(`#contentRubric2Value`).text()),
        contentRubric3: Number($(`#contentRubric3Value`).text()),
        contentRubric4: Number($(`#contentRubric4Value`).text()),        
        presentation: Number($(`#presentationValue`).text()),
        finalValue: Number($(`#finalValue`).text())
      },
      signature: signature.getSignatureImage()
    }
  }

  open = () => {
    if ($('#evaluationForm').valid()) {
      const data = this.getData()
      pdfMake.createPdf(this.getDefinition(data)).open();
    }
  }

}
