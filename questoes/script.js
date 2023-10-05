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

    if (respostaSelecionada === "") {
      exibirModal("Por favor, selecione uma alternativa.");
    } else {
      const respostaCorreta = "A"; // Defina a resposta correta aqui
      if (respostaSelecionada === respostaCorreta) {
        exibirModal("Resposta correta!\nAlternativa selecionada: " + respostaSelecionada);
      } else {
        exibirModal("Resposta incorreta.\nAlternativa selecionada: " + respostaSelecionada + "\nAlternativa correta: " + respostaCorreta);
      }
    }
  }