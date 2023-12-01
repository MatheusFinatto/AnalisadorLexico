// Função para criar uma linha da tabela com base nos dados do item da tabela
const createTableRow = (tableItem) => {
  let tableRow = $(document.createElement("tr"));
  let tableData = $(document.createElement("td"));

  // Verifica se o estado é final e configura a célula da tabela adequadamente
  if (tableItem["final"]) {
    tableData.html("q" + tableItem["estado"] + "*");
    tableData.addClass("tem-sel center border-custom");
  } else {
    tableData.html("q" + tableItem["estado"]);
    tableData.addClass("tem-sel center border-custom");
  }

  tableRow.append(tableData);
  tableRow.addClass("linha_" + tableItem["estado"]);

  return tableRow;
};

// Função para preencher uma linha da tabela com as transições do item da tabela
const populateTableRow = (tableRow, tableItem) => {
  let firstChar = "a";
  let lastChar = "z";

  // Itera pelo alfabeto e preenche as células da tabela com as transições
  for (let i = firstChar.charCodeAt(0); i <= lastChar.charCodeAt(0); i++) {
    let dash = String.fromCharCode(i);
    let td = $(document.createElement("td"));
    td.addClass("coluna_" + dash + " center");

    if (tableItem[dash] != "-") {
      td.html("q" + tableItem[dash]);
      td.addClass("tem-sel");
    } else {
      td.html("-").addClass("border-custom");
    }

    tableRow.append(td);
  }

  return tableRow;
};

// Função para montar a tabela com base nos itens da tabela
const mountTable = (itemTab) => {
  let table = $("#tabela_tbody");
  table.html("");

  itemTab.forEach((tableItem) => {
    let tr = createTableRow(tableItem);
    tr = populateTableRow(tr, tableItem);
    table.append(tr);
  });
};

// Função para obter as palavras da entrada do usuário
const getWords = () => {
  let words = $("#buscar_palavras").val().toLowerCase();
  if (words.length == 0) {
    $("#tabela_tbody tr").removeClass("focus-linha");
    $("#tabela_tbody td").removeClass("focus-coluna");
  }

  return words;
};

const highlightTable = (estado, palavra, erroEstado) => {
  clearTable();

  if (erroEstado == "-") {
    $("#tabela_tbody .linha_" + estado).addClass("semi-focus-erro");
    $("#tabela_tbody .coluna_" + palavra).addClass("semi-focus-erro");
    return;
  }

  $("#tabela_tbody .linha_" + estado).addClass("focus-linha");
  $("#tabela_tbody .coluna_" + palavra).addClass("focus-coluna");
};

const clearTable = () => {
  $("#tabela_tbody tr").removeClass("focus-linha");
  $("#tabela_tbody td").removeClass("focus-coluna");
  $("#tabela_tbody tr").removeClass("focus-linha-erro");
  $("#tabela_tbody td").removeClass("focus-coluna-erro");
  $("#tabela_tbody tr").removeClass("semi-focus-erro");
  $("#tabela_tbody td").removeClass("semi-focus-erro");
};
