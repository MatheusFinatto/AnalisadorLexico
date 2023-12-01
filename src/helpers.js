
const createTableRow = (tableItem) => {
  let tableRow = $(document.createElement("tr"));
  let tableData = $(document.createElement("td"));

  tableItem["final"]
    ? tableData.html("q" + tableItem["estado"] + "*")
    : tableData.html("q" + tableItem["estado"]);

  tableRow.append(tableData);
  tableRow.addClass("linha_" + tableItem["estado"]);

  return tableRow;
};

const populateTableRow = (tableRow, tableItem) => {
  let firstChar = "a";
  let lastChar = "z";

  for (let i = firstChar.charCodeAt(0); i <= lastChar.charCodeAt(0); i++) {
    let letra = String.fromCharCode(i);
    let td = $(document.createElement("td"));
    td.addClass("coluna_" + letra + " center");

    if (tableItem[letra] != "-") {
      td.html("q" + tableItem[letra]);
      td.addClass("tem-sel");
    } else {
      td.html("-").addClass("border-custom");
    }

    tableRow.append(td);
  }

  return tableRow;
};

const mountTable = (itemTab) => {
  let table = $("#tabela_tbody");
  table.html("");

  itemTab.forEach((tableItem) => {
    let tr = createTableRow(tableItem);
    tr = populateTableRow(tr, tableItem);
    table.append(tr);
  });
};


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
