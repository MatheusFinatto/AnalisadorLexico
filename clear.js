// Função para remover palavras da lista
const removeWords = (palavra) => {
  // Verifica se a palavra está na lista e não é vazia
  let index = words.indexOf(palavra);
  if (index >= 0 && palavra.length > 0) {
    // Remove a palavra da lista 'words'
    words.splice(index, 1);

    // Remove a palavra da interface do usuário e oculta o ícone
    $(".addedWord").each(function () {
      if ($(this).text().trim() == palavra.trim()) {
        $(this).remove();
        $(this).find("i").hide();
      }
    });
  }
  // Limpa o aplicativo para redefinir estados e tabelas
  clearApp();
};

// Função para limpar o aplicativo
function clearApp() {
  // Limpa a tabela e a lista de palavras encontradas
  $("#tabela_tbody").html("");
  $("#palavras_encontradas").html("");

  // Redefine os estados e tabelas
  stateInteractions = [0];
  globalState = 0;
  states = [[]];
  table = [];

  // Monta o estado das palavras e gera as tabelas atualizadas
  mountWordState();
  table = generateTableLines();
  mountTable(table);
}
