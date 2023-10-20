// Função para exibir a modal com a mensagem
function exibirModal(mensagem) {
    const modal = document.getElementById("myModal");
    const modalMessage = document.getElementById("modalMessage");
    modalMessage.innerHTML = mensagem.replace(/\\n/g, '<br>');
    modal.style.display = "block";

    // Fechar a modal quando clicar no botão 'X'
    const modalClose = document.getElementById("modalClose");
    modalClose.onclick = function() {
      modal.style.display = "none";
    }
  }

  function validarResposta() {
  const alternativas = document.getElementsByName("alternativa");
  let respostaSelecionada = "";

  for (let i = 0; i < alternativas.length; i++) {
    if (alternativas[i].checked) {
      respostaSelecionada = alternativas[i].value;
      break;
    }
  }

  // Obtenha o número da questão do título da página
  let numeroQuestao = document.querySelector('h1').innerText.split('/')[0].split(' ')[1];

  if (respostaSelecionada === "") {
    exibirModal("Por favor, selecione uma alternativa.");
  } else {
    const respostaCorreta = document.querySelector('input[name="alternativa"]:checked').getAttribute('cor');
    if (respostaSelecionada === respostaCorreta) {
      exibirModal("Resposta correta!\nAlternativa selecionada: " + respostaSelecionada);
    } else {
      exibirModal("Resposta incorreta.\nAlternativa selecionada: " + respostaSelecionada + "\nAlternativa correta: " + respostaCorreta);
    }

    // Desabilitar todos os inputs radio
    for (let i = 0; i < alternativas.length; i++) {
      alternativas[i].disabled = true;
    }
    // Armazene um valor no localStorage para indicar que o usuário já clicou no botão
  localStorage.setItem('verificado' + numeroQuestao, 'true');
  }
}

function salvarResposta() {
  // Obtenha a resposta selecionada
  const alternativas = document.getElementsByName("alternativa");
  let respostaSelecionada = "";

  for (let i = 0; i < alternativas.length; i++) {
    if (alternativas[i].checked) {
      respostaSelecionada = alternativas[i].value;
      break;
    }
  }

  // Obtenha o número da questão do título da página
  let numeroQuestao = document.querySelector('h1').innerText.split('/')[0].split(' ')[1];

  // Salve a resposta selecionada no localStorage
  localStorage.setItem('respostaSelecionada' + numeroQuestao, respostaSelecionada);
}

window.onload = function() {
  // Obtenha o número da questão do título da página
  let numeroQuestao = document.querySelector('h1').innerText.split('/')[0].split(' ')[1];

  // Obtenha a resposta salva do localStorage
  const respostaSalva = localStorage.getItem('respostaSelecionada' + numeroQuestao);

  if (respostaSalva) {
    // Selecione a resposta salva
    const alternativas = document.getElementsByName("alternativa");

    for (let i = 0; i < alternativas.length; i++) {
      if (alternativas[i].value === respostaSalva) {
        alternativas[i].checked = true;
        break;
      }
    }
  }

  // Verifique se a resposta já foi verificada
  const verificado = localStorage.getItem('verificado' + numeroQuestao);

  if (verificado === 'true') {
    // Se a resposta já foi verificada, desabilite as alternativas
    const alternativas = document.getElementsByName("alternativa");

    for (let i = 0; i < alternativas.length; i++) {
      alternativas[i].disabled = true;
    }
  }
};