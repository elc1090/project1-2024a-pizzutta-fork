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
  });
});

const calculateFinalValue = () => {
  const relevanceAndOriginality = $(`#relevanceAndOriginalityValue`).text()
  const contentQuality = $(`#contentQualityValue`).text()
  const presentation = $(`#presentationValue`).text()
  if (relevanceAndOriginality && contentQuality && presentation) {
    const finalValue = Number(relevanceAndOriginality) + Number(contentQuality) + Number(presentation)
    $(`#finalValue`).text(finalValue.toFixed(1))
  }
}
