// --MENU LATERAL DE QUESTÕES--
// Adiciona um ouvinte de evento ao documento para executar quando todo o conteúdo HTML for carregado
document.addEventListener('DOMContentLoaded', function() {

  // Cria um array com os números das questões
  // Array.from cria um novo array a partir de um objeto iterável
  // Neste caso, estamos criando um array de tamanho 35 (número de questões)
  var questoes = Array.from({length: 35}, (_, i) => i + 1); // A função (_, i) => i + 1 é usada para preencher o array com os números das questões

  // Seleciona o elemento onde o menu será inserido
  // document.querySelector retorna o primeiro elemento no documento que corresponde ao seletor especificado
  var menu = document.querySelector('.menu'); // definição de classe "menu" para chamar a função em HTML

  // Cria o scroll-container
  // document.createElement cria um novo elemento HTML do tipo especificado
  var scrollContainer = document.createElement('scroll-container');

  // Adiciona cada questão ao scroll-container
  // forEach executa a função fornecida uma vez para cada elemento do array
  questoes.forEach(function(questao) {

    // Cria um novo elemento scroll-page e define seu id para 'q' seguido do número da questão
    var scrollPage = document.createElement('scroll-page');
    scrollPage.id = 'q' + questao; // Dessa forma, todos os links do container serão formatados pelo padrão definido

    // Cria um novo elemento de link (a) e define seu href para o arquivo HTML da questão correspondente
    var link = document.createElement('a'); // Define a tag no elemento
    link.href = 'q' + questao + '.html'; // Define o endereço da âncora no comando gerado para vincular a outra página 
    link.textContent = 'Questão ' + questao; // Exibe os títulos das opções do scroll-container

    // Faz o link ocupar todo o espaço disponível na div
    link.style.display = 'flex';

    // Centraliza o conteúdo do link verticalmente
    link.style.alignItems = 'center';
  
    // Define a altura do link para cobrir toda a div
    link.style.height = '100%';

    // Adiciona o link ao scroll-page
    scrollPage.appendChild(link);

    // Adiciona o scroll-page ao scroll-container
    scrollContainer.appendChild(scrollPage);
  });

  menu.appendChild(scrollContainer); // Adiciona o scroll-container ao menu. Com esse comando, o scroll-container aparece na tela

  // -- Para destacar a questão atual no scroll-container --
  var paginaAtual = window.location.pathname.split("/").pop(); // Depois de criar o menu, obtenha o nome do arquivo da página atual
  var linkAtual = document.querySelector('.menu a[href="' + paginaAtual + '"]'); // Use o seletor CSS para encontrar o link que tem o href igual ao nome do arquivo da página atual
  if (linkAtual) {
    linkAtual.parentElement.classList.add('active'); // Adicione a classe 'active' ao elemento scroll-page que contém o link da página atual. Com a classe, será possível estilizar o elemento para dar destaque na página
  }

  // -- Para posicionar o scroll de menu lateral para centralizar a questão atual --
  var linkAtual = document.querySelector('.menu a[href="' + paginaAtual + '"]'); // Use o seletor CSS para encontrar o link que tem o href igual ao nome do arquivo da página atual
  if (linkAtual) { 
    linkAtual.parentElement.classList.add('active'); // Adicione a classe 'active' ao elemento scroll-page que contém o link da página atual
    linkAtual.scrollIntoView({block: "center", inline: "nearest"}); // Rola automaticamente para o elemento ativo
  }
});


// --MODAL DE VERIFICAÇÃO DE RESPOSTA--
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