const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

function inputHandler(masks, max, event) {
    var c = event.target;
    var v = c.value.replace(/\D/g, '');
    var m = c.value.length > max ? 1 : 0;
    VMasker(c).unMask();
    VMasker(c).maskPattern(masks[m]);
    c.value = VMasker.toPattern(v, masks[m]);
  }

var docMask = ['999.999.999-999', '99.999.999/9999-99'];
var doc = document.querySelector('#input-cpf');
VMasker(doc).maskPattern(docMask[0]);
doc.addEventListener('input', inputHandler.bind(undefined, docMask, 14), false);

var telMask = ['(99) 9999-99999', '(99) 99999-9999'];
var tel = document.querySelector('#input-telefone');
VMasker(tel).maskPattern(telMask[0]);
tel.addEventListener('input', inputHandler.bind(undefined, telMask, 14), false);

VMasker(document.querySelector("#input-valor-avaliacao")).maskMoney({
    precision: 2,
    separator: ',',
    delimiter: '.',
    zeroCents: false
  });

verificaCampos = () => {
  let nome = document.querySelector("#input-contribuinte");
  let isNomeValido = 0;

  let cpf = document.querySelector("#input-cpf");
  let isCpfValido = 0;

  let endereco = document.querySelector("#input-endereco");
  let isEnderecoValido = 0;

  let cadImobiliario = document.querySelector("#input-cad-imob");
  let isCadImobValido = 0;

  let quadra = document.querySelector("#input-quadra");
  let isQuadraValido = 0;

  let lote = document.querySelector("#input-lote");
  let isLoteValido = 0;

  let bairro = document.querySelector("#input-bairro");
  let isBairroValido = 0;

  let area = document.querySelector("#input-area");
  let isAreaValido = 0;

  let responsavel = document.querySelector("#inputGroupSelect2");
  let isResponsavelValido = 0;

  if(nome.value != ""){
    nome.classList.remove("is-invalid");
    nome.classList.add("is-valid");
    isNomeValido = 1;
  } else {
    nome.classList.remove("is-valid");
    nome.classList.add("is-invalid");
    isNomeValido = 0;
  }

  if(cpf.value != ""){
    cpf.classList.remove("is-invalid");
    cpf.classList.add("is-valid");
    isCpfValido = 1;
  } else {
    cpf.classList.remove("is-valid");
    cpf.classList.add("is-invalid");
    isCpfValido = 0;
  }

  if(endereco.value != ""){
    endereco.classList.remove("is-invalid");
    endereco.classList.add("is-valid");
    isEnderecoValido = 1;
  } else {
    endereco.classList.remove("is-valid");
    endereco.classList.add("is-invalid");
    isEnderecoValido = 0;
  }

  if(cadImobiliario.value != ""){
    cadImobiliario.classList.remove("is-invalid");
    cadImobiliario.classList.add("is-valid");
    isCadImobValido = 1;
  } else {
    cadImobiliario.classList.remove("is-valid");
    cadImobiliario.classList.add("is-invalid");
    isCadImobValido = 0;
  }

  if(quadra.value != ""){
    quadra.classList.remove("is-invalid");
    quadra.classList.add("is-valid");
    isQuadraValido = 1;
  } else {
    quadra.classList.remove("is-valid");
    quadra.classList.add("is-invalid");
    isQuadraValido = 0;
  }

  if(lote.value != ""){
    lote.classList.remove("is-invalid");
    lote.classList.add("is-valid");
    isLoteValido = 1;
  } else {
    lote.classList.remove("is-valid");
    lote.classList.add("is-invalid");
    isLoteValido = 0;
  }

  if(bairro.value != ""){
    bairro.classList.remove("is-invalid");
    bairro.classList.add("is-valid");
    isBairroValido = 1;
  } else {
    bairro.classList.remove("is-valid");
    bairro.classList.add("is-invalid");
    isBairroValido = 0;
  }

  if(area.value != ""){
    area.classList.remove("is-invalid");
    area.classList.add("is-valid");
    isAreaValido = 1;
  } else {
    area.classList.remove("is-valid");
    area.classList.add("is-invalid");
    isAreaValido = 0;
  }

  if(responsavel.value != -1){
    responsavel.classList.remove("is-invalid");
    responsavel.classList.add("is-valid");
    isResponsavelValido = 1;
  } else {
    responsavel.classList.remove("is-valid");
    responsavel.classList.add("is-invalid");
    isResponsavelValido = 0;
  }

  if(isAreaValido == 1 && isBairroValido == 1 && isCadImobValido == 1 && isCpfValido == 1 && isEnderecoValido == 1 &&
    isLoteValido == 1 && isNomeValido == 1 && isQuadraValido == 1 && isResponsavelValido == 1){
      document.querySelector("#form-valor-venal").submit();
    } else {
      swal("Algo deu errado!", "Você deve digitar os campos destacados!", "error");
    }





}

