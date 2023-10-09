$(document).ready(function () {
  // Função para validar a palavra enquanto digita
  const doTestAndInsertWord = () => {
    const word = $("#input_palavras").val().toLowerCase();
    const regularExpression = /([^A-Za-z_])/;
    const inserePalavrasButton = $("#insere_palavras");
    inserePalavrasButton.prop("disabled", regularExpression.test(word));
  };

  // Manipulador de clique para o botão de inserção de palavras
  $("#insere_palavras").click(() => {
    const word = $("#input_palavras").val().toLowerCase();
    if (word) {
      addWords(word);
    }
  });

  // Manipulador de evento 'input' para o campo de entrada
  $("#input_palavras").on("input", doTestAndInsertWord);

  // Manipulador de evento 'keyup' para o campo de busca de palavras
  $("#buscar_palavras").keyup(() => {
    // Verifique se há palavras na tabela
    if (table.length > 0) {
      validateWord();
    }
  });
});
