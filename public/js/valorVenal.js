
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
    unit: 'R$',
    zeroCents: false
  });
