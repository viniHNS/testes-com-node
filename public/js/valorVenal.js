
situacao = document.querySelector(".situacao");


if (situacao == "Em análise") {
    situacao.style.color = "yellow"
} else if (situacao == "Pronto") {
    situacao.style.color = "green"
} else if (situacao == "Entregue"){
    situacao.style.color = "blue"
}


