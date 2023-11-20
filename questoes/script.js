// --MENU LATERAL DE QUESTÕES--

document.addEventListener('DOMContentLoaded', function() {
// Este trecho de código adiciona um ouvinte de evento para o evento 'DOMContentLoaded'.
// A função passada como segundo argumento será executada quando o evento ocorrer, ou seja, quando o DOM (Document Object Model) estiver completamente carregado.

  var questoes = Array.from({length: 35}, (_, i) => i + 1); 
  //Array.from(): Este método cria uma nova instância de array a partir de um objeto semelhante a um array ou iterável. Neste caso, está sendo usado para criar um array a partir de um objeto com um length específico.
  //{length: 35}: Este é o objeto a partir do qual o array é criado. Ele indica que o array terá um comprimento (length) de 35.
  //(_, i) => i + 1: Este é um argumento de mapeamento opcional para a função Array.from(). Aqui, _ é uma convenção para um parâmetro não utilizado (pois o valor não é necessário no contexto),
  //e i é o índice do elemento atual. A função de mapeamento retorna i + 1, o que significa que o array resultante conterá números de 1 a 35.

  var menu = document.querySelector('.menu'); 
  //document.querySelector('.menu'): Este método do DOM (Document Object Model) procura e retorna o primeiro elemento que corresponde ao seletor CSS especificado, neste caso, '.menu'. 
  //A classe ".menu" é frequentemente usada para identificar elementos relacionados a menus em páginas da web.
  //var menu = ...: O resultado da seleção é armazenado na variável menu. Agora, a variável menu contém uma referência para o elemento HTML que possui a classe "menu".  
  
  var scrollContainer = document.createElement('scroll-container');
  //document.createElement('scroll-container'): Este método do DOM cria um novo elemento HTML com o nome fornecido como argumento. 
  //Neste caso, está criando um elemento <scroll-container>. Note que "scroll-container" aqui é tratado como um nome de tag HTML personalizado.
  //var scrollContainer = ...: O resultado da criação do elemento é atribuído à variável scrollContainer. Agora, a variável scrollContainer contém uma referência para o elemento HTML recém-criado.
 
  
  // O trecho de código está usando um loop forEach para iterar sobre o array questoes e, para cada questão, está criando elementos HTML dinamicamente e adicionando-os a um elemento chamado scroll-container.
  questoes.forEach(function(questao) {
  // Adiciona cada questão ao scroll-container
  // forEach executa a função fornecida uma vez para cada elemento do array

    var scrollPage = document.createElement('scroll-page'); //Cria um novo elemento scroll-page para representar cada questão.
    scrollPage.id = 'q' + questao; //  Define o ID do scroll-page para 'q' seguido do número da questão. Dessa forma, todos os links do container serão formatados pelo padrão definido

    var link = document.createElement('a'); //Cria um novo elemento de link (<a>) para representar cada questão.
    link.href = 'q' + questao + '.html'; // Define o atributo href do link para apontar para o arquivo HTML correspondente à questão.
    link.textContent = 'Questão ' + questao; // Define o texto do link para indicar "Questão" seguido do número da questão.

    link.style.display = 'flex'; //Faz o link ocupar todo o espaço disponível na div, usando o modelo de layout flexível.
    
    link.style.alignItems = 'center'; // Centraliza o conteúdo do link verticalmente usando o alinhamento no eixo transversal.
      
    link.style.height = '100%'; // Define a altura do link para cobrir toda a div verticalmente.
    
    scrollPage.appendChild(link); // Adiciona o link criado ao elemento scroll-page.
    
    scrollContainer.appendChild(scrollPage); // Adiciona o scroll-page ao elemento scroll-container.
  });

  menu.appendChild(scrollContainer); // Este método do DOM (Document Object Model) é utilizado para adicionar um nó (elemento) como filho de outro nó.
                                     // Neste caso, scrollContainer está sendo adicionado como um filho do elemento referenciado por menu.
  // Adiciona o scroll-container ao menu. Com esse comando, o scroll-container é visualizavel na tela
                                          
  // -- Para destacar a questão atual no scroll-container --
  var paginaAtual = window.location.pathname.split("/").pop();//Esta linha obtém o caminho da URL atual (window.location.pathname), divide-o em partes usando "/", e pega a última parte (o nome do arquivo) utilizando pop().
  //Isso resulta no nome do arquivo da página atual, armazenado na variável paginaAtual.

  var linkAtual = document.querySelector('.menu a[href="' + paginaAtual + '"]');//Esta linha utiliza document.querySelector para encontrar o primeiro elemento <a> dentro de um elemento com a classe 'menu' cujo atributo href corresponde à paginaAtual. 
  //Isso efetivamente encontra o link na barra de navegação que aponta para a página atual.

  if (linkAtual) { // Aqui, é verificado se o link atual foi encontrado if (linkAtual).
    linkAtual.parentElement.classList.add('active'); // Se o link foi encontrado, adiciona a classe 'active' ao elemento pai do link (linkAtual.parentElement).
  } // A classe 'active' é frequentemente usada para destacar visualmente o item do menu que representa a página atual.


  // -- Para posicionar o scroll de menu lateral para centralizar a questão atual --
  var linkAtual = document.querySelector('.menu a[href="' + paginaAtual + '"]'); // Continua a lógica anterior, procurando o link na barra de navegação (menu) que aponta para a página atual.
  
  if (linkAtual) { // Verifica se o link atual foi encontrado.
    linkAtual.parentElement.classList.add('active'); // Se o link atual foi encontrado, adiciona a classe 'active' ao elemento pai do link.
                                                     // Isso destaca visualmente o link ou o item do menu que representa a página atual.
    linkAtual.scrollIntoView({block: "center", inline: "nearest"}); // Rola até o link atual para garantir que ele seja visível na janela do navegador.
  }                                                                 //Os parâmetros { block: "center", inline: "nearest" } são usados para centralizar o elemento na janela.
});


// --MODAL DE VERIFICAÇÃO DE RESPOSTA--
// --Função para exibir a modal com a mensagem--
function exibirModal(mensagem) { // é utilizada para exibir um modal na página, para exibir uma mensagem ao usuário.
  const modal = document.getElementById("myModal"); // Obtém uma referência ao elemento do modal com o ID "myModal".
  const modalMessage = document.getElementById("modalMessage"); // Obtém uma referência ao elemento dentro do modal que exibirá a mensagem, com o ID "modalMessage".
  modalMessage.innerHTML = mensagem.replace(/\\n/g, '<br>'); //  Substitui todos os caracteres de nova linha (\n) na mensagem por tags HTML <br>, permitindo que a mensagem tenha quebras de linha no modal.
  modal.style.display = "block"; // Exibe o modal, definindo o estilo de exibição para "block".

  // Fechar a modal quando clicar no botão definido em HTML
  const modalClose = document.getElementById("modalClose"); // Obtém uma referência ao botão no modal responsável por fechá-lo.
  modalClose.onclick = function() { // Adiciona um evento de clique ao botão de fechar.
    modal.style.display = "none"; // Quando clicado, o modal é ocultado ao definir o estilo de exibição para "none".
  }
}


// Declara-se variáveis globais "acertos" e "erros" de valores iniciais iguais a 0.
let acertos = 0;
let erros = 0;

// --Função para validar a resposta selecionada pelo usuário--
// Cria-se uma função de nome "validarResposta".
function validarResposta() { // Usada para validar a resposta selecionada pelo usuário em um questionário ou teste.

  const alternativas = document.getElementsByName("alternativa"); // Declara-se uma variável chamada "alternativa". A função getElementsByName obtém todos os elementos de name "alternativa" presentes no document HTML, que são armazenados em "alternativas".
  //document: Refere-se ao objeto Document, que representa a estrutura do documento HTML. 
  //getElementsByName("alternativa"): É um método do Document que retorna uma NodeList (ou HTMLCollection, dependendo da versão do HTML) contendo todos os elementos do documento que têm o atributo name igual a "alternativa".

  let respostaSelecionada = ""; // Declara-se uma variável "respostaSelecionada" cujo valor é uma string vazia.
  let textoSelecionado = ""; // Declara-se uma variável "textoSelecionado" cujo valor é uma string vazia.
  let textoCorreta = ""; // Declara-se uma variavel "textoCorreta" cujo valor é uma string vazia.

  // Cria-se um looping que percorre de 0 ao tamanho/comprimento de "alternativas" (5), identando de um em um.
  for (let i = 0; i < alternativas.length; i++) { // um loop for que itera sobre cada elemento na coleção alternativas. O loop começa com i igual a 0 e continua até i ser menor que o comprimento da coleção.

    // Se alguma alternativa estiver marcada, esse bloco de comando armazena a alternativa selecionada e interrompa o loop
    if (alternativas[i].checked) { //verifica se a opção de resposta associada ao índice i está marcada (selecionada). A propriedade .checked é usada para verificar se um botão de opção (como um botão de rádio) está marcado.
      respostaSelecionada = alternativas[i].value; //Se a opção estiver marcada, o valor da opção é armazenado na variável respostaSelecionada.Isso é útil para identificar qual opção o usuário escolheu.
      textoSelecionado = document.getElementById(i).innerHTML; //Se a opção estiver marcada, o conteúdo HTML do elemento com o ID igual a i é armazenado na variável textoSelecionado. O ID i é usado como uma forma de identificação única para cada elemento.
      break; //O break é usado para sair do loop assim que a primeira opção marcada for encontrada. Isso é importante porque, em um conjunto de botões de opção, geralmente apenas uma pode ser selecionada.
    }        //Se a primeira opção marcada for encontrada, não há necessidade de continuar procurando.
  }

  // Obtenha o número da questão do título da página
  let numeroQuestao = document.querySelector('h1').innerText.split('/')[0].split(' ')[1]; // document.querySelector('h1'): Seleciona o primeiro elemento <h1> no documento HTML.
  // .innerText: Obtém o texto dentro desse elemento <h1>.
  // .split('/'): Divide o texto em um array de substrings usando "/" como delimitador. A escolha do "/" sugere que o texto pode estar em um formato como "Questão X/Y", onde X é o número da questão e Y é o total de questões.
  // [0]: Obtém o primeiro elemento do array resultante, que deve conter o número da questão.
  // .split(' '): Divide esse elemento em um novo array usando o espaço como delimitador. Isso pode ser útil se houver um espaço entre a palavra "Questão" e o número.
  // [1]: Obtém o segundo elemento do novo array, que deve ser o número da questão.
  // No final, numeroQuestao armazenará o número da questão extraído do texto do elemento <h1>. 

  // Se nenhuma alternativa foi selecionada, exibe uma mensagem na modal
  if (respostaSelecionada === "") { // Verifica se o usuário não selecionou nenhuma resposta.
    exibirModal("Por favor, selecione uma alternativa."); // Se verdadeiro, exibe um modal pedindo para o usuário selecionar uma alternativa.
  } 
  else { // Se o usuário selecionou uma resposta, executa o bloco de código dentro do else.
    // Se uma alternativa foi selecionada, obtém a resposta correta do atributo 'cor' do input do tipo radio marcado
    const respostaCorreta = document.querySelector('input[name="alternativa"]:checked').getAttribute('cor'); //Obtém a resposta correta associada à opção selecionada pelo usuário.
    // document.querySelector é usado para selecionar o primeiro elemento que corresponde ao seletor CSS especificado.
    // input[name="alternativa"]: Seleciona todos os elementos input com o atributo name igual a "alternativa".
    // :checked: Filtra para selecionar apenas os elementos que estão marcados (checked).
    // getAttribute('cor') é usado para obter o valor do atributo cor do elemento selecionado.

    
    if (respostaSelecionada === respostaCorreta) { // Esta condição verifica se a resposta selecionada pelo usuário (respostaSelecionada) é igual à resposta considerada correta (respostaCorreta).
      exibirModal("<span style='color: rgb(79, 255, 108);'>Resposta correta!</span>\n<br><br><span style='color: #0D6EFD;'>Alternativa selecionada: </span>" + textoSelecionado);
      // Se a condição for verdadeira, significa que o usuário respondeu corretamente. Então, exibe um modal usando a função exibirModal.
      // O conteúdo do modal inclui uma mensagem indicando que a resposta está correta, destacando a alternativa selecionada (textoSelecionado).      
      localStorage.setItem('acertos', (parseInt(localStorage.getItem('acertos') || "0") + 1).toString()); // Incrementa o número de acertos no armazenamento local.
      // parseInt(localStorage.getItem('acertos') || "0"): Obtém o número atual de acertos do armazenamento local. Se não existir (ou for null), usa "0" como valor padrão.
      // "+ 1": Adiciona 1 ao número atual de acertos.
      // .toString(): Converte o resultado para uma string.
      // localStorage.setItem('acertos', ...): Armazena o novo valor de acertos de volta no armazenamento local.

    // Se a resposta selecionada for diferente da resposta correta, exibe uma mensagem de erro na modal
    } else { // Este bloco de código é executado se a condição anterior (respostaSelecionada === respostaCorreta) for falsa, ou seja, se a resposta do usuário não for a resposta correta.
      textoCorreta = document.querySelector('[value="certa"]').innerHTML; // Aqui, está sendo selecionado o conteúdo HTML do elemento cujo valor (value) é "certa", isso pode ser usado para obter o texto da alternativa correta.
      exibirModal("<span style='color: rgb(255, 65, 65);'>Resposta incorreta!</span>\n<br><br><span style='color: #0D6EFD;'>Alternativa selecionada: </span>" + textoSelecionado + "\n<br><br><span style='color: #0D6EFD;'>Alternativa correta: </span>" + textoCorreta) 
      // Em seguida, é chamada a função exibirModal para exibir um modal informando que a resposta está incorreta
      // O conteúdo do modal inclui uma mensagem indicando que a resposta está incorreta, destacando a alternativa selecionada (textoSelecionado) e exibindo a alternativa correta (textoCorreta).
      localStorage.setItem('erros', (parseInt(localStorage.getItem('erros') || "0") + 1).toString()); // Similar à lógica de incremento dos acertos, aqui está sendo incrementado o número de erros no armazenamento local.
    }

    document.getElementById('correcao').disabled = true
    // document.getElementById('correcao'): Utiliza o método getElementById para obter uma referência ao elemento do DOM que possui o ID "correcao".
    // .disabled = true: Atribui o valor true à propriedade disabled desse elemento. Quando disabled é true, isso indica que o elemento está desativado, ou seja, não pode ser interagido pelo usuário.
    // Em geral, isso é usado com botões ou elementos interativos para impedir que o usuário clique neles ou realize alguma ação.

    // Desabilita todos os inputs radio após a verificação da resposta
    for (let i = 0; i < alternativas.length; i++) { // Este é um loop for que itera sobre todas as opções de resposta. 
                                                    //A condição i < alternativas.length garante que o loop continue até que todas as opções tenham sido percorridas.
      alternativas[i].disabled = true; // Dentro do loop, cada opção de resposta é referenciada usando alternativas[i]. A propriedade disabled de cada opção é então configurada como true, o que desativa a opção.
    }                                  // Quando um elemento HTML tem a propriedade disabled configurada como true, ele não pode ser interagido pelo usuário.
    
    // Armazena um valor no localStorage para indicar que o usuário já clicou no botão de verificação da resposta
  localStorage.setItem('verificado' + numeroQuestao, 'true'); 
  // Aqui, está sendo utilizado o método setItem do objeto localStorage. Este método permite que você armazene um par chave/valor no armazenamento local do navegador.
  // 'verificado' + numeroQuestao: Isso cria uma chave única para cada questão, concatenando a string 'verificado' com o número da questão (numeroQuestao). Isso é útil para rastrear quais questões foram verificadas.
  // 'true': Este é o valor associado à chave criada. Neste caso, 'true' indica que a questão foi verificada.
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

    
    if (alternativas[i].checked) { // Se alguma alternativa estiver marcada (checked), 
      respostaSelecionada = alternativas[i].value; // armazena seu valor (value) em "respostaSelecionada" e
      break; // interrompe o loop (break).
    }
  }

  // Declara-se uma variável "numeroQuestao". A função querySelector percorre o document HTML até encontrar o primeiro elemento h1, obtém o texto nele contido e o divide usando / como separador, 
  let numeroQuestao = document.querySelector('h1').innerText.split('/')[0].split(' ')[1]; // criando um array com essas partes, da qual obtém o primeiro item [0]. Depois repete o mesmo procedimento de separação, 
  // dessa vez utilizando o ' ' (espaço vazio) como separador e obtendo o segundo item do array [1]. Dessa forma, se obtém o número da questão do título da página.

  localStorage.setItem('respostaSelecionada' + numeroQuestao, respostaSelecionada); // Aqui, está sendo utilizado o método setItem do objeto localStorage para armazenar a resposta selecionada.
  // 'respostaSelecionada' + numeroQuestao: Isso cria uma chave única para cada questão, concatenando a string 'respostaSelecionada' com o número da questão (numeroQuestao). Isso é útil para associar a resposta selecionada à questão correspondente.
  // respostaSelecionada: Este é o valor associado à chave criada. Ele contém a resposta selecionada pelo usuário para a questão específica.
}

function finalizar() { // responsável por confirmar se o usuário deseja finalizar o simulado antes de redirecioná-lo para uma página de resultados.
    var t = confirm("Deseja finalizar o seu simulado? Não haverá possibilidade de alterar as alternativas selecionadas.");
    // Aqui, é exibido um prompt de confirmação (confirm) ao usuário com a mensagem especificada. O resultado da confirmação (true ou false) é armazenado na variável t.
    if (t == true) { // Se o usuário clicar em "OK" no prompt de confirmação (se t for true), 
      window.location.href = "../paginas/resultados.html" // a função redireciona o usuário para a página de resultados (../paginas/resultados.html) usando window.location.href.
    }
}

// -- Window OnLoad é usada para determinar que toda a página está carregada, desde imagens, estilos, scripts, etc. Dessa forma, após todos os conteúdos terem sido carregados, é chamada uma nova função a partir de "function"--
window.onload = function() {
  // É declarada uma variável a partir de "let", cujo nome é "numeroQuestao". A função querySelector vai percorrer o documento HTML e procurar o primeiro elemento <h1>.  isto é, divide o texto a partir da "/",
  let numeroQuestao = document.querySelector('h1').innerText.split('/')[0].split(' ')[1]; // Depois innerText obtém o texto que está dentro desse elemento, e a função split cria um array com o texto divido 
  // a partir do caractere de seu argumento, e utiliza o primeiro elemento desse vetor com [0]. Depois, o texto obtido é novamente dividido, mas dessa vez utilizando o ' '(espaço vazio) como separador,
  // e obtendo o segundo elemento do array a partir de [1]. Essa manobra toda é utilizada para se obter o número da questão do título da página.

  // É declarada uma variável constante chamada "respostaSalva", que obtém no localStorage, a partir da função getItem, o valor referente à chave "respostaSelecionada + numeroQuestao". 
  const respostaSalva = localStorage.getItem('respostaSelecionada' + numeroQuestao); // Por exemplo, se no localStorage o valor C estiver salvo na questão 5, respostaSalva recebe o valor "C", pois é o valor que consta na chave "respostaSelecionada5".

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
  // document.getElementById('correcao'): Usa o método getElementById para selecionar um elemento HTML com o ID 'correcao'.
  // disabled = true: Atribui o valor true à propriedade disabled desse elemento. Quando a propriedade disabled de um elemento é configurada como true, ele se torna inativo,
  // impedindo que os usuários interajam com ele. Isso é frequentemente usado com botões ou campos de entrada para indicar que eles não estão disponíveis para interação.

  const alternativas = document.getElementsByName("alternativa");
  // document.getElementsByName("alternativa"): Utiliza o método getElementsByName para obter uma coleção de elementos HTML que têm o atributo name igual a "alternativa".
  // Isso retorna uma NodeList (ou HTMLCollection) que contém todos os elementos com esse nome.
  // const alternativas: Declara uma constante chamada alternativas para armazenar a coleção de elementos obtida pela chamada anterior.

  // Loop que percorre todas as alternativas
  for (let i = 0; i < alternativas.length; i++) {
    // Este é um loop for que itera sobre cada elemento da coleção alternativas. A condição i < alternativas.length garante que o loop continue até que todos os elementos tenham sido percorridos.

    // Desabilita todas as alternativas após a correção, impedindo que o usuário altere a seleção.
    alternativas[i].disabled = true;
    // Dentro do loop, cada alternativa (elemento HTML) é referenciada usando alternativas[i]. A propriedade disabled de cada alternativa é configurada como true, o que desativa a alternativa.
    // Quando um elemento HTML tem a propriedade disabled configurada como true, ele não pode ser interagido pelo usuário.
  }
}
}

// -- Função para reinicio do simulado --
function confirmRedirect() { // Nomeia a função como "confirmRedirect"
  var r = confirm("Todo o seu progresso será perdido.\nVocê tem certeza que quer reiniciar a prova?"); 
  // Utiliza a função confirm para exibir uma caixa de diálogo de confirmação ao usuário com a mensagem especificada. O resultado da confirmação (true ou false) é armazenado na variável r.

  if (r == true) { // Se o usuário confirmar (clicar em "OK"), o código dentro deste bloco será executado.
    localStorage.clear();  // Limpa todos os dados armazenados no localStorage, usado para reiniciar o progresso ou dados do usuário, uma vez que o simulado será reiniciado.
    window.location.href = "../paginas/instrucoes.html"; // Redireciona o usuário para a página de instruções (../paginas/instrucoes.html). Isso ocorre após a confirmação e a limpeza do localStorage, indicando que o simulado está sendo reiniciado.
  }
}