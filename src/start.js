$(document).ready(function () {
  $("#input_palavras").on("input", testWord);

  $("#insere_palavras").click(() => {
    const word = $("#input_palavras").val().toLowerCase();
    if (word) {
      addWords(word);
    }
  });

  $("#buscar_palavras").keyup(() => table.length > 0 && validateWord());
});
