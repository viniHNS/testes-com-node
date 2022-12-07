moment.updateLocale('en', {
    months : [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho",
        "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ]
  });
dataHoje = moment().format("DD [de] MMMM [de] YYYY");

document.querySelector("#data-moment").innerHTML = dataHoje;

