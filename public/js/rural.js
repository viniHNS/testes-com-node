const a1 = 113400; //Solo A-I => Lavoura Aptidão Boa 
const a2 = 93800;  //Solo A-II => Lavoura Aptidão Regular
const a3 = 75100;  //Solo A-III => Lavoura Aptidão Restrita
const a4 = 54300;  //Solo A-IV => Terras Cultiváveis Ocasionalmente
const b6 = 33200;  //Solo B-VI => Pastagem Plantada
const b7 = 23900;  //Solo B-VII => Silvicultura ou Pastagem Natural
const c8 = 12700;  //Solo C-VIII => Preservação da Fauna ou Flora

// Baseado na Tabela Deral 2021 - www.agricultura.pr.gov.br/terras

let soma = 0;



calcularValor = () => {
  let inputOption1 = document.querySelector("#inputGroupSelect1");
  let inputOption2 = document.querySelector("#inputGroupSelect2");
  let inputOption3 = document.querySelector("#inputGroupSelect3");
  
  let inputText1 = document.querySelector("#inputText1");
  let inputText2 = document.querySelector("#inputText2");
  let inputText3 = document.querySelector("#inputText3");
  
  if(inputText1.value == ""){
    swal("Algo deu errado!", "Você deve digitar algo!", "error");
  } else {
    switch (inputOption1.value) {
      case "1":
        soma += inputText1.value * a1;
        break;

      case "2":
        soma += inputText1.value * a2;
        break;

      case "3":
        soma += inputText1.value * a3;
        break;

      case "4":
        soma += inputText1.value * a4;
        break;

      case "5":
        soma += inputText1.value * b6;
        break;

      case "6":
        soma += inputText1.value * b7;
        break;

      case "7":
        soma += inputText1.value * c8;
        break;

      default:
        swal("Algo deu errado!", "Você deve escolher um tipo de terra!", "error");
    }
    console.log(inputOption1.value)
    console.log(soma)
    console.log("-----")

    if (inputText2.value != ""){
      switch (inputOption2.value) {
        case "1":
          soma += inputText2.value * a1;
          break;
  
        case "2":
          soma += inputText2.value * a2;
          break;
  
        case "3":
          soma += inputText2.value * a3;
          break;
  
        case "4":
          soma += inputText2.value * a4;
          break;
  
        case "5":
          soma += inputText2.value * b6;
          break;
  
        case "6":
          soma += inputText2.value * b7;
          break;
  
        case "7":
          soma += inputText2.value * c8;
          break;
  
        default:
          swal("Algo deu errado!", "Você deve escolher um tipo de terra!", "error");
      }
    }
    console.log(inputOption2.value)
    console.log(soma)
    console.log("-----")

    if (inputText3.value != ""){
      switch (inputOption3.value) {
        case "1":
          soma += inputText3.value * a1;
          break;
  
        case "2":
          soma += inputText3.value * a2;
          break;
  
        case "3":
          soma += inputText3.value * a3;
          break;
  
        case "4":
          soma += inputText3.value * a4;
          break;
  
        case "5":
          soma += inputText3.value * b6;
          break;
  
        case "6":
          soma += inputText3.value * b7;
          break;
  
        case "7":
          soma += inputText3.value * c8;
          break;
  
        default:
          swal("Algo deu errado!", "Você deve escolher um tipo de terra!", "error");
      }
    }
    console.log(inputOption3.value)
    console.log(soma)
    console.log("-----")

    soma = Math.round(soma * 0.8);
    soma += "00"
    
    document.querySelector("#resultado-rural").innerHTML = "R$ " + VMasker.toMoney(soma);
    
    console.log(soma);
    soma = 0;
  }
}

function conversorAreaHa(){
  let hectares = document.querySelector("#input-ha");
  let alqueires = document.querySelector("#input-alq");
  let metroQuadrado = document.querySelector("#input-m2");

  if (hectares.value != ""){
    metroQuadrado.value = (hectares.value * 10000).toLocaleString("pt-BR", { maximumFractionDigits: 4, minimumFractionDigits: 4 });
    alqueires.value = (hectares.value / 2.42).toLocaleString("pt-BR", { maximumFractionDigits: 4, minimumFractionDigits: 4 });
  } else {
    alqueires.value = "";
    metroQuadrado.value = "";
  }
  
}

function conversorAreaAlq(){
  let hectares = document.querySelector("#input-ha");
  let alqueires = document.querySelector("#input-alq");
  let metroQuadrado = document.querySelector("#input-m2");

  if (alqueires.value != ""){
    hectares.value = (alqueires.value * 2.42).toLocaleString("pt-BR", { maximumFractionDigits: 4, minimumFractionDigits: 4 });
    metroQuadrado.value = (alqueires.value * 24200).toLocaleString("pt-BR", { maximumFractionDigits: 4, minimumFractionDigits: 4 });
  } else {
    hectares.value = "";
    metroQuadrado.value = "";
  }
}

function conversorAreaMetro(){
  let hectares = document.querySelector("#input-ha");
  let alqueires = document.querySelector("#input-alq");
  let metroQuadrado = document.querySelector("#input-m2");

  if (metroQuadrado.value != ""){
    hectares.value = (metroQuadrado.value / 10000).toLocaleString("pt-BR", { maximumFractionDigits: 4, minimumFractionDigits: 4 });
    alqueires.value = (metroQuadrado.value / 24200).toLocaleString("pt-BR", { maximumFractionDigits: 4, minimumFractionDigits: 4 });
  } else {
    hectares.value = "";
    alqueires.value = "";
  }
}

function ArredondaNum(num, casas) {
  return +(Math.round(num + "e+" + casas)  + "e-" + casas);
}