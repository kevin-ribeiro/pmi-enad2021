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
// --Função para exibir a modal com a mensagem--
function exibirModal(mensagem) { 
  const modal = document.getElementById("myModal"); // Obtém o elemento modal pelo ID
  const modalMessage = document.getElementById("modalMessage"); // Obtém o elemento da mensagem modal pelo ID
  modalMessage.innerHTML = mensagem.replace(/\\n/g, '<br>'); // Substitue os caracteres de nova linha na mensagem por tags <br> para formatação HTML correta
  modal.style.display = "block"; // Exibe a modal alterando o estilo de exibição para "block"

  // Fechar a modal quando clicar no botão definido em HTML
  const modalClose = document.getElementById("modalClose");
  modalClose.onclick = function() { // Define um manipulador de eventos onclick para o botão de fechamento da modal
    modal.style.display = "none"; // Oculta a modal alterando o estilo de exibição para "none"
  }
}


// Declara-se variáveis globais "acertos" e "erros" de valores iniciais iguais a 0.
let acertos = 0;
let erros = 0;

// --Função para validar a resposta selecionada pelo usuário--
// Cria-se uma função de nome "validarResposta".
function validarResposta() {

  const alternativas = document.getElementsByName("alternativa"); // Declara-se uma variável chamada "alternativas. A função getElementsByName obtém todos os elementos de name "alternativa" presentes no document HTML, que são armazenados em "alternativas".

  let respostaSelecionada = ""; // Declara-se uma variável "respostaSelecionada" cujo valor é uma string vazia.
  let textoSelecionado = ""; // Declara-se uma variável "textoSelecionado" cujo valor é uma string vazia.
  let textoCorreta = ""; // Declara-se uma variavel "textoCorreta" cujo valor é uma string vazia.

  // Cria-se um looping que percorre de 0 ao tamanho/comprimento de "alternativas" (5), identando de um em um.
  for (let i = 0; i < alternativas.length; i++) {

    // Se alguma alternativa estiver marcada, esse bloco de comando armazena seu valor em respostaSelecionada e interrompa o loop
    if (alternativas[i].checked) { 
      respostaSelecionada = alternativas[i].value;
      textoSelecionado = document.getElementById(i).innerHTML;
      break;
    }
  }

  // Obtenha o número da questão do título da página
  let numeroQuestao = document.querySelector('h1').innerText.split('/')[0].split(' ')[1];

  // Se nenhuma alternativa foi selecionada, exibe uma mensagem na modal
  if (respostaSelecionada === "") {
    exibirModal("Por favor, selecione uma alternativa.");
  } 
  else { // Se uma alternativa foi selecionada, obtém a resposta correta do atributo 'cor' do input do tipo radio marcado
    const respostaCorreta = document.querySelector('input[name="alternativa"]:checked').getAttribute('cor');

    // Se a resposta selecionada for igual à resposta correta, exibe uma mensagem de sucesso na modal
    if (respostaSelecionada === respostaCorreta) {
      exibirModal("<span style='color: rgb(79, 255, 108);'>Resposta correta!</span>\n<br><br><span style='color: #0D6EFD;'>Alternativa selecionada: </span>" + textoSelecionado);
      localStorage.setItem('acertos', (parseInt(localStorage.getItem('acertos') || "0") + 1).toString());

    // Se a resposta selecionada for diferente da resposta correta, exibe uma mensagem de erro na modal
    } else { 
      textoCorreta = document.querySelector('[value="certa"]').innerHTML; 
      exibirModal("<span style='color: rgb(255, 65, 65);'>Resposta incorreta!</span>\n<br><br><span style='color: #0D6EFD;'>Alternativa selecionada: </span>" + textoSelecionado + "\n<br><br><span style='color: #0D6EFD;'>Alternativa correta: </span>" + textoCorreta) 
      localStorage.setItem('erros', (parseInt(localStorage.getItem('erros') || "0") + 1).toString());
    }

    document.getElementById('correcao').disabled = true

    // Desabilita todos os inputs radio após a verificação da resposta
    for (let i = 0; i < alternativas.length; i++) {
      alternativas[i].disabled = true;
    }
    // Armazena um valor no localStorage para indicar que o usuário já clicou no botão de verificação da resposta
  localStorage.setItem('verificado' + numeroQuestao, 'true');
  }
}

// -- Cria-se uma função de nome "salvarResposta()".
function salvarResposta() {

  // Declara-se uma variável chamada "alternativa" que obtém, a partir da função "getElementByName" todos os elementos de name "alternativa" presentes no documento HTML.
  const alternativas = document.getElementsByName("alternativa");

  //Define a variável "respostaSelecionada" como uma string vazia.
  let respostaSelecionada = "";

  // Cria-se um looping de 0 até o tamanho/comprimento de "alternativas" (5), iterando de um em um.
  for (let i = 0; i < alternativas.length; i++) {

    // Se alguma alternativa estiver marcada (checked), armazena seu valor (value) em "respostaSelecionada" e interrompa o loop (break).
    if (alternativas[i].checked) {
      respostaSelecionada = alternativas[i].value;
      break;
    }
  }

  // Declara-se uma variável "numeroQuestao". A função querySelector percorre o document HTML até encontrar o primeiro elemento h1, obtém o texto nele contido e o divide usando / como separador, criando um array com essas partes, da qual obtém o primeiro item [0]. Depois repete o mesmo procedimento de separação, dessa vez utilizando o " " (espaço vazio) como separador e obtendo o segundo item do array [1]. Dessa forma, se obtém o número da questão do título da página.
  let numeroQuestao = document.querySelector('h1').innerText.split('/')[0].split(' ')[1];

  // A função setItem armazena no localStorage, com a chave "respostaSelecionada + numeroQuestao", o valor "respostaSelecionada", isto é, armazena a resposta selecionada no localStorage.
  localStorage.setItem('respostaSelecionada' + numeroQuestao, respostaSelecionada);
}



// função em construção, com a ideia de mostrar na tela um aviso caso o usuário não tenha verificado alguma questão.
function finalizar() {
  /*for (let i = 1; i<=35; i++){
    if (localStorage.getItem('verificado'+i.toString())=="false" || local){
      var s = 0;
    }
  }
  if (s == 0) {
    var t = confirm("Há questões não respondidas! Deseja mesmo finalizar o simulado?");
    if (t == true) {
      window.location.href = "../paginas/estatisticas.html"
    }
  }
  else {*/
    var t = confirm("Deseja finalizar o seu simulado? Não haverá possibilidade de alterar as alternativas selecionadas.");
    if (t == true) {
      window.location.href = "../paginas/resultados.html"
    }
}

// -- Window OnLoad é usada para determinar que toda a página está carregada, desde imagens, estilos, scripts, etc. Dessa forma, após todos os conteúdos terem sido carregados, é chamada uma nova função a partir de "function"--
window.onload = function() {
  // É declarada uma variável a partir de "let", cujo nome é "numeroQuestao". A função querySelector vai percorrer o documento HTML e procurar o primeiro elemento <h1>. Depois innerText obtém o texto que está dentro desse elemento, e a função split cria um array com o texto divido a partir do caractere de seu argumento, isto é, divide o texto a partir da "/", e utiliza o primeiro elemento desse vetor com [0]. Depois, o texto obtido pe novamente dividido, mas dessa vez utilizando o " "(espaço vazio) como separador, e obtendo o segundo elemento do array a partir de [1]. Essa manobra toda é utilizada para se obter o número da questão do título da página.
  let numeroQuestao = document.querySelector('h1').innerText.split('/')[0].split(' ')[1];

  // É declarada uma variável constante chamada "respostaSalva", que obtém no localStorage, a partir da função getItem, o valor referente à chave "respostaSelecionada + numeroQuestao". Por exemplo, se no localStorage o valor C estiver salvo na questão 5, respostaSalva recebe o valor "C", pois é o valor que consta na chave "respostaSelecionada5".
  const respostaSalva = localStorage.getItem('respostaSelecionada' + numeroQuestao);

  // Se "respostaSalva" é não nula...
if (respostaSalva) {
  // Declara-se uma constante chamada "alternativas". A função "getElementsByName" busca todos os elementos com o name "alternativa" do document HTML  e os armazena na constante 'alternativas'.
  const alternativas = document.getElementsByName("alternativa");

  // Cria-se uma estrutura de looping que percorre todas as alternativas (de 0 até o tamanho/comprimento de "alternativas", que no caso é 35, portanto, o looping vai de 0 a 34, de 1 em 1).
  for (let i = 0; i < alternativas.length; i++) {

    // Verifica se o valor da alternativa i atual é igual à resposta salva
    if (alternativas[i].value === respostaSalva) {

      // Se for igual(true), marca a alternativa como selecionada(checked).
      alternativas[i].checked = true;

      // Interrompe o loop, pois a alternativa correta já foi selecionada.
      break;
    }
  }
}

// Declara-se uma constante "verificado", que recebe o valor do item do localstorage que tem por chave "verificado + numeroQuestao".
const verificado = localStorage.getItem('verificado' + numeroQuestao);

// Verifica se o valor de 'verificado' é igual à string 'true'.
if (verificado === 'true') {

  document.getElementById('correcao').disabled = true;

  // Busca todos os elementos do documento com o nome "alternativa" e armazena em uma variável chamada 'alternativas'
  const alternativas = document.getElementsByName("alternativa");

  // Loop que percorre todas as alternativas
  for (let i = 0; i < alternativas.length; i++) {

    // Desabilita todas as alternativas após a correção, impedindo que o usuário altere a seleção.
    alternativas[i].disabled = true;
  }
}
}