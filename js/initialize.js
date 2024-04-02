const signature = new Signature()
const generatePDF = new GeneratePDF()
const validation = new Validation()

$(document).ready(function () {
  $('.datepicker').datepicker({
    format: "dd/mm/yyyy",
    i18n: {
      cancel: "Cancelar",
      clear: "Limpar",
      done: "Ok",
      months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
      monthsShort: ["Jan", "Fev", "Mar", "Abr", "Maio", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
      weekdays: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
      weekdaysShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
      weekdaysAbbrev: ["D", "S", "T", "Q", "Q", "S", "S"]
    }
  })

  $('.timepicker').timepicker({
    twelveHour: false,
    i18n: {
      cancel: "Cancelar",
      clear: "Limpar",
      done: "Ok"
    }
  })

  $('#relevanceAndOriginality, #contentQuality, #presentation').change((e) => {
    const elementId = e.target.id
    const value = $(`#${elementId} + .thumb .value`).text()
    $(`#${elementId}Value`).text(value)
    calculateFinalValue()
  })

  $('input[type=radio][name=signatureType]').change(signature.handleSignatureTypeChange)

  initializeFields()
  signature.initialize()
  validation.initialize()
});

const initializeFields = () => {
  const params = new URLSearchParams(window.location.search)
  params.forEach((value, key) => {
    if (key === "period") {
      $(`input[name=${key}][value=${value}]`).prop('checked', true)
    } else {
      $(`input[name=${key}]`).val(value)
    }
  })
  M.updateTextFields()
}

const calculateFinalValue = () => {
  const relevanceAndOriginality = $(`#relevanceAndOriginalityValue`).text()
  const contentQuality = $(`#contentQualityValue`).text()
  const presentation = $(`#presentationValue`).text()
  if (relevanceAndOriginality && contentQuality && presentation) {
    const finalValue = Number(relevanceAndOriginality) + Number(contentQuality) + Number(presentation)
    $(`#finalValue`).text(finalValue.toFixed(1))
  }
}

const resetAllFields = () => {
  $(`#relevanceAndOriginalityValue`).text("")
  $(`#contentQualityValue`).text("")
  $(`#presentationValue`).text("")
  $(`#finalValue`).text("")

  signature.clearCanvas()
  signature.clearPreview()
  $('#signatureCanvasWrapper').hide()
  $('#signaturePreview').hide()
  $('#signatureSelect').hide()
}

const copyLink = () => {
  const data = generatePDF.getData()

  const link = `${window.location.href}?studentName=${encodeURIComponent(data.generalInformation.studentName)}`
    + `&professorName=${encodeURIComponent(data.generalInformation.professorName)}`
    + `&period=${data.generalInformation.period}`
    + `&date=${encodeURIComponent(data.generalInformation.date)}`
    + `&time=${encodeURIComponent(data.generalInformation.time)}`

  navigator.clipboard.writeText(link)

  M.toast({html: `<i class="material-icons">check</i><span>&nbsp;Copiado para área de transferência</span>`})
}
