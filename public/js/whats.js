let semMsg = document.querySelector("#RadioButton1");
let comMsg = document.querySelector("#RadioButton2");

function inputHandler(masks, max, event) {
  let c = event.target;
  let v = c.value.replace(/\D/g, "");
  let m = c.value.length > max ? 1 : 0;
  VMasker(c).unMask();
  VMasker(c).maskPattern(masks[m]);
  c.value = VMasker.toPattern(v, masks[m]);
}

let telMask = ["(99) 9999-99999", "(99) 99999-9999"];
let tel = document.querySelector("#input-conversa");
VMasker(tel).maskPattern(telMask[0]);
tel.addEventListener("input", inputHandler.bind(undefined, telMask, 14), false);

mensagemWhats = () => {
  let msg = document.querySelector("#input-texto").value;
  let num = document.querySelector("#input-conversa").value;

  VMasker(document.querySelector("#input-conversa")).unMask();
  let input = document.querySelector("#input-conversa").value;
  let telMask = ["(99) 9999-99999", "(99) 99999-9999"];
  let tel = document.querySelector("#input-conversa");
  VMasker(tel).maskPattern(telMask[0]);
  tel.addEventListener("input", inputHandler.bind(undefined, telMask, 14), false);

  if (semMsg.checked == true) {
    if (num == "") {
      swal("Algo deu errado!", "Você deve digitar algo!", "error");
    } else {
      window.open(`https://web.whatsapp.com/send?phone=55${input}`, "_blank");
    }
  }

  if (comMsg.checked == true) {
    if (msg == "" || num == "") {
      swal("Algo deu errado!", "Você deve digitar algo!", "error");
    } else {
      window.open(
        `https://web.whatsapp.com/send?phone=55${input}&text=${msg}`,
        "_blank"
      );
    }
  }
};

radioButton = () => {
  if (semMsg.checked == true) {
    document.querySelector(".mensagem").style.display = "none";
  }

  if (comMsg.checked == true) {
    document.querySelector(".mensagem").style.display = "flex";
  }
};

radioButton();
