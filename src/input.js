

const testWord = () => {
  const word = $("#input_palavras").val().toLowerCase();
  const regularExpression = /([^A-Za-z_])/;
  $("#insere_palavras").prop("disabled", regularExpression.test(word));
};



const addWords = (palavra) => {
  if (words.indexOf(palavra) < 0 && palavra.length > 0) {
    $("#input-field").append(`<p class='addedWord'>${palavra}</p>`);
    words.push(palavra);
    $("#input_palavras").val("");
  }
  generateTables();
};

const generateTables = () => {
  mountWordState();
  table = generateTableLines();
  mountTable(table);
};

const mountWordState = () => {
  words.forEach((arrayWords) => {
    let actualState = 0;
    actualState = createSingleWordState(arrayWords, actualState);
  });
};

const createSingleWordState = (arrayWords, actualState) => {
  for (let j = 0; j < arrayWords.length; j++) {
    console.log(states[actualState][arrayWords[j]])
    if (typeof states[actualState][arrayWords[j]] === "undefined") {
      let nextState = globalState + 1;
      states[actualState][arrayWords[j]] = nextState;
      states[nextState] = [];
      globalState = actualState = nextState;
    } else actualState = states[actualState][arrayWords[j]];


    if (j == arrayWords.length - 1) states[actualState]["final"] = true;
  }
  return actualState;
};

const generateTableLines = () => {
  let estadosArray = [];
  states.forEach((state, idx) => {
    estadosArray.push(manageState(state, idx));
  });

  return estadosArray;
};

const manageState = (state, index) => {
  const stateInfo = {
    estado: index,
    final: typeof state["final"] !== "undefined", 
  };

  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  for (let letter of alphabet) {
    const transition = state[letter];
    stateInfo[letter] = typeof transition !== "undefined" ? transition : "-";
  }

  return stateInfo;
};



const validateWord = () => {
  let words = getWords(); 
  let state = 0;
  let error = false;

  for (let i = 0; i < words.length; i++) {
    let regularExpression = /([a-z_])/;

    if (regularExpression.test(words[i]) && error == false) {
      highlightTable(state, words[i], table[state][words[i]]);

      table[state][words[i]] != "-"
        ? (state = table[state][words[i]])
        : (error = true);
    } else if (words[i] == " ") {
      validateWordEnd(words, error, state);
    }
  }
};
